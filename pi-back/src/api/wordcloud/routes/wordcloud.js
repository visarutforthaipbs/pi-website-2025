"use strict";

/**
 * wordcloud router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::wordcloud.wordcloud", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
    create: {
      auth: false,
    },
    update: {
      auth: false,
    },
    delete: {
      auth: false,
    },
  },
});
