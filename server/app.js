const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('HELLOOOO')
})

app.get('/favicon.ico', (req, res) => {
  res.status(200).send('HELLOOOO')
})

app.get('/api/v1/spells', (req, res) => {
  database('spells').select()
    .then(spells => {
      res.status(200).json(spells);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/foundables', (req, res) => {
  database('foundables').select()
    .then(foundables => {
      res.status(200).json(foundables);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/spells/:id', (req, res) => {
  const { id } = req.params;
  database('spells').where({ id }).select()
    .then(spell => {
      res.status(200).json(spell);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/foundables/:id', (req, res) => {
  const { id } = req.params;
  database('foundables').where({ id }).select()
    .then(foundable => {
      res.status(200).json(foundable);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});


module.exports = app;