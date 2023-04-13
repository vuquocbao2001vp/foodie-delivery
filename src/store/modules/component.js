import router from "@/router/router";
import { guestAxios } from "../../constants/api/axiosInstance";
const state = {
  loading: false, // hiển thị loading
  toastMessage: null, // hiển thị toast
  loginRole: null, // role đăng nhập, dùng để hiển thị component
  isLoginSuccess: undefined, // trạng thái đăng nhập
  menuFilter: {
    name: 'null',
    minPrice: null,
    maxPrice: null
  },
  productFilter: null,
  productDetail: null,
};

const getters = {
  loading: state => state.loading,
  toastMessage: state => state.toastMessage,
  loginRole: state => state.loginRole,
  isLoginSuccess: (state) => state.isLoginSuccess,
  menuFilter: (state) => state.menuFilter,
  productFilter: (state) => state.productFilter,
  productDetail: (state) => state.productDetail,
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
  /**
   * Thay đổi role đăng nhập
   */
  setRole(state, role){
    state.loginRole = role;
  },
  setLoginStatus(state, isSuccess){
    state.isLoginSuccess = isSuccess;
  },
  setMenuFilter(state, {name, minPrice, maxPrice}){
    state.menuFilter.name = name;
    state.menuFilter.minPrice = minPrice;
    state.menuFilter.maxPrice = maxPrice;
  },
  setProductFilter(state, products){
    state.productFilter = products;
  },
  setProductDetail(state, product){
    state.productDetail = product;
  }
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
  async getProductFilter({ commit}, {category_id, name, min_price, max_price, limit, page}) {
    commit("setLoading", true);
    try {
      await guestAxios
        .get("/product/list", {
          params: {
            category_id: category_id,
            name: name,
            min_price: min_price,
            max_price: max_price,
            limit: limit,
            page: page
          },
        })
        .then((response) => {
          commit("setProductFilter", response.data.data);
          commit("setLoading", false);
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },
  async getProductDetail({ commit}, id) {
    commit("setLoading", true);
    try {
      await guestAxios
        .get(`/product/${id}`)
        .then((response) => {
          commit("setProductDetail", response.data.data);
          commit("setLoading", false);
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },
  linkToLoginPage(){
    router.push({ path: "/auth/admin/login" });
  }
}
export default {
  state,
  getters,
  mutations,
  actions
};
