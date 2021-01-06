export default {
  name: "routerView",
  functional: true,
  render(h, { parent, data }) {
    let depth = 0;
    data.routerView = true;
    const route = parent.$route;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    const record = route.matched[depth];
    if (record) {
      return h(record.component, data);
    } else {
      return h();
    }
  },
};
