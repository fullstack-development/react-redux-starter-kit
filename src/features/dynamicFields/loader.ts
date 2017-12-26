import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "dynamicFields" */ './entry').then(feature => feature.entry);
}
