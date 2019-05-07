import { IFeatureEntry } from 'core/types';

function makeFeatureEntry<E extends IFeatureEntry>(entry: E): E {
  return entry;
}

export default makeFeatureEntry;
