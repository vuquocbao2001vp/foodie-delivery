<template>
  <div class="payment-page">
    <div class="payment-container flex">
      <div class="user-payment-info">
        <div class="user-payment-title">CHI TIẾT ĐƠN HÀNG</div>
        <div class="user-payment-container">
            <table>
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th>TỔNG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="td-product">
                    <div @click="linkToDetail" class="text-red bold flex">Pizza xúc xích phô mai nướng</div>
                    <div class="text-grey flex">Size: M</div>
                    <div class="text-grey flex">Số lượng: 1</div>
                </td>
                <td class="bold text-right">300,000đ</td>
              </tr>
              <tr>
                <td>Phương thức thanh toán</td>
                <td class="text-right">Trả tiền mặt khi nhận hàng</td>
              </tr>
              <tr>
                <td>Phí giao hàng</td>
                <td class="bold text-right">20,000đ</td>
              </tr>
              <tr>
                <td>Tổng cộng</td>
                <td class="bold text-right">320,000đ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="user-payment-title mgt-24">THÔNG TIN THANH TOÁN</div>
        <div class="user-payment-container payment-info">
            <div>Vũ Huy Hoàng</div>
            <div>0975222888</div>
            <div>vuhuyhoang2001vjpro@gmail.com</div>
            <div></div>
            <div>130 Xuân Thủy - Hà Nội</div>
        </div>
      </div>
      <div class="payment-order">
        <div class="payment-order-title">Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</div>
        <div class="payment-order-row flex">
          <div class="row-dot"></div>
          <div class="row-text">
            <span class="text-grey">Mã đơn hàng: <span class="bold">22022202</span></span>
          </div>
        </div>
        <div class="payment-order-row flex">
          <div class="row-dot"></div>
          <div class="row-text">
            <span class="text-grey">Ngày: <span class="bold">1/1/2023</span></span>
          </div>
        </div>
        <div class="payment-order-row flex">
          <div class="row-dot"></div>
          <div class="row-text">
            <span class="text-grey">Tên khách hàng: <span class="bold">Vũ Huy Hoàng</span></span>
          </div>
        </div>
        <div class="payment-order-row flex">
          <div class="row-dot"></div>
          <div class="row-text">
            <span class="text-grey">Số điện thoại: <span class="bold">0975222888</span></span>
          </div>
        </div>
        <div class="payment-order-row flex">
          <div class="row-dot"></div>
          <div class="row-text">
            <span class="text-grey">Tổng cộng: <span class="bold text-primary">320,000đ</span></span>
          </div>
        </div>
        <div class="payment-order-row flex">
          <div class="row-dot"></div>
          <div class="row-text">
            <span class="text-grey">Phương thức thanh toán: <span class="bold">Thanh toán khi nhận hàng</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        linkToDetail(){
            this.$router.push({path:'/detail'})
        }
    }
};
</script>

<style scoped>
.payment-page {
  width: 100%;
  padding: 32px 0 0 6%;
  box-sizing: border-box;
  position: relative;
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
.text-primary {
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
  margin-right: 36px;
}
.user-payment-title {
  font-size: 1.25rem;
  font-family: Font Bold;
  color: #555;
}
.payment-order {
  width: 36%;
  box-sizing: border-box;
  padding: 32px 24px;
  background-color: var(--grey-bg);
  border-radius: 4px;
  box-shadow: 1px 1px 3px 0px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 7%), inset 0 0 0 1px rgb(0 0 0 / 5%);
}
.user-payment-container {
    width: 100%;
    margin-top: 12px;
}

.mgt-24 {
  margin-top: 24px;
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
  padding: 12px 0;
}
.td-product div{
    height: 24px;
}
.payment-info div {
  height: 28px;
  font-size: 1rem;
  color: var(--text-secondary-color);
  font-family: Font Italic;
  display: flex;
  align-items: center;
}
.payment-order-title {
  color: var(--text-green-color);
  font-size: 1.025rem;
  font-family: Font SemiBold;
  margin-bottom: 16px;
}
.payment-order-row {
  height: 36px;
}
.row-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--button-primary-grey-bg-color);
}
.row-text {
  font-size: 1rem;
  margin-left: 12px;
}
.row-text .bold {
  font-size: 1.025rem;
}
</style>