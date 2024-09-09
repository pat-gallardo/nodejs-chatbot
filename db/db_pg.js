/**
 * PostgreSQL Database Connection Module
 * 
 * This module establishes a connection pool with a PostgreSQL database using environment variables 
 * to configure the connection settings. It also exports a `dbConnection` function for executing SQL queries 
 * with parameters.
 * 
 * Dependencies:
 * - `pg`: PostgreSQL client for Node.js
 * - `dotenv`: Module for loading environment variables from a `.env` file
 * - `path` and `url`: Built-in Node.js modules for file path management
 * 
 * Environment Variables:
 * - The module loads the following environment variables from `../dev.env`:
 *   - `USER`: The database username
 *   - `HOST`: The database host address
 *   - `DATABASE`: The name of the database
 *   - `PASSWORD`: The database password
 *   - `PORT`: The port number for the database
 * 
 * Function: dbConnection
 * - Executes a SQL query using a connection from the PostgreSQL pool.
 * - Parameters:
 *   - `query` (string): The SQL query to execute.
 *   - `params` (Array): Optional array of parameters to be passed to the SQL query.
 * - Returns:
 *   - The result of the query execution (e.g., rows of data for a `SELECT` query).
 * - Handles exceptions by logging any errors and rethrowing them for higher-level handling.
 * - Ensures the database client is released back to the pool after the query is executed, regardless of success or failure.
 * 
 * Usage:
 * 1. Ensure that the `dev.env` file exists in the appropriate directory and contains valid database credentials.
 * 2. Import and use `dbConnection(query, params)` in other modules to interact with the PostgreSQL database.
 * 
 * Example:
 * ```js
 * const result = await dbConnection('SELECT * FROM users WHERE id = $1', [userId]);
 * ```
 */

import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from ../dev.env
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

/**
 * Executes a SQL query using the PostgreSQL connection pool.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - Optional query parameters.
 * @returns {Promise<object>} - The result of the query execution.
 */
const dbConnection = async (query, params = []) => {    
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return result;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    } finally {
        client.release();
    }
}

export default dbConnection;
