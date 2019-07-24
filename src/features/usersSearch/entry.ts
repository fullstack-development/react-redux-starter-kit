import makeFeatureEntry from 'shared/helpers/makeFeatureEntry';

import { IReduxEntry } from 'shared/types/app';

import { actions, selectors, reducer, getSaga } from './redux';
import * as containers from './view/containers';

export const reduxEntry: IReduxEntry = {
  reducers: { usersSearch: reducer },
  sagas: [getSaga],
};

const entry = makeFeatureEntry({
  containers,
  actions,
  selectors,
  reduxEntry,
});

type Entry = typeof entry;
export { Entry, entry };
