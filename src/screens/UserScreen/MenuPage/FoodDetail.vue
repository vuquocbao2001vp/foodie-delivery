<template>
  <div class="detail-container">
    <div class="detail-top-container flex">
        <div class="detail-image flex">
            <img class="img" src="@/assets/Icons/pizza.png" alt="">
        </div>
        <div class="detail-order">
            <div class="product-title menu-header-text">Pizza xúc xích phô mai nướng</div>
            <p class="product-description">Đây là phần mô tả cho phép người dùng chỉ thay đổi kích thước của textarea theo một hướng nào đó người dùng sẽ không thể thay đổi kích thước của textarea bằng cách kéo thả viền của nó</p>
            <div class="space-border"></div>
            <div class="product-price">49,000 - 59,000 đ</div>
            <div class="product-option">
                <div class="product-option-title">Size</div>
                <div class="product-option-main flex">
                    <div class="size-option">
                        <BaseButton buttonName="M" buttonType="white" />
                    </div>
                    <div class="size-option">
                        <BaseButton buttonName="L" buttonType="white" />
                    </div>
                </div>
            </div>
            <div class="product-option">
                <div class="product-option-title">Ghi chú</div>
                <div class="product-option-main flex">
                    <textarea rows="3" placeholder="Nhập ghi chú của bạn tại đây..."></textarea>
                </div>
            </div>
            <div class="product-option">
                <div class="product-option-main order-nav flex">
                    <div class="size-option">
                        <div class="quantity-selection flex">
                            <div class="quantity-selection-nav quantity-selection-left flex">-</div>
                            <div class="quantity-selection-nav quantity-selection-text flex">1</div>
                            <div class="quantity-selection-nav quantity-selection-right flex">+</div>
                        </div>
                    </div>
                    <div class="order-button" @click="addProductToCart">
                        <BaseButton buttonType="regular" buttonName="THÊM VÀO GIỎ HÀNG" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="similar-product flex">
        <div class="top-bar"></div>
        <div class="similar-product-title">SẢN PHẨM TƯƠNG TỰ</div>
        <div class="similar-product-main flex">
            <BaseProduct />
            <BaseProduct />
            <BaseProduct />
            <BaseProduct />
        </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        addProductToCart(){
            this.$router.push({ path: '/cart' })
        },
    },
}
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
    width: 42%;
    min-height: 400px;
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
    width: 52%;
    min-height: 400px;
    background-color: #fff;
    /* box-shadow: 0 2px 5px 0 rgb(0 0 0 / 30%); */
    /* border-radius: 8px; */
    box-sizing: border-box;
}
.menu-header-text {
    font-size: 1.6rem;
    color: #494949 !important;
    font-family: Font Bold;
    padding: 0;
    width: fit-content;
}
.product-description{
    font-size: 1rem;
    font-style: italic;
    color: #777;
    padding: 4px 0;
}
.space-border{
    width: 64px;
    height: 4px;
    border-radius: 2px;
    margin: 8px 0 16px 0;
    background-color: rgba(0,0,0,.1);
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
    height: 48px;
    box-sizing: border-box;
}
.quantity-selection-nav {
    height: 48px;
    border: 1px solid;
    border-color: #e0e5e6;
    color: var(--text-primary-color);
    justify-content: center;
    background-color: #f7f7f7;
}
.quantity-selection-nav:hover {
  background-color: var(--primary-bg);
}

.quantity-selection-left{
    width: 40px;
    border-radius: 99px 0 0 99px;
    cursor: pointer;
}
.quantity-selection-text{
    width: 56px;
    border: 1px 0 !important;
}
.quantity-selection-right{
    width: 40px;
    border-radius: 0 99px 99px 0;
    cursor: pointer;
}
.product-option {
    margin-top: 16px;
}
.product-option-title {
    font-size: 1rem;
}
.product-option-main {
    margin-top: 8px;
}
.order-button {
    height: 48px;
    width: 220px;
    margin-left: 4px;
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
    margin-bottom:12px;
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
</style>