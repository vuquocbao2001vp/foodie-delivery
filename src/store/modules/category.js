import axiosInstance from '../../constants/api/axiosInstance'

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
      await axiosInstance.get('/admin/category/getAll')
        .then((response) => {
          sessionStorage.setItem("categories", JSON.stringify(response.data.data));
          commit("setCategories", response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Api xóa danh mục theo id
   */
  async deleteCategory({commit, dispatch}, id) {
    try {
      await axiosInstance.delete(`/admin/category/delete/${id}`)
        .then(() => {
          dispatch('getCategories');
          commit("setLoading", true);
        });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Api thêm mới danh mục
   */
  async createCategory({ dispatch}, category) {
    try {
      await axiosInstance.post('/admin/category/create', category)
        .then(() => {
          dispatch('getCategories');
        });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Api sửa danh mục
   */
  async editCategory({ dispatch}, {id, category}) {
    try {
      await axiosInstance.put(`/admin/category/update/${id}`, category)
        .then(() => {
          dispatch('getCategories');
        });
    } catch (error) {
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
