import makeFeatureEntry from 'shared/helpers/makeFeatureEntry';

import { actions, selectors, reducer } from './redux';
import * as containers from './view/containers';

const entry = makeFeatureEntry({
  containers,
  actions,
  selectors,
  reduxEntry: {
    reducers: { profile: reducer },
  },
});

type Entry = typeof entry;
export { Entry, entry };
