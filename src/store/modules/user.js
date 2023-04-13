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
  setUser(state, user){
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
  setCart(state, data){
    state.cart = data;
  },
  addToCart(state, object){
    const index = state.cart.findIndex(item => item.product.id === object.product.id);
    if(index !== -1){
      state.cart[index].quantity += object.quantity;
    }
    else {
      state.cart.push(object);
    }
  },
  removeCartItem(state, productId){
    const index = state.cart.findIndex(item => item.product.id === productId);
    if(index !== -1){
      state.cart.splice(index, 1);
    }
  },
  updateCartItemQuantity(state, {productId, quantity}){
    const index = state.cart.findIndex(item => item.product.id === productId);
    if(index !== -1){
      if(quantity === 0){
        state.cart.splice(index, 1);
      } else{
        state.cart[index].quantity = quantity;
      }
    }
  }
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
    commit("setUser", null)
    commit("setUserToken", null);
    // commit("setCategories", null);
    // commit("setProducts", null);
  },

  async getUserDetail({ commit}) {
    commit("setLoading", true);
    try {
      const response = await userAxios.get("/user");
      commit("setUser", response.data)
      commit("setLoading", false);
    } catch {
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

  async getListProducts({ commit}, {category_id, name, min_price, max_price, limit, page}) {
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
          commit("setListProducts", response.data.data);
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
