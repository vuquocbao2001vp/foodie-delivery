import { adminAxios, guestAxios } from "../../constants/api/axiosInstance";
import router from "@/router/router";

const state = {
  admin: null,
  adminToken: null,
  categories: null,
  products: null,
};

const getters = {
  admin: (state) => state.admin,
  adminToken: (state) => state.adminToken,
  categories: (state) => state.categories,
  products:(state) => state.products,
};
const mutations = {
  setAdminToken(state, token) {
    state.adminToken = token;
    adminAxios.defaults.headers.common["Authorization"] = token;
  },
  /**
   * Gán dữ liệu vào state danh sách danh mục
   */
  setCategories(state, data) {
    state.categories = data;
  },
  setProducts(state, data) {
    state.products = data;
  },
  setAdmin(state, data){
    state.admin = data;
  }
};

const actions = {
  async adminLogin({ commit, dispatch }, { email, password }) {
    commit("setLoading", true);
    try {
      const response = await guestAxios.post("/admin/auth/login", {
        email,
        password,
      });
      commit("setAdminToken", response.data.token);
      commit("setLoginStatus", true);
      commit("setRole", "admin");

      // Set the logout timer to 1 hour
      setTimeout(() => {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        dispatch("adminLogout");
      }, 2* 60 * 60 * 1000);

      commit("setLoading", false);
    } catch {
      commit("setLoading", false);
      commit("setLoginStatus", false);
    }
  },

  async adminLogout({ commit, dispatch }) {
    commit("setLoading", true);
    try {
      await adminAxios.get("/logout");
      
      dispatch("clearLocalStorage");
      commit("setLoading", false);

      router.push({ path: "/auth/admin/login" });
    } catch {
      commit("setLoading", false);
    }
  },
  clearLocalStorage({ commit }) {
    commit("setAdmin", null)
    commit("setAdminToken", null);
    commit("setCategories", null);
    commit("setProducts", null);
  },

  async getAdminDetail({ commit}) {
    commit("setLoading", true);
    try {
      const response = await adminAxios.get("/user");
      commit("setAdmin", response.data)
      commit("setLoading", false);
    } catch {
      commit("setLoading", false);
    }
  },

  async updateAdmin({ commit }, admin) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('first_name', admin.first_name);
    formData.append('last_name', admin.last_name);
    formData.append('phone', admin.phone);
    formData.append('address', admin.address);
    try {
      await adminAxios.post("/user/update", formData).then(() => {
        commit("setLoading", false);
        commit("setAdmin", admin)
      });
    } catch(error) {
      console.log(error);
      commit("setLoading", false);
    }
  },
  /**
   * Api lấy tất cả danh mục
   */
  async getCategories({ commit}) {
    try {
      commit("setLoading", true);
      await adminAxios.get("/admin/category/getAll").then((response) => {
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
      await adminAxios.delete(`/admin/category/delete/${id}`).then(() => {
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
   * Api xóa nhiều danh mục theo id
   */
  async deleteMultiCategory({ commit, dispatch }, ids) {
    try {
      commit("setLoading", true);
      await adminAxios.delete('/admin/category/delete-many', {
        data: {
          ids: ids
        }
      }).then(() => {
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
      await adminAxios.post("/admin/category/create", category).then(() => {
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
      await adminAxios
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

  /**
   * Api lấy sản phẩm
   */
  async getProducts({ commit }, { page, per_page, category_id, name }) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('category_id', category_id);
    formData.append('name', name);
    try {
      await adminAxios
        .post("/admin/product/list", formData, {
          params: {
            page: page,
            per_page: per_page,
          }
        })
        .then((response) => {
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
    commit("setLoading", true);
    try {
      await adminAxios.delete(`/admin/product/delete/${id}`).then(() => {
        dispatch("getProducts", { page: 1, per_page: 10, category_id: "", name: "" });
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
  async createProduct({ commit, dispatch }, {product, image}) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category_id', product.category_id);
    formData.append('description', product.description);
    formData.append('image', image);
    formData.append('price', product.price);
    formData.append('status', product.status);
    formData.append('highlight', product.highlight);
    try {
      await adminAxios.post("/admin/product/create", formData).then(() => {
        dispatch("getProducts", { page: 1, per_page: 10, category_id: "", name: "" });
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
  async editProduct({ commit, dispatch }, { id, product, image }) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category_id', product.category_id);
    formData.append('description', product.description);
    if(image != null){
      formData.append('image', image);
    }
    formData.append('price', product.price);
    formData.append('status', product.status);
    formData.append('highlight', product.highlight);
    try {
      await adminAxios.post(`/admin/product/update/${id}`, formData).then(() => {
        dispatch("getProducts", { page: 1, per_page: 10, category_id: "", name: "" });
        commit("setLoading", false);
        dispatch("showToastMessage", "Sửa sản phẩm thành công.");
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async createArticle({ commit, dispatch }, {body, title, image}) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('body', body);
    formData.append('title', title);
    if(image != null){
      formData.append('image', image);
    }
    try {
      await adminAxios.post('/admin/article/create', formData).then(() => {
        commit("setLoading", false);
        dispatch("showToastMessage", "Tạo bài viết thành công.");
        dispatch("getArticleList", '')
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async updateArticle({ commit, dispatch }, {id, body, title, image}) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('body', body);
    formData.append('title', title);
    if(image != null){
      formData.append('image', image);
    }
    try {
      await adminAxios.post(`/admin/article/${id}`, formData).then(() => {
        commit("setLoading", false);
        dispatch("showToastMessage", "Sửa bài viết thành công.");
        dispatch("getArticleList", '')
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getArticle({ commit }, id) {
    commit("setLoading", true);
    try {
      await adminAxios.get(`/admin/article/${id}`).then((response) => {
        commit("setLoading", false);
        commit("setArticle", response.data.data)
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getArticleList({ commit }, search) {
    commit("setLoading", true);
    try {
      await adminAxios.get('/admin/article', {
        params: {
          search: search
        }
      }).then((response) => {
        commit("setArticles", response.data.data)
        commit("setLoading", false);
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async deleteArticle({ commit, dispatch}, id) {
    commit("setLoading", true);
    try {
      await adminAxios.delete(`/admin/article/${id}`).then(() => {
        commit("setLoading", false);
        dispatch("showToastMessage", "Xóa bài viết thành công.");
        dispatch("getArticleList", '')
      });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async getOrderList({ commit }, { page, per_page, search, status }) {
    commit("setLoading", true);
    const formData = new FormData();
    formData.append('search', search);
    formData.append('status', status);
    try {
      await adminAxios
        .post("/orders", formData, {
          params: {
            page: page,
            per_page: per_page,
          }
        })
        .then((response) => {
          commit("setOrderList", response.data.data);
          commit("setLoading", false);
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async updateOrder({ commit }, { id, status }) {
    commit("setLoading", true);
    try {
      await adminAxios
        .put("admin/order/update", {
            id: id,
            status: status,
          }
        )
        .then(() => {
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
