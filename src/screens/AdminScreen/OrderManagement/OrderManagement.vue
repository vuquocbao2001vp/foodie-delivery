<template>
  <div class="main-content">
    <div class="top-control flex">
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
            <th>Mã đơn hàng</th>
            <th class="th-category-name">Họ tên</th>
            <th>Số điện thoại</th>
            <th>Tổng tiền</th>
            <th>Thời gian</th>
            <th>Người giao hàng</th>
            <th class="td-text-center">Trạng thái</th>
            <th class="td-text-center">Chi tiết</th>
          </tr>
        </template>
        <template #table-body>
          <tr>
            <td>ĐH1234</td>
            <td>Tào Tháo</td>
            <td>0123456789</td>
            <td>240,000đ</td>
            <td>12h00 19/03/2023</td>
            <td>Lưu Bị</td>
            <td class="td-text-center text-green">Đã hoàn thành</td>
            <td>
              <div class="flex flex-icon">
                <div @click="showDetail(true)" class="flex function-icon">
                  <div class="icon-detail icon-center" title="Chi tiết"></div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
  <OrderDetail :isShowDetail="isShowDetail" @showDetail="showDetail" />
</template>

<script>
import OrderDetail from "./OrderDetail.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    OrderDetail,
  },
  data() {
    return {
      isShowDetail: false,
    };
  },
  computed: {
    ...mapGetters(["products"]),
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
  width: 160px;
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
tbody tr {
  height: 56px;
}
tr:nth-child(odd) {
  background-color: var(--primary-bg);
}
.top-control {
  height: 60px;
  align-items: flex-start;
  position: relative;
}
.search-input {
  width: 240px;
  margin-right: 24px;
}
.main-table {
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow: auto;
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
  min-width: 96px;
  margin-right: 8px;
}
</style>