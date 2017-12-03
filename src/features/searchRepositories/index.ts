import { Entry, namespace } from './entry';

export { Entry, namespace };
export async function loadEntry(): Promise<Entry> {
  const feature = await import(/* webpackChunkName: "searchRepositories" */ './entry');
  return feature.entry;
}
