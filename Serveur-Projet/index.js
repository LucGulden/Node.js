// Imports
const express = require('express');
    const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');

// localhost:3000
app.listen(3000);

app.use(morgan('short'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes'); // Importing route
routes(app); // Register the route