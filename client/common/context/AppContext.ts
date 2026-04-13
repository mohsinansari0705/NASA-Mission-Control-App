import React, { createContext } from 'react';
import { Api } from '../api/api';

export class ContextData {
  appname: string = 'NASA Mission Control';
  initialized: boolean = false;
  api: Api;

  constructor(opts?: { postEvent?: (name: string, payload?: any) => void }) {
    this.api = new Api(opts?.postEvent);
  }
}

export type AppContextValue = {
  context: ContextData;
  setContext: React.Dispatch<React.SetStateAction<ContextData>>;
};

const defaultContextValue: AppContextValue = {
  context: new ContextData(),
  setContext: () => {},
};

export const AppContext = createContext<AppContextValue>(defaultContextValue);
