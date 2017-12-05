import { IFeatureEntry } from 'shared/types/app';

import selectors from './redux/data/selectors';
import actions from './redux/actions';
import SearchRepositoriesInput from './view/SearchInput';
import { default as reducer } from './redux/reducers';
import getSaga from './redux/actions/sagas';

const containers = { SearchRepositoriesInput };

const entry: IFeatureEntry<typeof containers, typeof actions, typeof selectors> = {
  actions,
  selectors,
  containers,
  reducers: { searchRepositories: reducer },
  sagas: [getSaga],
};

type Entry = typeof entry;

export { Entry, entry };
