
import morgan from 'morgan';
import express, { json } from 'express';
import exoplanetsRouter from './routes/exoplanets.js';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '../');

// Log invocations
app.use(function (req, res, next) { console.log(req.url); next(); });

// Directly serve static content from /client
app.use(express.static(root + '/client'));

// settings
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Exoplanets API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./api/routes/*.js"],
};
const specs = swaggerJsDoc(options);

// middlewares
app.use(json());
app.use(morgan("dev"));
app.use("/api-docs", serve, setup(specs));

// Routes
app.use(exoplanetsRouter);

export { app };
