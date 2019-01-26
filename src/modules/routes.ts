import { routes as homeRoutes } from './Home/routes';
import { routes as demoRoutes } from './Demo/routes';
import { routes as storeRoutes } from './Store/routes';

export default {
  ...homeRoutes,
  ...demoRoutes,
  ...storeRoutes,
};
