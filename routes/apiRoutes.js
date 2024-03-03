// Importing the 'uuid' module to generate unique identifiers
const uuid = require('../helpers/uuid');

// Importing the 'Router' from Express to create modular, mountable route handlers
const api = require('express').Router();

// Importing utility functions for file system operations
const { readAndAppend, readFromFile, remove } = require('../helpers/fsUtils');

// Endpoint to retrieve all notes
api.get('/notes', function (req, res) {
  // Reading notes from the file and sending them as JSON response
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Endpoint to add a new note
api.post('/notes', function (req, res) {
  // Creating a new note object with a unique ID using 'uuid'
  const note = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  // Appending the new note to the file
  readAndAppend(note, './db/db.json');

  // Reading notes from the file and sending them as JSON response
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Endpoint to delete a note by ID
api.delete('/notes/:id', (req, res) => {
  // Extracting the note ID from the request parameters
  const id = req.params.id;

  // Removing the note with the specified ID from the file
  remove(id, './db/db.json');

  // Reading notes from the file and sending them as JSON response
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Exporting the 'api' router for use in other modules
module.exports = api;
