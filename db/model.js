const tableChatMessages = 'chat_messages';
const tableChatMessagesColumns = [
    {name: 'id', type: 'SERIAL PRIMARY KEY'},
    {name: 'user_name', type: 'VARCHAR(100)'},
    {name: 'messages', type: 'TEXT'},
    {name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()'},
]

const tableProductData = 'product_data';
const tableProductDataColumns = [
    {name: 'id', type: 'SERIAL PRIMARY KEY'},
    {name: 'product_category', type: 'VARCHAR(100)'},
    {name: 'product_details', type: 'TEXT'},
    {name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()'},
]

export const modelList = [
    {tableName: tableChatMessages, tableColumns: tableChatMessagesColumns},
    {tableName: tableProductData, tableColumns: tableProductDataColumns},
]