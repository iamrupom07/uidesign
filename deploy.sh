#!/bin/bash
set -e

echo "=========================================="
echo "🚀 Starting MACPROTEC Production Deployment"
echo "=========================================="

# 1. Pull latest changes
echo "📥 Pulling latest git repository updates..."
git pull origin main

# 2. Install dependencies with pnpm
echo "📦 Installing pnpm workspace dependencies..."
pnpm install --frozen-lockfile

# 3. Generate Prisma client & run database migrations
echo "🗄️ Generating Prisma Client & applying migrations..."
pnpm db:generate
pnpm db:migrate

# 4. Build Monorepo (Turbo build for API and Next.js Web)
echo "🏗️ Building Monorepo applications..."
pnpm build

# 5. Reload processes via PM2
echo "🔄 Reloading PM2 processes..."
pm2 startOrReload ecosystem.config.js --update-env

echo "💾 Saving PM2 process state..."
pm2 save

echo "=========================================="
echo "✅ MACPROTEC Deployment Completed Successfully!"
echo "=========================================="
