/**
 * Database Model Definition Module
 * 
 * This module defines the structure for the database tables and their respective columns. 
 * It exports a `modelList` that can be used for creating and managing tables in the PostgreSQL database.
 * 
 * Table Definitions:
 * 1. `chat_messages`: Stores chat messages between users and AI, including timestamps.
 *    - Columns:
 *      - `id`: Primary key, auto-incremented (`SERIAL`).
 *      - `user_name`: The name of the user sending the message (`VARCHAR(100)`).
 *      - `messages`: The content of the message (`TEXT`).
 *      - `created_at`: The timestamp when the message was created, defaulting to the current time (`TIMESTAMP DEFAULT NOW()`).
 * 
 * 2. `product_data`: Stores product category and details information.
 *    - Columns:
 *      - `id`: Primary key, auto-incremented (`SERIAL`).
 *      - `product_category`: The category of the product (`VARCHAR(100)`).
 *      - `product_details`: The details of the product (`TEXT`).
 *      - `created_at`: The timestamp when the product data was created, defaulting to the current time (`TIMESTAMP DEFAULT NOW()`).
 * 
 * Export:
 * - `modelList`: An array of table objects, each containing:
 *   - `tableName` (string): The name of the table.
 *   - `tableColumns` (Array): An array of column objects, each with `name` (string) and `type` (string).
 * 
 * Usage:
 * - Import `modelList` to use in other modules (e.g., for table creation).
 * - Pass `tableName` and `tableColumns` from the `modelList` to the functions that handle table creation or querying.
 * 
 * Example:
 * ```js
 * const { tableName, tableColumns } = modelList[0];
 * await addTable(tableName, tableColumns);
 * ```
 */

const tableChatMessages = 'chat_messages';
const tableChatMessagesColumns = [
    { name: 'id', type: 'SERIAL PRIMARY KEY' },
    { name: 'user_name', type: 'VARCHAR(100)' },
    { name: 'messages', type: 'TEXT' },
    { name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()' },
];

const tableProductData = 'product_data';
const tableProductDataColumns = [
    { name: 'id', type: 'SERIAL PRIMARY KEY' },
    { name: 'product_category', type: 'VARCHAR(100)' },
    { name: 'product_details', type: 'TEXT' },
    { name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()' },
];

export const modelList = [
    { tableName: tableChatMessages, tableColumns: tableChatMessagesColumns },
    { tableName: tableProductData, tableColumns: tableProductDataColumns },
];
