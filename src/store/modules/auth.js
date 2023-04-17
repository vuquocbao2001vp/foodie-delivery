import { guestAxios } from "../../constants/api/axiosInstance";
const state = {
  signupStatus: null, //trạng thái đăng kí: 1-gọi api thành công, 2-đã tồn tại
  verifyCodeStatus: null, //trạng thái xác nhận code: 1-đúng code, 2-sai code
  resendCodeStatus: null, //1-gửi code thành công, 2-gửi không thành công
  forgotPasswordStatus: null, //1-gửi api thành công, 2-Email không tồn tại
  resetPasswordStatus: null, //1-gửi api thành công, 2-gửi không thành công
};

const getters = {
  signupStatus: (state) => state.signupStatus,
  verifyCodeStatus: (state) => state.verifyCodeStatus,
  resendCodeStatus: (state) => state.resendCodeStatus,
  forgotPasswordStatus: (state) => state.forgotPasswordStatus,
  resetPasswordStatus: (state) => state.resetPasswordStatus,
};
const mutations = {
  setSignupStatus(state, data) {
    state.signupStatus = data;
  },
  setVerifyCodeStatus(state, data) {
    state.verifyCodeStatus = data;
  },
  setResendCodeStatus(state, data) {
    state.resendCodeStatus = data;
  },
  setForgotPasswordStatus(state, data) {
    state.forgotPasswordStatus = data;
  },
  setResetPasswordStatus(state, data) {
    state.resetPasswordStatus = data;
  },
};
const actions = {
  async userSignup({ commit }, { email, password }) {
    commit("setLoading", true);
    try {
      await guestAxios
        .post("/auth/signup", {
          email: email,
          password: password,
        })
        .then((response) => {
          commit("setLoading", false);
          if (response.data.message === "api.signup_success") {
            commit("setSignupStatus", 1);
          }
        });
    } catch (error) {
      commit("setLoading", false);
      if (error.response.data.message === "api.email_existed") {
        commit("setSignupStatus", 2);
      }
    }
  },

  async verifyCode({ commit }, { email, code }) {
    commit("setLoading", true);
    try {
      await guestAxios
        .post("/auth/verify-code", {
          email: email,
          code: code,
        })
        .then((response) => {
          commit("setLoading", false);
          if (response.data.is_correct === true) {
            commit("setVerifyCodeStatus", 1);
          }
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async resendCode({ commit }, { email }) {
    commit("setLoading", true);
    try {
      await guestAxios
        .post("/auth/resend-code", {
          email: email,
        })
        .then((response) => {
          commit("setLoading", false);
          if (response.data.message === "api.send_mail_success") {
            commit("setResendCodeStatus", 1);
          }
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async forgotPassword({ commit }, { email }) {
    commit("setLoading", true);
    try {
      await guestAxios
        .post("/auth/forgot-password", {
          email: email,
        })
        .then((response) => {
          commit("setLoading", false);
          if (response.data.message === "api.send_mail_success") {
            commit("setForgotPasswordStatus", 1);
          }
        });
    } catch (error) {
      commit("setLoading", false);
      console.log(error);
    }
  },

  async resetPassword({ commit }, { email, password }) {
    commit("setLoading", true);
    try {
      await guestAxios
        .post("/auth/reset-password", {
          email: email,
          password: password,
        })
        .then((response) => {
          commit("setLoading", false);
          if (response.data.message === "api.reset_password_success") {
            commit("setResetPasswordStatus", 1);
          }
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
