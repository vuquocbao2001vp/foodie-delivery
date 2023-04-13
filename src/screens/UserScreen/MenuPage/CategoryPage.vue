<template>
  <div class="category-page">
    <div v-for="product in showProducts" :key="product.id">
      <BaseProduct :product="product" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      categoryId: 0,
      showProducts: [],
    };
  },
  computed: {
    ...mapGetters([
      "listProducts",
      "listCategories",
      "menuFilter",
      "productFilter",
    ]),
  },
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if (vuex) {
      const categories = vuex.user.listCategories;
      if (categories != null) {
        this.setListCategories(categories);
      } else {
        this.getListCategories();
      }
      const products = vuex.user.listProducts;
      if (products != null) {
        this.setListProducts(products);
      } else {
        this.getListProducts({
          category_id: "",
          name: "",
          min_price: "",
          max_price: "",
          limit: 100,
          page: null,
        });
      }
    }

    this.getCategoryId(this.listCategories);
    if (this.categoryId != 0) {
      this.showProducts = this.listProducts.filter(
        (product) => product.category_id == this.categoryId
      );
    } else {
      this.showProducts = [...this.listProducts];
    }
  },
  watch: {
    "$route.path": function () {
      this.getCategoryId(this.listCategories);
      if (this.categoryId != 0) {
        this.showProducts = this.listProducts.filter(
          (product) => product.category_id == this.categoryId
        );
      } else {
        this.showProducts = [...this.listProducts];
      }
    },
    menuFilter: {
      handler(value) {
        this.getProductFilter({
          category_id: this.categoryId,
          name: value.name,
          min_price: value.minPrice,
          max_price: value.maxPrice,
          limit: 100,
          page: null,
        });
      },
      deep: true,
    },
    productFilter: {
      handler(value) {
        this.showProducts = value.slice();
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["setListProducts", "setListCategories"]),
    ...mapActions(["getListProducts", "getListCategories", "getProductFilter"]),

    getCategoryId(categories) {
      const unidecode = require("unidecode");
      this.categoryId = 0;
      if (categories) {
        categories.forEach((category) => {
          let str = unidecode(category.category_name.toLowerCase());
          let router = "/menu/" + str.replace(/\s+/g, "-");
          if (this.$route.path == router) {
            this.categoryId = category.id;
            return;
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.category-page {
  width: 70%;
  position: absolute;
  left: 30%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
</style>