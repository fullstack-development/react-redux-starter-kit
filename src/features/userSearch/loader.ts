import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import('./entry').then(feature => feature.entry);
}
