import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "locationSelect" */ './entry').then(feature => feature.entry);
}
