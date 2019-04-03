import { IFeatureEntry } from '../types/app';

function makeFeatureEntry<E extends IFeatureEntry>(entry: E): E {
  return entry;
}

export default makeFeatureEntry;
