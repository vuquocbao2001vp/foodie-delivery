<template>
  <div class="payment-page mgb64">
    <div class="payment-order" v-for="order in userOrderList" :key="order">
      <div class="payment-order-title">Đơn hàng {{order.id}}</div>
      <div class="flex flex-order">
        <div class="order-left">
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Trạng thái: <span class="bold text-blue" :class="(order.status == 4) ? 'text-green' : ''">{{statusString[order.status - 1]}}</span></span
              >
            </div>
          </div>
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Ngày: <span class="bold">{{formatDate(order.created_at)}}</span></span
              >
            </div>
          </div>
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Tên người nhận: <span class="bold">{{order.last_name +' '+ order.first_name}}</span></span
              >
            </div>
          </div>
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Số điện thoại: <span class="bold">{{order.phone}}</span></span
              >
            </div>
          </div>
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Địa chỉ: <span class="bold">{{order.address}}</span></span
              >
            </div>
          </div>
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Tổng thanh toán:
                <span class="bold text-primary">{{order.total_price.toLocaleString()}}đ</span></span
              >
            </div>
          </div>
          <div class="payment-order-row flex">
            <div class="row-dot"></div>
            <div class="row-text">
              <span class="text-grey"
                >Phương thức thanh toán:
                <span class="bold">Thanh toán khi nhận hàng</span></span
              >
            </div>
          </div>
          
        </div>
        <div class="order-right">
          <div class="payment-order-contaner">
            <table>
              <thead>
                <tr>
                  <th>SẢN PHẨM</th>
                  <th class="text-right">ĐƠN GIÁ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in order.detail" :key="product">
                  <td class="td-product flex">
                    <img class="td-img" :src="product.product.image" alt="" />
                    <div class="td-product-info">
                      <div class="bold" @click="viewProduct(product.product.id)">{{product.product.name}}</div>
                      <div class="text-grey">Số lượng: {{product.amount}}</div>
                    </div>
                  </td>
                  <td class="bold text-right">{{product.product.price.toLocaleString()}}đ</td>
                </tr>
              </tbody>
            </table>
            <div class="note-text">Ghi chú: <span class="text-grey">{{order.note}}</span> </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import formatDate from "@/constants/functions/formatDate.js";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      statusString: ['Đã nhận đơn', 'Đang xử lý', 'Đang vận chuyển', 'Đã hoàn thành']
    }
  },
  computed: {
    ...mapGetters(["userOrderList"]),
  },
  created(){
    this.getUserOrderList();
  },
  methods: {
    ...mapActions(["getUserOrderList"]),
    formatDate,
    viewProduct(id) {
      this.$router.push({ name: "detail", query: { id: id }});
    },
  },
};
</script>

<style scoped>
.payment-page {
  width: 100%;
  padding: 32px 10% 0 10%;
  box-sizing: border-box;
  position: relative;
}
.mgb64{
  margin-bottom: 64px;
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
.text-blue {
  color: var(--text-blue-color);
}
.text-green{
  color: var(--text-green-color) !important;
}
.payment-order {
  width: 100%;
  box-sizing: border-box;
  padding: 28px 0;
  background-color: var(--grey-bg);
  border-radius: 4px;
  margin-bottom: 36px;
  box-shadow: 1px 1px 3px 0px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 7%),
    inset 0 0 0 1px rgb(0 0 0 / 5%);
}
.flex-order {
  align-items: flex-start;
}
.mgt-24 {
  margin-top: 24px;
}

.bold {
  font-family: Font SemiBold;
  font-size: 0.875rem;
}
.td-product {
  padding: 12px 0;
}
.td-product div {
  padding: 2px 0;
}
.payment-order-title {
  color: var(--text-second-primary-color);
  font-size: 1.25rem;
  font-family: Font SemiBold;
  margin-bottom: 16px;
  margin-left: 32px;
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
.order-right,
.order-left {
  width: 50%;
  padding-left: 32px;
  padding-right: 16px;
  box-sizing: border-box;
}
.order-right {
  background-color: #fff;
  margin-right: 32px;
}
.payment-order-contaner {
  width: 100%;
  margin: 24px 0;
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

.td-img {
  width: 64px;
  height: 64px;
  box-sizing: border-box;
}
.td-product-info {
  margin-left: 16px;
  font-size: 0.825rem;
  cursor: pointer;
  color: var(--text-red-color);
}
.td-product-info:hover{
  color: var(--text-primary-color);
}
.note-text{
  padding-top: 16px;
}
</style>