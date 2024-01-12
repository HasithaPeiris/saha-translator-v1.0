const express = require('express');
const router = express.Router();
const WordDefinition = require('../models/WordDefinition');

// Get all words
router.get('/', async (req, res) => {
  try {
    const words = await WordDefinition.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific word by its word property
router.get('/:word', async (req, res) => {
  try {
    const selectedWord = req.params.word;
    const definition = await WordDefinition.findOne({ word: selectedWord });
    if (!definition) {
      return res.status(404).json({ error: 'Word not found' });
    }
    // Include the "pos" property in the response
    res.json({ word: definition.word, sinhala: definition.sinhala, pos: definition.pos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific word by ID
router.get('/:id', getWord, (req, res) => {
  res.json(res.word);
});

// Middleware function to get a specific word by ID
async function getWord(req, res, next) {
  let word;
  try {
    word = await WordDefinition.findById(req.params.id);
    if (word == null) {
      return res.status(404).json({ message: 'Word not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.word = word;
  next();
}

module.exports = router;
