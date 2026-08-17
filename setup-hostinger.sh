#!/bin/bash

# ==============================================================================
# MacProtec Monorepo - Hostinger VPS Deployment & Setup Script
# Domain: https://macproteceng.com
# Database: Neon Cloud PostgreSQL
# Architecture: Next.js Web (Port 3000) + Express API (Port 5000) + Nginx + PM2
# ==============================================================================

set -e

DOMAIN="macproteceng.com"
WWW_DOMAIN="www.macproteceng.com"
SERVER_IP="31.220.107.166"
NEON_DATABASE_URL="postgresql://neondb_owner:npg_zASslWdFO04g@ep-lucky-mud-aygqnybl-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
BETTER_AUTH_SECRET="a8F2kL9pQ3vX7zW1rT4yM0nC6bD5eG2h"

echo "🚀 Starting Hostinger VPS Deployment for MacProtec ($DOMAIN)..."

# 1. Refresh package index & install prerequisites
echo "📦 Refreshing system package indices..."
sudo apt update -y

echo "📦 Installing essential build & server tools..."
sudo apt install -y curl git nginx build-essential certbot python3-certbot-nginx ufw

# 2. Ensure Node.js 20.x LTS & npm are installed
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'.' -f1 | sed 's/v//')" -lt 18 ]; then
    echo "🟢 Installing Node.js 20.x LTS from NodeSource..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "🟢 Node.js version: $(node -v)"
echo "🟢 npm version: $(npm -v)"

# 3. Install pnpm and pm2 globally
echo "📦 Installing/Updating pnpm and PM2 globally..."
sudo npm install -g pnpm pm2 || true

# 4. Set up application directory and repository
APP_DIR="/var/www/macprotec-site"
mkdir -p "$APP_DIR"

if [ -d "$APP_DIR/.git" ]; then
    echo "🔄 Pulling latest code from GitHub..."
    cd "$APP_DIR"
    git reset --hard HEAD
    git pull origin main || git pull
else
    echo "📂 Cloning repository into $APP_DIR..."
    cd "$APP_DIR"
    git clone https://github.com/iamrupom07/uidesign.git .
fi

# 5. Write Production Environment Configuration
echo "⚙️ Configuring production .env files for $DOMAIN..."
cat <<EOT > "$APP_DIR/.env"
DATABASE_URL="$NEON_DATABASE_URL"
JWT_SECRET="macprotec_super_secret_jwt_key_2026"
JWT_ACCESS_SECRET="macprotec_jwt_access_secret_key_32_chars"
JWT_REFRESH_SECRET="macprotec_jwt_refresh_secret_key_32_chars"
BETTER_AUTH_SECRET="$BETTER_AUTH_SECRET"
BETTER_AUTH_URL="https://$DOMAIN"
CLIENT_URL="https://$DOMAIN"
NEXT_PUBLIC_API_URL="https://$DOMAIN"
INTERNAL_API_URL="http://127.0.0.1:5000"
NODE_ENV="production"
PORT=5000
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="Admin123!"
EOT

# Sync .env to all workspace packages
cp "$APP_DIR/.env" "$APP_DIR/apps/api/.env"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env.production"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env.local"
cp "$APP_DIR/.env" "$APP_DIR/packages/database/.env"

# Export environment variables for current build session
export DATABASE_URL="$NEON_DATABASE_URL"
export NEXT_PUBLIC_API_URL="https://$DOMAIN"
export INTERNAL_API_URL="http://127.0.0.1:5000"
export BETTER_AUTH_URL="https://$DOMAIN"
export CLIENT_URL="https://$DOMAIN"
export NODE_ENV="production"

# 6. Install project dependencies & build
echo "🔨 Installing workspace dependencies with pnpm..."
cd "$APP_DIR"
pnpm install

echo "🗄️ Generating Prisma Client for Linux platform..."
DATABASE_URL="$NEON_DATABASE_URL" pnpm db:generate

echo "🗄️ Syncing Prisma Database Schema to Neon Cloud PostgreSQL..."
DATABASE_URL="$NEON_DATABASE_URL" pnpm db:push

echo "🌱 Seeding default database entities & admin user..."
DATABASE_URL="$NEON_DATABASE_URL" pnpm db:seed || true

echo "🏗️ Building Next.js Web App & Express API (turbo build)..."
NEXT_PUBLIC_API_URL="https://$DOMAIN" INTERNAL_API_URL="http://127.0.0.1:5000" BETTER_AUTH_URL="https://$DOMAIN" CLIENT_URL="https://$DOMAIN" NODE_ENV="production" pnpm build

# 7. Start/Restart PM2 Processes
echo "⚡ Starting applications with PM2..."
cd "$APP_DIR"
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js || npx pm2 start ecosystem.config.js
pm2 save

# Ensure PM2 starts automatically on server reboot
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 8. Configure Nginx Reverse Proxy with API pass-through and caching
echo "🌐 Configuring Nginx Reverse Proxy for $DOMAIN..."
sudo rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/macprotec-le-ssl.conf 2>/dev/null || true

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
cat <<NGINX | sudo tee /etc/nginx/sites-available/macprotec > /dev/null
# Upstreams
upstream macprotec_web {
    server 127.0.0.1:3000;
    keepalive 64;
}

upstream macprotec_api {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN $SERVER_IP;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN $WWW_DOMAIN $SERVER_IP;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    client_max_body_size 50M;

    gzip on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # 1. API Pass-through to Express API (Port 5000)
    location /api/v1/ {
        proxy_pass http://macprotec_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 90;
    }

    # 2. Next.js Static Cache Optimization
    location /_next/static/ {
        proxy_pass http://macprotec_web;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        expires 365d;
        access_log off;
    }

    # 3. Next.js Frontend Application (Port 3000)
    location / {
        proxy_pass http://macprotec_web;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
else
cat <<NGINX | sudo tee /etc/nginx/sites-available/macprotec > /dev/null
# Upstreams
upstream macprotec_web {
    server 127.0.0.1:3000;
    keepalive 64;
}

upstream macprotec_api {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN $SERVER_IP;

    client_max_body_size 50M;

    gzip on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # 1. API Pass-through to Express API (Port 5000)
    location /api/v1/ {
        proxy_pass http://macprotec_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 90;
    }

    # 2. Next.js Static Cache Optimization
    location /_next/static/ {
        proxy_pass http://macprotec_web;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        expires 365d;
        access_log off;
    }

    # 3. Next.js Frontend Application (Port 3000)
    location / {
        proxy_pass http://macprotec_web;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
fi

# Enable site symlink
sudo ln -sf /etc/nginx/sites-available/macprotec /etc/nginx/sites-enabled/macprotec

echo "🔄 Testing and Reloading Nginx configuration..."
sudo nginx -t && sudo systemctl reload nginx

# 9. Automatic SSL Certificate setup via Certbot if missing
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "🔒 Requesting SSL Certificate from Let's Encrypt for $DOMAIN & $WWW_DOMAIN..."
  sudo certbot --nginx --non-interactive --agree-tos -m admin@macproteceng.com -d $DOMAIN -d $WWW_DOMAIN || true
fi

echo ""
echo "🎉 ======================================================= 🎉"
echo "   Hostinger VPS Deployment Complete!"
echo "   Live Domain: https://$DOMAIN"
echo "   IP Access: http://$SERVER_IP"
echo "   Neon Cloud DB: Connected & Synced"
echo "   PM2 Status: Run 'pm2 status' or 'pm2 logs' to monitor"
echo "=========================================================== 🎉"
