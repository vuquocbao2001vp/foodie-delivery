import { guestAxios } from "../../constants/api/axiosInstance";
import router from "@/router/router";

const state = {
  order: {},
  orderlist: [],
};

const getters = {
  order: (state) => state.order,
};
const mutations = {
  setOrder(state, data) {
    state.order = data;
  },
};
const actions = {
  async createOrder(
    { commit },
    { is_user, user_id, products_id, products_amount, note, user }
  ) {

    commit("setLoading", true);
    const formData = new FormData();
    formData.append("is_user", is_user);
    formData.append("user_id", user_id);
    for (let i = 0; i < products_id.length; i++) {
      formData.append("products_id[]", products_id[i]);
    }
    for (let i = 0; i < products_amount.length; i++) {
      formData.append("products_amount[]", products_amount[i]);
    }
    formData.append("note", note);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("address", user.address);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      await guestAxios.post("/order/create", formData).then(() => {
        commit("setLoading", false);
        commit("setCart", [])
        router.push({ path: "/checkout" });
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
