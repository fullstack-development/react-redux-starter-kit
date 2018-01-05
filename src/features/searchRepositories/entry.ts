import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import SearchRepositoriesInput from './view/SearchInput/SearchInput';

const containers = { SearchRepositoriesInput };

const entry = getFeatureEntry(
  containers, null, null,
);

type Entry = typeof entry;

export { Entry, entry };
