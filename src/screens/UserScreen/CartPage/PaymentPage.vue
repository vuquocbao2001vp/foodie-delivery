<template>
  <div class="payment-page">
    <div class="payment-login-header">
      <span class="text-grey">Bạn đã có tài khoản?</span>
      <router-link to="/login"
        ><span class="text-red">Bấm vào đây để đăng nhập</span></router-link
      >
    </div>
    <div class="payment-container flex">
      <div class="user-payment-info">
        <div class="user-payment-title">THÔNG TIN THANH TOÁN</div>
        <div class="user-payment-container">
            <div class="row-container flex">
                <div class="input-item left-input">
                    <span class="input-title">Tên *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
                <div class="input-item right-input">
                    <span class="input-title">Họ *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
            </div>
            <div class="row-container flex">
                <div class="input-item left-input">
                    <span class="input-title">Số điện thoại *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
                <div class="input-item right-input">
                    <span class="input-title">Email *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
            </div>
            <div class="row-container flex">
                <div class="input-item">
                    <span class="input-title">Địa chỉ *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
            </div>
            <div class="row-container flex">
                <div>
                  <DxCheckBox text="Tạo tài khoản mới"/>
                </div>
            </div>
            <div class="row-container flex">
                <div class="input-item">
                    <span class="input-title">Tạo mật khẩu của bạn *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
            </div>
            <div class="row-container flex">
                <div class="input-item">
                    <span class="input-title">Nhập lại mật khẩu *</span>
                    <div class="input-box">
                        <DxTextBox />
                    </div>
                </div>
            </div>
            <div class="user-payment-title mgt-24">THÔNG TIN BỔ SUNG</div>
            <div class="row-container flex">
                <div class="input-item">
                    <span class="input-title">Ghi chú</span>
                    <div class="input-box">
                        <textarea rows="3" placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."></textarea>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
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
              <tr>
                <td class="td-product flex">
                  <img class="td-img" src="@/assets/Icons/pizza.png" alt="">
                  <div class="td-product-info">
                    <div class="bold">Pizza xúc xích phô mai nướng</div>
                    <div class="text-grey">Size: M</div>
                    <div class="text-grey">Số lượng: 1</div>
                  </div>
                </td>
                <td class="bold text-right">300,000đ</td>
              </tr>
              <tr>
                <td class="td-product flex">
                  <img class="td-img" src="@/assets/Icons/pizza.png" alt="">
                  <div class="td-product-info">
                    <div class="bold">Pizza xúc xích phô mai nướng</div>
                    <div class="text-grey">Size: M</div>
                    <div class="text-grey">Số lượng: 1</div>
                  </div>
                </td>
                <td class="bold text-right">300,000đ</td>
              </tr>
              
              <tr>
                <td>Tạm tính</td>
                <td class="bold text-right">300,000đ</td>
              </tr>
              <tr>
                <td>Phí giao hàng</td>
                <td class="bold text-right">20,000đ</td>
              </tr>
              <tr>
                <td>Tổng</td>
                <td class="bold text-right">320,000đ</td>
              </tr>
            </tbody>
          </table>
          <div class="payment-method mgt-24">
            <div class="bold">Trả tiền mặt khi nhận hàng</div>
            <div class="text-grey">Trả tiền mặt khi giao hàng.</div>
          </div>
          <div class="term-of-use mgt-24 flex">
            <DxCheckBox />
            <div class="term-text">Tôi đã đọc và đồng ý với <span class="text-red">điều khoản và điều kiện </span>của website*</div>
          </div>
        </div>
        <div class="order-button mgt-24">
          <router-link to="/checkout">
            <BaseButton buttonName="ĐẶT HÀNG" buttonType="regular-square" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
}
.user-payment-container {
    width: 100%;
}
.row-container {
    width: 100%;
    position: relative;
    margin-top: 16px;
    box-sizing: border-box;
}
.input-item {
    width: 100%;
    position: relative;
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
.payment-method .bold, .payment-method .text-grey {
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
</style>