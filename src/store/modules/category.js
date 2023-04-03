import axiosInstance from "../../constants/api/axiosInstance";

const state = {
  categories: [],
};

const getters = {
  categories(state) {
    return state.categories;
  },
};
const mutations = {
  /**
   * Gán dữ liệu vào state danh sách danh mục
   */
  setCategories(state, data) {
    state.categories = data;
  },
};

const actions = {
  /**
   * Api lấy tất cả danh mục
   */
  async getCategories({ commit }) {
    try {
      commit("setLoading", true);
      await axiosInstance.get("/admin/category/getAll").then((response) => {
        sessionStorage.setItem(
          "categories",
          JSON.stringify(response.data.data)
        );
        commit("setCategories", response.data.data);
        commit("setLoading", false);
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  /**
   * Api xóa danh mục theo id
   */
  async deleteCategory({ commit, dispatch }, id) {
    try {
      commit("setLoading", true);
      await axiosInstance.delete(`/admin/category/delete/${id}`).then(() => {
        dispatch("getCategories");
        commit("setLoading", false);
        dispatch("showToastMessage", "Xóa danh mục thành công.");
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  /**
   * Api thêm mới danh mục
   */
  async createCategory({ commit, dispatch }, category) {
    try {
      commit("setLoading", true);
      await axiosInstance.post("/admin/category/create", category).then(() => {
        dispatch("getCategories");
        commit("setLoading", false);
        dispatch("showToastMessage", "Thêm danh mục mới thành công.");
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  /**
   * Api sửa danh mục
   */
  async editCategory({ commit, dispatch }, { id, category }) {
    try {
      commit("setLoading", true);
      await axiosInstance
        .put(`/admin/category/update/${id}`, category)
        .then(() => {
          dispatch("getCategories");
          commit("setLoading", false);
          dispatch("showToastMessage", "Sửa danh mục thành công.");
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
