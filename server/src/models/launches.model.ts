import type { Launch } from '../types/types';

export const launches: Launch[] = [
  {
    flightNumber: 'GCF-001',
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('2030-05-07'),
    destination: 'Kepler-442 b',
    customers: ['GrayCode', 'NASA', 'SpaceX'],
    upcoming: true,
    success: true,
  },
];
