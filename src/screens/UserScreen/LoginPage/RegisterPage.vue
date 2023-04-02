<template>
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
</template>

<script>
export default {
  methods: {
    returnToLogin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped>
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