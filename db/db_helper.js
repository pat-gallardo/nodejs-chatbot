import dbConnection from "./db_pg.js";
import { productDetailList } from "../templates/product_templates.js";
import { modelList } from "./model.js";

const addTable = async (tableName, columns) =>{
    const columnsQuery = columns.map(
        col => `${col.name} ${col.type}`
    ).join(', ')

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
    ).join(', ')

    const query = `INSERT INTO ${tableName} (product_category, product_details)
    VALUES ${detailsPrompt}
    `
    dbConnection(query);
}

export const getProductCategory = async (productCategoryId) => {
    const query = `SELECT * FROM ${modelList[1].tableName}
    WHERE id = $1`
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