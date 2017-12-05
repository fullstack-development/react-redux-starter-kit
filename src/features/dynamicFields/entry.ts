
import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import selectors from './redux/data/selectors';
import actions from './redux/actions';
import DynamicFields from './view/DynamicFields/DynamicFields';
import reducer from './redux/reducers';
import getSaga from './redux/actions/sagas';

const containers = { DynamicFields };

const entry = getFeatureEntry(
  containers,
  actions,
  selectors,
  {
    reducers: { dynamicFields: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
