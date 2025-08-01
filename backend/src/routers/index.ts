import { Router } from 'express';
import authRouter from './auth.router.ts';
import profileRouter from './profile.router.ts';
import feedRouter from './feed.router.ts';
import federationRouter from './federation.router.ts';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/feed', feedRouter);
apiRouter.use('/federation', federationRouter);

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Mastagram API'
  });
});

export default apiRouter;
