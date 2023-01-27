'use strict';

// IMPORTS
const express = require('express');
const swagger = require('swagger-ui-express');

const frontendDocs = require('./data/frontend.json');
const backendDocs = require('./data/backend.json');

// CONSTANTS

const PORT = process.env.PORT || 3000;

// INIT

const app = express();

// ROUTES

app.use('/frontend', swagger.serve, (req, res) => { res.send(swagger.generateHTML(frontendDocs)); });
app.use('/backend', swagger.serve, (req, res) => { res.send(swagger.generateHTML(backendDocs)); });

// SERVER

app.listen(PORT, () => {
	console.log('Listening on port ' + PORT);
});
