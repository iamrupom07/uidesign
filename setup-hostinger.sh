#!/bin/bash

# ==============================================================================
# MacProtec Monorepo - Hostinger VPS Deployment & Setup Script
# Domain: https://macproteceng.com
# Database: Neon PostgreSQL
# ==============================================================================

set -e

DOMAIN="macproteceng.com"
WWW_DOMAIN="www.macproteceng.com"
NEON_DATABASE_URL="postgresql://neondb_owner:npg_zASslWdFO04g@ep-lucky-mud-aygqnybl-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
BETTER_AUTH_SECRET="a8F2kL9pQ3vX7zW1rT4yM0nC6bD5eG2h"

echo "🚀 Starting Hostinger VPS Setup for MacProtec ($DOMAIN)..."

# 1. Refresh package index
echo "📦 Refreshing package indices..."
sudo apt update -y

# Install missing essential tools only
echo "📦 Installing required tools..."
sudo apt install -y curl git nginx build-essential certbot python3-certbot-nginx

# 2. Ensure Node.js & npm are installed
if ! command -v npm &> /dev/null; then
    echo "🟢 Installing npm..."
    sudo apt install -y npm
fi

echo "🟢 Node.js version: $(node -v)"
echo "🟢 npm version: $(npm -v 2>/dev/null || echo 'installed')"

# 3. Install pnpm and pm2 globally
echo "📦 Installing pnpm and PM2..."
sudo npm install -g pnpm pm2 || true

# 4. Set up directory and repository
APP_DIR="/var/www/macprotec-site"
mkdir -p "$APP_DIR"

if [ -d "$APP_DIR/.git" ]; then
    echo "🔄 Fetching latest code..."
    cd "$APP_DIR"
    git pull origin main || git pull
else
    echo "📂 Setting up application directory at $APP_DIR"
    cd "$APP_DIR"
    git clone https://github.com/iamrupom07/uidesign.git .
fi

# 5. Check & Update .env file
echo "⚙️ Writing production .env file for $DOMAIN..."
cat <<EOT > "$APP_DIR/.env"
DATABASE_URL="$NEON_DATABASE_URL"
JWT_SECRET="macprotec_super_secret_jwt_key_2026"
JWT_ACCESS_SECRET="macprotec_jwt_access_secret_key_32_chars"
JWT_REFRESH_SECRET="macprotec_jwt_refresh_secret_key_32_chars"
BETTER_AUTH_SECRET="$BETTER_AUTH_SECRET"
BETTER_AUTH_URL="https://$DOMAIN"
CLIENT_URL="https://$DOMAIN"
NEXT_PUBLIC_API_URL="https://$DOMAIN"
NODE_ENV="production"
PORT=5000
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="Admin123!"
EOT
echo "✅ Updated production .env file."

# Sync .env to apps/api, apps/web, and packages/database
echo "🔑 Syncing .env files to all monorepo apps..."
cp "$APP_DIR/.env" "$APP_DIR/apps/api/.env"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env.production"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env.local"
cp "$APP_DIR/.env" "$APP_DIR/packages/database/.env"

# Load & Export all .env variables for Next.js build step
echo "🔑 Exporting environment variables for Next.js compilation..."
export DATABASE_URL="$NEON_DATABASE_URL"
export NEXT_PUBLIC_API_URL="https://$DOMAIN"
export BETTER_AUTH_URL="https://$DOMAIN"
export CLIENT_URL="https://$DOMAIN"
export NODE_ENV="production"

# 6. Install dependencies & Build apps
echo "🔨 Installing project dependencies with pnpm..."
pnpm install

echo "🗄️ Syncing Prisma Database Schema to Neon Cloud PostgreSQL..."
DATABASE_URL="$NEON_DATABASE_URL" pnpm db:push

echo "🌱 Seeding default admin user into Neon PostgreSQL..."
DATABASE_URL="$NEON_DATABASE_URL" pnpm db:seed || true

echo "🏗️ Building Monorepo Apps (Next.js Web + Express API)..."
NEXT_PUBLIC_API_URL="https://$DOMAIN" BETTER_AUTH_URL="https://$DOMAIN" CLIENT_URL="https://$DOMAIN" NODE_ENV="production" pnpm build

# 7. Start PM2 Process Manager
echo "⚡ Restarting applications with PM2..."
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js || npx pm2 start ecosystem.config.js
pm2 save

# Ensure PM2 starts on server reboot
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 8. Configure Nginx Reverse Proxy (Unified Port 3000)
echo "🌐 Configuring Nginx Reverse Proxy for $DOMAIN..."
sudo rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/macprotec-le-ssl.conf 2>/dev/null || true

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
cat <<NGINX | sudo tee /etc/nginx/sites-available/macprotec > /dev/null
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN 31.220.107.166;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN $WWW_DOMAIN 31.220.107.166;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    client_max_body_size 50M;

    # Unified Proxy to Next.js App (Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
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
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN 31.220.107.166;

    client_max_body_size 50M;

    # Unified Proxy to Next.js App (Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
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

# Enable site
sudo ln -sf /etc/nginx/sites-available/macprotec /etc/nginx/sites-enabled/macprotec

echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

# 9. Attempt SSL setup via Certbot if missing
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "🔒 Setting up SSL Certificate with Certbot for $DOMAIN..."
  sudo certbot --nginx --non-interactive --agree-tos -m admin@macproteceng.com -d $DOMAIN -d $WWW_DOMAIN || true
fi

echo ""
echo "🎉 ======================================================= 🎉"
echo "   Deployment Complete! Connected to Neon PostgreSQL!"
echo "   Domain: https://$DOMAIN"
echo "   IP Access: http://31.220.107.166"
echo "   Admin Login: Email: admin@example.com | Password: Admin123!"
echo "=========================================================== 🎉"
