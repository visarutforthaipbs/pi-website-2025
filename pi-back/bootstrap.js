"use strict";

/**
 * Bootstrap script for Strapi application
 * This script handles database initialization and fixes for common deployment issues
 */

const fs = require("fs");
const path = require("path");

/**
 * Removes SQLite database files if they exist (for production environments)
 */
async function removeSQLiteFiles({ strapi }) {
  const env = process.env.NODE_ENV || "development";

  if (env === "production") {
    const dbFile = path.resolve(".tmp/data.db");

    try {
      if (fs.existsSync(dbFile)) {
        console.log(`Found SQLite database file at ${dbFile}. Removing...`);
        fs.unlinkSync(dbFile);
        console.log("SQLite database file removed successfully.");
      } else {
        console.log("No SQLite database file found. Continuing...");
      }
    } catch (error) {
      console.error(
        "Error while trying to remove SQLite database file:",
        error
      );
    }
  }
}

/**
 * Fixes duplicate slugs in posts table
 */
async function fixDuplicateSlugs({ strapi }) {
  try {
    // Check if we have access to the database service
    if (!strapi.db) {
      console.log("Database service not available yet. Skipping slug fix.");
      return;
    }

    console.log("Checking for duplicate slugs in posts table...");

    // Get the posts with duplicate slugs
    const knex = strapi.db.connection;

    // Only run if posts table exists
    const hasPostsTable = await knex.schema.hasTable("posts");
    if (!hasPostsTable) {
      console.log("Posts table does not exist yet. Skipping slug fix.");
      return;
    }

    // Find duplicate slugs
    const duplicates = await knex("posts")
      .select("slug")
      .groupBy("slug")
      .havingRaw("COUNT(*) > 1");

    if (duplicates.length === 0) {
      console.log("No duplicate slugs found in posts table.");
      return;
    }

    console.log(`Found ${duplicates.length} duplicate slugs. Fixing...`);

    // Fix each duplicate by appending a unique identifier
    for (const { slug } of duplicates) {
      const dupes = await knex("posts").where("slug", slug).select("id");

      // Skip the first one (keep it as is)
      for (let i = 1; i < dupes.length; i++) {
        const newSlug = `${slug}-${i}`;
        await knex("posts").where("id", dupes[i].id).update("slug", newSlug);

        console.log(
          `Updated post ${dupes[i].id} slug from "${slug}" to "${newSlug}"`
        );
      }
    }

    console.log("All duplicate slugs have been fixed.");
  } catch (error) {
    console.error("Error while fixing duplicate slugs:", error);
  }
}

/**
 * Bootstrap function
 */
module.exports = async ({ strapi }) => {
  try {
    // Remove SQLite files if in production
    await removeSQLiteFiles({ strapi });

    // Fix duplicate slugs if any
    await fixDuplicateSlugs({ strapi });

    console.log("Bootstrap script completed successfully.");
  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
};
