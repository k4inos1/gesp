#!/bin/bash
set -e  # Stop script on error

echo "=== Starting Angular application build ==="

# Show Node.js and npm information
echo "1. Versions:"
echo "   Node: $(node -v)"
echo "   npm: $(npm -v)"

# Install dependencies
echo "2. Installing dependencies..."
npm install --no-fund --no-audit

# Build the application
echo "3. Building application for production..."
npm run build:prod

echo ""
echo "✅ Build completed successfully"
