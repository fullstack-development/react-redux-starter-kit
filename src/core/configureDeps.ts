import { Store } from 'redux';

import { IDependencies, IAppReduxState } from 'shared/types/app';

import Api from 'shared/api';

export default function configureDeps(store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  return { api };
}
