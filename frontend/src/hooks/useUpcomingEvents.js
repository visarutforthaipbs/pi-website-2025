import { useState, useEffect } from "react";
import CONFIG from "../config.js";

/**
 * Custom hook to fetch upcoming events from the API
 * @returns {Object} { events, loading, error }
 */
export const useUpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch events from API
        const response = await fetch(
          `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.EVENTS}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          // Filter and sort upcoming events
          const upcomingEvents = data.data
            .filter(
              (event) =>
                event.status === "upcoming" ||
                new Date(event.date) >= new Date()
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          setEvents(upcomingEvents);
        } else {
          console.error("Invalid API response format:", data);
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching upcoming events:", err);
        setError(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { events, loading, error };
};
