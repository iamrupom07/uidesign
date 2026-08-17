#!/bin/bash
set -e

echo "=========================================="
echo "🚀 Starting MACPROTEC Production Deployment"
echo "=========================================="

APP_DIR="/var/www/macprotec-site"
cd "$APP_DIR" || cd "$(dirname "$0")"

# 1. Pull latest changes
echo "📥 Pulling latest git repository updates..."
git reset --hard HEAD
git pull origin main || git pull

# 2. Sync .env to all workspace apps
if [ -f ".env" ]; then
    cp .env apps/api/.env
    cp .env apps/web/.env
    cp .env apps/web/.env.production
    cp .env apps/web/.env.local
    cp .env packages/database/.env
fi

# 3. Install dependencies with pnpm
echo "📦 Installing workspace dependencies with pnpm..."
pnpm install

# 4. Generate Prisma client & sync database
echo "🗄️ Generating Prisma Client & applying schema changes..."
pnpm db:generate
pnpm db:push

# 5. Build Monorepo (Turbo build for API and Next.js Web)
echo "🏗️ Building Monorepo applications..."
NODE_ENV="production" pnpm build

# 6. Reload processes via PM2
echo "🔄 Reloading PM2 processes..."
pm2 startOrReload ecosystem.config.js --update-env || pm2 restart all

echo "💾 Saving PM2 process state..."
pm2 save

echo "=========================================="
echo "✅ MACPROTEC Deployment Completed Successfully!"
echo "=========================================="
