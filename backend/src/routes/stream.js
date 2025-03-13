const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/Movie');

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');

    // Get Telegram file info
    const fileInfo = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${movie.file_id}`
    );

    // Stream from Telegram
    const streamUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${fileInfo.data.result.file_path}`;
    const videoStream = await axios.get(streamUrl, { responseType: 'stream' });

    // Set headers for streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `inline; filename="${movie.title}.mp4"`);
    
    videoStream.data.pipe(res);
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).send('Error streaming video');
  }
});

module.exports = router;
