export type planet = {};

export type launch = {
  flightNumber: string;
  mission: string;
  rocket: string;
  launchDate: typeof Date;
  destination: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
};
