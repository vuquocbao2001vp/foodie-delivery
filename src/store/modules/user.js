const state = {
  loginRole: "guest",
};

const getters = {
  loginRole(state){
    return state.loginRole;
  }
};
const mutations = {
  setRole(state, role){
    console.log(role);
    state.loginRole = role;
  }
};

const actions = {
  
};

export default {
  state,
  getters,
  mutations,
  actions,
};
