import dbConnection from "./db_pg.js";

const createTableChatMessages = async (tableName, columns) =>{
    const columnsQuery = columns.map(
        col => `${col.name} ${col.type}`
    ).join(', ')

    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsQuery})`;
    dbConnection(query, tableName);
}
const createTableProductData = async (tableName, columns) => {
    const columnsQuery = columns.map(
        col => `${col.name} ${col.type}`
    ).join(', ')

    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsQuery})`;
    dbConnection(query, tableName);
}

const tableChatMessages = 'chat_messages';
const tableChatMessagesColumns = [
    {name: 'id', type: 'SERIAL PRIMARY KEY'},
    {name: 'user_name', type: 'VARCHAR(100)'},
    {name: 'messages', type: 'TEXT'},
    {name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()'},
]


const tableProductData = 'product_data';
const tabletableProductDataColumns = [
    {name: 'id', type: 'SERIAL PRIMARY KEY'},
    {name: 'name', type: 'VARCHAR(100)'},
    {name: 'product_category', type: 'VARCHAR(100)'},
    {name: 'product_details', type: 'TEXT'},
    {name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()'},
]

const createTables = () => {
    createTableChatMessages(tableChatMessages, tableChatMessagesColumns);
    createTableProductData(tableProductData, tabletableProductDataColumns);
}



export default createTables;