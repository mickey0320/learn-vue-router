function addRouteRecord(route, pathMap, parent) {
  const path = parent ? `${parent.path}/${route.path}` : route.path;

  const record = {
    path,
    component: route.component,
    parent,
  };
  if (!pathMap[path]) {
    pathMap[path] = record;
  }
  if (route.children) {
    route.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathMap, record);
    });
  }
}

export default function createRouteMap(routes, oldPathMap) {
  const pathMap = oldPathMap || Object.create(null);
  routes.forEach((route) => {
    addRouteRecord(route, pathMap);
  });
  return {
    pathMap,
  };
}
