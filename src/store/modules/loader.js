const state = {
  loading: false,
};

const getters = {
  loading(state) {
    return state.loading;
  },
};
const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
};
export default {
  state,
  getters,
  mutations,
};
