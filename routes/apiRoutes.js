const uuid = require('../helpers/uuid');
const api = require('express').Router();
const { readAndAppend, readFromFile, remove } = require('../helpers/fsUtils');

api.get('/notes', function (req, res) {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

api.post('/notes', function (req, res) {
  const note = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  readAndAppend(note, './db/db.json');

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

api.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  remove(id, './db/db.json');

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = api;
