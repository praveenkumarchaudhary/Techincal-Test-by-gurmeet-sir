import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {Pool }= pg

const pool = new Pool({
    ConnectionString:process.config.NEON_URL
})

export default pool