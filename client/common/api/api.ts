import { http } from './http';
import { ApiConfig } from './config';
import type { Planet, Launch } from '../types/types';

export class Api {
  postEvent?: (event: string, payload?: any) => void;

  constructor(postEvent?: (event: string, payload?: any) => void) {
    this.postEvent = postEvent;
  }

  // Load planets and return as JSON
  async httpGetPlanets(): Promise<Planet[]> {
    try {
      const response = await http.get('/planets');
      return response.data;
    } catch (e) {
      console.error('Error fetching planets:', e);
      return [];
    }
  }

  // Load launches, sort by flight number and return as JSON
  async httpGetLaunches(): Promise<Launch[]> {
    try {
      const response = await http.get('/launches');
      return response.data;
    } catch (e) {
      console.error('Error fetching launches:', e);
      return [];
    }
  }

  // Submit given launch date to launch system
  async httpSubmitLaunch(): Promise<Launch> {
    try {
      const response = await http.post('/launches');
      return response.data;
    } catch (e) {
      console.error('Error submitting launch:', e);
      return {} as Launch;
    }
  }

  // Delete launch with given ID
  async httpAbortLaunch(): Promise<Launch> {
    try {
      const response = await http.post('/launches/abort');
      return response.data;
    } catch (e) {
      console.error('Error aborting launch:', e);
      return {} as Launch;
    }
  }
}
