import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { contentRouter } from './routes/content.routes.js';

export const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.clientUrls.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: false
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/', contentRouter);

app.use((error, _request, response, _next) => {
  const status = error.statusCode ?? 500;
  response.status(status).json({
    message: error.message ?? 'Unexpected server error'
  });
});
