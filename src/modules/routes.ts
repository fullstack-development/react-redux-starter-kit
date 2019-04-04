import { routes as searchRoutes } from './Search/routes';
import { routes as profileRoutes } from './Profile/routes';
import { routes as homeRoutes } from './Home/routes';

export default {
  ...searchRoutes,
  ...profileRoutes,
  ...homeRoutes,
};
