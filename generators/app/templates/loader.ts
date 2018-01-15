import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "<%= featureName %>" */ './entry').then(feature => feature.entry);
}
