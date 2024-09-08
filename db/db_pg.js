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
const dbConnection = async(query, tableName) => {    
    const { Pool } = pkg;
    const pool = new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });
    const client = await pool.connect();
    try{
        await client.query(query);
        console.log(`Table ${tableName} created successfully`)}
    catch (err) {
        console.error(err)
    } finally {
        client.release();
    }
}

export default dbConnection;
