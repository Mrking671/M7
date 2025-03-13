module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "/app/frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_PUBLIC_API_URL: "http://localhost:3001"
      }
    },
    {
      name: "backend",
      cwd: "/app/backend",
      script: "node",
      args: "src/index.js",
      env: {
        PORT: 3001,
        MONGODB_URI: process.env.MONGODB_URI,
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN
      }
    },
    {
      name: "telegram-bot",
      cwd: "/app/telegram-bot",
      script: "node",
      args: "index.js",
      env: {
        MONGODB_URI: process.env.MONGODB_URI,
        OMDB_API_KEY: process.env.OMDB_API_KEY
      }
    }
  ]
};
