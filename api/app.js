
const express = require('express');
const path = require('path');
const exoplanetsRouter = require('./routes/exoplanets.js');
const morgan =require('morgan');
const { serve, setup } =require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config({ path: './config.env' });

const app = express();
const root = path.resolve(__dirname, '..');

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
        url: "https://web-exoplanetas.herokuapp.com",
      },
      {
        url: "https://localhost:4000",
      },
    ],
  },
  apis: ["./api/routes/*.js"],
};
const specs = swaggerJsDoc(options);

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", serve, setup(specs));

// Routes
app.use(exoplanetsRouter);

module.exports = app;
