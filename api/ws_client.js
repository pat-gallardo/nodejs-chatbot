import { WebSocket } from "ws";
import readline from "readline";

const startWebSocketClient = () => {
    const client = new WebSocket("ws://localhost:8080");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    client.on("open", () => {
        client.on("message", (message) => {
            console.log('Assistant: ', message.toString());
            askUser();
        });

        const askUser = () => {
            rl.question("", (userInput) => {
                client.send(userInput);

                if (userInput === "bye") {
                    rl.close();
                    client.close();
                }
            });
        }
        askUser();
    });
}

export default startWebSocketClient;
