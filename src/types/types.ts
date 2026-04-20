export type Planet = {};

export type Launch = {
  flightNumber: string;
  mission: string;
  rocket: string;
  launchDate: Date;
  destination: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
};
