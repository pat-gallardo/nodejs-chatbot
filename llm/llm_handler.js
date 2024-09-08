import { getProductCategory } from "../db/db_helper.js"
import { assistantPrompt, defaultPrompt } from "../templates/assistant_template.js"
import OpenAI from "openai";

 const getMessage = (userMessage) => {
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

const formatTemplate = async (userMessage) => {
    const productCategoryId = getMessage(userMessage);
    const productDetailPrompt = await getProductCategory(productCategoryId)
    let product_template = ''
    if (productDetailPrompt.rowCount < 1){
        product_template = defaultPrompt
    } else {
        const productPrompt = productDetailPrompt.rows
        product_template = assistantPrompt
        .replace(/\[\[product_category\]\]/g, productPrompt[0].product_category)
        .replace(/\[\{product_details\}\]/g, productPrompt[0].product_details);
    }
    return product_template
}

export const sendMessage = async (userMessage) => { 
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt_template = await formatTemplate(userMessage)

    const completion = await openai.chat.completions.create({
        message: [{role: "system", content:`${prompt_template}`}],
        model: "gpt-4o-mini-2024-07-18",

    })

    console.log(completion.choices[0].message.content)
};