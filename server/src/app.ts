import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { planetRouter } from './routes/planets/planets.routes';
import { launchesRouter } from './routes/launches/launches.routes';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:8081',
  })
);
app.use(
  morgan(
    ':referrer :method :url :status :res[content-length] - :response-time ms'
  )
);

app.use(express.json());
app.use('/planets', planetRouter);
app.use('/launches', launchesRouter);
