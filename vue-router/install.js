export let _Vue;
import RouterLink from "./components/link";
import RouterView from "./components/view";

function install(Vue) {
  _Vue = Vue;

  Vue.component("router-link", RouterLink);
  Vue.component("router-view", RouterView);
  Vue.mixin({
    beforeCreate() {
      // 根实例，new vue出的那个实例
      if (this.$options.router) {
        this._routerRoot = this;
        this._router = this.$options.router;

        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });
}

export default install;
