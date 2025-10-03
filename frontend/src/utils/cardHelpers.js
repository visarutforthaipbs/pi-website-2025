/**
 * Utility functions for card components
 */

/**
 * Get color scheme based on project status
 * @param {string} status - Project status
 * @returns {string} Chakra UI color scheme
 */
export const getStatusColor = (status) => {
  const statusColors = {
    active: "green",
    completed: "blue",
    draft: "yellow",
    cancelled: "red",
  };
  return statusColors[status?.toLowerCase()] || "gray";
};

/**
 * Get icon emoji based on project category
 * @param {string} category - Project category
 * @returns {string} Emoji icon
 */
export const getCategoryIcon = (category) => {
  const categoryIcons = {
    environment: "🌱",
    education: "📚",
    healthcare: "🏥",
    technology: "💻",
    community: "🤝",
  };
  return categoryIcons[category?.toLowerCase()] || "🚀";
};

/**
 * Get color scheme based on event type
 * @param {string} type - Event type
 * @returns {string} Chakra UI color scheme
 */
export const getEventTypeColor = (type) => {
  const typeColors = {
    workshop: "purple",
    seminar: "blue",
    conference: "green",
    training: "orange",
  };
  return typeColors[type?.toLowerCase()] || "primary";
};

/**
 * Format event date to Thai format
 * @param {string} dateString - Date string
 * @returns {Object} Object with day and month
 */
export const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("th-TH", { month: "short" });
  return { day, month };
};
