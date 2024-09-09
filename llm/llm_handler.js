import { getProductCategory, insertUserMessage, insertAiMessage } from "../db/db_helper.js";
import { assistantPrompt, defaultPrompt } from "../templates/assistant_template.js";
import OpenAI from "openai";

const getMessage = (userMessage) => {
    const lowerUserMessage = userMessage.toLowerCase();
    let productCategoryId = 0;
    if (lowerUserMessage.includes("cricket")) {
        productCategoryId = 1;
    } else if (lowerUserMessage.includes("badminton")) {
        productCategoryId = 2;
    } else if (lowerUserMessage.includes("football")) {
        productCategoryId = 3;
    }
    return productCategoryId;
};

const formatTemplate = async (userMessage) => {
    const productCategoryId = getMessage(userMessage);
    const productDetailPrompt = await getProductCategory(productCategoryId);
    let product_template = '';
    if (productDetailPrompt.rowCount < 1) {
        product_template = defaultPrompt;
    } else {
        const productPrompt = productDetailPrompt.rows[0];
        product_template = assistantPrompt
            .replace(/\[\[product_category\]\]/g, productPrompt.product_category)
            .replace(/\[\{product_details\}\]/g, productPrompt.product_details);
    }
    return product_template;
};

// Expose function to handle messages
export const sendMessage = async (userMessage) => { 
    // Initialize prompt_template if not set
    try{
        insertUserMessage('user',userMessage)
        const prompt_template = await formatTemplate(userMessage);
    
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${prompt_template}` }],
            model: "gpt-4o-mini-2024-07-18", // Use a valid model name
        });
        const aiReply = completion.choices[0].message.content
    
        insertAiMessage('assistant', aiReply)
    
        return aiReply
    }
    catch (error){
        console.error(error)
    }
    
};
