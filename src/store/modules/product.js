import axiosInstance from "../../constants/api/axiosInstance";

const state = {
  products: [],
};

const getters = {
  products(state) {
    return state.products;
  },
};
const mutations = {
  setProducts(state, data) {
    state.products = data;
  },
};

const actions = {
  async getProducts({ commit }, { limit, offset }) {
    try {
      commit("setLoading", true);
      await axiosInstance
        .get("/admin/product/list", {
          params: {
            limit: limit,
            offset: offset,
          },
        })
        .then((response) => {
          sessionStorage.setItem(
            "products",
            JSON.stringify(response.data.data)
          );
          commit("setProducts", response.data.data);
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
