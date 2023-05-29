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
  articleSelected: null,
  articles: null,
  showArticles: null,
  showArticleSelected: null,
  overview: null,
  userList: null,
};

const getters = {
  loading: state => state.loading,
  toastMessage: state => state.toastMessage,
  loginRole: state => state.loginRole,
  isLoginSuccess: (state) => state.isLoginSuccess,
  menuFilter: (state) => state.menuFilter,
  productFilter: (state) => state.productFilter,
  productDetail: (state) => state.productDetail,
  articleSelected: (state) => state.articleSelected,
  articles: (state) => state.articles,
  showArticleSelected: (state) => state.showArticleSelected,
  showArticles: (state) => state.showArticles,
  overview: (state) => state.overview,
  userList: (state) => state.userList,
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
  },
  setArticle(state, article){
    state.articleSelected = article
  },
  setArticles(state, articles){
    state.articles = articles
  },
  setShowArticle(state, article){
    state.showArticleSelected = article
  },
  setShowArticles(state, articles){
    state.showArticles = articles
  },
  setOverview(state, overview){
    state.overview = overview
  },
  setUserList(state, list){
    state.userList = list
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
  async getProductFilter({ commit}, {page, per_page, category_id, name, min_price, max_price}) {
    commit("setLoading", true);
    const formData = new FormData();
    if(category_id) formData.append('category_id', category_id);
    if(name) formData.append('name', name);
    if(min_price) formData.append('min_price', min_price);
    if(max_price) formData.append('max_price', max_price);
    try {
      await guestAxios
        .post("/product/list", formData, {
          params: {
            page: page,
            per_page: per_page,
          },
        })
        .then((response) => {
          commit("setProductFilter", response.data.data.data);
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
