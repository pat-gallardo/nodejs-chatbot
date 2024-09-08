import dbConnection from "./db_pg.js";
import { productDetailList } from "../templates/product_templates.js";
import { modelList } from "./model.js";
import { defaultPrompt } from "../templates/assistant_template.js";

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

export const createTables = () => {
    modelList.forEach((model) =>{
        addTable(model.tableName, model.tableColumns);
    })
    insertProductDataDetails(modelList[1].tableName)
}

export const getProductCategory = async (productCategoryId) => {
    console.log('productCategoryId', productCategoryId)
    const query = `SELECT * FROM ${modelList[1].tableName}
    WHERE id = ${productCategoryId}`
    try {
        let result = await dbConnection(query);
        console.log('result.rowCount -', result.rowCount)
        if (result.rowCount < 1){
            result = defaultPrompt
        }
        return result;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}