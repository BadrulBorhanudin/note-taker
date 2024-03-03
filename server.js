// Importing the Express.js framework
const express = require('express');

// Importing the API routes module
const apiRoutes = require('./routes/apiRoutes.js');

// Importing the HTML routes module
const htmlRoutes = require('./routes/htmlRoutes.js');

// Creating an instance of the Express application
const app = express();

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (e.g., stylesheets, scripts) from the 'public' directory
app.use(express.static('public'));

// Routing for API endpoints, using the '/api' prefix
app.use('/api', apiRoutes);

// Routing for HTML pages, using the root path '/'
app.use('/', htmlRoutes);

// Starting the server and listening on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
