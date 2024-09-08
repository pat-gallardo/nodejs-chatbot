import { WebSocketServer } from "ws";
import createTables from "../db/model.js";

const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 8080 });
  
  wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
      console.log("received: %s", data);
    });
  
    createTables();
  
  
    ws.send("I know something about cricket, badminton and football sports goods.");
    ws.send("Hit me with your best shot.");
  
  
  
  
  
  });
}

export default startWebSocketServer;