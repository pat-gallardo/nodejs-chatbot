/**
 * AI Messaging Handler Module
 * 
 * This module handles the processing of user messages, formats them into a prompt for the OpenAI API,
 * and retrieves responses based on product-related categories (e.g., cricket, badminton, football).
 * 
 * Dependencies:
 * - `db_helper.js`: Contains database functions like `getProductCategory` and `insertUserMessage`.
 * - `assistant_template.js`: Contains templates such as `assistantPrompt` and `defaultPrompt` for message formatting.
 * - `OpenAI`: OpenAI API client for interacting with AI models.
 * 
 * Function: getMessage
 * - Determines the product category ID based on the user's message content.
 * - Parameters:
 *   - `userMessage` (string): The user's input message.
 * - Returns:
 *   - A product category ID (1 for cricket, 2 for badminton, 3 for football).
 * 
 * Function: formatTemplate
 * - Formats a prompt based on the user's message and product category.
 * - Parameters:
 *   - `userMessage` (string): The user's input message.
 * - Fetches product details from the database using `getProductCategory`.
 * - Replaces placeholders in the `assistantPrompt` with actual product data, or uses the `defaultPrompt` if no data is found.
 * - Returns:
 *   - A formatted prompt template (string) to be used in the AI model request.
 * 
 * Function: sendMessage
 * - Handles the entire flow of processing a user message and generating a response from OpenAI's API.
 * - Parameters:
 *   - `userMessage` (string): The user's input message.
 * - Inserts the user's message into the database using `insertUserMessage`.
 * - Formats the prompt using `formatTemplate`.
 * - Sends the formatted prompt to OpenAI's chat completion endpoint using GPT-4 model and streams the response.
 * - Returns:
 *   - A stream of AI-generated messages.
 * 
 * Usage:
 * - Import and call `sendMessage(userMessage)` to process a user's message and get a response from the AI.
 * 
 * Example:
 * ```js
 * const response = await sendMessage("Tell me about cricket equipment.");
 * ```
 */

import { getProductCategory, insertUserMessage } from "../db/db_helper.js";
import { assistantPrompt, defaultPrompt } from "../templates/assistant_template.js";
import OpenAI from "openai";

/**
 * Determines product category based on the user's message.
 * @param {string} userMessage - The user's input message.
 * @returns {number} - The product category ID.
 */
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

/**
 * Formats a template based on the user's message and product category.
 * @param {string} userMessage - The user's input message.
 * @returns {Promise<string>} - A formatted prompt template.
 */
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

/**
 * Processes the user's message, formats it into a prompt, and sends it to the OpenAI API.
 * @param {string} userMessage - The user's input message.
 * @returns {Promise<Stream>} - A stream of AI-generated responses.
 */
export const sendMessage = async (userMessage) => { 
    try {
        // Insert the user's message into the database
        insertUserMessage('user', userMessage);
        
        // Format the prompt based on the user's message
        const prompt_template = await formatTemplate(userMessage);
    
        // Create an OpenAI API client and send the prompt to the GPT-4 model
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [{ role: "system", content: `${prompt_template}` }],
            stream: true,
        });
        
        return stream;
    } catch (error) {
        console.error(error);
    }
};
