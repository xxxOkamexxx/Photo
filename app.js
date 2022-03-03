const express = require('express');
const cors = require('cors');
const logger = require('morgan');
//const { body, matchedData, validationResult } = require('express-validator');

// instantiate express
const app = express();


// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require('./routes'));

module.exports = app;
