<template>
  <div class="main-content">
    <div class="top-control flex">
      <div class="top-button" @click="showDetail(true, SAVE_MODE.Add, {})">
        <BaseButton buttonType="regular-square" buttonName="Sản phẩm mới" />
      </div>
      <div
        class="top-button"
        v-if="selectedProducts.length > 0"
        @click="deleteMultiProductOnClick"
      >
        <BaseButton buttonType="red-square" buttonName="Xóa" />
      </div>
      <div class="paging-control flex">
        <div class="item-input">
          <DxSelectBox
            :search-enabled="true"
            v-model:value="categorySearch"
            :data-source="listCategories"
            no-data-text="Không có dữ liệu"
            display-expr="category_name"
            value-expr="id"
            placeholder="Lọc theo danh mục"
          />
        </div>
        <div class="search-input">
          <DxTextBox
            mode="search"
            placeholder="Tìm kiếm"
            value-change-event="keyup"
            @value-changed="getTextSearch"
          />
        </div>
        <div @click="previousPage" class="paging-icon flex" title="Trang trước">
          <div class="icon-prev icon-center"></div>
        </div>
        <span class="paging-number"
          ><span class="font-semibold"
            >{{ products.from }}-{{ products.to }}
          </span>
          trong số <span class="font-semibold">{{ products.total }}</span></span
        >
        <div @click="nextPage" class="paging-icon flex" title="Trang sau">
          <div class="icon-next icon-center"></div>
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
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th class="td-text-center">Giá</th>
            <th class="td-text-center">Trạng thái</th>
            <th class="td-text-center">Sản phẩm nổi bật</th>
            <th class="td-text-center">Đã bán</th>
            <th class="td-text-center">Chức năng</th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="product in products.data" :key="product.id">
            <td class="td-text-center">
              <div @click="selectProduct(product.id)">
                <DxCheckBox v-model="isCheck[product.id]" />
              </div>
            </td>
            <td class="td-text-center">
              <img class="img" :src="product.image" alt="" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ (product.category_id > 0) ? product.category.category_name : ""}}</td>
            <td class="td-text-center">{{ product.price }}</td>
            <td>
              <div class="flex flex-icon" v-if="product.status">
                <div class="flex function-icon">
                  <div class="icon-check icon-center"></div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex flex-icon" v-if="product.highlight">
                <div class="flex function-icon">
                  <div class="icon-check icon-center"></div>
                </div>
              </div>
            </td>
            <td class="td-text-center">{{ product.sold_count }}</td>
            <td>
              <div class="flex flex-icon">
                <div
                  @click="showDetail(true, SAVE_MODE.Edit, product)"
                  class="flex function-icon"
                >
                  <div class="icon-edit icon-center" title="Sửa"></div>
                </div>
                <div
                  class="flex function-icon"
                  @click="deleteProductOnClick(product)"
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

  <ProductDetail
    :isShowDetail="isShowDetail"
    @showDetail="showDetail"
    :saveMode="saveMode"
    :selectedProduct="selectedProduct"
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
import ProductDetail from "./ProductDetail.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProductDetail,
  },
  inject: ["Enum"],
  data() {
    return {
      isShowDetail: false,
      selectedProduct: {},
      selectedProducts: [],
      isSelectAll: false,
      isCheck: [],
      saveMode: null,
      isShowPopup: false,
      popupMessage: "",
      timeout: null,
      textSearch: "",
      categorySearch: "",
    };
  },
  computed: {
    ...mapGetters(["products", "categories"]),
    // showProducts(){
    //   return this.products;
    // },

    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
    listCategories() {
      let allCategories = {
        id: "",
        category_name: "Tất cả",
      };
      let uncategorized = {
        id: 0,
        category_name: "Chưa được phân loại",
      };
      return [allCategories, ...this.categories, uncategorized];
    },
  },
  watch: {
    textSearch: function (value) {
      this.getProducts({
        page: this.products.current_page,
        per_page: 10,
        name: value,
        category_id: this.categorySearch,
      });
    },
    categorySearch: function (value) {
      this.getProducts({
        page: this.products.current_page,
        per_page: 10,
        name: this.textSearch,
        category_id: value,
      });
    },
  },
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    const categories = vuex.admin.categories;
    if (categories != null) {
      this.setCategories(categories);
    } else {
      this.getCategories();
    }
    // const vuex = JSON.parse(localStorage.getItem("vuex"));
    // const products = vuex.admin.products;
    // if (products != null) {
    //   this.setProducts(products);
    // } else {
    this.getProducts({ page: 1, per_page: 10, category_id: "", name: "" });
    // }
    // this.textSearch = "";
    // this.offset = 0;
  },
  methods: {
    ...mapMutations(["setProducts", "setCategories"]),
    ...mapActions(["getProducts", "deleteProduct", "getCategories"]),

    /**
     * Hiển thị chi tiết sản phẩm
     */
    showDetail(isShow, mode, product) {
      this.isShowDetail = isShow;
      this.saveMode = mode;
      this.selectedProduct = product;
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
    deleteProductOnClick(product) {
      this.selectedProduct = product;
      this.showPopup(
        true,
        "Bạn có chắc chắn muốn xóa sản phẩm " + product.name + " không?"
      );
    },

    /**
     * sự kiện click xác nhận ở popup
     */
    confirmPopupAction() {
      this.deleteProduct(this.selectedProduct.id);
      this.showPopup(false);
    },
    /**
     * Khi tích chọn checkbox thì id của sản phẩm sẽ được thêm vào mảng selectedProducts
     */
    selectProduct(productId) {
      if (!this.isCheck[productId]) {
        this.isSelectAll = false;
        let id = this.selectedProducts.indexOf(productId);
        this.selectedProducts.splice(id, 1);
      } else {
        this.selectedProducts.push(productId);
        if (this.selectedProducts.length == this.products.length) {
          this.isSelectAll = true;
        }
      }
    },
    /**
     * Check và bỏ check tất cả các checkbox danh mục
     */
    checkAll() {
      if (this.isSelectAll) {
        for (let i = 0; i < this.products.length; i++) {
          this.isCheck[this.products[i].id] = true;
        }
        this.selectedProducts = this.products.map((product) => product.id);
      } else {
        this.isCheck.fill(false);
        this.selectedProducts = [];
      }
    },
    deleteMultiProductOnClick() {
      console.log(this.selectedProducts);
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
    previousPage() {
      if (this.products.current_page > 1) {
        this.getProducts({
          page: this.products.current_page - 1,
          per_page: 10,
          name: this.textSearch,
          category_id: this.categorySearch,
        });
      }
    },
    nextPage() {
      if (this.products.current_page < this.products.last_page) {
        this.getProducts({
          page: this.products.current_page + 1,
          per_page: 10,
          name: this.textSearch,
          category_id: this.categorySearch,
        });
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