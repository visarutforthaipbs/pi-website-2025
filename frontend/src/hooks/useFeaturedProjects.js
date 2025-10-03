import { useState, useEffect } from "react";
import CONFIG from "../config";

/**
 * Custom hook to fetch featured projects with votes and comments
 * @returns {Object} { projects, loading, error, votes, comments }
 */
export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch projects, votes, and comments in parallel
        const [projectsRes, votesRes, commentsRes] = await Promise.all([
          fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.PROJECTS}`),
          fetch(`${CONFIG.API_BASE_URL}/api/projects/votes/all`),
          fetch(`${CONFIG.API_BASE_URL}/api/projects/comments/stats`),
        ]);

        if (!projectsRes.ok) {
          throw new Error("Failed to fetch projects");
        }

        const projectsData = await projectsRes.json();

        // Process votes
        let votesData = {};
        if (votesRes.ok) {
          const votesResponse = await votesRes.json();
          votesData = votesResponse.votes || {};
        }

        // Process comments
        let commentsData = {};
        if (commentsRes.ok) {
          const commentsResponse = await commentsRes.json();
          commentsData = commentsResponse.stats || {};
        }

        setVotes(votesData);
        setComments(commentsData);

        // Get top 3 projects by votes
        const sortedProjects = (projectsData.data || [])
          .map((project) => ({
            ...project,
            voteCount: votesData[project.id] || 0,
          }))
          .sort((a, b) => b.voteCount - a.voteCount)
          .slice(0, 3);

        setProjects(sortedProjects);
      } catch (err) {
        console.error("Error fetching featured projects:", err);
        setError(err);

        // Set mock data as fallback
        setProjects([
          {
            id: 1,
            title: "โครงการพัฒนาเทคโนโลยีเพื่อสังคม",
            description:
              "พัฒนาแพลตฟอร์มดิจิทัลเพื่อเชื่อมโยงชุมชนและองค์กรสาธารณะ",
            category: "Technology",
            status: "Active",
            thumbnail: null,
            createdTime: new Date().toISOString(),
          },
          {
            id: 2,
            title: "โครงการการศึกษาเพื่อทุกคน",
            description:
              "สร้างโอกาสทางการศึกษาที่เท่าเทียมสำหรับเด็กและเยาวชนในชุมชนห่างไกล",
            category: "Education",
            status: "Active",
            thumbnail: null,
            createdTime: new Date().toISOString(),
          },
          {
            id: 3,
            title: "โครงการสิ่งแวดล้อมยั่งยืน",
            description: "ส่งเสริมการจัดการขยะและพลังงานทดแทนในชุมชนท้องถิ่น",
            category: "Environment",
            status: "Completed",
            thumbnail: null,
            createdTime: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { projects, loading, error, votes, comments };
};
