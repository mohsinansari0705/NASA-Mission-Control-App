import { getLaunches, addLaunch } from '../../models/launches.model';

export const getAllLaunches = (req: any, res: any) => {
  return res.status(200).json(getLaunches());
};

export const addNewLaunch = (req: any, res: any) => {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'Invalid launch date' });
  }

  addLaunch(launch);

  return res.status(201).json(launch);
};
