<template>
  <div v-if="loginRole=='admin'" class="container-dashboard">
    <AdminNavbar />
    <div class="main-dashboard">
      <AdminHeader />
      <AdminContent />
    </div>
  </div>
</template>

<script>
import AdminHeader from '../../components/layout/AdminLayout/AdminHeader.vue'
import AdminNavbar from '../../components/layout/AdminLayout/AdminNavbar.vue'
import AdminContent from '../../components/layout/AdminLayout/AdminContent.vue'
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    AdminHeader,
    AdminNavbar,
    AdminContent
  },
  computed: {
    ...mapGetters(["loginRole"]),
  },
  created(){
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if(vuex){
      const adminToken = vuex.admin.adminToken;
      this.setAdminToken(adminToken);
    }
  },
  methods: {
    ...mapMutations(["setAdminToken"])
  }
}
</script>

<style scoped>
.container-dashboard {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
.main-dashboard {
  display: flex;
  flex-direction: column;
  width: calc(100% - 178px);
  height: 100vh;
  box-sizing: border-box;
}
</style>