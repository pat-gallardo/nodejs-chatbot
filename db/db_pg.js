import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
    override: true,
    path: path.join(__dirname, '../dev.env')
});

const { Pool } = pkg;
    const pool = new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });

const dbConnection = async(query, params = []) => {    
    const client = await pool.connect();
    try{
        const result = await client.query(query, params);
        return result
    }
    catch (err) {
        console.error('Database query error:', err);
        throw err;
    } finally {
        client.release();
    }
}

export default dbConnection;
