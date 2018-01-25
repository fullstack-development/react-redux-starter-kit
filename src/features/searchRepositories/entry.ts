import { makeFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import SearchRepositoriesInput from './view/SearchInput/SearchInput';

const containers = { SearchRepositoriesInput };

const entry = makeFeatureEntry(
  containers, null, null,
);

type Entry = typeof entry;

export { Entry, entry };
