import { IFeatureEntry } from 'shared/types/app';

import * as selectors from './redux/selectors';
import * as actions from './redux/actions';
import * as containers from './view/containers';
import { default as reducer } from './redux/reducers';
import getSaga from './redux/sagas';

const entry: IFeatureEntry<typeof containers, typeof actions, typeof selectors> = {
  actions,
  selectors,
  containers,
  reducers: { categorySelect: reducer },
  sagas: [getSaga],
};

type Entry = typeof entry;

export { Entry, entry };
