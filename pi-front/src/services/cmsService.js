const CMS_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";
const API_TOKEN = import.meta.env.VITE_CMS_API_TOKEN;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json",
};

export const cmsService = {
  // Get paginated list of blog posts
  getBlogPosts: async (page = 1, pageSize = 9) => {
    try {
      const response = await fetch(
        `${CMS_URL}/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("Invalid response format from API");
      }

      return {
        data: data.data.map((post) => {
          const attrs = post.attributes || post;
          return {
            id: post.id,
            attributes: {
              title: attrs.title || "Untitled",
              slug: attrs.slug || `post-${post.id}`,
              publishedAt: attrs.publishedAt || new Date().toISOString(),
              featuredImage: attrs.featuredImage || null,
              content: attrs.content || "",
              excerpt:
                attrs.excerpt ||
                (attrs.content
                  ? attrs.content.substring(0, 150) + "..."
                  : "No content available"),
            },
          };
        }),
        meta: data.meta || {
          pagination: {
            page: 1,
            pageSize: 9,
            pageCount: 1,
            total: data.data.length,
          },
        },
      };
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      throw err;
    }
  },

  // Get single blog post by slug
  getBlogPost: async (slug) => {
    try {
      const encodedSlug = encodeURIComponent(slug.trim());
      const url = `${CMS_URL}/api/posts?filters[slug][$eq]=${encodedSlug}&populate=*`;
      console.log("Fetching blog post from", url);

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched blog post data:", data);

      if (!data.data || data.data.length === 0) {
        console.error(
          `No blog post found for slug: ${slug} (encoded: ${encodedSlug}). Response data:`,
          data
        );
        throw new Error("Post not found");
      }

      const post = data.data[0];
      const attrs = post.attributes || post;
      return {
        id: post.id,
        attributes: {
          title: attrs.title || "Untitled",
          slug: attrs.slug || `post-${post.id}`,
          publishedAt: attrs.publishedAt || new Date().toISOString(),
          featuredImage: attrs.featuredImage || null,
          content: attrs.content || "No content available",
        },
      };
    } catch (err) {
      console.error("Error fetching blog post:", err);
      throw err;
    }
  },

  // Get image URL from image object
  getImageUrl: (imageObject) => {
    if (!imageObject) return null;
    let url = imageObject.url;
    // If the direct url is not available, check for nested structure (Strapi v4)
    if (
      !url &&
      imageObject.data &&
      imageObject.data.attributes &&
      imageObject.data.attributes.url
    ) {
      url = imageObject.data.attributes.url;
    }
    if (!url) return null;
    return url.startsWith("http") ? url : `${CMS_URL}${url}`;
  },

  // Helper method to format date
  formatDate: (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return "Date not available";
    }
  },
};
