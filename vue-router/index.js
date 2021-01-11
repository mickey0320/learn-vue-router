import install from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || []);
    this.beforeHooks = [];

    const mode = options.mode || "hash";

    switch (mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        // this.history = new BrowserHistory(this);
        break;
    }
  }
  // app是new Vue出来的实例
  init(app) {
    const setupHashListener = () => {
      this.history.setupListener();
    };
    this.history.transitionTo(this.history.getLocation(), setupHashListener);
    this.history.listen((route) => {
      app._route = route;
    });
  }
  match(location) {
    return this.matcher.match(location);
  }
  push(to) {
    this.history.push(to);
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
}

VueRouter.install = install;

export default VueRouter;
