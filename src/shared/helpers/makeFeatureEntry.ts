import { IFeatureEntry } from '../types/app';

export function makeFeatureEntry<E extends IFeatureEntry>(entry: E): E {
  return entry;
}
