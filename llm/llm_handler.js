// import { getProductCategory } from "../db/db_helper";

export const getMessage = (userMessage) => {
    console.log('userMessage -', userMessage)

    const lowerUserMessage = userMessage.toLowerCase()
    let productCategoryId = 0
    if (lowerUserMessage.contains("cricket")) {
        productCategoryId = 1
    } else if (lowerUserMessage.contains("badminton")) {
        productCategoryId = 2
    } else if (lowerUserMessage.contains("football")){
        productCategoryId = 3
    }
    
    return productCategoryId
}

const formatTemplate = () => {
    (async () => {
        const data = await getProductCategory();
        // console.log('Fetched Data:', data); // This will log the data to your console
    })();
}