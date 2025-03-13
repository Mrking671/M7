const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  imdb_id: String,
  year: Number,
  file_id: String,
  poster: String,
  genre: [String],
  actors: [String]
});

module.exports = mongoose.model('Movie', movieSchema);
