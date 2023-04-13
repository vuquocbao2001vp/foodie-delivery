<template>
  <div class="header-dashboard flex">
    <div class="header-icon icon-three-stripes"></div>
    <div class="header-branch">
      <span class="header-left-branch">{{ headerTitle }}</span>
    </div>
    <div class="flex-end-block flex">
      <div class="admin-name flex">
        <span>{{admin ? admin.name : ''}}</span>
        <div @click="expandAdmin" class="header-right-icon flex">
          <div class="icon-down"></div>
        </div>
        <div v-if="isExpandAdmin" @click="logout" class="logout-panel flex">
          Đăng xuất
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      headerTitle: "",
      isExpandAdmin: false,
    };
  },
  computed: {
    ...mapGetters(["admin"]),
  },
  mounted() {
    this.headerTitle = this.$route.name;
  },
  created(){
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if(vuex){
        const admin = vuex.admin.admin;
        if(admin !== null){
            this.setAdmin(admin)
        } else {
            this.getAdminDetail();
        }
    }
  },
  watch: {
    "$route.name": function (value) {
      this.headerTitle = value;
    },
  },
  methods: {
    ...mapMutations(["setAdmin"]),
    ...mapActions(["adminLogout", "getAdminDetail"]),

    expandAdmin() {
      this.isExpandAdmin = !this.isExpandAdmin;
      if (this.isExpandAdmin == true) {
        setTimeout(() => {
          this.isExpandAdmin = false;
        }, 10000);
      }
    },

    logout() {
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        this.adminLogout();
      } else {
        this.isExpandAdmin = false;
      }
    },
  },
};
</script>
<style scoped>
.header-dashboard {
  width: 100%;
  height: 48px;
  min-height: 48px !important;
  background-color: #fff;
  box-shadow: 0 3px 2px -1px rgb(233, 232, 232);
}
.header-branch {
  padding-left: 8px;
  font-family: Font SemiBold;
  font-size: 14px;
}
.icon-down {
  background: url("@/assets/Icons/Sprites.64af8f61.svg") no-repeat -1078px -38px;
  width: 9px;
  height: 6px;
}

.header-right-icon {
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.header-right-icon:hover {
  background-color: #fff;
  border-radius: 0 4px 4px 0;
}
.header-left-branch {
  font-size: 1.125rem;
  font-family: Font Bold;
  padding-left: 16px;
}

/* content dashboard  */
.content-dashboard {
  padding-left: 20px;
}

.flex-end-block {
  position: absolute;
  right: 60px;
}

.admin-name {
  position: relative;
  min-width: 160px;
  height: 36px;
  /* background-color: #4ea344; */
  justify-content: center;
  background-color: var(--primary-bg);
  border: 2px solid var(--input-normal-border-color);
  border-radius: 4px;
}
.logout-panel {
  position: absolute;
  top: 38px;
  right: 0;
  height: 36px;
  width: 136px;
  cursor: pointer;
  justify-content: center;
  border: 1px solid var(--input-normal-border-color);
  background-color: #fff;
  z-index: 100;
}
</style>