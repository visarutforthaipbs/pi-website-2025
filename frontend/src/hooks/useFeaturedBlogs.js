import { useState, useEffect } from "react";
import { blogService } from "../services/blogService";

/**
 * Custom hook to fetch featured blog articles
 * @param {number} limit - Number of articles to fetch
 * @returns {Object} { blogs, loading, error }
 */
export const useFeaturedBlogs = (limit = 3) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await blogService.getBlogs(1, limit);

        // Transform articles to include proper thumbnail mapping
        const transformedArticles =
          response.articles?.map((article) => ({
            id: article.id,
            title: article.title,
            slug: article.slug,
            description: article.excerpt || article.title,
            thumbnail: article.coverImage?.url,
            publishedAt: blogService.formatDate(article.createdAt),
          })) || [];

        setBlogs(transformedArticles);
      } catch (err) {
        console.error("Error fetching featured blogs:", err);
        setError(err);

        // Use mock data if API fails
        setBlogs([
          {
            id: 1,
            title: "นวัตกรรมเทคโนโลยีเพื่อสังคม",
            slug: "innovation-technology-society",
            description:
              "ค้นพบเทคโนโลยีใหม่ๆ ที่กำลังเปลี่ยนแปลงวิถีชีวิตของคนไทย",
            thumbnail: null,
            publishedAt: "2 วันที่แล้ว",
          },
          {
            id: 2,
            title: "การศึกษายุคดิจิทัล",
            slug: "digital-education-era",
            description: "แนวโน้มการเรียนรู้ที่จะเปลี่ยนแปลงการศึกษาไทยในอนาคต",
            thumbnail: null,
            publishedAt: "5 วันที่แล้ว",
          },
          {
            id: 3,
            title: "เมืองอัจฉริยะและการพัฒนาที่ยั่งยืน",
            slug: "smart-city-sustainable-development",
            description:
              "วิสัยทัศน์การพัฒนาเมืองไทยให้เป็นเมืองอัจฉริยะที่เป็นมิตรกับสิ่งแวดล้อม",
            thumbnail: null,
            publishedAt: "1 สัปดาห์ที่แล้ว",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return { blogs, loading, error };
};
