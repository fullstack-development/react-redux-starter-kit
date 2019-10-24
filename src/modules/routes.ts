import { routes as searchRoutes } from './Search/routes';
import { routes as profileRoutes } from './Profile/routes';

export const routes = {
  ...searchRoutes,
  ...profileRoutes,
};
