import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from './configs/passport.config.ts';
import apiRouter from './routers/index.ts';
import { setupSwaggerDocs } from './configs/swagger.ts';
import config from './config.ts';
import { integrateFederation } from '@fedify/express';
import federation from './federation/federation.ts';

const app = express();
const httpServer = http.createServer(app);

setupSwaggerDocs(app);

const allowedOrigins = [
  'http://localhost:8080', 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// Add routes that are not part of ActivityPub Express here
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.send('Welcome to Mastagram!');
});

app.use(integrateFederation(federation, (_req) => undefined));

// Initialize everything
async function startServer() {
  try {
    // Start the server
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: config.app.port }, resolve)
    );
    
    console.log(`🚀 Mastagram server running on port ${config.app.port}`);
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();