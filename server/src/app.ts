import cors from 'cors';
import express from 'express';

import { planetRouter } from './routes/planets/planets.routes';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:8081',
  })
);
app.use(express.json());
app.use(planetRouter);
