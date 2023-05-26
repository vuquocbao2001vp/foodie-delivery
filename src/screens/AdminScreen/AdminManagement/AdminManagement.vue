<template>
  <div class="payment-page">
    <di class="payment-container flex">
      <form @submit.prevent="submitForm" class="user-payment-info">
        <div class="user-payment-title">THÔNG TIN QUẢN TRỊ VIÊN</div>
        <div class="user-payment-container">
          <div class="row-container">
            <div class="input-item flex">
              <span class="input-title">Họ *</span>
              <div class="input-box">
                <DxTextBox
                  v-model="adminInfo.last_name"
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
                  v-model="adminInfo.first_name"
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
                  v-model="adminInfo.phone"
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
                  disabled="true"
                  v-model="adminInfo.email"
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
                <!-- <vue-google-autocomplete
                  ref="address"
                  id="map"
                  classname="form-control"
                  placeholder=""
                  v-on:placechanged="getAddressData"
                  country="vn"
                >
                </vue-google-autocomplete> -->
                <DxTextBox v-model="address" />
                <span v-if="isEmptyAddress" class="error-text-address"
                  >Địa chỉ không được để trống.</span
                >
              </div>
            </div>
            <div class="input-item change-info-button flex">
              <div @click="changAdminInfo">
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
    </di>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
// import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  // components: { VueGoogleAutocomplete },
  data() {
    return {
      elementFocus: null,
      isEmptyAddress: null,
      adminInfo: {},
      address: null,
      oldAdmin: null,
    };
  },
  computed: {
    ...mapGetters(["admin"]),
  },
  watch: {},
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if (vuex) {
      const admin = vuex.admin.admin;
      if (admin !== null) {
        this.adminInfo = admin;
        this.setAdmin(admin);
        this.address = this.adminInfo.address;
        this.oldAdmin = {...this.adminInfo}
      }
    }
  },
  methods: {
    ...mapMutations(["setAdmin"]),
    ...mapActions(["updateAdmin"]),

    onInitialized: function (e) {
      this.elementFocus = e;
      setTimeout(function () {
        e.component.focus();
      }, 0);
    },

    changAdminInfo() {
      this.$refs.submitButton.$el.click();
    },
    async submitForm() {
      if (!this.address) {
        this.isEmptyAddress = true;
      }
      else if(this.adminInfo.address !== this.address || !this.$compareObjects(this.adminInfo, this.oldAdmin)){
        this.isEmptyAddress = false;
        this.adminInfo.address = this.address;
        this.updateAdmin(this.adminInfo);
        this.oldAdmin = {...this.adminInfo}
      }
    },
  },
};
</script>

<style scoped>
.payment-page {
  width: 100%;
  padding-top: 16px;
  box-sizing: border-box;
  position: relative;
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
  width: 70%;
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
</style>