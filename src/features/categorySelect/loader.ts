import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "categorySelect" */ './entry').then(feature => feature.entry);
}
