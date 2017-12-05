import { IFeatureEntry } from 'shared/types/app';

import selectors from './redux/data/selectors';
import actions from './redux/actions';
import DynamicFields from './view/DynamicFields/DynamicFields';
import { default as reducer } from './redux/reducers';
import getSaga from './redux/actions/sagas';

const containers = { DynamicFields };

const entry: IFeatureEntry<typeof containers, typeof actions, typeof selectors> = {
  actions,
  selectors,
  containers,
  reducers: { dynamicFields: reducer },
  sagas: [getSaga],
};

type Entry = typeof entry;

export { Entry, entry };
