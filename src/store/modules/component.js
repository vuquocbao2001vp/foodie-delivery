const state = {
  loading: false, // hiển thị loading
  toastMessage: "", // hiển thị toast
};

const getters = {
  loading(state) {
    return state.loading;
  },
  toastMessage(state){
    return state.toastMessage;
  },
};
const mutations = {
  /**
   * Ẩn hiện loading
   */
  setLoading(state, value) {
    state.loading = value;
  },
  /**
   * Thông báo của toast message
   */
  setToastMessage(state, message){
    state.toastMessage = message;
  },
  /**
   * Xóa message của toast
   */
  clearToastMessage(state){
    state.toastMessage = "";
  },
};
const actions = {
  /**
   * Hiển thị toast trong 3s
   */
  showToastMessage({ commit }, message) {
    commit("setToastMessage", message);
    setTimeout(() => {
      commit("clearToastMessage");
    }, 3000); // Hiển thị Toast trong 3 giây
  },
}
export default {
  state,
  getters,
  mutations,
  actions
};
