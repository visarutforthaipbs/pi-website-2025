module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // Configure Users & Permissions plugin
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET", "your-jwt-secret"),
      jwt: {
        expiresIn: "7d",
      },
      // Enable public access for the API
      ratelimit: {
        enabled: false,
      },
    },
  },
});
