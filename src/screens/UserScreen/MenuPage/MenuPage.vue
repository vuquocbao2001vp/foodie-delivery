<template>
  <div class="menu-page flex">
    <div class="menu-navbar">
      <div class="menu-selection">
        <router-link to="/menu/all" class="menu-header-text selection-header"
          >MENU</router-link
        >
        <div class="space-border"></div>
        <div class="menu-search">
          <DxTextBox
            mode="search"
            placeholder="Tìm kiếm món ăn"
            value-change-event="keyup"
            @value-changed="getTextSearch"
          />
        </div>
        <div class="flex" style="flex-direction: column">
          <router-link
            v-for="category in listCategories"
            :key="category.id"
            :to="{ name: 'menu-filter', query: { name: getRouterLink(category.category_name) } }"
            class="selection-item"
            :class="{'active-router' : category.id == categoryId}"
            >{{ category.category_name }}</router-link
          >
        </div>
      </div>
      <div class="menu-filter">
        <div class="menu-header-text filter-header">Lọc theo giá</div>
        <div class="space-border"></div>
        <div class="filter-slider">
          <DxRangeSlider
            :min="0"
            :max="100000"
            v-model:start="priceStart"
            v-model:end="priceEnd"
            :step="2000"
            :tooltip="{ enabled: true }"
          />
        </div>
        <div class="filter-range flex">
          <div class="price-range">
            <span>Giá </span>
            <span class="bold-text"
              >{{ priceStart.toLocaleString() }}đ -
              {{ priceEnd.toLocaleString() }}đ</span
            >
          </div>
          <div class="filter-button" @click="filterByPrice">
            <BaseButton buttonName="Lọc" buttonType="grey" />
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "@/components/base/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      priceStart: null,
      priceEnd: null,
      timeout: null,
      textSearch: null,
      categoryId: null,
    };
  },
  computed: {
    ...mapGetters(["listCategories"]),
  },
  created() {
    this.getListCategories();
    this.priceStart = 0;
    this.priceEnd = 100000;
    this.getCategoryId(this.listCategories);
  },
  watch: {
    textSearch: function (value) {
      this.setMenuFilter({
        name: value,
        minPrice: this.priceStart,
        maxPrice: this.priceEnd,
      });
    },
    "$route.query": function () {
      this.getCategoryId(this.listCategories);
    },
  },
  methods: {
    ...mapMutations(["setListCategories", "setMenuFilter"]),
    ...mapActions(["getListCategories"]),

    getRouterLink(categoryName) {
      const unidecode = require("unidecode");
      let str = unidecode(categoryName.toLowerCase());
      let router = str.replace(/\s+/g, "-");
      return router;
    },
    linkToPage(categoryName){
      this.$router.push({ name: "menu-filter", query: { name: this.getRouterLink(categoryName) } });
    },
    /**
     * Lấy ra từ khóa tìm kiếm sau khi nhập xong input
     */
    getTextSearch(data) {
      clearTimeout(this.timeout);
      var self = this;
      this.timeout = setTimeout(function () {
        self.textSearch = data.value;
      }, 500);
    },
    filterByPrice() {
      this.setMenuFilter({
        name: this.textSearch,
        minPrice: this.priceStart,
        maxPrice: this.priceEnd,
      });
    },

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
.menu-page {
  width: 100%;
  padding-left: 10%;
  box-sizing: border-box;
  align-items: flex-start;
  position: relative;
  min-height: 100vh;
  padding-top: 32px;
}
.menu-navbar {
  width: 18%;
  position: absolute;
}
.menu-selection {
  margin-bottom: 32px;
  width: 100%;
}
.menu-header-text {
  font-size: 1.25rem;
  color: #777777 !important;
  font-family: Font Bold;
  padding: 4px 4px 4px 0;
  width: fit-content;
}
.selection-header {
  cursor: pointer;
}
.space-border {
  width: 32px;
  height: 4px;
  border-radius: 2px;
  margin-bottom: 6px;
  background-color: rgba(0, 0, 0, 0.1);
}
.selection-item {
  font-size: 1.075rem;
  padding: 16px 0 2px 0;
  border-bottom: 0.025rem solid #e8e8e8;
  color: var(--text-red-color) !important;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
}
.selection-item:hover {
  color: var(--text-primary-color) !important;
}
/* .selection-item.router-link-active {
  color: var(--text-primary-color) !important;
  font-family: Font Bold;
} */
.active-router{
  color: var(--text-primary-color) !important;
  font-family: Font Bold;
}
.filter-slider {
  margin-top: 16px;
}
.menu-search {
  margin-top: 16px;
  width: 100%;
  background-color: antiquewhite;
  position: relative;
}
.icon-textbox {
  position: absolute;
  content: "";
  top: 9px;
  right: 12px;
  width: 18px;
  height: 18px;
  mask: url("@/assets/Icons/Icon_request.0a9f1483.svg") no-repeat -291px -4px;
  background-color: #9fa4b4 !important;
  z-index: 1;
}
.control-textbox {
  padding-right: 28px;
  width: 100% !important;
}
.filter-range {
  position: relative;
  font-size: 1.1rem;
  color: #777777;
  margin-top: 16px;
}
.bold-text {
  font-family: Font Bold;
}
.filter-button {
  position: absolute;
  right: 0;
}
.arrange-selection {
  margin-top: 24px;
}
/* .exact-active{
  color: var(--text-primary-color) ;
}
.exact-active{
  color: var(--text-red-color);
} */
</style>