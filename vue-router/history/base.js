export function createRoute(record, location) {
  const matched = [];
  while (record) {
    matched.unshift(record);
    record = record.parent;
  }
  return {
    ...location,
    matched,
  };
}
function getHash() {
  return window.location.hash.slice(1);
}
class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: "/",
    });
  }
  getLocation() {
    return getHash();
  }
  setupListener() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
    });
  }
  transitionTo(location, onComplete) {
    const route = this.router.match(location);
    if (location === this.current.path && route.matched.length === this.current.matched.length) {
      return;
    }
    this.updateRoute(route);
    onComplete && onComplete();
  }
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(this.current);
  }
  listen(cb) {
    this.cb = cb;
  }
}

export default History;
