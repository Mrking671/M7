require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Movie Model
const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: String,
  imdb_id: String,
  year: Number,
  file_id: String,
  poster: String,
  genre: [String],
  actors: [String]
}));

// Initialize Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

bot.on('message', async (msg) => {
  const file = msg.video || msg.document;
  if (!file) return;

  try {
    const { title, year } = parseFilename(file.file_name);
    const omdb = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${process.env.OMDB_API_KEY}`);
    
    if (omdb.data.Response === 'True') {
      await Movie.updateOne(
        { imdb_id: omdb.data.imdbID },
        {
          title: omdb.data.Title,
          year: omdb.data.Year,
          file_id: file.file_id,
          poster: omdb.data.Poster,
          genre: omdb.data.Genre.split(', '),
          actors: omdb.data.Actors.split(', ')
        },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error('Error processing file:', error);
  }
});

function parseFilename(filename) {
  const clean = filename.replace(/[_\-.]+/g, ' ').replace(/\.[^/.]+$/, '');
  const match = clean.match(/(.*?)(\d{4})$/);
  return {
    title: match ? match[1].trim() : clean,
    year: match ? parseInt(match[2]) : null
  };
}
