import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  debugger;
  return import(/* webpackChunkName: "searchRepositories" */ './entry').then(feature => feature.entry);
}
