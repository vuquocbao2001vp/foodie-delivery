<template>
  <div class="category-item">
    <div
      @click="viewProduct"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      class="item-image"
    >
      <img class="img" :src="product ? product.image : ''" alt="" />
      <div v-show="isHover" class="img-nav flex">Thêm vào giỏ hàng</div>
    </div>
    <p :title="product ? product.name : ''" @click="viewProduct" class="item-name">
      {{ product ? product.name : "" }}
    </p>
    <p class="item-price">
      {{ product ? product.price.toLocaleString() : "" }}đ
    </p>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    viewProduct() {
      this.$router.push({ name: "detail", query: { id: this.product.id } });
    },
  },
};
</script>

<style scoped>
.category-item {
  width: 200px;
  margin: 0 24px;
  margin-bottom: 24px;
  box-sizing: border-box;
}
.item-image {
  position: relative;
  width: 100%;
  height: 200px;
  cursor: pointer;
  box-sizing: border-box;
}
.img {
  width: 100%;
  height: 100%;
}
.item-name {
  width: 100%;
  color: var(--text-red-color);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
}
.item-name:hover {
  color: var(--text-primary-color);
}
.item-price {
  font-family: Font Bold;
}
.img-nav {
  position: absolute;
  width: 100%;
  height: 36px;
  font-size: 0.95rem;
  color: var(--text-white-secondary-color);
  background-color: var(--primary);
  justify-content: center;
  bottom: 0;
  font-family: Font SemiBold;
}
.img-nav:hover {
  color: var(--text-white-primary-color);
}
</style>