<template>
  <div class="main-content">
    <div class="top-control flex">
      <div class="paging-control flex">
        <div class="search-input">
          <DxTextBox
            mode="search"
            placeholder="Tìm kiếm"
            value-change-event="keyup"
            v-model="textSearch"
            @value-changed="getTextSearch"
          />
        </div>
        <div @click="previousPage" class="paging-icon flex" title="Trang trước">
          <div class="icon-prev icon-center"></div>
        </div>
        <span class="paging-number"
          ><span class="font-semibold">{{ paging.from }}-{{ paging.to }} </span>
          trong số <span class="font-semibold">{{ paging.total }}</span></span
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
            <th class="w120">Họ</th>
            <th>Tên</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th class="td-text-center">Trạng thái</th>
            <th class="td-text-center">Ngày tạo</th>
          </tr>
        </template>
        <template #table-body>
          <tr v-for="user in listUsers" :key="user">
            <td class="w120">{{ user.last_name }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
            <td>
              <div class="status-flex flex">
                <div class="status-text" :class="{'status-1': user.status==1, 'status-0': user.status==0}">
                  {{ statusText[user.status] }}
                </div>
              </div>
            </td>
            <td class="td-text-center">{{ formatDate(user.created_at) }}</td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import formatDate from "@/constants/functions/formatDate.js";

export default {
  data() {
    return {
      listUsers: null,
      timeout: null,
      textSearch: "",
      paging: {},
      statusText: ["Chưa kích hoạt", "Đang sử dụng"],
    };
  },
  computed: {
    ...mapGetters(["userList"]),
  },
  watch: {
    userList: function (value) {
      if (value) {
        this.listUsers = value.data;
        this.paging = { from: value.from, to: value.to, total: value.total };
      }
    },
    textSearch: function (value) {
      this.getUserList({ page: 1, per_page: 10, search: value });
    },
  },
  created() {
    this.getUserList({ page: 1, per_page: 10, search: "" });
  },
  methods: {
    ...mapMutations(["setUserList"]),
    ...mapActions(["getUserList"]),
    formatDate,
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
      if (this.userList.current_page > 1) {
        this.getUserList({
          page: this.userList.current_page - 1,
          per_page: 10,
          search: this.textSearch,
        });
      }
    },
    nextPage() {
      if (this.userList.current_page < this.userList.last_page) {
        this.getUserList({
          page: this.userList.current_page + 1,
          per_page: 10,
          search: this.textSearch,
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
  height: 56px;
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
.w120 {
  padding-left: 8px;
}
.status-flex {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
}
.status-text{
  background-color: aqua;
  padding: 6px 10px;
  border-radius: 20px;
}
.status-1{
  background-color: var(--text-green-color);
  color: #fff;
}
.status-0{
  background-color: var(--text-error);
  color: #fff;
}
</style>