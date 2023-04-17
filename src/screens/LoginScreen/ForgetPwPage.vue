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
        <div v-if="screen == 1">
          <div class="main-input">
            <DxTextBox
              label="Email"
              labelMode="floating"
              v-model="emailInput"
              :on-initialized="onInitialized"
              max-length="100"
            >
              <DxValidator>
                <DxRequiredRule message="Email không được để trống." />
                <DxEmailRule message="Email không đúng định dạng." />
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
        <div v-if="screen == 2">
          <div class="input-title">
            <div>Mã xác nhận đã được gửi tới email {{ emailInput }}</div>
            <div>Vui lòng nhập mã vào ô bên dưới để tiếp tục.</div>
          </div>
          <div class="main-input">
            <DxTextBox
              v-model="codeInput"
              :on-initialized="onInitialized"
              value-change-event="keyup"
              max-length="100"
            >
              <DxValidator>
                <DxRequiredRule message="Mã xác nhận không được để trống." />
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
        <div v-if="screen == 3">
          <div class="main-input">
            <div class="input-title text-italic">Email</div>
            <DxTextBox :value="emailInput" :disabled="true" />
          </div>
          <div class="main-input mgt-12">
            <div class="input-title text-italic">
              Mật khẩu <span class="text-red">*</span>
            </div>
            <DxTextBox
              :mode="'password'"
              :passwordChar="'*'"
              v-model="passwordInput"
              max-length="100"
            >
              <DxValidator>
                <DxRequiredRule message="Mật khẩu không được để trống." />
                <DxStringLengthRule
                  min="6"
                  message="Mật khẩu phải nhiều hơn 6 kí tự."
                />
              </DxValidator>
            </DxTextBox>
          </div>
          <div class="main-input mgt-12">
            <div class="input-title text-italic">
              Nhập lại mật khẩu <span class="text-red">*</span>
            </div>
            <DxTextBox :mode="'password'" :passwordChar="'*'">
              <DxValidator>
                <DxRequiredRule
                  message="Nhập lại mật khẩu không được để trống."
                />
                <DxCompareRule
                  :comparison-target="passwordComparison"
                  message="Mật khẩu không khớp."
                />
              </DxValidator>
            </DxTextBox>
          </div>
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
        <div v-if="isError == true" class="text-red text-italic">
          <div>{{ errorText }}</div>
        </div>
        <div class="login-button" @click="submitOnClick">
          <BaseButton buttonType="regular-square" buttonName="Tiếp tục" />
        </div>
        <div
          v-if="screen == 1"
          class="forget-password flex"
          @click="returnToLogin"
        >
          Quay lại đăng nhập.
        </div>
      </form>
      <div v-if="screen == 2" class="register-text flex text-italic">
        Bạn chưa nhận được mã xác nhận?&nbsp;<span
          class="text-blue"
          @click="resendCodeOnClick"
          >Nhấn để gửi lại.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      elementFocus: null,
      screen: null, //1-nhập email, 2-nhập code, 3-mật khẩu mới
      emailInput: null,
      codeInput: null,
      passwordInput: null,
      isError: null,
      errorText: null,
    };
  },
  computed: {
    ...mapGetters([
      "forgotPasswordStatus",
      "verifyCodeStatus",
      "resetPasswordStatus",
    ]),
  },
  created() {
    this.screen = 1;
    this.showError(false, "");
  },
  watch: {
    codeInput: function(value){
      if(!value){
        this.showError(false, '');
      }
    },
  },
  methods: {
    ...mapActions([
      "verifyCode",
      "resendCode",
      "forgotPassword",
      "resetPassword",
      "userLogin",
    ]),

    returnToLogin() {
      this.$router.push({ path: "/auth/login" });
    },
    showError(isShow, errorText) {
      this.isError = isShow;
      this.errorText = errorText;
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

    submitOnClick() {
      this.$refs.submitButton.$el.click();
    },
    async submitForm() {
      if (this.screen == 1) {
        await this.forgotPassword({ email: this.emailInput });
        if (this.forgotPasswordStatus == 1) {
          this.screen = 2;
          if (this.isError) this.showError(false, "");
        } else {
          this.showError(true, "Email không tồn tại trong hệ thống.");
        }
      } else if (this.screen == 2) {
        await this.verifyCode({ email: this.emailInput, code: this.codeInput });
        if (this.verifyCodeStatus == 1) {
          this.screen = 3;
          if (this.isError) this.showError(false, "");
        } else {
          this.showError(true, "Mã xác nhận không hợp lệ.");
        }
      } else if (this.screen == 3) {
        await this.resetPassword({
          email: this.emailInput,
          password: this.passwordInput,
        });
        if (this.resetPasswordStatus == 1) {
          alert("Đổi mật khẩu thành công.");
          await this.userLogin({
            email: this.emailInput,
            password: this.passwordInput,
          });
          this.$router.push({path: '/home'})
        } else {
          alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
          this.screen = 1;
          this.$router.push({path: '/auth/forget-password'})
        }
      }
    },
    resendCodeOnClick() {
      if (this.emailInput) {
        this.resendCode({ email: this.emailInput });
      }
    },
    passwordComparison() {
      return this.passwordInput;
    },
  },
};
</script>

<style scoped>
.login-container {
  min-width: 416px;
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
.mgt-12 {
  margin-top: 16px;
}
</style>