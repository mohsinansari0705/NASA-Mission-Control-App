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

  // Submit given launch to launch system
  async httpSubmitLaunch(launch: Partial<Launch>): Promise<Launch | any> {
    try {
      const response = await http.post('/launches', launch);
      return response.data;
    } catch (e) {
      console.error('Error submitting launch:', e);
      return { ok: false };
    }
  }

  // Abort launch with given ID
  async httpAbortLaunch(launchId: string): Promise<Launch | any> {
    try {
      const response = await http.put(`/launches/${launchId}`);
      return response.data;
    } catch (e) {
      console.error('Error aborting launch:', e);
      return { ok: false };
    }
  }
}
