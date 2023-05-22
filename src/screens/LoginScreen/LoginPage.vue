<template>
  <div class="login-container">
    <div class="login-container-title flex">
      <div class="login-logo flex">
        <img src="@/assets/Icons/pizza.png" alt="" />
      </div>
      <div class="flex">Foodie</div>
    </div>
    <div class="login-container-main">
      <form @submit.prevent="submitForm">
        <div class="main-input">
          <DxTextBox
            label="Email"
            labelMode="floating"
            v-model="emailInput"
            :on-initialized="onInitialized"
            value-change-event="focusout"
            max-length="100"
          >
            <DxValidator>
              <DxRequiredRule message="" />
            </DxValidator>
          </DxTextBox>
        </div>
        <div class="main-input">
          <DxTextBox
            label="Mật khẩu"
            labelMode="floating"
            :mode="'password'"
            :passwordChar="'*'"
            v-model="passwordInput"
            value-change-event="focusout"
            max-length="100"
          >
            <DxValidator>
              <DxRequiredRule message="" />
            </DxValidator>
          </DxTextBox>
        </div>
        <div v-show="false">
          <DxButton
            ref="submitButton"
            width="100%"
            :use-submit-behavior="true"
            text="Register"
            type="success"
          />
        </div>
        <div v-if="isWrongPassword == true" class="text-red text-italic">
          <div>Tài khoản hoặc mật khẩu chưa chính xác.</div>
          <div>Vui lòng đăng nhập lại.</div>
        </div>
        <div class="login-button" @click="loginOnClick">
          <BaseButton buttonType="regular-square" buttonName="Đăng nhập" />
        </div>
        <div
          class="forget-password flex"
          @click="linkToPage('/auth/forget-password')"
        >
          Quên mật khẩu?
        </div>
        <div class="register-text flex text-italic">
          Bạn chưa có tài khoản?&nbsp;<span
            class="text-blue"
            @click="linkToPage('/auth/register')"
            >Đăng ký ngay</span
          >
        </div>
        <div></div>
      </form>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      elementFocus: null,
      isWrongPassword: false,
      emailInput: null,
      passwordInput: null,
    };
  },
  computed: {
    ...mapGetters(["isLoginSuccess"]),
  },
  created(){
    this.isWrongPassword = false;
  },
  methods: {
    ...mapMutations(["setRole"]),
    ...mapActions(["adminLogin", "userLogin"]),
    loginOnClick() {
      this.$refs.submitButton.$el.click();
    },
    linkToPage(path) {
      this.$router.push({ path: path });
    },
    /**
     * focus vào ô input đầu tiên mỗi khi mở form
     */
    onInitialized: function (e) {
      this.elementFocus = e;
      setTimeout(function () {
        e.component.focus();
      }, 0);
    },
    async submitForm() {
      if (this.$route.path == "/auth/admin/login") {
        await this.adminLogin({
          email: this.emailInput,
          password: this.passwordInput
        })
        if(this.isLoginSuccess){
          this.linkToPage("/admin")
        }
        else{
          this.isWrongPassword = true;
        }
      } else if (this.$route.path == "/auth/login") {
        await this.userLogin({
          email: this.emailInput,
          password: this.passwordInput
        })
        if(this.isLoginSuccess){
          this.linkToPage("/home")
        }
        else{
          this.isWrongPassword = true;
        }
      }
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