import { WebSocketServer } from "ws";
import { createTables } from "../db/db_helper.js";
import { sendMessage } from "../llm/llm_handler.js";

const startWebSocketServer = () => {
  createTables();
  const server = new WebSocketServer({ port: 8080 });
  
  server.on("connection", (socket) => {
    socket.send("I know information about cricket, badminton and football sports goods.");
    socket.send("How can I assist you today?");

    socket.on("message", async (message) => {
      const userMessage = message.toString();
      console.log('Message recieve from client: ', userMessage)

      const response = await sendMessage(userMessage);

      socket.send(response);
    })
  
  });
}

export default startWebSocketServer;