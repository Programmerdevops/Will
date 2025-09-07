import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || "pgsql-svc",
  user: process.env.POSTGRES_USER || "admin",
  password: process.env.POSTGRES_PASSWORD || "admin123",
  database: process.env.POSTGRES_DB || "insurance",
  port: 5432,
});

export default pool;
