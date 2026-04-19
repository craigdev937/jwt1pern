import { Pool } from "pg";
const CONNECTION = process.env.DATABASE_URL;

export const dBase: Pool = new Pool({
    connectionString: CONNECTION
});

