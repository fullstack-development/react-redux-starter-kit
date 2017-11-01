import { IFeatureEntry, BundleLoader } from 'shared/types/app';

import * as namespace from './namespace';
import sel from './redux/data/selectors';
import act from './redux/actions';
import LocationSelect from './view/containers/LocationSelect/LocationSelect';
import { default as reducer } from './redux/reducers';
import getSaga from './redux/actions/sagas';

const actions = { ...act };
const selectors = { ...sel };
const containers = { LocationSelect };

const entry: IFeatureEntry<typeof containers, typeof actions, typeof selectors> = {
  actions,
  selectors,
  containers,
  reducers: { locationSelect: reducer },
  sagas: [getSaga],
};

type Entry = typeof entry;

export { Entry, namespace };
export default entry as any as BundleLoader<Entry>;