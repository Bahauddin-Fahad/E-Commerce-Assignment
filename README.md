# E-Commerce-Assignment

## How to run the application locally

### Step 1: Clone the Repository

Open Command Prompt, Clone the repository to the local machine using Git.

```
git clone https://github.com/Bahauddin-Fahad/E-Commerce-Assignment.git
```

### Step 2: Navigate to the Project Directory

Navigate to the cloned repository directory.

```
cd <project folder>
```

### Step 3: Install Dependencies

Install the project to get the **_node_modules_** folder using npm.

```node
npm install
```

This command reads the package.json file in the project directory and installs all the required packages from the npm registry.

### Step 4: Set up the `.env` File

Create a .env file in the root directory of the project. This file will hold the environment variables.

```node
PORT=5000
DATABASE_URL=mongodb://localhost:27017/database_name
```

### Step 5: Start the Server

To run the project, use the following command:

```node
npm run start:dev
```

In the package.json file, we have a script defined as `npm run start:dev` to run the server.

```node
"scripts": {
"start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
"start:prod": "node ./dist/server.js",
//...more scripts
}
```

### Step 6: Access the Application

Once the server is running, access the application by navigating to `http://localhost:<port>` in web browser. We have to replace the `<port>` with the port number specified in the .env file.

---
