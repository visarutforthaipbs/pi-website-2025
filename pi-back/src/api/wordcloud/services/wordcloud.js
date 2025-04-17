"use strict";

/**
 * wordcloud service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::wordcloud.wordcloud");
