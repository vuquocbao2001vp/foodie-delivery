<template>
  <div class="payment-page user-page">
    <div v-if="isLogin == false" class="empty-cart-container flex">
      <span class="empty-cart-text"
        >Yêu cầu đăng nhập để xem thông tin người dùng.</span
      >
      <router-link to="/auth/login">
        <BaseButton
          buttonType="regular-square"
          buttonName="QUAY VỀ TRANG ĐĂNG NHẬP"
        />
      </router-link>
    </div>
    <div v-if="isLogin" class="payment-container flex">
      <form @submit.prevent="submitForm" class="user-payment-info">
        <div class="user-payment-title">THÔNG TIN NGƯỜI DÙNG</div>
        <div class="user-payment-container">
          <div class="row-container">
            <div class="input-item flex">
              <span class="input-title">Họ *</span>
              <div class="input-box">
                <DxTextBox
                  v-model="payUser.last_name"
                  value-change-event="focusout"
                  :on-initialized="onInitialized"
                  max-length="100"
                >
                  <DxValidator>
                    <DxRequiredRule message="Họ không được để trống." />
                  </DxValidator>
                </DxTextBox>
              </div>
            </div>
            <div class="input-item flex">
              <span class="input-title">Tên *</span>
              <div class="input-box">
                <DxTextBox
                  v-model="payUser.first_name"
                  value-change-event="focusout"
                  max-length="100"
                >
                  <DxValidator>
                    <DxRequiredRule message="Tên không được để trống." />
                  </DxValidator>
                </DxTextBox>
              </div>
            </div>
            <div class="input-item flex">
              <span class="input-title">Số điện thoại *</span>
              <div class="input-box">
                <DxTextBox
                  v-model="payUser.phone"
                  value-change-event="focusout"
                  max-length="100"
                >
                  <DxValidator>
                    <DxRequiredRule
                      message="Số điện thoại không được để trống."
                    />
                  </DxValidator>
                </DxTextBox>
              </div>
            </div>
            <div class="input-item flex">
              <span class="input-title">Email *</span>
              <div class="input-box">
                <DxTextBox
                  :disabled="true"
                  v-model="payUser.email"
                  value-change-event="focusout"
                  max-length="100"
                >
                  <DxValidator>
                    <DxRequiredRule message="Email không được để trống." />
                    <DxEmailRule message="Email không đúng định dạng." />
                  </DxValidator>
                </DxTextBox>
              </div>
            </div>
            <div class="input-item flex">
              <span class="input-title">Địa chỉ *</span>
              <div class="input-box">
                <vue-google-autocomplete
                  ref="userAddress"
                  id="userMap"
                  classname="user-form-control"
                  :placeholder="payUser.address"
                  v-on:placechanged="getAddressData"
                  country="vn"
                >
                </vue-google-autocomplete>
                <span v-if="isEmptyAddress" class="error-text-address"
                  >Địa chỉ không được để trống.</span
                >
              </div>
            </div>
            <div class="input-item change-info-button flex">
              <div @click="changUserInfo">
                <BaseButton
                  buttonName="Lưu thông tin"
                  buttonType="regular-square"
                />
              </div>
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },
  data() {
    return {
      elementFocus: null,
      isEmptyAddress: null,
      isLogin: null,
      payUser: {},
      address: null,
      oldUser: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {},
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if (vuex) {
      const user = vuex.user.user;
      if (user !== null) {
        this.payUser = user;
        this.isLogin = true;
        this.setUser(user);
        this.address = this.payUser.address;
        this.oldUser = {...this.payUser}
      }
    }
  },
  methods: {
    ...mapMutations(["setUser"]),
    ...mapActions(["getUserDetail", "updateUser"]),

    onInitialized: function (e) {
      this.elementFocus = e;
      setTimeout(function () {
        e.component.focus();
      }, 0);
    },

    changUserInfo() {
      this.$refs.submitButton.$el.click();
    },

    async getAddressData(addressData, placeResultData, id) {
      if (addressData && placeResultData && id) {
        this.address = placeResultData.formatted_address;
      }
    },

    async submitForm() {
      if (!this.address && !this.payUser.address) {
        this.isEmptyAddress = true;
      }
      else if(this.payUser.address !== this.address || !this.$compareObjects(this.payUser, this.oldUser)){
        this.isEmptyAddress = false;
        this.payUser.address = this.address;
        this.updateUser(this.payUser);
        this.oldUser = {...this.payUser}
      }
    },
  },
};
</script>

<style scoped>
.payment-page {
  width: 100%;
  padding: 0 20%;
  box-sizing: border-box;
  position: relative;
  padding-top: 32px;
}
.payment-login-header {
  padding-bottom: 12px;
}
.text-grey {
  color: var(--text-secondary-color);
  margin-right: 8px;
}
.text-red {
  color: var(--text-red-color);
  cursor: pointer;
}
.text-red:hover {
  color: var(--text-primary-color);
}
.payment-container {
  width: 100%;
  align-items: flex-start;
  box-sizing: border-box;
}
.user-payment-info {
  width: 100%;
  box-sizing: border-box;
  padding-right: 12px;
  margin-right: 36px;
}
.user-payment-title {
  font-size: 1.125rem;
  font-family: Font Bold;
  color: #555;
}
.input-title {
  font-family: Font SemiBold;
  width: 156px;
}
.input-box {
  width: 100%;
  box-sizing: border-box;
}
.user-payment-container {
  width: 100%;
  box-sizing: border-box;
}
.row-container {
  width: 100%;
  position: relative;
  margin-top: 24px;
  box-sizing: border-box;
}
.input-item {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  margin-top: 24px;
  align-items: flex-start;
}
.mgt-24 {
  margin-top: 32px;
}
.user-form-control {
  height: 34px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
}
.pac-target-input {
  padding: 0 10px;
  outline: none;
}
.pac-target-input:hover,
.pac-target-input:focus {
  border-color: var(--input-hover-border-color);
}
.error-text-address {
  padding: 4px 0 !important;
  font-size: 0.85rem !important;
  background-color: rgba(255, 255, 255, 0) !important;
  color: var(--text-red-color) !important;
}
.empty-cart-container {
  width: 100%;
  height: 480px;
  flex-direction: column;
  justify-content: center;
}
.empty-cart-text {
  font-size: 1rem;
  margin-bottom: 20px;
  color: var(--text-secondary-color);
}
.change-info-button {
  flex-direction: row-reverse;
}
.user-page{
  padding-top: 24px;
  padding-bottom: 64px;
}
</style>