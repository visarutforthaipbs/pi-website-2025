#!/usr/bin/env bash

# Exit on error
set -e

# Install dependencies
npm install

# Remove and reinstall sharp with specific platform
npm uninstall sharp
npm install --platform=linux --arch=x64 sharp

# Build the Strapi application
NODE_ENV=production npm run build
