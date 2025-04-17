"use strict";

/**
 * This file sets up permissions for public users
 */

module.exports = (plugin) => {
  // Set default permissions for Word content type
  const setDefaultWordPermissions = async () => {
    // Get the public role ID
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    // Exit if public role doesn't exist
    if (!publicRole) {
      return;
    }

    // Get existing permissions
    const permissions = await strapi
      .query("plugin::users-permissions.permission")
      .findMany({ where: { role: publicRole.id } });

    // Find "word" content type to get its ID
    const wordContentType = await strapi
      .query("content-type")
      .findOne({ where: { name: "word" } });

    if (!wordContentType) {
      console.log("Word content type not found");
      return;
    }

    // Actions to enable for public users
    const actionsToEnable = ["find", "findOne", "create", "update"];

    // For each action, make sure the permission exists
    for (const action of actionsToEnable) {
      const permissionExists = permissions.some(
        (permission) =>
          permission.action === action &&
          permission.subject === "api::word.word"
      );

      if (!permissionExists) {
        try {
          // Create the permission
          await strapi.query("plugin::users-permissions.permission").create({
            data: {
              action: action,
              subject: "api::word.word",
              role: publicRole.id,
              enabled: true,
            },
          });

          console.log(`Permission created: ${action} for api::word.word`);
        } catch (error) {
          console.error(`Error creating permission for ${action}:`, error);
        }
      }
    }
  };

  // Run on bootstrap
  strapi.db.lifecycles.subscribe({
    models: ["plugin::users-permissions.role"],
    afterCreate: setDefaultWordPermissions,
    afterUpdate: setDefaultWordPermissions,
  });

  return plugin;
};
