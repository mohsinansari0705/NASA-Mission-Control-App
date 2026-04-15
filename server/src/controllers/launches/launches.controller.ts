import { launches } from '../../models/launches.model';

export const getAllLaunches = (req: any, res: any) => {
  res.status(200);
  res.json(launches);
};
