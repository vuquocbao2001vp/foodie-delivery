<template>
  <div class="payment-page">
    <div v-if="screen == 2">
      <div class="code-title">
        <div>
          Mã xác nhận đã được gửi tới email {{ emailInput }}. Vui lòng nhập mã
          vào ô bên dưới để tiếp tục.
        </div>
      </div>
      <div class="code-input">
        <DxTextBox
          v-model="codeInput"
          :on-initialized="onInitialized"
          value-change-event="focusout"
          max-length="100"
        >
          <DxValidator>
            <DxRequiredRule message="Mã xác nhận không được để trống." />
          </DxValidator>
        </DxTextBox>
      </div>
    </div>
    <div v-else>
      <div v-if="!isLogin" class="payment-login-header">
        <span class="text-grey">Bạn đã có tài khoản?</span>
        <router-link to="/auth/login"
          ><span class="text-red">Bấm vào đây để đăng nhập</span></router-link
        >
      </div>
      <div class="payment-container flex">
        <form @submit.prevent="submitForm" class="user-payment-info">
          <div class="user-payment-title">THÔNG TIN THANH TOÁN</div>
          <div class="user-payment-container">
            <div class="row-container flex">
              <div class="input-item left-input">
                <span class="input-title">Tên *</span>
                <div class="input-box">
                  <DxTextBox
                    v-model="payUser.first_name"
                    value-change-event="focusout"
                    :on-initialized="onInitialized"
                    max-length="100"
                  >
                    <DxValidator>
                      <DxRequiredRule message="Tên không được để trống." />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
              <div class="input-item right-input">
                <span class="input-title">Họ *</span>
                <div class="input-box">
                  <DxTextBox
                    v-model="payUser.last_name"
                    value-change-event="focusout"
                    max-length="100"
                  >
                    <DxValidator>
                      <DxRequiredRule message="Họ không được để trống." />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
            </div>
            <div class="row-container flex">
              <div class="input-item left-input">
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
              <div class="input-item right-input">
                <span class="input-title">Email *</span>
                <div class="input-box">
                  <DxTextBox
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
            </div>
            <div class="row-container flex">
              <div class="input-item">
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
            </div>
            <div class="row-container flex" v-if="!isLogin">
              <div>
                <DxCheckBox v-model="isRegister" text="Tạo tài khoản mới" />
              </div>
            </div>
            <div v-if="isRegister">
              <div class="row-container flex">
                <div class="input-item">
                  <span class="input-title">Tạo mật khẩu của bạn *</span>
                  <div class="input-box">
                    <DxTextBox
                      :mode="'password'"
                      :passwordChar="'*'"
                      v-model="passwordInput"
                      max-length="100"
                    >
                      <DxValidator>
                        <DxRequiredRule
                          message="Mật khẩu không được để trống."
                        />
                        <DxStringLengthRule
                          min="6"
                          message="Mật khẩu phải nhiều hơn 6 kí tự."
                        />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>
              </div>
              <div class="row-container flex">
                <div class="input-item">
                  <span class="input-title">Nhập lại mật khẩu *</span>
                  <div class="input-box">
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
              </div>
              <div class="row-container flex flex-end">
                <div class="create-new-account" @click="createAccount">
                  <BaseButton
                    buttonName="Tạo tài khoản"
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
            <div class="user-payment-title mgt-24">THÔNG TIN BỔ SUNG</div>
            <div class="row-container flex">
              <div class="input-item">
                <span class="input-title">Ghi chú</span>
                <div class="input-box">
                  <textarea
                    v-model="payUser.note"
                    rows="3"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="payment-order">
          <div class="user-payment-title">ĐƠN HÀNG CỦA BẠN</div>
          <div class="payment-order-contaner">
            <table>
              <thead>
                <tr>
                  <th>SẢN PHẨM</th>
                  <th>SỐ TIỀN</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart" :key="item">
                  <td class="td-product flex">
                    <img class="td-img" :src="item.product.image" alt="" />
                    <div class="td-product-info">
                      <div class="bold">{{ item.product.name }}</div>
                      <div class="text-grey">Số lượng: {{ item.amount }}</div>
                    </div>
                  </td>
                  <td class="bold text-right">
                    {{ (item.product.price * item.amount).toLocaleString() }}đ
                  </td>
                </tr>
                <tr>
                  <td>Tạm tính</td>
                  <td class="bold text-right">{{ total.toLocaleString() }}đ</td>
                </tr>
                <tr>
                  <td>Phí giao hàng</td>
                  <td class="bold text-right">
                    {{ shippingFee.toLocaleString() }}đ
                  </td>
                </tr>
                <tr>
                  <td>Tổng</td>
                  <td class="bold text-right">
                    {{ (total + shippingFee).toLocaleString() }}đ
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="payment-method mgt-24">
              <div class="bold">Trả tiền mặt khi nhận hàng</div>
              <div class="text-grey">Trả tiền mặt khi giao hàng.</div>
            </div>
            <div class="term-of-use mgt-24 flex">
              <DxCheckBox v-model="isAgreeRule" />
              <div class="term-text">
                Tôi đã đọc và đồng ý với
                <span class="text-red">điều khoản và điều kiện </span>của
                website*
              </div>
            </div>
          </div>
          <div class="order-button mgt-24">
            <div @click="createOrderOnClick">
              <BaseButton buttonName="ĐẶT HÀNG" buttonType="regular-square" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
