/**
 * Database Interaction Module
 * 
 * This module provides functions to manage and interact with a PostgreSQL database,
 * including creating tables, inserting data, and querying specific records. It leverages
 * a centralized database connection function and pre-defined model and template structures.
 * 
 * Dependencies:
 * - `db_pg.js`: Module for executing PostgreSQL queries
 * - `product_templates.js`: Module containing product details templates
 * - `model.js`: Module defining the database models (table names and columns)
 * 
 * Function: addTable
 * - Creates a database table if it doesn't already exist.
 * - Parameters:
 *   - `tableName` (string): The name of the table to create.
 *   - `columns` (Array): An array of column definitions, each containing `name` and `type`.
 * - Constructs a `CREATE TABLE` SQL query and executes it.
 * 
 * Function: createTables
 * - Iterates over `modelList` to create each table defined in the models.
 * - After table creation, it calls `insertProductDataDetails` to populate the product details table.
 * 
 * Function: insertProductDataDetails
 * - Inserts predefined product details into the specified table.
 * - Parameters:
 *   - `tableName` (string): The name of the table where product details will be inserted.
 * - Uses `productDetailList` to generate an `INSERT INTO` SQL query.
 * 
 * Function: getProductCategory
 * - Fetches a product category by its ID from the database.
 * - Parameters:
 *   - `productCategoryId` (number): The ID of the product category to retrieve.
 * - Executes a `SELECT` SQL query and returns the result.
 * - If an error occurs during query execution, it logs the error and returns `undefined`.
 * 
 * Function: insertUserMessage
 * - Inserts a user message into the database.
 * - Parameters:
 *   - `userName` (string): The name of the user.
 *   - `userMessage` (string): The message content.
 * - Executes an `INSERT INTO` SQL query to store the message.
 * - If an error occurs during query execution, it logs the error and optionally rethrows it for higher-level handling.
 * 
 * Function: insertAiMessage
 * - Inserts an AI-generated message into the database.
 * - Parameters:
 *   - `aiName` (string): The name associated with the AI (e.g., "assistant").
 *   - `aiMessage` (string): The AI-generated message content.
 * - Executes an `INSERT INTO` SQL query to store the message.
 * 
 * Usage:
 * 1. Ensure the database connection module (`db_pg.js`), model definitions (`model.js`), and templates (`product_templates.js`) are correctly implemented.
 * 2. Call `createTables` during server initialization to set up the required database tables.
 * 3. Use `insertUserMessage` and `insertAiMessage` to log conversations, and `getProductCategory` to retrieve specific product categories.
 */

import dbConnection from "./db_pg.js";
import { productDetailList } from "../templates/product_templates.js";
import { modelList } from "./model.js";

const addTable = async (tableName, columns) => {
    const columnsQuery = columns.map(
        col => `${col.name} ${col.type}`
    ).join(', ');

    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsQuery})`;
    await dbConnection(query, []);
}

export const createTables = async () => {
    for (const model of modelList) {
        await addTable(model.tableName, model.tableColumns);
    }
    // Ensure tables are created before inserting data
    await insertProductDataDetails(modelList[1].tableName);
}

const insertProductDataDetails = async (tableName) => {
    const detailsPrompt = productDetailList.map(
        details => `('${details.category}', '${details.detail}')`
    ).join(', ');

    const query = `INSERT INTO ${tableName} (product_category, product_details)
    VALUES ${detailsPrompt}`;
    dbConnection(query);
}

export const getProductCategory = async (productCategoryId) => {
    const query = `SELECT * FROM ${modelList[1].tableName}
    WHERE id = $1`;
    try {
        let result = await dbConnection(query, [productCategoryId]);
        return result;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

export const insertUserMessage = async (userName, userMessage) => {
    const query = `
    INSERT INTO ${modelList[0].tableName} (user_name, messages)
    VALUES ($1, $2)
    `;
    try {
        await dbConnection(query, [userName, userMessage]);
    } catch (err) {
        console.error('Database query error:', err);
        throw err; // Optionally rethrow the error to be handled by the caller
    }
}

export const insertAiMessage = async (aiName, aiMessage) => {
    const query = `
    INSERT INTO ${modelList[0].tableName} (user_name, messages)
    VALUES ($1, $2)
    `;
    await dbConnection(query, [aiName, aiMessage]);
}
