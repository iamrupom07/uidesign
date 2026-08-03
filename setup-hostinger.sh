#!/bin/bash

# ==============================================================================
# MacProtec Monorepo - Hostinger VPS Deployment & Setup Script
# Domain: https://macproteceng.com
# ==============================================================================

set -e

DOMAIN="macproteceng.com"
WWW_DOMAIN="www.macproteceng.com"

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

# 4. Install PostgreSQL locally (if needed)
if ! command -v psql &> /dev/null; then
    echo "🗄️ Installing PostgreSQL database server..."
    sudo apt install -y postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql

    # Setup database and user
    sudo -u postgres psql -c "CREATE DATABASE macprotec_db;" 2>/dev/null || true
    sudo -u postgres psql -c "CREATE USER macuser WITH PASSWORD 'MacProtecSecure2026!';" 2>/dev/null || true
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE macprotec_db TO macuser;" 2>/dev/null || true
    echo "✅ Database 'macprotec_db' created with user 'macuser'."
else
    echo "🗄️ Creating macprotec_db PostgreSQL database..."
    sudo -u postgres psql -c "CREATE DATABASE macprotec_db;" 2>/dev/null || true
    sudo -u postgres psql -c "CREATE USER macuser WITH PASSWORD 'MacProtecSecure2026!';" 2>/dev/null || true
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE macprotec_db TO macuser;" 2>/dev/null || true
fi

# 5. Set up directory and repository
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

# 6. Check & Update .env file
echo "⚙️ Writing production .env file for $DOMAIN..."
cat <<EOT > "$APP_DIR/.env"
DATABASE_URL="postgresql://macuser:MacProtecSecure2026!@localhost:5432/macprotec_db"
JWT_SECRET="macprotec_super_secret_jwt_key_2026"
JWT_ACCESS_SECRET="macprotec_jwt_access_secret_key_32_chars"
JWT_REFRESH_SECRET="macprotec_jwt_refresh_secret_key_32_chars"
BETTER_AUTH_SECRET="macprotec_better_auth_secret_key_min_32_chars_long"
BETTER_AUTH_URL="https://$DOMAIN"
CLIENT_URL="https://$DOMAIN"
NEXT_PUBLIC_API_URL="https://$DOMAIN"
NODE_ENV="production"
PORT=5000
EOT
echo "✅ Updated production .env file."

# Sync .env to apps/api, apps/web, and packages/database
echo "🔑 Syncing .env files to all monorepo apps..."
cp "$APP_DIR/.env" "$APP_DIR/apps/api/.env"
cp "$APP_DIR/.env" "$APP_DIR/apps/web/.env"
cp "$APP_DIR/.env" "$APP_DIR/packages/database/.env"

# Load .env variables into current bash environment
export $(grep -v '^#' "$APP_DIR/.env" | xargs)

# 7. Install dependencies & Build apps
echo "🔨 Installing project dependencies with pnpm..."
pnpm install

echo "🗄️ Syncing Prisma Database Schema using workspace Prisma v6..."
DATABASE_URL="$DATABASE_URL" pnpm db:push

echo "🏗️ Building Monorepo Apps (Next.js Web + Express API)..."
pnpm build

# 8. Start PM2 Process Manager
echo "⚡ Restarting applications with PM2..."
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js || npx pm2 start ecosystem.config.js
pm2 save

# Ensure PM2 starts on server reboot
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 9. Configure Nginx Reverse Proxy
echo "🌐 Configuring Nginx Reverse Proxy for $DOMAIN..."
cat <<NGINX | sudo tee /etc/nginx/sites-available/macprotec > /dev/null
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN 31.220.107.166;

    client_max_body_size 50M;

    # Frontend (Next.js App on Port 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API (Express Server on Port 5000)
    location /api {
        proxy_pass http://localhost:5000;
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

# Enable site
sudo ln -sf /etc/nginx/sites-available/macprotec /etc/nginx/sites-enabled/macprotec

echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

# 10. Attempt SSL setup via Certbot
echo "🔒 Setting up SSL Certificate with Certbot for $DOMAIN..."
sudo certbot --nginx --non-interactive --agree-tos -m admin@macproteceng.com -d $DOMAIN -d $WWW_DOMAIN || {
    echo "⚠️ SSL setup paused. Run 'sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN' manually once DNS A record propagates to 31.220.107.166."
}

echo ""
echo "🎉 ======================================================= 🎉"
echo "   Deployment Complete! Your site is live!"
echo "   Domain: https://$DOMAIN"
echo "   IP Access: http://31.220.107.166"
echo "=========================================================== 🎉"
