<template>
  <div class="login-page flex">
    <div class="login-container">
      <div class="login-container-title flex">
        <div class="login-logo flex">
          <img src="@/assets/Icons/pizza.png" alt="" />
        </div>
        <div class="flex">Foodie</div>
      </div>
      <div class="login-container-main">
        <div v-if="loginMode == 1">
          <div class="main-input">
            <DxTextBox placeholder="Số điện thoại / Email" />
          </div>
          <div class="main-input">
            <DxTextBox
              placeholder="Mật khẩu"
              :mode="'password'"
              :passwordChar="'*'"
            />
          </div>
          <div v-if="isWrongPassword == true" class="text-red text-italic">
            <div>Tài khoản hoặc mật khẩu chưa chính xác.</div>
            <div>Vui lòng đăng nhập lại.</div>
          </div>
          <div class="login-button" @click="login">
            <BaseButton buttonType="regular-square" buttonName="Đăng nhập" />
          </div>
          <div class="forget-password flex" @click="setLoginMode(2)">
            Quên mật khẩu?
          </div>
          <div class="register-text flex text-italic">
            Bạn chưa có tài khoản?&nbsp;<span
              class="text-blue"
              @click="setLoginMode(3)"
              >Đăng ký ngay</span
            >
          </div>
          <div></div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isWrongPassword: false,
      loginMode: 1,
    };
  },

  computed: {},

  mounted() {},
  watch: {
    "$route.path": function (value) {
      if (value === "/login") {
        this.setLoginMode(1);
      }
    },
  },

  methods: {
    login() {
      this.$router.push({ path: "/home" });
    },
    setLoginMode(mode) {
      this.loginMode = mode;
      if (mode == 2) {
        this.$router.push({ path: "/login/forget-password" });
      } else if (mode == 3) {
        this.$router.push({ path: "/login/register" });
      }
    },
  },
};
</script>
<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  justify-content: center;
  box-sizing: border-box;
}
.login-container {
  width: 416px;
  padding: 52px 48px;
  box-sizing: border-box;
  background-color: var(--grey-bg);
  border-radius: 4px;
  box-shadow: 1px 1px 3px 0px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 7%),
    inset 0 0 0 1px rgb(0 0 0 / 5%);
}
.login-container-title {
  height: 56px;
  box-sizing: border-box;
  font-family: Pacifio-Regular;
  font-size: 2.5rem;
  justify-content: center;
  padding-bottom: 48px;
}
.login-logo img {
  width: 52px;
  height: 52px;
  box-sizing: border-box;
  margin-right: 8px;
}
.login-container-main {
  width: 100%;
  box-sizing: border-box;
}
.main-input {
  padding-bottom: 12px;
}
.input-title {
  margin-bottom: 4px;
}
.login-button {
  height: 40px;
  padding-top: 18px;
  padding-bottom: 12px;
}
.forget-password {
  height: 28px;
  justify-content: center;
  cursor: pointer;
}
.forget-password:hover {
  color: var(--text-blue-color);
}
.text-red {
  color: var(--text-red-color);
}
.text-blue {
  color: var(--text-blue-color);
  cursor: pointer;
}
.text-blue:hover {
  border-bottom: 2px solid var(--text-blue-color);
}
.text-italic {
  font-family: Font Italic;
}
.register-text {
  font-size: 0.9rem;
  height: 24px;
  margin-top: 12px;
  margin-bottom: 24px;
  justify-content: center;
}
</style>