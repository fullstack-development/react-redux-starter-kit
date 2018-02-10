import { makeFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as selectors from './redux/data/selectors';
import * as actions from './redux/actions';
import reducer from './redux/reducers';
import getSaga from './redux/sagas';
import LocationSelect from './view/containers/LocationSelect/LocationSelect';

const containers = { LocationSelect };

const entry = makeFeatureEntry(
  containers, actions, selectors,
  {
    reducers: { locationSelect: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
