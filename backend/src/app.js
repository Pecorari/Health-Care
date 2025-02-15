const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');

require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(route);

module.exports = app;
