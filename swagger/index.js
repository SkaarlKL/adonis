'use strict';

// IMPORTS
const express = require('express');
const swagger = require('swagger-ui-express');

const frontendDocs = require('./data/frontend.json');

// CONSTANTS

const PORT = process.env.PORT || 3001;

// INIT

const app = express();

// ROUTES

app.use('/frontend', swagger.serve, (req, res) => { res.send(swagger.generateHTML(frontendDocs)); });

// SERVER

app.listen(PORT, () => {
	console.log('Listening on port ' + PORT);
});
