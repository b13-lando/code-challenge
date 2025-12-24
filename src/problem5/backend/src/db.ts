import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Fired when a client is checked out from the pool
pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

// Fired for unexpected errors on idle clients
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
  process.exit(1);
});
