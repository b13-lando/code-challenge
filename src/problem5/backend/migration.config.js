require("dotenv").config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  migrationsDir: "migrations",
  migrationsTable: "pgmigrations",
};
