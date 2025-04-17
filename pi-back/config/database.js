// const path = require("path"); // No longer needed for SQLite path

module.exports = ({ env }) => ({
  connection: {
    client: "mongoose", // Set the client to mongoose
    connection: {
      // Read the MongoDB Atlas connection string from DATABASE_URL
      uri: env("DATABASE_URL"),
      options: {
        ssl: env.bool("DATABASE_SSL", true), // Enable SSL by default for Atlas
        // Add any other necessary mongoose options here if needed
        // e.g., keepAlive: true, useUnifiedTopology: true, etc.
        // Strapi generally handles defaults well.
      },
    },
    // Optional: Set default connection options if needed
    // options: {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // },
  },
});
