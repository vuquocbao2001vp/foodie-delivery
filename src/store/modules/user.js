import { userAxios, guestAxios } from "../../constants/api/axiosInstance";
import router from "@/router/router";

const state = {
  user: null,
  userToken: null,
  listCategories: null,
  listProducts: null,
  cart: [],
};

const getters = {
  user: (state) => state.user,
  userToken: (state) => state.userToken,
  listCategories: (state) => state.listCategories,
  listProducts: (state) => state.listProducts,
  cart: (state) => state.cart,
};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setUserToken(state, token) {
    state.userToken = token;
    userAxios.defaults.headers.common["Authorization"] = token;
  },
  setListCategories(state, data) {
    state.listCategories = data;
  },
  setListProducts(state, data) {
    state.listProducts = data;
  },
  setCart(state, data) {
    state.cart = data;
  },

  addToCart(state, object) {
    console.log(state.cart);
    if (state.cart) {
      const index = state.cart.findIndex(
        (item) => item.product.id === object.product.id
      );
      if (index !== -1) {
        state.cart[index].amount += object.amount;
      } else {
        state.cart.push(object);
      }
    }
    else {
      state.cart = [];
      state.cart.push(object);
    }
  },
  removeCartItem(state, productId) {
    const index = state.cart.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  },
  updateCartItemQuantity(state, { productId, amount }) {
    const index = state.cart.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      if (amount === 0) {
        state.cart.splice(index, 1);
      } else {
        state.cart[index].amount = amount;
      }
    }
  },
};

const actions = {
  async userLogin({ commit }, { email, password }) {
    commit("setLoading", true);
    try {
      const response = await guestAxios.post("/auth/login", {
        email,
        password,
      });

      commit("setUserToken", response.data.token);
      commit("setLoginStatus", true);
      commit("setRole", "user");
      commit("setLoading", false);
    } catch {
      commit("setLoading", false);
      commit("setLoginStatus", false);
    }
  },

  async userLogout({ commit, dispatch }) {
    commit("setLoading", true);
    try {
      await userAxios.get("/logout");

      dispatch("clearLocalStorage");
      commit("setLoading", false);

      router.push({ path: "/auth/login" });
    } catch {
      commit("setLoading", false);
    }
  },
  clearLocalStorage({ commit }) {
    commit("setUser", null);
    commit("setUserToken", null);
    commit("setCart", null);
    // commit("setCategories", null);
    // commit("setProducts", null);
  },

  async getUserDetail({ commit }) {
    commit("setLoading", true);
    try {
      const response = await userAxios.get("/user");
      commit("setUser", response.data);
      commit("setLoading", false);
    } catch {
      commit("setLoading", false);
    }
  },

  async updateUser({ commit }, user) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    try {
      await userAxios.post("/user/update", formData).then(() => {
        commit("setLoading", false);
        commit("setUser", user)
      });
    } catch(error) {
      console.log(error);
      commit("setLoading", false);
    }
  },

  async getListCategories({ commit }) {
    commit("setLoading", true);
    try {
      await guestAxios.get("/categories").then((response) => {
        commit("setListCategories", response.data.data);
        commit("setLoading", false);
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getListProducts(
    { commit },
    {page, per_page, category_id, name, min_price, max_price }
  ) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('category_id', category_id);
    formData.append('name', name);
    formData.append('min_price', min_price);
    formData.append('max_price', max_price);
    try {
      await guestAxios
        .post("/product/list", formData, {
          params: {
            page: page,
            per_page: per_page,
          },
        })
        .then((response) => {
          commit("setListProducts", response.data.data.data);
          commit("setLoading", false);
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async addProductToCart({ commit, dispatch }, { product_id, amount }) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("amount", amount);
    try {
      await userAxios.post("/cart/add-or-update", formData).then(() => {
        commit("setLoading", false);
        if (router.path == "cart") {
          dispatch("getCartDetail");
        }
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getCartDetail({ commit }) {
    commit("setLoading", true);
    try {
      await userAxios.get("/cart").then((response) => {
        commit("setLoading", false);
        commit("setCart", response.data.data);
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getShowArticles({ commit }) {
    commit("setLoading", true);
    try {
      await guestAxios.get("/article").then((response) => {
        commit("setLoading", false);
        commit("setShowArticles", response.data.data);
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getShowArticleSelected({ commit }, id) {
    commit("setLoading", true);
    try {
      await guestAxios.get(`/article/${id}`).then((response) => {
        commit("setLoading", false);
        commit("setShowArticle", response.data.data);
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getUserOrderList({ commit }) {
    commit("setLoading", true);
    try {
      await userAxios
        .post("/orders", {
          params: {
            page: 1,
            per_page: 100,
          }
        })
        .then((response) => {
          commit("setUserOrderList", response.data.data.data);
          commit("setLoading", false);
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
