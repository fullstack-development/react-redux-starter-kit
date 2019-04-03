import makeFeatureEntry from 'shared/helpers/makeFeatureEntry';

import { actions, selectors, reducer, getSaga } from './redux';
import * as containers from './view/containers';

const entry = makeFeatureEntry({
  containers,
  actions,
  selectors,
  reduxEntry: {
    reducers: { usersSearch: reducer },
    sagas: [getSaga],
  },
});

type Entry = typeof entry;
export { Entry, entry };
