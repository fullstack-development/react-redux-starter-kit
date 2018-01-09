import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "searchRepositories" */ './entry').then(feature => feature.entry);
}
