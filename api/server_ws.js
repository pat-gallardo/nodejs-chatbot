import { WebSocketServer } from "ws";

const webSocketServer2 = () => {
    const server = new WebSocketServer({ port: 8080 });

    server.on("connection", (socket) => {
        console.log("A client connected");

        // Send a welcome message when the client connects
        socket.send("Welcome! I am your chatbot. I will start streaming some data to you...");

        // Listen for messages from the client
        socket.on("message", (message) => {
            const userMessage = message.toString();
            console.log("Message received from client:", userMessage);

            if (userMessage.toLowerCase() === "stream") {
                // Simulate streaming data to the client
                let counter = 0;
                const intervalId = setInterval(() => {
                    counter++;
                    socket.send(`Chunk ${counter}: Here's some data...`);

                    // Stop streaming after sending 5 chunks
                    if (counter >= 5) {
                        clearInterval(intervalId);
                        socket.send("Streaming finished!");
                    }
                }, 1000); // Send a chunk every second
            } else {
                // Normal chatbot response for non-streaming messages
                socket.send("I can stream data to you if you type 'stream'.");
            }
        });

        socket.on("close", () => {
            console.log("A client disconnected");
        });
    });
}

export default webSocketServer2;
