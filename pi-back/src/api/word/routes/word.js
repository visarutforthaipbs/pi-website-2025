"use strict";

/**
 * word router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::word.word", {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
  },
});
