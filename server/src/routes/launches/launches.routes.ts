import express from 'express';

import {
  getAllLaunches,
  addNewLaunch,
} from '../../controllers/launches/launches.controller';

export const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunch);
