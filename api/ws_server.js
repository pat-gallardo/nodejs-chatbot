import { WebSocketServer } from "ws";
import createTables, { getProductCategory } from "../db/db_helper.js";

const startWebSocketServer = () => {
  createTables();
  const server = new WebSocketServer({ port: 8080 });
  
  server.on("connection", (socket) => {
    socket.send("I know information about cricket, badminton and football sports goods.");
    socket.send("How can I assist you today?");

    socket.on("message", (message) => {
      const userMessage = message.toString();
      console.log('Message recieve from client: ', userMessage)

    //   (async () => {
    //     const data = await getProductCategory();
    //     // console.log('Fetched Data:', data); // This will log the data to your console
    // })();

    socket.send("Sample response");
    })
  
  });
}

export default startWebSocketServer;