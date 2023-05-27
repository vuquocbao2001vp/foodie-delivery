<template>
  <div class="slideshow flex">
    <DxGallery
        :data-source="dataSourse"
        :loop="true"
        :slideshow-delay="3000"
        :show-indicator="true"
        :width="600"
        :height="600"
      />
  </div>
  <div class="productshow slideshow flex">
    <div class="productshow-title">SẢN PHẨM NỔI BẬT</div>
    <div class="space-border"></div>
    <div class="productshow-content flex">
      <div v-for="product in listProducts" :key="product.id">
        <base-product :product="product" />
      </div>
    </div>
    <div @click="routerToLink('/menu/all')" class="view-all-text">XEM TẤT CẢ</div>
  </div>
  <div class="productshow slideshow flex">
    <div class="productshow-title">TIN TỨC MỚI NHẤT</div>
    <div class="space-border"></div>
    <div class="articleshow-content productshow-content flex">
      <div class="article-item" v-for="article in showArticles" :key="article.id">
        <div class="news-day">
          <div class="day-text bold-text">{{convertDate(article.created_at)[0]}}</div>
          <div class="day-text">TH{{convertDate(article.created_at)[1]}}</div>
        </div>
        <div @click="viewArticle(article.id)" class="article-image">
          <img class="img" :src="article.media" alt="" />
        </div>
        <p
          :title="article.title"
          @click="viewArticle(article.id)"
          class="article-name"
        >
          {{ article.title}}
        </p>
      </div>
    </div>
    <div @click="routerToLink('/news')" class="view-all-text">XEM TẤT CẢ</div>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import BaseProduct from '@/components/base/BaseProduct.vue';
export default {
  components: { BaseProduct },
  data() {
    return {
      dataSourse: [
        "https://js.devexpress.com/Content/images/doc/22_2/PhoneJS/person1.png",
        "https://js.devexpress.com/Content/images/doc/22_2/PhoneJS/person2.png",
        "https://js.devexpress.com/Content/images/doc/22_2/PhoneJS/person3.png",
        "https://js.devexpress.com/Content/images/doc/22_2/PhoneJS/person4.png",
      ],
    };
  },
  computed: {
    ...mapGetters(["listProducts", "showArticles"])
  },
  created(){
    this.getListProducts({
      page: 1,
      per_page: 100,
      category_id: "",
      name: "",
      min_price: "",
      max_price: "",
      highlight: 1,
    });
    this.getShowArticles();
  },
  methods: {
    ...mapMutations(["setListProducts"]),
    ...mapActions(["getListProducts", "getShowArticles"]),
    convertDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return [day, month];
    },
    viewArticle(id) {
      this.$router.push({ name: "article", query: { id: id } });
    },
    routerToLink(path){
      this.$router.push({ path: path});
    }
  },
};
</script>
<style scoped>
.slideshow {
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  justify-content: center;
}
.productshow{
  padding-top: 36px;
  padding-bottom: 24px;
  flex-direction: column;
}

.productshow-title {
  font-family: Font Bold;
  font-size: 2rem;
  color: var(--text-secondary-color);
}
.productshow-content{
  padding: 24px 24px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  max-height: 564px;
  overflow-y: hidden;
}
.space-border{
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

.article-item{
  width: 240px;
  min-height: 200px;
  position: relative;
  box-sizing: border-box;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.bold-text {
  font-family: Font Bold;
}
.article-image {
  position: relative;
  width: 240px;
  height: 200px;
  cursor: pointer;
  box-sizing: border-box;
}
.img {
  width: 100%;
  height: 100%;
}
.articleshow-content{
  max-height: 320px;
}
.article-name {
  margin-top: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.article-item:hover{
  color: var(--text-blue-color);
}
</style>