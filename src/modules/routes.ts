import buildRouteTree from 'build-route-tree';

export const routes = buildRouteTree({
  profile: null,
  search: {
    users: null,
    repositories: null,
  },
});

export default routes;
