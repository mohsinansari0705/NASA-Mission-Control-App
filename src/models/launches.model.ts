import type { Launch } from '../types/types';

export const launches: Launch[] = [];

export const existsLaunchWithId = (launchId: string) => {
  return launches.some((launch) => launch.flightNumber === launchId);
};

export const getLaunches = () => {
  return launches;
};

export const addLaunch = (launch: Partial<Launch>) => {
  let newFlightNumber: string;

  if (!launches.length) {
    newFlightNumber = 'GCF-001';
  } else {
    let latestFlightNumber = launches[launches.length - 1].flightNumber;

    let num = latestFlightNumber.split('-');
    let incrementedNum = String(Number(num[1]) + 1).padStart(3, '0');

    newFlightNumber = 'GCF-' + incrementedNum;
  }

  const newLaunch: Partial<Launch> = launch;
  newLaunch.flightNumber = newFlightNumber;
  newLaunch.customers = ['GrayCode', 'NASA'];
  newLaunch.upcoming = true;
  newLaunch.success = true;

  launches.push(newLaunch as Launch);
};

export const abortLaunchWithId = (launchId: string) => {
  const launch = launches.find((l) => l.flightNumber === launchId);

  if (!launch) {
    return;
  } else {
    launch.upcoming = false;
    launch.success = false;
  }

  return launch;
};
