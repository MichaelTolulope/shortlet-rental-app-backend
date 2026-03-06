import express from 'express';
import routes from './routes/index.js';

const app = express();


// parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/api/v1",routes);

export default app;