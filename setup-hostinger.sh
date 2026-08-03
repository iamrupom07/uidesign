#!/bin/bash

# ==============================================================================
# MacProtec Monorepo - Hostinger VPS Deployment & Setup Script
# ==============================================================================

set -e

echo "🚀 Starting Hostinger VPS Setup for MacProtec..."

# 1. Update system and install essential tools
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx build-essential

# 2. Install Node.js v20 LTS (if not installed)
if ! command -v node &> /dev/null; then
    echo "🟢 Installing Node.js v20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "🟢 Node.js $(node -v) is already installed."
fi

# 3. Install pnpm and pm2 globally
echo "📦 Installing pnpm and PM2..."
sudo npm install -g pnpm pm2

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
fi

# 5. Set up directory and repository
APP_DIR="/var/www/macprotec-site"
mkdir -p "$APP_DIR"

if [ -d "$APP_DIR/.git" ]; then
    echo "🔄 Fetching latest code..."
    cd "$APP_DIR"
    git pull origin main || git pull
else
    echo "📂 Setup application directory at $APP_DIR"
    echo "Please clone or upload your code to $APP_DIR if not already present."
    cd "$APP_DIR"
fi

# 6. Check .env file
if [ ! -f "$APP_DIR/.env" ]; then
    echo "⚙️ Creating default .env file..."
    cat <<EOT > "$APP_DIR/.env"
DATABASE_URL="postgresql://macuser:MacProtecSecure2026!@localhost:5432/macprotec_db"
JWT_SECRET="macprotec_super_secret_jwt_key_2026"
BETTER_AUTH_SECRET="macprotec_better_auth_secret_key_2026"
BETTER_AUTH_URL="http://localhost:5000"
NODE_ENV="production"
PORT=5000
NEXT_PUBLIC_API_URL="/api"
EOT
    echo "✅ Created .env file. Customize it later if needed."
fi

# 7. Install dependencies & Build apps
echo "🔨 Installing project dependencies with pnpm..."
pnpm install

echo "🗄️ Syncing Prisma Database Schema..."
npx prisma db push --schema=packages/database/prisma/schema.prisma

echo "🏗️ Building Monorepo Apps (Next.js Web + Express API)..."
pnpm build

# 8. Start PM2 Process Manager
echo "⚡ Starting applications with PM2..."
pm2 start ecosystem.config.js || pm2 restart ecosystem.config.js
pm2 save

# Ensure PM2 starts on server reboot
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 9. Configure Nginx Reverse Proxy
echo "🌐 Configuring Nginx Reverse Proxy..."
cat <<'NGINX' | sudo tee /etc/nginx/sites-available/macprotec > /dev/null
server {
    listen 80;
    server_name _;

    client_max_body_size 50M;

    # Frontend (Next.js App on Port 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API (Express Server on Port 5000)
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# Enable site & remove default site if present
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/macprotec /etc/nginx/sites-enabled/macprotec

echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "🎉 ======================================================= 🎉"
echo "   Deployment Complete! Your site is live on Hostinger VPS!"
echo "   Access your app at: http://31.220.107.166"
echo "=========================================================== 🎉"
