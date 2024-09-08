import dbConnection from "./db_pg.js";
import { productDetailList } from "../templates/product_templates.js";
import { modelList } from "./model.js";

const addTable = async (tableName, columns) =>{
    const columnsQuery = columns.map(
        col => `${col.name} ${col.type}`
    ).join(', ')

    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsQuery})`;
    dbConnection(query, tableName);
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

const createTables = () => {
    modelList.forEach((model) =>{
        addTable(model.tableName, model.tableColumns);
    })
    insertProductDataDetails(modelList[1].tableName)
}

export default createTables;

export const getProductCategory = async () => {
    console.log('modelList[1].tableName -', modelList[1].tableName)
    const query = `SELECT * FROM ${modelList[1].tableName}`
    try {
        const result = await dbConnection(query);
        return result;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}