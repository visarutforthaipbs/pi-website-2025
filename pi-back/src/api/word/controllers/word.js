"use strict";

/**
 * word controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::word.word", ({ strapi }) => ({
  async find(ctx) {
    // Log the request
    console.log("Handling GET /api/words request", {
      query: ctx.query,
      headers: ctx.request.headers,
    });

    try {
      // Use the default find function
      const { data, meta } = await super.find(ctx);
      console.log("Successfully retrieved words:", { count: data.length });
      return { data, meta };
    } catch (error) {
      console.error("Error in word.find controller:", error.message);
      throw error;
    }
  },

  async create(ctx) {
    // Log the request
    console.log("Handling POST /api/words request", {
      body: ctx.request.body,
      headers: ctx.request.headers,
    });

    // Extract text from the nested data object that Strapi uses
    const { data } = ctx.request.body;
    const text = data?.text;

    // Validate required fields
    if (!text) {
      return ctx.badRequest("Text is required");
    }

    try {
      // Check if this word already exists
      const existingWord = await strapi.db.query("api::word.word").findOne({
        where: { text: text },
      });

      if (existingWord) {
        // Increment the value (weight) of existing word by 5 to match frontend behavior
        const updatedWord = await strapi.entityService.update(
          "api::word.word",
          existingWord.id,
          {
            data: {
              value: existingWord.value + 5, // Updated to match frontend increment
            },
          }
        );
        console.log("Updated existing word:", updatedWord);
        return this.transformResponse(updatedWord);
      } else {
        // Create new word with initial value
        const newValue = data?.value || 10; // Default value for new words
        const newWord = await strapi.entityService.create("api::word.word", {
          data: {
            text: text,
            value: newValue,
          },
        });
        console.log("Created new word:", newWord);
        return this.transformResponse(newWord);
      }
    } catch (err) {
      console.error("Error processing word in controller:", err);
      return ctx.badRequest("Failed to process the word", {
        error: err.message,
      });
    }
  },
}));
