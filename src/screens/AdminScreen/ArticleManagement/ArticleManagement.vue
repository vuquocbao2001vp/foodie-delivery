<template>
  <div class="main-content">
    <div class="top-control flex">
      <div class="top-button" @click="showDetail(true, SAVE_MODE.Add, {})">
        <BaseButton buttonType="regular-square" buttonName="Bài viết mới" />
      </div>
      <div
        class="top-button"
        v-if="selectedArticles.length > 0"
        @click="deleteMultiArticleOnClick"
      >
        <BaseButton buttonType="red-square" buttonName="Xóa" />
      </div>
      <div class="paging-control flex">
        <div class="search-input">
          <DxTextBox
            mode="search"
            placeholder="Tìm kiếm"
            value-change-event="keyup"
            @value-changed="getTextSearch"
          />
        </div>
      </div>
    </div>
    <div class="main-table">
      <BaseTable>
        <template #table-header>
          <tr>
            <th class="th-checkbox td-text-center">
              <div @click="checkAll"><DxCheckBox v-model="isSelectAll" /></div>
            </th>
            <th class="td-text-center">Ảnh</th>
            <th>Tiêu đề</th>
            <th class="td-text-center">Ngày tạo</th>
            <th class="td-text-center">Chức năng</th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="article in articles" :key="article.id">
            <td class="td-text-center">
              <div @click="selectArticle(article.id)">
                <DxCheckBox v-model="isCheck[article.id]" :disabled="article.id == 29"/>
              </div>
            </td>
            <td class="td-text-center">
              <img class="img" :src="article.media" alt="" />
            </td>
            <td>{{ article.title }}</td>
            <td class="td-text-center">{{ formatDate(article.created_at) }}</td>
            <td>
              <div class="flex flex-icon">
                <div
                  @click="showDetail(true, SAVE_MODE.Edit, article)"
                  class="flex function-icon"
                >
                  <div class="icon-edit icon-center" title="Sửa"></div>
                </div>
                <div
                  v-if="article.id !== 29"
                  class="flex function-icon"
                  @click="deleteArticleOnClick(article)"
                >
                  <div class="icon-delete icon-center" title="Xóa"></div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
  <ArticleDetail
    :isShowDetail="isShowDetail"
    @showDetail="showDetail"
    :saveMode="saveMode"
    :selectedArticle="selectedArticle"
  />

  <BasePopup v-if="isShowPopup">
    <template #header>
      <div>Thông báo</div>
      <div class="header-icon flex">
        <div
          class="icon-X-secondary icon-center"
          @click="showPopup(false)"
        ></div>
      </div>
    </template>
    <template #content>
      <div class="noti-popup">
        <div class="noti-icon flex"><div class="icon-warning"></div></div>
        <div class="noti-info-text flex">{{ popupMessage }}</div>
      </div>
    </template>
    <template #control>
      <div class="control-flex flex">
        <div class="control-button" @click="confirmPopupAction">
          <BaseButton buttonType="regular-square" buttonName="Đồng ý" />
        </div>
        <div class="control-button" @click="showPopup(false)">
          <BaseButton buttonType="white-regular-square" buttonName="Hủy" />
        </div>
      </div>
    </template>
  </BasePopup>
</template>

