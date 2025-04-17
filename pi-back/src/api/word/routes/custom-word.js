"use strict";

/**
 * Custom word router for additional endpoints
 */

module.exports = {
  routes: [
    // GET /api/words
    {
      method: "GET",
      path: "/api/words",
      handler: "word.find",
      config: {
        auth: false,
      },
    },
    // POST /api/words
    {
      method: "POST",
      path: "/api/words",
      handler: "word.create",
      config: {
        auth: false,
      },
    },
    // OPTIONS /api/words (for CORS preflight)
    {
      method: "OPTIONS",
      path: "/api/words",
      handler: (ctx) => {
        ctx.status = 200;
      },
      config: {
        auth: false,
      },
    },
  ],
};