// import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  // components: { VueGoogleAutocomplete },
  data() {
    return {
      screen: 1,
      elementFocus: null,
      isEmptyAddress: null,
      isRegister: false,
      isLogin: null,
      passwordInput: null,
      payUser: {},
      address: null,
      defaultAddress:
        "133 Xuân Thủy, làng Vòng, Dịch Vọng Hậu, Cầu Giấy, Hanoi, Vietnam", // Địa chỉ mặc định của quán
      distance: 0,
      submitMode: null, //1-đặt hàng, 2-tạo tài khoản
      total: 0,
      shippingFee: 20000,
      isAgreeRule: null,
    };
  },
  computed: {
    ...mapGetters(["user", "cart"]),
  },
  watch: {
    cart: {
      handler(value) {
        if (value) {
          this.total = 0;
          value.forEach((item) => {
            this.total += item.product.price * item.amount;
          });
        }
      },
      deep: true,
    },
  },
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if (vuex) {
      const user = vuex.user.user;
      if (user !== null) {
        this.payUser = user;
        this.isLogin = true;
      }
      const cart = vuex.user.cart;
      if (cart.length > 0) {
        this.setCart(cart);
      }
    }
  },
  methods: {
    ...mapMutations(["setUser", "setCart"]),
    ...mapActions(["getUserDetail", "createOrder"]),

    onInitialized: function (e) {
      this.elementFocus = e;
      setTimeout(function () {
        e.component.focus();
      }, 0);
    },

    // async getAddressData(addressData, placeResultData, id) {
    //   if (addressData && placeResultData && id) {
    //     this.address = placeResultData.formatted_address;
    //     console.log(placeResultData.formatted_address);
    //     const service = new window.google.maps.DistanceMatrixService();
    //     service.getDistanceMatrix(
    //       {
    //         origins: [this.defaultAddress],
    //         destinations: [this.address],
    //         travelMode: window.google.maps.TravelMode.DRIVING,
    //         unitSystem: window.google.maps.UnitSystem.METRIC,
    //       },
    //       (response, status) => {
    //         if (status === window.google.maps.DistanceMatrixStatus.OK) {
    //           this.distance = response.rows[0].elements[0].distance.value;
    //           console.log(this.distance);
    //         } else {
    //           console.log("Error: " + status);
    //         }
    //       }
    //     );
    //   }
    // },
    passwordComparison() {
      return this.passwordInput;
    },
    createAccount() {
      this.submitMode = 2;
      this.$refs.submitButton.$el.click();
    },
    createOrderOnClick() {
      this.submitMode = 1;
      this.$refs.submitButton.$el.click();
    },
    async submitForm() {
      if (!this.address) {
        this.isEmptyAddress = true;
      } else if (!this.isAgreeRule) {
        alert("Bạn cần đọc và đồng ý với điều khoản của website.");
      } else {
        this.isEmptyAddress = false;
        this.payUser.address = this.address;
        if (this.submitMode == 2) {
          console.log("ok2");
        } else if (this.submitMode == 1) {
          let is_user = 0;
          let user_id = 0;
          let products_id = this.cart.map((item) => item.product.id);
          let products_amount = this.cart.map((item) => item.amount);
          if (this.isLogin) {
            is_user = 1;
            user_id = this.payUser.id;
          } else {
            is_user = 2;
            user_id = null;
          }
          console.log(products_amount, products_id);
          try {
            this.createOrder({
              is_user: is_user,
              user_id: user_id,
              products_id: products_id,
              products_amount: products_amount,
              note: this.payUser.note,
              user: this.payUser,
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.payment-page {
  width: 100%;
  padding: 32px 0 0 6%;
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
  width: 55%;
  box-sizing: border-box;
  padding-right: 12px;
  padding: 32px 0;
  margin-right: 36px;
  border-top: 2px solid var(--grid-border);
}
.user-payment-title {
  font-size: 1.125rem;
  font-family: Font Bold;
  color: #555;
}
.payment-order {
  width: 36%;
  box-sizing: border-box;
  padding: 32px 24px;
  background-color: #fff;
  border: 2px solid var(--primary-border);
}
.input-title {
  font-family: Font SemiBold;
}
.input-box {
  width: 100%;
  margin-top: 4px;
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
}
.left-input {
  width: 48%;
  margin-right: 4%;
}
.right-input {
  width: 48%;
}
.mgt-24 {
  margin-top: 24px;
}

.payment-order-contaner {
  width: 100%;
  margin-top: 12px;
  box-sizing: border-box;
}

/* css table */
table {
  width: 100%;
  border-spacing: 0;
  box-sizing: border-box;
}

table thead th {
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.95rem;
  font-family: Font Bold;
  color: #555;
  z-index: 2;
  text-align: left;
  vertical-align: bottom;
  border-bottom: 2px solid var(--grid-border) !important;
  padding: 0 8px 4px 0;
  background-color: #fff;
  height: 28px;
}
table tbody tr {
  height: 40px;
  box-sizing: border-box;
}
table tr,
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid var(--grid-border);
  text-align: left;
  vertical-align: center;
  padding: 0 8px 0 0;
}

.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.bold {
  font-family: Font SemiBold;
  font-size: 0.875rem;
}
.td-product {
  padding: 8px 0;
}
.td-img {
  width: 64px;
  height: 64px;
  box-sizing: border-box;
}
.td-product-info {
  margin-left: 16px;
  font-size: 0.825rem;
}
.payment-method .bold,
.payment-method .text-grey {
  font-size: 0.875rem !important;
}
.term-text {
  margin-left: 8px;
}
.term-of-use {
  align-items: flex-start;
}
.order-button {
  width: 160px;
}
.form-control {
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
.create-new-account {
  width: fit-content;
}
</style>