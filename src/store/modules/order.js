import { guestAxios } from "../../constants/api/axiosInstance";
// import router from "@/router/router";

const state = {
  order: {},
  orderList: {},
  checkout: null,
  userOrderList: null,
};

const getters = {
  order: (state) => state.order,
  orderList: (state) => state.orderList,
  checkout: (state) => state.checkout,
  userOrderList: (state) => state.userOrderList,
};
const mutations = {
  setOrder(state, data) {
    state.order = data;
  },
  setOrderList(state, data) {
    state.orderList = data;
  },
  setCheckout(state, data){
    state.checkout = data
  },
  setUserOrderList(state, data){
    state.userOrderList = data
  }
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
    try {
      await guestAxios.post("/order/create", formData).then((response) => {
        commit("setLoading", false);
        commit("setCart", [])
        commit("setCheckout", response.data.order)
        // router.push({ path: "/checkout" });
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
