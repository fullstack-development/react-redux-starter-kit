import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as selectors from './redux/data/selectors';
import actions from './redux/actions';
import LocationSelect from './view/containers/LocationSelect/LocationSelect';
import { default as reducer } from './redux/reducers';
import getSaga from './redux/actions/sagas';

const containers = { LocationSelect };

const entry = getFeatureEntry(
  containers,
  actions,
  selectors,
  {
    reducers: { locationSelect: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
