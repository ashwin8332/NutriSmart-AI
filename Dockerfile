FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY backend/ ./backend/
COPY frontend/ ./frontend/

EXPOSE 8080

ENV PORT=8080

CMD ["node", "backend/server.js"]
