import { IFeatureEntry } from 'shared/types/app';

import * as selectors from './redux/data/selectors';
import actions from './redux/actions';
import LocationSelect from './view/containers/LocationSelect/LocationSelect';
import { default as reducer } from './redux/reducers';
import getSaga from './redux/actions/sagas';

const containers = { LocationSelect };

const entry: IFeatureEntry<typeof containers, typeof actions, typeof selectors> = {
  actions,
  selectors,
  containers,
  reducers: { locationSelect: reducer },
  sagas: [getSaga],
};

type Entry = typeof entry;

export { Entry, entry };
