// Importing the 'path' module for working with file and directory paths
const path = require('path');

// Importing the 'Router' from Express to create modular, mountable route handlers
const html = require('express').Router();

// Endpoint to serve the 'notes.html' file
html.get('/notes', (req, res) => {
  // Sending the 'notes.html' file as the response
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Wildcard endpoint to handle any other route
html.get('*', (req, res) => {
  // Sending the 'index.html' file as the response for all other routes
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exporting the 'html' router for use in other modules
module.exports = html;
