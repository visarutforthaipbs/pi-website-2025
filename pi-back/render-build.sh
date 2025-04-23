#!/usr/bin/env bash

# Exit on error
set -e

# Print each command before executing
set -x

echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install dependencies
echo "Installing dependencies..."
npm install

# Install typescript globally and locally to ensure it's available
echo "Installing TypeScript..."
npm install -g typescript
npm install typescript --save-dev

# List installed packages to verify TypeScript installation
echo "Installed packages:"
npm list typescript
npm list -g typescript

# Create directory structure
echo "Creating directory structure..."
mkdir -p node_modules/@strapi/admin/node_modules

# Check if typescript was installed correctly
if [ -d "node_modules/typescript" ]; then
  echo "Copying TypeScript to Strapi admin modules..."
  cp -r node_modules/typescript node_modules/@strapi/admin/node_modules/
  echo "TypeScript copied successfully. Contents:"
  ls -la node_modules/@strapi/admin/node_modules/typescript
else
  echo "ERROR: TypeScript module not found in node_modules. Installing again..."
  npm install typescript --no-save
  
  # Try alternative installation methods
  echo "Trying alternative installation..."
  mkdir -p node_modules/@strapi/admin/node_modules/typescript
  npm install --prefix node_modules/@strapi/admin/node_modules typescript
  
  if [ -d "node_modules/typescript" ]; then
    cp -r node_modules/typescript node_modules/@strapi/admin/node_modules/
    echo "TypeScript copied after reinstallation."
  else
    echo "WARNING: TypeScript installation failed again."
    echo "Creating empty typescript directory as a workaround..."
    mkdir -p node_modules/@strapi/admin/node_modules/typescript
    echo "Created empty typescript directory."
  fi
fi

# Handle sharp installation
echo "Reinstalling Sharp for Linux..."
npm uninstall sharp
npm install --platform=linux --arch=x64 sharp

# Build the application
echo "Building the application..."
NODE_ENV=production npm run build

echo "Build script completed."
