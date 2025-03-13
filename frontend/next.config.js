module.exports = {
  reactStrictMode: true,
  output: 'standalone', // For Docker optimization
  images: {
    domains: ['m.media-amazon.com'], // Allow IMDb poster images
  }
};
