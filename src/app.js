import express from 'express';
import routes from './routes/index.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();


// parse json body
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/api/v1",routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true
}));
export default app;