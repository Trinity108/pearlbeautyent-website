#!/bin/bash
# Sync public/ folder to dist/
echo "🔄 Syncing public/ to dist/static..."
mkdir -p dist/static
cp -r public/static/* dist/static/
echo "✅ Sync complete!"
