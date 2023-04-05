<template>
  <div class="login-container">
    <div class="login-container-title flex">
      <div class="login-logo flex">
        <img src="@/assets/Icons/pizza.png" alt="" />
      </div>
      <div class="flex">Foodie</div>
    </div>
    <div class="login-container-main">
      <div class="main-input">
        <div class="input-title text-italic">Họ tên *</div>
        <DxTextBox />
      </div>
      <div class="main-input">
        <div class="input-title text-italic">Số điện thoại *</div>
        <DxTextBox />
      </div>
      <div class="main-input">
        <div class="input-title text-italic">Email *</div>
        <DxTextBox />
      </div>
      <div class="main-input">
        <div class="input-title text-italic">Mật khẩu *</div>
        <DxTextBox :mode="'password'" :passwordChar="'*'" />
      </div>
      <div class="main-input">
        <div class="input-title text-italic">Nhập lại mật khẩu *</div>
        <DxTextBox :mode="'password'" :passwordChar="'*'" />
      </div>
      <div v-if="isWrongPassword == true" class="text-red text-italic">
        <div>Tài khoản hoặc mật khẩu chưa chính xác.</div>
        <div>Vui lòng đăng nhập lại.</div>
      </div>
      <div class="login-button">
        <BaseButton buttonType="regular-square" buttonName="Đăng ký" />
      </div>
      <div class="forget-password flex" @click="returnToLogin">
        Quay lại đăng nhập.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    returnToLogin() {
      this.$router.push({ path: "/auth/login" });
    },
  },
};
</script>

<style scoped>
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