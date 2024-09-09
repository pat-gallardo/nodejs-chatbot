/**
 * WebSocket Client Module
 * 
 * This module establishes a WebSocket connection to a server and facilitates two-way communication
 * between the user and the server. The user can send messages through the terminal, 
 * and messages from the server will be logged to the console.
 * 
 * Dependencies:
 * - `ws`: A WebSocket library for Node.js
 * - `readline`: Built-in Node.js module for reading input from the terminal
 * 
 * Function: startWebSocketClient
 * - Establishes a WebSocket connection to the server at ws://localhost:8080.
 * - Initiates an interactive terminal interface using `readline` to capture user input.
 * - When the connection is established (`client.on("open")`), it listens for incoming messages from the server 
 *   and prints them to the console.
 * - The user is prompted for input through the terminal. This input is sent to the server as a message.
 * - If the user types "bye", the client will close the WebSocket connection and the terminal interface.
 * 
 * Usage:
 * 1. Run a WebSocket server on localhost:8080.
 * 2. Start this client to connect and begin communication.
 * 
 * Example interaction:
 * - The user types a message in the terminal, which is sent to the server.
 * - When the server sends a message back, it is displayed as "Assistant: <message>".
 * - Type "bye" to end the session.
 */

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
