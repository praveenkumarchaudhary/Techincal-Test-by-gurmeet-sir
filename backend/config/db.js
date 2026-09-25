import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
    connectionString: process.env.NEON_URL,
    ssl: process.env.NEON_URL && process.env.NEON_URL.includes('sslmode=') ? undefined : { rejectUnauthorized: false }
});

const createTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

export { pool, createTable };
export default pool;