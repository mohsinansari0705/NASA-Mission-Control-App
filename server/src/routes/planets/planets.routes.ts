import express from 'express';

import { getAllPlanets } from '../../controllers/planets/planets.controller';

export const planetRouter = express.Router();

planetRouter.get('/planets', getAllPlanets);
