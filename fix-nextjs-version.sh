#!/bin/bash

# Complete Fix Script for Next.js Version Issue
# Run this from your project root

echo "🔧 Fixing Next.js version to 14.2.5..."

# Step 1: Delete everything
echo "📦 Removing node_modules and lock files..."
rm -rf node_modules package-lock.json

# Step 2: Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Step 3: Install exact versions
echo "⬇️  Installing Next.js 14.2.5 and compatible packages..."
npm install next@14.2.5 --save-exact
npm install react@18.3.1 react-dom@18.3.1 --save-exact
npm install next-sanity@9.4.7 --save-exact --legacy-peer-deps
npm install @sanity/image-url@1.0.2 --save-exact --legacy-peer-deps
npm install @portabletext/react@3.1.0 --save-exact
npm install lucide-react@0.427.0 --save-exact

# Step 4: Install dev dependencies
echo "🛠️  Installing dev dependencies..."
npm install --save-dev typescript@5.5.4
npm install --save-dev @types/node@22.1.0 @types/react@18.3.3 @types/react-dom@18.3.0
npm install --save-dev tailwindcss@3.4.1 postcss@8.4.41 autoprefixer@10.4.20
npm install --save-dev eslint@8.57.0 eslint-config-next@14.2.5
npm install --save-dev @sanity/cli@3.56.0

# Step 5: Verify version
echo "✅ Verifying Next.js version..."
npm list next

echo ""
echo "🎉 Done! Next.js should now be version 14.2.5"
echo "Run: npm run dev"