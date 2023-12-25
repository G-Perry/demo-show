export default {
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
  state: {
    isCollapse: false, //控制菜单的展开或收起
  },
};
