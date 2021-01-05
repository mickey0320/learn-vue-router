export let _Vue;
import RouterLink from "./components/link";
import RouterView from "./components/view";

function install(Vue, options) {
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

  Vue.prototype.$router = {};
  Vue.prototype.$route = {};
}

export default install;
