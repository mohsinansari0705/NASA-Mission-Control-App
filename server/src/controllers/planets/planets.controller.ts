import { habitablePlanets as planets } from '../../models/planets.model';

export const getAllPlanets = (req: any, res: any) => {
  res.status(200);
  res.json(planets);
};
