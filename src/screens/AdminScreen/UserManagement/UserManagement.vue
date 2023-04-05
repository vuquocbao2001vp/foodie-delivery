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
            <th>Họ tên</th>
            <th class="td-text-center">Giới tính</th>
            <th class="td-text-center">Ngày sinh</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th class="td-text-center">Ngày tạo</th>
            <th class="td-text-center">Chi tiết</th>
          </tr>
        </template>
        <template #table-body>
          <tr>
            <td>Tào Tháo</td>
            <td class="td-text-center">Nam</td>
            <td class="td-text-center">4/4/186</td>
            <td>0912345678</td>
            <td>taothao@tamquoc.com</td>
            <td>Khu 3 Hoàng Cương, Thanh Ba, Phú Thọ</td>
            <td class="td-text-center">4/4/1866</td>
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
  <UserDetail :isShowDetail="isShowDetail" @showDetail="showDetail" />
</template>

<script>
import UserDetail from "./UserDetail.vue";

export default {
  components: {
    UserDetail,
  },
  data() {
    return {
      isShowDetail: false,
    };
  },
  methods: {
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
  height: 48px;
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