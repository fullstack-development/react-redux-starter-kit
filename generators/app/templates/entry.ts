import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as containers from './view/containers';
import { actions, selectors, reducer, getSaga } from './redux';

const entry = getFeatureEntry(
  containers, actions, selectors,
  {
    reducers: { locationSelect: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
