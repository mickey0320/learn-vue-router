import createRouteMap from "./create-route-map";

export default function createMatcher(routes) {
  let { pathMap } = createRouteMap(routes);
  function match() {}

  function addRoutes(routes) {
    pathMap = createRouteMap(routes, pathMap);
  }

  return {
    addRoutes,
    match,
  };
}
