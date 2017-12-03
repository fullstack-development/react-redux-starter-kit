import { Entry, namespace } from './entry';

export { Entry, namespace };
export async function loadEntry(): Promise<Entry> {
  const feature = await import(/* webpackChunkName: "locationSelect" */ './entry');
  return feature.entry;
}
