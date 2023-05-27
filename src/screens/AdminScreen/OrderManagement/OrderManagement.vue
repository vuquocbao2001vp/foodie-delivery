<template>
  <div class="main-content">
    <div class="top-control flex">
      <div class="paging-control flex">
        <div class="item-input">
          <DxSelectBox
            v-model:value="statusSearch"
            :data-source="listStatusFilter"
            no-data-text="Không có dữ liệu"
            display-expr="value"
            value-expr="id"
            placeholder="Lọc theo trạng thái"
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
            >{{ orderList.from }}-{{ orderList.to }}
          </span>
          trong số <span class="font-semibold">{{ orderList.total }}</span></span
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
            <th class="td-text-center">Đơn hàng</th>
            <th>Thời gian</th>
            <th class="th-left">Khách hàng</th>
            <th class="th-left">Sản phẩm</th>
            <th>Tổng tiền</th>
            <th class="td-text-center">Trạng thái</th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="order in orderList.data" :key="order">
            <td class="td-text-center td-id">{{ order.id }}</td>
            <td class="td-time">{{ formatOrderTime(order.created_at) }}</td>
            <td class="pdh-4 td-user">
              <div class="pdh-4">
                {{ order.last_name + " " + order.first_name }}
              </div>
              <div class="pdh-4">{{ order.phone }}</div>
              <div class="pdh-4">{{ order.email }}</div>
              <div class="pdh-4">{{ order.address }}</div>
            </td>
            <td class="pdh-4 td-product">
              <div v-for="product in order.detail" :key="product" class="pdh-4">
                <div>
                  {{ product.product.name }}
                  <span class="text-bold">x{{ product.amount }}</span>
                </div>
              </div>
              <div v-if="order.note" class="pdh-4">
                <span class="text-bold">Ghi chú: </span>{{ order.note }}
              </div>
            </td>
            <td class="td-total-money">{{ order.total_price.toLocaleString()}}đ</td>
            <td class="td-status">
              <div class="td-selectbox-flex flex">
                <div class="td-selectbox">
                  <DxSelectBox
                    v-model:value="order.status"
                    :data-source="listStatus"
                    no-data-text="Không có dữ liệu"
                    display-expr="value"
                    value-expr="id"
                    placeholder=""
                    @value-changed="changeOrderStatus"
                    @item-click="changeOrderStatusOnClick(order.id)"
                    :disabled="(order.status == 4) ? true: false"
                  />
                </div>
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isShowDetail: false,
      statusSearch: "",
      listStatus: [
        { id: 1, value: "Đơn hàng mới" },
        { id: 2, value: "Đang xử lý" },
        { id: 3, value: "Đang vận chuyển" },
        { id: 4, value: "Đã hoàn thành" },
      ],
      oStatus: null,
      timeout: null,
      textSearch: "",
    };
  },
  computed: {
    ...mapGetters(["orderList"]),
    listStatusFilter() {
      let allStatus = {
        id: "",
        value: "Tất cả",
      };
      return [allStatus, ...this.listStatus];
    },
  },
  watch: {
    statusSearch: function (value) {
      this.getOrderList({ page: 1, per_page: 10, search: this.textSearch, status: value });
    },
    textSearch: function (value) {
      this.getOrderList({ page: 1, per_page: 10, search: value, status: this.statusSearch });
    },
  },
  created() {
    this.getOrderList({ page: 1, per_page: 10, search: "", status: "" });
  },
  methods: {
    ...mapMutations(["setOrderList"]),
    ...mapActions(["getOrderList", "updateOrder"]),

    showDetail(isShow) {
      this.isShowDetail = isShow;
    },

    formatOrderTime(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần +1
        const year = date.getFullYear();
        const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
        return formattedDate;
      }
      return "";
    },
    changeOrderStatus(e) {
      this.oStatus = e.value;
    },
    changeOrderStatusOnClick(id) {
      this.updateOrder({ id: id, status: this.oStatus });
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
      if (this.orderList.current_page > 1) {
        this.getOrderList({
          page: this.orderList.current_page - 1,
          per_page: 10,
          search: this.textSearch,
          status: this.statusSearch,
        });
      }
    },
    nextPage() {
      if (this.orderList.current_page < this.orderList.last_page) {
        this.getOrderList({
          page: this.orderList.current_page + 1,
          per_page: 10,
          search: this.textSearch,
          status: this.statusSearch,
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
  min-height: 100px;
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
  margin: 0 24px;
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
.pdh-4 {
  padding: 6px 8px;
}
.text-bold {
  font-family: Font Bold;
}
.td-selectbox-flex {
  width: 100%;
  justify-content: center;
}
.td-selectbox {
  width: 180px;
}
.td-user {
  width: 240px;
}
.td-product {
  width: 240px;
}
.td-time {
  width: 160px;
}
.td-id {
  width: 120px;
}
.td-total-money {
  width: 160px;
}
.td-status {
  width: 240px;
}
.th-left {
  padding-left: 14px;
}
</style>