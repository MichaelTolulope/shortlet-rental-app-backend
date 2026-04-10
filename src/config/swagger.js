import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Short-let App",
            version: "1.0.0",
            description: "API documentation for short-let app project",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },

    // IMPORTANT: adjust path based on your project structure
    apis: [path.resolve(__dirname, "../routes/*.js"),"../models/*.model.js", "../controllers/*.controller.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;