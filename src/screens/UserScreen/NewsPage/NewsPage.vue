<template>
  <div class="menu-page flex">
    <div class="category-page">
      <div class="category-item" v-for="article in showArticles" :key="article.id">
        <div class="news-day">
          <div class="day-text bold-text">{{convertDate(article.created_at)[0]}}</div>
          <div class="day-text">TH{{convertDate(article.created_at)[1]}}</div>
        </div>
        <div @click="viewArticle(article.id)" class="item-image">
          <img class="img" :src="article.media" alt="" />
        </div>
        <p
          :title="article.title"
          @click="viewArticle(article.id)"
          class="item-name"
        >
          {{ article.title}}
        </p>
      </div>
    </div>
    <div class="menu-navbar">
      <div class="menu-selection">
        <div class="menu-header-text selection-header">Tin tức Foodie</div>
        <div class="space-border"></div>
        <div class="article-item flex" v-for="article in showArticles" :key="article.id">
          <div class="article-item-image" @click="viewArticle(article.id)">
            <img class="article-img" :src="article.media" alt="" />
          </div>
          <div class="article-title" @click="viewArticle(article.id)">{{article.title}}</div>
        </div>
      </div>
      <div class="menu-selection">
        <div class="menu-header-text selection-header">Sản phẩm nổi bật</div>
        <div class="space-border"></div>
        <div class="article-item flex" v-for="product in listProducts" :key="product.id">
          <div class="article-item-image">
            <img class="article-img" :src="product.image" alt="" />
          </div>
          <div class="article-title">
            <div class="hot-product-name">{{product.name}}</div>
            <div class="hot-product-price">{{product.price.toLocaleString()}}đ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["showArticles", "listProducts"]),
  },
  created(){
    this.getShowArticles();
    this.getListProducts({
      page: 1,
      per_page: 5,
      category_id: "",
      name: "",
      min_price: "",
      max_price: "",
      highlight: 1,
    });
  },
  methods: {
    ...mapActions(["getShowArticles", "getListProducts"]),
    convertDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return [day, month];
    },
    viewArticle(id) {
      this.$router.push({ name: "article", query: { id: id } });
    },
  },
};
</script>
<style scoped>
.menu-page {
  width: 100%;
  padding: 0 8%;
  box-sizing: border-box;
  align-items: flex-start;
  position: relative;
  padding-bottom: 64px;
  padding-top: 32px;
}
.menu-navbar {
  width: 28%;
  margin-left: 24px;
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
  width: 40px;
  height: 4px;
  border-radius: 2px;
  margin-bottom: 6px;
  background-color: rgba(0, 0, 0, 0.1);
}

.bold-text {
  font-family: Font Bold;
}
.category-page {
  width: 72%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 24px;
  border-right: 1px solid var(--input-normal-border-color);
}
.category-item {
  width: calc((100% - 128px) / 2);
  margin: 0 32px;
  margin-bottom: 32px;
  box-sizing: border-box;
  position: relative;
}
.category-item:hover{
  color: var(--text-blue-color);
}
.item-image {
  position: relative;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
}
.img {
  width: 100%;
  height: 100%;
}
.item-name {
  margin-top: 8px;
  width: 100%;
  font-size: 1.2rem;
  cursor: pointer;
}
.news-day {
  position: absolute;
  top: 24px;
  left: -12px;
  width: 52px;
  height: 52px;
  background-color: var(--button-primary-normal-bg-color);
  color: #fff;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
}
.article-item {
  width: 100%;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid var(--input-normal-border-color);
}
.article-item-image{
  width: 48px;
  height: 48px;
  background-color: #fff;
  box-sizing: border-box;
}
.article-img{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.article-title{
  width: calc(100% - 56px);
  font-size: 1rem;
  margin-left: 8px;
  color: var(--text-red-color);
  box-sizing: border-box;
}
.article-title:hover {
  color: var(--text-primary-color);
  cursor: pointer;
}
.hot-product-name{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hot-product-price{
  color: var(--text-primary-color);
}
</style>