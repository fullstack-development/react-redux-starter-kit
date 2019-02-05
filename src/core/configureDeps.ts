import { Store } from 'redux';

import { IDependencies, IAppReduxState } from 'shared/types/app';

import Api from 'services/api/Api';

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api();

  return { api };
}
