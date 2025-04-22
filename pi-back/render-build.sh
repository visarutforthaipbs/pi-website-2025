#!/usr/bin/env bash

# Exit on error
set -e

# Install dependencies
npm install

# Rebuild sharp specifically for linux
npm rebuild --platform=linux --arch=x64 sharp

# Build the Strapi application
NODE_ENV=production npm run build 