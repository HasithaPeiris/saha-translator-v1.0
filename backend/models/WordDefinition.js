const mongoose = require('mongoose');

const wordDefinitionSchema = new mongoose.Schema({
  word: String,
  pos: String,
  sinhala: String,
});

module.exports = mongoose.model('WordDefinition', wordDefinitionSchema);