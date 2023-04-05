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
  /**
   * Api lấy sản phẩm
   */
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

  /**
   * Api xóa sản phẩm theo id
   */
  async deleteProduct({ commit, dispatch }, id) {
    try {
      commit("setLoading", true);
      await axiosInstance.delete(`/admin/product/delete/${id}`).then(() => {
        dispatch("getProducts", {limit: 10, offset: 10});
        commit("setLoading", false);
        dispatch("showToastMessage", "Xóa sản phẩm thành công.");
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  /**
   * Api thêm mới sản phẩm
   */
  async createProduct({ commit, dispatch }, product) {
    try {
      commit("setLoading", true);
      await axiosInstance.post("/admin/product/create", product).then(() => {
        dispatch("getProducts", {limit: 10, offset: 10});
        commit("setLoading", false);
        dispatch("showToastMessage", "Thêm sản phẩm mới thành công.");
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  /**
   * Api sửa sản phẩm
   */
  async editProduct({ commit, dispatch }, { id, product }) {
    try {
      commit("setLoading", true);
      await axiosInstance
        .put(`/admin/product/update/${id}`, product)
        .then(() => {
          dispatch("getProducts", {limit: 10, offset: 10});
          commit("setLoading", false);
          dispatch("showToastMessage", "Sửa sản phẩm thành công.");
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
