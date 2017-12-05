import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as selectors from './redux/selectors';
import * as actions from './redux/actions';
import * as containers from './view/containers';
import reducer from './redux/reducers';
import getSaga from './redux/sagas';

const entry = getFeatureEntry(
  containers,
  actions,
  selectors,
  {
    reducers: { categorySelect: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
