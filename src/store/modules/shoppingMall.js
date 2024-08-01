const shoppingMall = {
  state: {
    topActiveIndex: 1,
  },

  mutations: {
    SET_TOP_ACTIVE_INDEX: (state, index) => {
      state.topActiveIndex = index;
    },
  },

  actions: {
    changeActiveIndex({ commit }, index) {
      commit("SET_TOP_ACTIVE_INDEX", index);
    },
    initActiveIndex: ({ commit }, routeName) => {
      let dataMap = {
        goodsList: 0,
        shoppingCart: 0,
        shoppingMall: 1,
        goodsDetails: 1,
        shoppingOrder: 2,
      };
      commit("SET_TOP_ACTIVE_INDEX", dataMap[routeName]);
    },
  },
};

export default shoppingMall;
