#!/usr/bin/env bash

# Exit on error
set -e

# Install dependencies
npm install

# Install typescript specifically
npm install typescript

# Create directory structure
mkdir -p node_modules/@strapi/admin/node_modules

# Check if typescript was installed correctly
if [ -d "node_modules/typescript" ]; then
  echo "Copying typescript to Strapi admin modules..."
  cp -r node_modules/typescript node_modules/@strapi/admin/node_modules/
else
  echo "ERROR: TypeScript module not found in node_modules. Installing again..."
  npm install typescript --no-save
  
  if [ -d "node_modules/typescript" ]; then
    cp -r node_modules/typescript node_modules/@strapi/admin/node_modules/
  else
    echo "ERROR: TypeScript installation failed again. Continuing without copying..."
  fi
fi

# Handle sharp installation
npm uninstall sharp
npm install --platform=linux --arch=x64 sharp

# Build the application
NODE_ENV=production npm run build
