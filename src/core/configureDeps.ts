import { IDependencies } from 'shared/types/app';
import { Api } from 'services/api/Api';

export function configureDeps(): IDependencies {
  const api = new Api();

  return { api };
}
