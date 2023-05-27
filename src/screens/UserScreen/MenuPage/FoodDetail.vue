<template>
  <div class="detail-container">
    <div class="detail-top-container flex">
      <div class="detail-image flex">
        <img
          class="img"
          :src="productDetail ? productDetail.image : ''"
          alt=""
        />
      </div>
      <div class="detail-order">
        <div class="top-detail">
          <div class="product-title menu-header-text">
            {{ productDetail ? productDetail.name : "" }}
          </div>
          <div class="space-border"></div>
          <div class="product-price">
            {{ productDetail ? productDetail.price.toLocaleString() : "" }}đ
          </div>
          <div class="product-option flex">
            <div class="product-option-title">Mã:</div>
            <div class="product-option-main">
              {{ productDetail ? productDetail.id : "" }}
            </div>
          </div>
          <div class="product-option flex">
            <div class="product-option-title">Danh mục:</div>
            <div class="product-option-main">
              {{ productDetail ? productDetail.category_name : "" }}
            </div>
          </div>
          <div class="product-option flex">
            <div class="product-option-title">Mô tả:</div>
            <div class="product-option-main">
              {{ productDetail ? productDetail.description : "" }}
            </div>
          </div>
          <div class="product-option flex">
            <div class="product-option-title">Số lượng:</div>
            <div class="product-option-main">
              <div class="quantity-selection flex">
                <div
                  class="quantity-selection-nav quantity-selection-left flex"
                  @click="quantity > 1 ? (quantity -= 1) : quantity"
                >
                  -
                </div>
                <div
                  class="quantity-selection-nav quantity-selection-text flex"
                >
                  {{ quantity }}
                </div>
                <div
                  class="quantity-selection-nav quantity-selection-right flex"
                  @click="quantity += 1"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="total flex">
            <div class="total-title">TẠM TÍNH:</div>
            <div class="total-text">
              {{
                productDetail
                  ? (productDetail.price * quantity).toLocaleString()
                  : ""
              }}đ
            </div>
          </div>
          <div class="order-button" @click="addProductToCartOnClick">
            <BaseButton buttonType="regular" buttonName="THÊM VÀO GIỎ HÀNG" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="productshow slideshow flex">
      <div class="productshow-title">SẢN PHẨM TƯƠNG TỰ</div>
      <div class="space-border"></div>
      <div class="productshow-content flex">
        <div v-for="product in listProducts" :key="product.id">
          <base-product :product="product" />
        </div>
      </div>
      <div @click="linkToMenu" class="view-all-text">
        XEM TẤT CẢ
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      quantity: 1,
      isLogin: null,
    };
  },
  computed: {
    ...mapGetters(["productDetail", "listProducts"]),
  },
  watch: {
    productDetail: function (value) {
      if (value) {
        this.getListProducts({
          page: 1,
          per_page: 100,
          category_id: value.category_id,
          name: "",
          min_price: "",
          max_price: "",
          highlight: 1,
        });
      }
    },
    "$route.query": function(value){
      if(value) this.getProductDetail(value.id);
    }
  },
  created() {
    this.getProductDetail(this.$route.query.id);
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if (vuex) {
      const user = vuex.user.user;
      if (user !== null) {
        this.isLogin = true;
      } else this.isLogin = false;
    }
  },
  methods: {
    ...mapMutations(["setProductDetail", "addToCart"]),
    ...mapActions(["getProductDetail", "addProductToCart", "getListProducts"]),
    async addProductToCartOnClick() {
      if (this.isLogin) {
        await this.addProductToCart({
          product_id: this.productDetail.id,
          amount: this.quantity,
        });
        this.$router.push({ path: "/cart" });
      } else {
        await this.addToCart({
          product: this.productDetail,
          amount: this.quantity,
        });
        this.$router.push({ path: "/cart" });
      }
    },
    getRouterLink(){
      const unidecode = require("unidecode");
      let str = unidecode(this.productDetail.category_name.toLowerCase());
      let router = str.replace(/\s+/g, "-");
      return router;
    },
    linkToMenu(){
      this.$router.push({ name: this.getRouterLink()});
    }
  },
};
</script>

<style scoped>
.detail-container {
  width: 100%;
  box-sizing: border-box;
  padding: 64px 10% 0 10%;
}
.detail-top-container {
  align-items: flex-start;
  width: 100%;
}
.detail-image {
  width: 460px;
  height: 460px;
  background-color: #fff;
  margin-right: 6%;
  justify-content: center;
  box-sizing: border-box;
}
.img {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.detail-order {
  width: 54%;
  box-sizing: border-box;
}
.top-detail {
  width: 100%;
  padding-bottom: 36px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--grid-border);
  box-sizing: border-box;
}
.menu-header-text {
  font-size: 1.6rem;
  color: #494949 !important;
  font-family: Font Bold;
  width: fit-content;
}
.product-description {
  font-size: 1rem;
  font-style: italic;
  color: #777;
  padding: 4px 0;
}
.space-border {
  width: 64px;
  height: 4px;
  border-radius: 2px;
  margin: 6px 0 12px 0;
  background-color: rgba(0, 0, 0, 0.1);
}
.product-price {
  font-size: 1.3rem;
  font-family: Font Bold;
  color: var(--text-secondary-color);
}
.size-option {
  margin-right: 12px;
}
.quantity-selection {
  height: 36px;
  box-sizing: border-box;
}
.quantity-selection-nav {
  height: 40px;
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
  width: 36px;
  border-radius: 99px 0 0 99px;
  cursor: pointer;
}
.quantity-selection-text {
  width: 40px;
  border: 1px 0 !important;
}
.quantity-selection-right {
  width: 36px;
  border-radius: 0 99px 99px 0;
  cursor: pointer;
}
.product-option {
  margin-top: 16px;
}
.product-option-title {
  font-size: 1rem;
  width: 120px;
}
.product-option-main {
  font-size: 1rem;
}
.order-button {
  height: 46px;
  min-width: 220px;
  margin-left: 56px;
}
.order-nav {
  padding-top: 16px !important;
  justify-content: flex-start;
}
.similar-product {
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin-top: 64px;
  box-sizing: border-box;
}
.top-bar {
  width: 60%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 12px;
}
.similar-product-title {
  font-size: 1.5rem;
  font-family: Font Bold;
  color: var(--text-primary-color);
  margin-bottom: 32px;
}
.similar-product-main {
  width: 100%;
  max-height: 256px;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  overflow: hidden;
}
.total {
  font-size: 1.125rem;
  font-family: Font SemiBold;
}
.total-title {
  color: var(--text-secondary-color);
  width: 106px;
}
.slideshow {
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  justify-content: center;
}
.productshow {
  padding-top: 36px;
  padding-bottom: 24px;
  flex-direction: column;
}

.productshow-title {
  font-family: Font Bold;
  font-size: 2rem;
  color: var(--text-secondary-color);
}
.productshow-content {
  padding: 24px 24px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  max-height: 296px;
  overflow-y: hidden;
}
.space-border {
  width: 160px;
  height: 5px;
  border-radius: 4px;
  background-color: var(--input-normal-border-color);
}
.view-all-text {
  font-family: Font SemiBold;
  font-size: 0.9rem;
  margin: 12px 0;
  padding: 6px 12px;
  background-color: var(--button-primary-normal-bg-color);
  border-radius: 20px;
  color: #fff;
}
.view-all-text:hover {
  background-color: var(--button-primary-hover-bg-color);
  cursor: pointer;
}
.category-item{
  display: flex ;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>