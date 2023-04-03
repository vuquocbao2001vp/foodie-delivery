<template>
  <div class="main-content">
    <div class="top-control flex">
      <div class="top-button">
        <BaseButton buttonType="regular-square" buttonName="Sản phẩm mới" />
      </div>
      <div class="top-button">
        <BaseButton buttonType="red-square" buttonName="Xóa" />
      </div>
      <div class="paging-control flex">
        <div class="search-input">
          <DxTextBox
            mode="search"
            placeholder="Tìm kiếm"
          />
        </div>
        <div class="paging-icon flex" title="Trang trước">
          <div class="icon-prev icon-center"></div>
        </div>
        <span class="paging-number"
          >10 <span class="font-semibold">of</span> 50</span
        >
        <div class="paging-icon flex" title="Trang sau">
          <div class="icon-next icon-center"></div>
        </div>
      </div>
    </div>
    <div class="main-table">
      <BaseTable>
        <template #table-header>
          <tr>
            <th class="th-checkbox td-text-center"><DxCheckBox /></th>
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
          <tr v-for="product in products" :key="product.id">
            <td class="td-text-center"><DxCheckBox /></td>
            <td class="td-text-center">
              <img class="img" :src="product.image" alt="" />
            </td>
            <td>{{product.name}}</td>
            <td>{{product.category}}</td>
            <td class="td-text-center">{{product.price}}</td>
            <td>
              <div class="flex flex-icon">
                <div class="flex function-icon">
                  <div class="icon-check icon-center"></div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex flex-icon">
                <div class="flex function-icon">
                  <div class="icon-check icon-center"></div>
                </div>
              </div>
            </td>
            <td class="td-text-center">240</td>
            <td>
              <div class="flex flex-icon">
                <div @click="showDetail(true)" class="flex function-icon">
                  <div class="icon-edit icon-center" title="Sửa"></div>
                </div>
                <div class="flex function-icon">
                  <div class="icon-delete icon-center" title="Xóa"></div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
  <ProductDetail :isShowDetail="isShowDetail" @showDetail="showDetail" />
</template>

<script>
import ProductDetail from "./ProductDetail.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProductDetail,
  },
  data() {
    return {
      isShowDetail: false,
    };
  },
  computed: {
    ...mapGetters(["products"]),
  },
  created(){
    const products = JSON.parse(sessionStorage.getItem("products"));
    if (products) {
      this.setProducts(products)
    } else {
      this.getProducts({limit: 10, offset: 11})
    }
  },
  methods: {
    ...mapMutations(["setProducts"]),
    ...mapActions(["getProducts"]),

    showDetail(isShow) {
      this.isShowDetail = isShow;
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
  margin-right: 24px;
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
</style>