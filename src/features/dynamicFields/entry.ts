import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as actions from './redux/actions';
import * as selectors from './redux/data/selectors';
import DynamicFields from './view/DynamicFields/DynamicFields';
import reducer from './redux/reducers';
import getSaga from './redux/sagas';

const containers = { DynamicFields };

const entry = getFeatureEntry(
  containers, actions, selectors,
  {
    reducers: { dynamicFields: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
