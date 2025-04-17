/**
 * wordcloud router
 */

import { factories } from "@strapi/strapi";

export default {
  routes: [
    {
      method: "GET",
      path: "/wordclouds",
      handler: "wordcloud.find",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/wordclouds/:id",
      handler: "wordcloud.findOne",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/wordclouds",
      handler: "wordcloud.create",
      config: {
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/wordclouds/:id",
      handler: "wordcloud.update",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/wordclouds/:id",
      handler: "wordcloud.delete",
      config: {
        auth: false,
      },
    },
  ],
};
