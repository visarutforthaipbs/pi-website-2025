const API_BASE_URL = "https://locals.thaipbs.or.th/strapi/api";
const TAG_ID = 30; // Tag ID for content filtering

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
        `${API_BASE_URL}/contents?page=${page}&pageSize=${pageSize}&tagId=${TAG_ID}`,
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
          return {
            id: article.id,
            documentId: article.documentId,
            title: article.title || "ไม่มีหัวข้อ",
            slug: article.slug,
            createdAt: article.createdAt,
            publishAt: article.publishAt, // New field from API
            writer: article.writer || null, // Writer info
            creatorName: article.creatorName || null, // Creator name
            coverImage: {
              // For card display, prefer smaller images for better performance
              thumbnail: article.coverImage?.formats?.thumbnail?.url || null,
              small: article.coverImage?.formats?.small?.url || null,
              medium: article.coverImage?.formats?.medium?.url || null,
              large: article.coverImage?.formats?.large?.url || null,
              // Prioritize thumbnail for faster loading in grid view
              url:
                article.coverImage?.formats?.thumbnail?.url ||
                article.coverImage?.formats?.small?.url ||
                article.coverImage?.formats?.medium?.url ||
                article.coverImage?.formats?.large?.url ||
                null,
              alt: article.title || "รูปภาพบทความ",
            },
          };
        }),
        tag: data.tag || null, // Tag information
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
   * @param {string} dateString - Date string (could be ISO or pre-formatted Thai)
   * @returns {string} Formatted date in Thai
   */
  formatDate(dateString) {
    // If the date string is already in Thai format, return it as is
    if (
      dateString &&
      typeof dateString === "string" &&
      (dateString.includes("สิงหาคม") ||
        dateString.includes("กรกฎาคม") ||
        dateString.includes("มิถุนายน") ||
        dateString.includes("พฤษภาคม") ||
        dateString.includes("เมษายน") ||
        dateString.includes("มีนาคม") ||
        dateString.includes("กุมภาพันธ์") ||
        dateString.includes("มกราคม") ||
        dateString.includes("ธันวาคม") ||
        dateString.includes("พฤศจิกายน") ||
        dateString.includes("ตุลาคม") ||
        dateString.includes("กันยายน"))
    ) {
      return dateString;
    }

    // Otherwise, try to parse as ISO date and format to Thai
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString || "ไม่ระบุวันที่";
      }
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Bangkok",
      };
      return date.toLocaleDateString("th-TH", options);
    } catch (error) {
      console.warn("Error formatting date:", error);
      return dateString || "ไม่ระบุวันที่";
    }
  },

  /**
   * Get article URL for navigation
   * @param {string} slug - Article slug
   * @returns {string} Full article URL
   */
  getArticleUrl(slug) {
    return `https://www.thaipbs.or.th/locals/contents/${slug}`;
  },
};
