import express from 'express';

import { getAllLaunches } from '../../controllers/launches/launches.controller';

export const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);
