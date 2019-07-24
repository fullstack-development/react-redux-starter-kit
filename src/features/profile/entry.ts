import makeFeatureEntry from 'shared/helpers/makeFeatureEntry';

import { IReduxEntry } from 'shared/types/app';

import { actions, selectors, reducer } from './redux';
import * as containers from './view/containers';

export const reduxEntry: IReduxEntry = {
  reducers: { profile: reducer },
};

const entry = makeFeatureEntry({
  containers,
  actions,
  selectors,
  reduxEntry,
});

type Entry = typeof entry;
export { Entry, entry };
