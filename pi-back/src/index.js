"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Check if word content type exists
    const contentTypes = strapi.contentTypes;
    const wordExists = contentTypes["api::word.word"];

    if (!wordExists) {
      console.log(
        "Word content type does not exist yet. You need to create it in the admin panel."
      );
      console.log(
        'Go to http://localhost:1337/admin and create a collection type named "Word" with:'
      );
      console.log("- text (string, required, unique)");
      console.log("- value (integer, default: 1, min: 1)");
    } else {
      console.log("Word content type is properly set up!");

      // Set permissions for public access
      try {
        // Find the public role
        const publicRole = await strapi
          .query("plugin::users-permissions.role")
          .findOne({ where: { type: "public" } });

        if (publicRole) {
          // Update permissions
          const result = await strapi
            .query("plugin::users-permissions.permission")
            .updateMany({
              where: {
                role: publicRole.id,
                subject: "api::word.word",
              },
              data: { enabled: true },
            });

          console.log("Updated permissions for Word API");
        }
      } catch (error) {
        console.error("Error setting permissions:", error);
      }
    }
  },
};
