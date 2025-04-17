"use strict";

/**
 * Database configuration
 */

// const path = require("path"); // No longer needed for SQLite path

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  if (client === "postgres") {
    const pgConfig = {
      connection: {
        connectionString: env("DATABASE_URL"),
        host: env("DATABASE_HOST"),
        port: env.int("DATABASE_PORT"),
        database: env("DATABASE_NAME"),
        user: env("DATABASE_USERNAME"),
        password: env("DATABASE_PASSWORD"),
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
      debug: false,
    };

    console.log("Using PostgreSQL connection for database");
    return {
      connection: {
        client,
        ...pgConfig,
      },
    };
  }

  console.log(`Using ${client} connection for database`);
  return {
    connection: {
      client,
      connection: {
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      useNullAsDefault: true,
    },
  };
};
