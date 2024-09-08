import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });




  ws.send("I know something about cricket, badminton and football sports goods.");
  ws.send("Hit me with your best shot.");





});