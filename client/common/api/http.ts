import axios from 'axios';
import { ApiConfig } from './config';

export const http = axios.create({
  baseURL: ApiConfig.baseUrl,
  timeout: ApiConfig.requestTimeout,
});

http.interceptors.request.use(async (config) => {
  config.headers = config.headers || {};

  return config;
});
