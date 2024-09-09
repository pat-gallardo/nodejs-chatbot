# Chatbot Application using OpenAI API

### Applications used

1. **NodeJs** - This project was developed using NodeJs
2. **Open AI Account** - This project utilise Open AI API for LLM.
3. **PostgreSQL** - This project utilise storing of data through postgreSQL.

# Project Documentation

This project is a Node.js-based chatbot application that integrates with an LLM (Large Language Model) and uses WebSocket communication. It interacts with a PostgreSQL database and supports dynamic message responses based on predefined templates.

### `api/`

This folder contains the WebSocket client and server scripts, which handle real-time communication with the chatbot.

- **`ws_client.js`**: This file implements the WebSocket client that sends and receives messages to and from the WebSocket server.
- **`ws_server.js`**: This file implements the WebSocket server, which manages connections with clients and handles message exchange, triggering AI responses.

### `db/`

The `db` folder contains scripts related to the interaction with the PostgreSQL database.

- **`db_helper.js`**: Contains helper functions for database operations, such as table creation, data insertion, and querying.
- **`db_pg.js`**: Handles the database connection using the `pg` package and manages database queries with a connection pool.
- **`model.js`**: Defines the database schema, including the structure of the tables like `chat_messages` and `product_data`.

### `llm/`

This folder contains logic for interacting with the LLM (Large Language Model), likely OpenAI's GPT models.

- **`llm_handler.js`**: Manages the logic for generating responses using the LLM. It processes user messages, formats them into prompts, and sends the prompts to the LLM (e.g., GPT) for a response.

### `templates/`

The `templates` folder contains message and product templates used to format dynamic responses.

- **`assistant_template.js`**: Defines the template structure for assistant responses, including placeholders for dynamic content insertion.
- **`product_templates.js`**: Stores predefined product-related templates and details, which are used to personalize responses based on user queries.

### Project Root

- **`.gitignore`**: Specifies files and directories to be ignored by Git, such as `node_modules` or environment files.
- **`client.js`**: Possibly an entry point for starting the client-side application.
- **`dev.env`**: Environment variables, likely storing sensitive information like API keys and database credentials.
- **`package-lock.json`**: Automatically generated file that describes the exact dependency tree installed.
- **`package.json`**: Defines the project's metadata and dependencies. It is also used for scripts and configuration.
- **`README.md`**: Project description, instructions, and usage information.
- **`server.js`**: Likely the entry point of the application, starting the server and initializing the WebSocket communication and database connections.

---

### Flow Overview

1. **WebSocket Communication**: The client and server communicate via WebSocket, sending user messages from the `ws_client.js` to `ws_server.js`.
2. **Message Processing**: Once the message reaches the server, it is processed and passed through the `llm_handler.js`, which formats the prompt based on user input and product data.
3. **LLM Integration**: The message is sent to the LLM, and the response is streamed back to the WebSocket server and ultimately the client.
4. **Database Operations**: Throughout the process, chat messages and product information are stored and retrieved from the PostgreSQL database via the `db_helper.js` and `db_pg.js`.
5. **Templates**: The `assistant_template.js` and `product_templates.js` are used to format the assistant's responses dynamically based on user queries.

---

### Conclusion

This project efficiently separates concerns between WebSocket communication (`api/`), database operations (`db/`), AI handling (`llm/`), and template management (`templates/`). The use of a PostgreSQL database allows for persistent storage of chat data and product information. The project integrates with an LLM to generate intelligent responses dynamically based on user input.