<script>
import ArticleDetail from "./ArticleDetail.vue";
import formatDate from "@/constants/functions/formatDate.js";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    ArticleDetail,
  },
  inject: ["Enum"],
  data() {
    return {
      isShowDetail: false,
      selectedArticle: {},
      deleteToArticle: {},
      selectedArticles: [],
      isSelectAll: false,
      isCheck: [],
      saveMode: null,
      isShowPopup: false,
      popupMessage: "",
      timeout: null,
      textSearch: "",
    };
  },
  computed: {
    ...mapGetters(["articles", "articleSelected"]),
    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
  },
  watch: {
    textSearch: function (value) {
      this.getArticleList(value);
    },
  },
  created() {
    this.getArticleList("");
  },
  methods: {
    ...mapMutations(["setArticles", "setArticle"]),
    ...mapActions(["getArticleList", "getArticle", "deleteArticle"]),
    formatDate,
    /**
     * Hiển thị chi tiết sản phẩm
     */
    async showDetail(isShow, mode, article) {
      this.saveMode = mode;
      if (isShow == true && mode == this.SAVE_MODE.Edit) {
        await this.getArticle(article.id);
        this.isShowDetail = isShow;
      } else {
        this.setArticle([])
        this.isShowDetail = isShow;
      }
    },

    /**
     * Hiển thị popup
     */
    showPopup(isShow, message) {
      this.isShowPopup = isShow;
      this.popupMessage = message;
    },

    /**
     * Xóa sản phẩm khi click vào icon xóa ở cột chức năng
     */
    deleteArticleOnClick(article) {
      this.deleteToArticle = article;
      this.showPopup(
        true,
        "Bạn có chắc chắn muốn xóa bài viết " + article.title + " không?"
      );
    },

    /**
     * sự kiện click xác nhận ở popup
     */
    confirmPopupAction() {
      this.deleteArticle(this.deleteToArticle.id);
      this.showPopup(false);
    },
    /**
     * Khi tích chọn checkbox thì id của sản phẩm sẽ được thêm vào mảng selectedProducts
     */
    selectArticle(articleId) {
      if (!this.isCheck[articleId]) {
        this.isSelectAll = false;
        let id = this.selectedArticles.indexOf(articleId);
        this.selectedArticles.splice(id, 1);
      } else {
        this.selectedArticles.push(articleId);
        if (this.selectedArticles.length == this.articles.length) {
          this.isSelectAll = true;
        }
      }
    },
    /**
     * Check và bỏ check tất cả các checkbox danh mục
     */
    checkAll() {
      if (this.isSelectAll) {
        for (let i = 0; i < this.articles.length; i++) {
          this.isCheck[this.articles[i].id] = true;
        }
        this.selectedArticles = this.articles.map((article) => article.id);
      } else {
        this.isCheck.fill(false);
        this.selectedArticles = [];
      }
    },
    deleteMultiArticleOnClick() {
      console.log(this.selectedArticles);
      // this.showPopup(true, "Bạn có chắc chắn muốn xóa những danh mục đã chọn không?")
      // this.popupAction = "deleteMultiCategory";
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
  },
};
</script>

<style scoped>
.main-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.main-table {
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow: auto;
}
th.th-checkbox {
  max-width: 48px;
}
.th-category-name {
  width: 200px;
}
.td-function div {
  height: 40px;
}
.td-function {
  justify-content: center;
}
.flex-icon {
  width: 100%;
  height: 100%;
  justify-content: center;
}
.function-icon {
  height: 18px;
  width: 18px;
  box-sizing: border-box;
  margin: 0 4px;
}
tr:nth-child(odd) {
  background-color: var(--primary-bg);
}
tbody tr {
  height: 72px;
}
.img {
  width: 48px;
  height: 48px;
  box-sizing: border-box;
}
.top-control {
  height: 60px;
  align-items: flex-start;
  position: relative;
  box-sizing: border-box;
}
.search-input {
  width: 240px;
  margin: 0 24px;
}
.paging-control {
  height: 34px;
  position: absolute;
  right: 0;
  box-sizing: border-box;
}
.paging-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  justify-content: center;
  cursor: pointer;
}
.paging-icon:hover {
  background-color: #ccc;
}
.paging-number {
  padding: 0 8px;
}
.top-button {
  margin-right: 8px;
  min-width: 96px;
}

.header-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50%;
  justify-content: center;
  cursor: pointer;
}
.header-icon:hover {
  background-color: #ccc;
}
.noti-popup {
  display: flex;
  align-items: flex-start;
  width: 400px;
  min-height: 70px;
  border-bottom: 1px solid #b8bcc3;
  box-sizing: border-box;
}
.noti-icon {
  width: 48px;
  height: 48px;
  justify-content: center;
  box-sizing: border-box;
}
.noti-info-text {
  min-height: 48px;
  padding-left: 12px;
  font-size: 1rem;
  box-sizing: border-box;
}
.control-flex {
  flex-direction: row-reverse;
}
.control-button {
  margin-left: 8px;
}
</style>