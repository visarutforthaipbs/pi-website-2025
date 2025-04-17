"use strict";

/**
 * This script creates a new Strapi admin user
 * Run with: node scripts/create-admin.js
 */

const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Create directory if it doesn't exist
const scriptsDir = path.resolve(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

async function createAdmin() {
  // Require Strapi
  const strapi = require("@strapi/strapi");

  try {
    // Initialize Strapi in development mode
    await strapi().load();

    // Admin credentials (change these)
    const email = "admin@example.com";
    const password = "Admin123!";
    const firstname = "Admin";
    const lastname = "User";

    // Find existing admin with this email
    const existingUser = await strapi().admin.services.user.findOne({
      email,
    });

    if (existingUser) {
      console.log("Admin user already exists, updating password...");
      // Update password
      await strapi().admin.services.user.updateById(existingUser.id, {
        password,
      });
      console.log(`Password updated for admin user: ${email}`);
    } else {
      console.log("Creating new admin user...");
      // Create a new admin
      await strapi().admin.services.user.create({
        email,
        firstname,
        lastname,
        password,
        isActive: true,
        roles: [1], // SuperAdmin role
      });
      console.log(`Admin user created: ${email}`);
    }

    // Exit the process
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

createAdmin();
