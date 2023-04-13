<template>
  <div class="cart-page">
    <div class="cart-container">
      <div v-if="isEmptyCart == true" class="empty-cart-container flex">
        <span class="empty-cart-text"
          >Chưa có sản phẩm nào trong giỏ hàng.</span
        >
        <router-link to="/menu">
          <BaseButton
            buttonType="regular-square"
            buttonName="QUAY TRỞ LẠI CỬA HÀNG"
          />
        </router-link>
      </div>
      <div v-if="isEmptyCart == false">
        <div class="cart-order flex">
          <div class="cart-order-product">
            <table>
              <thead>
                <tr>
                  <th class="col-product">SẢN PHẨM</th>
                  <th class="col-price">ĐƠN GIÁ</th>
                  <th class="col-quantity text-center">SỐ LƯỢNG</th>
                  <th class="col-total text-right">TẠM TÍNH</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart" :key="item">
                  <td>
                    <div class="td-product flex">
                      <div
                        class="td-product-x-icon flex"
                        @click="removeFromCart(item.product.id)"
                      >
                        <div class="icon-X icon-center"></div>
                      </div>
                      <img
                        class="td-product-img"
                        :src="item.product.image"
                        alt=""
                      />
                      <div class="td-product-info">
                        <div class="td-product-name">
                          {{ item.product.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="bold">
                    {{ item.product.price.toLocaleString() }}đ
                  </td>
                  <td class="text-center">
                    <div class="quantity-selection flex">
                      <div
                        class="quantity-selection-nav quantity-selection-left flex"
                        @click="
                          updateCartItemQuantity({
                            productId: item.product.id,
                            quantity: item.quantity - 1,
                          })
                        "
                      >
                        -
                      </div>
                      <div
                        class="quantity-selection-nav quantity-selection-text flex"
                      >
                        {{ item.quantity }}
                      </div>
                      <div
                        class="quantity-selection-nav quantity-selection-right flex"
                        @click="
                          updateCartItemQuantity({
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        "
                      >
                        +
                      </div>
                    </div>
                  </td>
                  <td class="text-right bold">
                    {{ (item.product.price * item.quantity).toLocaleString() }}đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="cart-order-bill">
            <table>
              <thead>
                <tr>
                  <th>CỘNG GIỎ HÀNG</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tạm tính</td>
                  <td class="bold text-right">{{ total.toLocaleString() }}đ</td>
                </tr>
                <tr>
                  <td>Tổng</td>
                  <td class="bold text-right">{{ total.toLocaleString() }}đ</td>
                </tr>
              </tbody>
            </table>
            <div class="cart-order-bill-button">
              <router-link to="/payment">
                <BaseButton
                  buttonType="regular-square"
                  buttonName="TIẾN HÀNH THANH TOÁN"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="back-to-store-button">
          <router-link to="/menu">
            <BaseButton
              buttonType="white-square"
              buttonName="QUAY LẠI CỬA HÀNG"
          /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isEmptyCart: false,
      total: 0,
    };
  },
  computed: {
    ...mapGetters(["cart"]),
  },
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    const cart = vuex.user.cart;
    if (cart.length > 0) {
      this.setCart(cart);
    } else {
      this.isEmptyCart = true;
    }
  },
  watch: {
    cart: {
      handler(value) {
        this.total = 0;
        value.forEach((item) => {
          this.total += item.product.price * item.quantity;
        });
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["setCart", "removeCartItem", "updateCartItemQuantity"]),
    removeFromCart(id) {
      this.removeCartItem(id);
    },
  },
};
</script>
<style scoped>
.cart-page {
  width: 100%;
  padding: 32px 0 0 4%;
  box-sizing: border-box;
  position: relative;
}
.cart-container {
  width: 100%;
  height: 480px;
  box-sizing: border-box;
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
.cart-order {
  width: 100%;
  height: 461px;
  align-items: flex-start;
}
.cart-order-product {
  width: 65%;
  max-height: 461px;
  overflow: auto;
  box-sizing: border-box;
  padding-right: 12px;
  border-right: 1px solid var(--grid-border);
}

/* css table */
table {
  width: 100%;
  border-spacing: 0;
  box-sizing: border-box;
  border-collapse: collapse;
}

table thead th {
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.95rem;
  font-family: Font Bold;
  z-index: 2;
  text-align: left;
  vertical-align: bottom;
  border-bottom: 2px solid var(--grid-border) !important;
  padding: 0 8px 4px 8px;
  background-color: #fff;
  height: 28px;
}
table tbody tr {
  height: 108px;
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
  padding: 0 8px;
}
tbody tr:hover {
  background-color: var(--grid-row-hover-bg);
}
th.col-product {
  min-width: 220px;
}
th.col-price {
  min-width: 100px;
}
th.col-quantity {
  min-width: 120px;
}
th.col-total {
  min-width: 120px !important;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.bold {
  font-family: Font SemiBold;
  font-size: 0.9rem;
}
.td-product-img {
  width: 78px;
  height: 78px;
  box-sizing: border-box;
}
.td-product {
  width: 100%;
  height: 100%;
}
.td-product-info {
  margin-left: 16px;
}
.td-product-name {
  font-size: 1.025rem;
  color: var(--text-red-color);
  cursor: pointer;
}
.td-product-name:hover {
  color: var(--text-primary-color);
}
.td-product-size {
  margin-top: 8px;
  color: var(--text-secondary-color);
}

.quantity-selection {
  height: 36px;
  box-sizing: border-box;
  justify-content: center;
}
.quantity-selection-nav {
  height: 100%;
  border: 1px solid;
  border-color: #e0e5e6;
  color: var(--text-primary-color);
  justify-content: center;
  background-color: #f7f7f7;
}
.quantity-selection-nav:hover {
  background-color: var(--primary-bg);
}

.quantity-selection-left {
  width: 24px;
  border-radius: 99px 0 0 99px;
  cursor: pointer;
}
.quantity-selection-text {
  width: 40px;
  border: 1px 0 !important;
}
.quantity-selection-right {
  width: 24px;
  border-radius: 0 99px 99px 0;
  cursor: pointer;
}
.td-product-x-icon {
  width: 24px;
  height: 24px;
  justify-content: center;
  border: 2px solid var(--grid-border);
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
}
.td-product-x-icon:hover {
  border-color: var(--text-secondary-color);
}
.td-product-x-icon:hover .icon-X {
  background-color: var(--text-secondary-color);
}

.cart-order-bill {
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 12px;
  border-left: 1px solid var(--grid-border);
}
.cart-order-bill table tbody tr,
td {
  height: 40px;
}
.cart-order-bill table tbody tr:hover {
  background-color: #fff;
}
.cart-order-bill-button {
  margin-top: 24px;
}
.back-to-store-button {
  width: 220px;
  margin-top: 5px;
  box-sizing: border-box;
}
</style>