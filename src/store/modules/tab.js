export default {
  actions: {
    changeTab(context, data) {
      context.commit("CHANGE_TAB", data);
    },
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    CHANGE_TAB(state, value) {
      state.tabName = value;
    },
    PAGE_CHANGE(state, value) {
      state.activedPageName = value;
    },
  },
  state: {
    isCollapse: false, //控制菜单的展开或收起
    tabName: "",
    activedPageName: "",
  },
};
