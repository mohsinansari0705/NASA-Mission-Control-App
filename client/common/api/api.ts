import { http } from './http';
import { ApiConfig } from './config';

export class Api {
  postEvent?: (event: string, payload?: any) => void;

  constructor(postEvent?: (event: string, payload?: any) => void) {
    this.postEvent = postEvent;
  }

  async httpGetPlanets(): Promise<any> {
    try {
      const response = await http.get('/planets');
      return response.data;
    } catch (e) {
      console.error('Error fetching planets:', e);
      return [];
    }
  }

  async httpGetLaunches(): Promise<any> {
    try {
      const response = await http.get(ApiConfig.baseUrl + '/launches');
      return response.data;
    } catch (e) {
      console.error('Error fetching launches:', e);
      return [];
    }
  }

  async httpSubmitLaunch(): Promise<any> {
    try {
      const response = await http.post(ApiConfig.baseUrl + '/launches');
      return response.data;
    } catch (e) {
      console.error('Error submitting launch:', e);
      return [];
    }
  }

  async httpAbortLaunch(): Promise<any> {
    try {
      const response = await http.post(ApiConfig.baseUrl + '/launches/abort');
      return response.data;
    } catch (e) {
      console.error('Error aborting launch:', e);
      return [];
    }
  }
}
