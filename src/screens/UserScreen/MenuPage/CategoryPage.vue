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
      categoryId: null,
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
    this.getListProducts({
      page: 1,
      per_page: 200,
      category_id: "",
      name: "",
      min_price: "",
      max_price: "",
    });
    if (this.$route.query.name) {
      this.getCategoryId(this.listCategories);
    } 
  },
  watch: {
    listProducts: function(value){
      if(this.$route.path == "/menu/all");
      this.showProducts = [...value];
    },
    "$route.query": function () {
      this.getCategoryId(this.listCategories);
    },
    categoryId: function (value) {
      if (value != 0) {
        this.showProducts = this.listProducts.filter(
          (product) => product.category_id == value
        );
      } 
      else {
        this.showProducts = [...this.listProducts];
      }
    },
    menuFilter: {
      handler(value) {
        this.getProductFilter({
          page: 1,
          per_page: 200,
          category_id: this.categoryId,
          name: value.name,
          min_price: value.minPrice,
          max_price: value.maxPrice,
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
          let router = str.replace(/\s+/g, "-");
          if (this.$route.query.name == router) {
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
  width: 100%;
  margin-left: 21%;
  padding-left: 16px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
</style>