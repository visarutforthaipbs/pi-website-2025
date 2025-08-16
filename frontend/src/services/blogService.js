const API_BASE_URL =
  "https://locals.thaipbs.or.th/strapi/api/explore-writers/oafly7uyvr5v4gs2jv93tjb4";

export const blogService = {
  /**
   * Fetch blog articles with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} pageSize - Number of items per page (default: 50)
   * @returns {Promise<Object>} Blog data with articles and pagination info
   */
  async getBlogs(page = 1, pageSize = 12) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contents?page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("ไม่พบข้อมูลบทความ");
        } else if (response.status === 500) {
          throw new Error("เซิร์ฟเวอร์มีปัญหา กรุณาลองใหม่อีกครั้ง");
        } else {
          throw new Error(`เกิดข้อผิดพลาด (${response.status})`);
        }
      }

      const data = await response.json();

      // Validate data structure
      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error("ข้อมูลที่ได้รับไม่ถูกต้อง");
      }

      // Transform the data to make it easier to work with
      const transformedData = {
        articles: data.data.map((article) => {
          // Debug logging
          console.log("Raw article coverImage:", article.coverImage);

          return {
            id: article.id,
            documentId: article.documentId,
            title: article.title || "ไม่มีหัวข้อ",
            slug: article.slug,
            createdAt: article.createdAt,
            coverImage: {
              // For card display, prefer smaller images for better performance
              thumbnail: article.coverImage?.formats?.thumbnail?.url || null,
              small: article.coverImage?.formats?.small?.url || null,
              medium: article.coverImage?.formats?.medium?.url || null,
              // Prioritize thumbnail for faster loading in grid view
              url:
                article.coverImage?.formats?.thumbnail?.url ||
                article.coverImage?.formats?.small?.url ||
                article.coverImage?.formats?.medium?.url ||
                null,
              alt: article.title || "รูปภาพบทความ",
            },
          };
        }),
        writer: data.writer || null,
        pagination: data.meta?.pagination || {
          page: 1,
          pageSize: pageSize,
          pageCount: 1,
          total: data.data.length,
        },
      };

      return transformedData;
    } catch (error) {
      console.error("Error fetching blogs:", error);

      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต"
        );
      }

      throw error;
    }
  },

  /**
   * Format date to Thai format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date in Thai
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return date.toLocaleDateString("th-TH", options);
  },

  /**
   * Get article URL for navigation
   * @param {string} slug - Article slug
   * @returns {string} Full article URL
   */
  getArticleUrl(slug) {
    return `https://locals.thaipbs.or.th/${slug}`;
  },
};
