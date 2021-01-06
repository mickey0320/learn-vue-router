import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

export default function createMatcher(routes) {
  let { pathMap } = createRouteMap(routes);
  function match(location) {
    const record = pathMap[location];
    if (!record) {
      return createRoute(null, {
        path: location,
      });
    }
    return createRoute(record, {
      path: location,
    });
  }

  function addRoutes(routes) {
    pathMap = createRouteMap(routes, pathMap);
  }

  return {
    addRoutes,
    match,
  };
}
