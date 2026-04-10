#!/bin/bash
# Production startup script for Render deployment
# This script ensures database schema is synced before starting the server

set -e  # Exit on error

echo "🚀 Starting PharmaOS backend deployment..."

# Step 1: Sync database schema with Prisma schema
echo "📊 Syncing database schema..."
npx prisma db push --accept-data-loss

# Step 2: Start the server
echo "🔧 Starting server..."
node server.js
