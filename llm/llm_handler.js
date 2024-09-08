import { getProductCategory } from "../db/db_helper.js"

 const getMessage = (userMessage) => {
    console.log('userMessage -', userMessage)

    const lowerUserMessage = userMessage.toLowerCase()
    let productCategoryId = 0
    if (lowerUserMessage.includes("cricket")) {
        productCategoryId = 1
    } else if (lowerUserMessage.includes("badminton")) {
        productCategoryId = 2
    } else if (lowerUserMessage.includes("football")){
        productCategoryId = 3
    }
    
    return productCategoryId
}

export const formatTemplate = async (userMessage) => {
    const productCategoryId = getMessage(userMessage);
    const productId = await getProductCategory(productCategoryId)
    console.log('productId -', productId.rows)
}