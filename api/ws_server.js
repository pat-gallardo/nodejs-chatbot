import { WebSocketServer } from "ws";
import { createTables, insertAiMessage } from "../db/db_helper.js";
import { sendMessage } from "../llm/llm_handler.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startWebSocketServer = async () => {
  createTables();
  const server = new WebSocketServer({ port: 8080 });
  
  server.on("connection", (socket) => {
    socket.send("I know information about cricket, badminton and football sports goods.");
    socket.send("How can I assist you today?");

    socket.on("message", async (message) => {
      const userMessage = message.toString();

      const response = await sendMessage(userMessage);
      let messageReply = ''
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        messageReply = `${messageReply}${content}`
        socket.send(messageReply);
        await delay(100);
    }
    console.log('messageReply -', messageReply)
    insertAiMessage('assistant', messageReply)
    })
  
  });
}

export default startWebSocketServer;