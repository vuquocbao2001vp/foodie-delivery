const state = {
  isLinkToLogin: false,
  loginRole: "admin",
};

const getters = {
  isLinkToLogin(state) {
    return state.isLinkToLogin;
  },
  loginRole(state){
    return state.loginRole;
  }
};
const mutations = {
  setIsLinkToLogin(state, isLinked) {
    state.isLinkToLogin = isLinked;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
