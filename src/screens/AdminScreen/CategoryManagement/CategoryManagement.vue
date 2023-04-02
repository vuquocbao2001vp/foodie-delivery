<template>
  <div class="main-content">
    <div class="top-control flex">
      <div class="top-button" @click="showDetail(true, SAVE_MODE.Add, {})">
        <BaseButton buttonType="regular-square" buttonName="Danh mục mới" />
      </div>
      <div class="top-button" v-if="selectedCategories.length > 0">
        <BaseButton buttonType="red-square" buttonName="Xóa" />
      </div>
    </div>
    <div class="main-table">
      <BaseTable>
        <template #table-header>
          <tr>
            <th class="th-checkbox td-text-center">
              <div @click="checkAll"><DxCheckBox v-model="isSelectAll" /></div>
            </th>
            <th class="th-category-name">Tên danh mục</th>
            <th class="td-text-center">Thứ tự hiển thị</th>
            <th class="td-text-center">Trạng thái</th>
            <th class="td-text-center">Chức năng</th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="(category, index) in categories" :key="category.id">
            <td class="td-text-center">
              <div @click="selectCategory(category.id, index)">
                <DxCheckBox v-model="isCheck[index]" />
              </div>
            </td>
            <td>{{ category.category_name }}</td>
            <td class="td-text-center">{{ category.id }}</td>
            <td>
              <div class="flex flex-icon">
                <div class="flex function-icon">
                  <div class="icon-check icon-center"></div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex flex-icon">
                <div
                  @click="showDetail(true, SAVE_MODE.Edit, category)"
                  class="flex function-icon"
                >
                  <div class="icon-edit icon-center" title="Sửa"></div>
                </div>
                <div class="flex function-icon">
                  <div
                    class="icon-delete icon-center"
                    title="Xóa"
                    @click="deleteCategoryOnClick(category.id)"
                  ></div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
  <CategoryDetail
    :isShowDetail="isShowDetail"
    @showDetail="showDetail"
    :saveMode="saveMode"
    :selectedCategory="selectedCategory"
  />
  <BaseToast text="Xóa dữ liệu thành công." :isHideToast="true"/>
</template>

<script>
import CategoryDetail from "./CategoryDetail.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    CategoryDetail,
  },
  inject: ["Enum"],
  data() {
    return {
      isShowDetail: false,
      selectedCategory: {},
      selectedCategories: [],
      isSelectAll: false,
      isCheck: [],
      saveMode: null,
    };
  },
  computed: {
    ...mapGetters(["categories"]),
    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
  },
  created() {
    /**
     * Lấy danh mục từ storage, nếu chưa có thì gọi api lấy danh mục
     */
    const categories = JSON.parse(sessionStorage.getItem("categories"));
    if (categories) {
      this.setCategories(categories);
    } else {
      this.getCategories();
    }
  },
  mounted() {
    for (let i = 0; i < this.categories.length; i++) {
      this.isCheck[i] = false;
    }
  },
  watch: {},
  methods: {
    ...mapMutations(["setCategories"]),
    ...mapActions(["getCategories", "deleteCategory"]),

    /**
     * Hiển thị chi tiết danh mục
     */
    showDetail(isShow, mode, category) {
      this.isShowDetail = isShow;
      this.saveMode = mode;
      this.selectedCategory = category;
    },

    /**
     * Xóa danh mục khi click vào icon xóa ở cột chức năng
     */
    deleteCategoryOnClick(id) {
      this.deleteCategory(id);
    },

    /**
     * Khi tích chọn checkbox thì id của danh mục sẽ được thêm vào mảng selectedCategories
     */
    selectCategory(categoryId, index) {
      if (!this.isCheck[index]) {
        this.isSelectAll = false;
        let id = this.selectedCategories.indexOf(categoryId);
        this.selectedCategories.splice(id, 1);
      } else {
        this.selectedCategories.push(categoryId);
        if (this.selectedCategories.length == this.categories.length) {
          this.isSelectAll = true;
        }
      }
    },
    /**
     * Check và bỏ check tất cả các checkbox danh mục
     */
    checkAll() {
      if (this.isSelectAll) {
        this.isCheck.fill(true);
        this.selectedCategories = this.categories.map(
          (category) => category.id
        );
      } else {
        this.isCheck.fill(false);
        this.selectedCategories = [];
      }
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
.top-control {
  height: 60px;
  align-items: flex-start;
}
.search-input {
  width: 280px;
  margin-right: 8px;
}
.main-table {
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow: auto;
}
.top-button {
  margin-right: 8px;
  min-width: 96px;
}
</style>