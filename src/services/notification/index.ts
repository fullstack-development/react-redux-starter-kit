import { IReduxEntry } from 'shared/types/app';

import * as namespace from './namespace';
import { actionCreators, selectors, reducer, getSaga } from './redux';
import * as containers from './view/containers';

export { namespace, selectors, actionCreators, containers };

export const reduxEntry: IReduxEntry = {
  reducers: { notification: reducer },
  sagas: [getSaga],
};
