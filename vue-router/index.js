import install from "./install";
import createMatcher from "./create-matcher";

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || []);
  }
}

VueRouter.install = install;

export default VueRouter;
