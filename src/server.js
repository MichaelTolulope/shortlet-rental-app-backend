import express from 'express'
import app from "./app.js";
import config from "../src/config/index.js"
import {connectDB, disconnectDB} from "./database/dbConnection.js";

const startServer = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port} in ${config.env} mode`);
        console.log(`API docs available at http://localhost:${config.port}/api-docs`);
    });
};

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

process.on("unhandledRejection", async (err) => {
    console.error(`Unhandled Rejection: ${err}`);
    await disconnectDB();
        process.exit(1);
});

process.on('uncaughtException',  async(err) => {
    console.error(`Uncaught exception: ${err}`);
    await disconnectDB();
    process.exit(1);
});

process.on('SIGTERM', async (err) => {
    console.error('SIGTERM, shutting down');
        await disconnectDB();
        process.exit(1);
});