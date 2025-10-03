// Configuration for the PI Website
export const CONFIG = {
  // API Configuration
  // In development, use empty string to make requests relative (so Vite proxy works)
  // In production, use the full backend URL
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "" : "https://pi-website-backend.onrender.com"),
  SITE_URL: import.meta.env.VITE_SITE_URL || "https://www.pubint.site",

  API_ENDPOINTS: {
    PROJECTS: "/api/projects",
    EVENTS: "/api/events",
    WORD_CLOUD: "/api/wordclouds",
    CONTACT: "/api/contact",
    HEALTH: "/health",
  },

  // Application Settings
  APP_NAME: "PI Website 2025",
  APP_DESCRIPTION: "Participatory Intelligence - แพลตฟอร์มการมีส่วนร่วมสาธารณะ",

  // Contact Information
  CONTACT: {
    EMAIL: "pi.thaipbs@gmail.com",
    PHONE: "+66 2-123-4567",
    ADDRESS: "Thai PBS Public Media",
  },

  // Social Media
  SOCIAL_MEDIA: {
    FACEBOOK: "https://facebook.com/thaipbs",
    TWITTER: "https://twitter.com/thaipbs",
    YOUTUBE: "https://youtube.com/thaipbs",
  },
};

export default CONFIG;
