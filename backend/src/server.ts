import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocketHandlers } from './socket/handlers';

export function createServer() {
  const app = express();
  const httpServer = createHttpServer(app);

  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

  app.use(cors({
    origin: corsOrigin,
    methods: ['GET', 'POST'],
  }));

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Socket.io setup
  const io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ['GET', 'POST'],
    },
  });

  setupSocketHandlers(io);

  return httpServer;
}
