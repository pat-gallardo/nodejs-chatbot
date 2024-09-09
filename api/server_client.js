import WebSocket from "ws";
import readline from "readline";

const webSocketServer2 = () =>{ 
    const client = new WebSocket("ws://localhost:8080");

// Setup command-line interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on("open", () => {
    console.log("Connected to server");

    // Listen for chatbot responses
    client.on("message", (message) => {
        console.log("Chatbot says:", message.toString());

        // Prompt the user for input after receiving a response
        askUser();
    });

    // Prompt the user for their first input
    askUser();

    function askUser() {
        rl.question("You: ", (userInput) => {
            client.send(userInput);
    
            // Exit the chat if the user says "bye"
            if (userInput.toLowerCase() === "bye") {
                rl.close();
                client.close();
            }
        });
    }
});
}

export default webSocketServer2;

