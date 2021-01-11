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
function runQueue(queue, iterator, cb) {
  function step(index) {
    if (index >= queue.length) {
      cb();
      return;
    }
    iterator(queue[index], () => {
      setp(index + 1);
    });
  }
  step(0);
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
    const queue = this.router.beforeHooks;
    function iterator(hook, next) {
      hook(this.current, route, () => {
        next();
      });
    }
    runQueue(queue, iterator, () => {
      this.updateRoute(route);
      onComplete && onComplete();
    });
  }
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(this.current);
  }
  listen(cb) {
    this.cb = cb;
  }
  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location;
    });
  }
}

export default History;
