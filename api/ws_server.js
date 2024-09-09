/**
 * WebSocket Server Module
 * 
 * This module sets up a WebSocket server that interacts with clients, handling incoming messages 
 * and generating AI-powered responses in real-time. It uses a simple delay mechanism to simulate a 
 * streaming response from the AI. The module also stores AI messages in a database and initializes tables if needed.
 * 
 * Dependencies:
 * - `ws`: A WebSocket library for Node.js
 * - `../db/db_helper.js`: Module that contains methods for database table creation and inserting messages
 * - `../llm/llm_handler.js`: Module that handles interaction with a language model to generate AI responses
 * 
 * Function: startWebSocketServer
 * - Initializes necessary database tables using `createTables`.
 * - Starts a WebSocket server on port 8080.
 * - Upon a new client connection, sends an initial greeting about sports goods (cricket, badminton, and football) 
 *   and prompts the user for assistance.
 * - Listens for incoming messages from the connected client:
 *   1. Upon receiving a message, it is converted to a string.
 *   2. The message is processed by the `sendMessage` function, which generates a response using an AI model.
 *   3. The AI response is sent back to the client in chunks to simulate a streaming response, with a 100ms delay between chunks.
 *   4. After the full response is generated, it is stored in the database as an AI message using `insertAiMessage`.
 * 
 * Helper Function: delay
 * - Creates a promise that resolves after a specified delay in milliseconds.
 * - Used to simulate delay between streaming chunks of the AI response.
 * 
 * Example Workflow:
 * - A client connects to the server, receives an initial greeting, and asks a question via WebSocket.
 * - The server processes the question using the AI model, sends the response in chunks with a slight delay, 
 *   and stores the complete response in the database.
 * 
 * Usage:
 * 1. Ensure the database and language model handler modules (`db_helper.js` and `llm_handler.js`) are properly implemented.
 * 2. Start the WebSocket server to listen on port 8080.
 */

import { WebSocketServer } from "ws";
import { createTables, insertAiMessage } from "../db/db_helper.js";
import { sendMessage } from "../llm/llm_handler.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startWebSocketServer = async () => {
  createTables();
  const server = new WebSocketServer({ port: 8080 });
  
  server.on("connection", (socket) => {
    socket.send("I know information about cricket, badminton, and football sports goods.");
    socket.send("How can I assist you today?");

    socket.on("message", async (message) => {
      const userMessage = message.toString();

      const response = await sendMessage(userMessage);
      let messageReply = '';
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        messageReply = `${messageReply}${content}`;
        socket.send(messageReply);
        await delay(100);
      }
      
      console.log('messageReply -', messageReply);
      insertAiMessage('assistant', messageReply);
    });
  });
}

export default startWebSocketServer;
