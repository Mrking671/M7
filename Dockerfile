# Stage 1: Build Frontend
FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Combined Services
FROM node:18-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy Frontend build
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public

# Copy Backend
COPY backend/package*..json ./backend/
RUN cd backend && npm install
COPY backend ./backend

# Copy Telegram Bot
COPY telegram-bot/package*.json ./telegram-bot/
RUN cd telegram-bot && npm install
COPY telegram-bot ./telegram-bot

# Copy PM2 config and env files
COPY ecosystem.config.js .

# Expose ports
EXPOSE 3000 3001

# Start services
CMD ["pm2-runtime", "ecosystem.config.js"]
