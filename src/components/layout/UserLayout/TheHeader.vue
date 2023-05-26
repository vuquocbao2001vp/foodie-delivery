<template>
  <div class="header flex">
    <router-link to="/home" class="header-logo flex">
      <div class="pizza-logo icon-center logo"></div>
      <div class="logo-text">Foodie</div>
    </router-link>
    <div class="header-navbar flex">
      <router-link to="/home" class="navbar-item flex">Trang chủ</router-link>
      <router-link to="/intro" class="navbar-item flex">Giới thiệu</router-link>
      <router-link
        to="/menu/all"
        :class="[
          { 'router-link-active active': $route.path.indexOf('/menu/') > -1 },
        ]"
        class="navbar-item flex"
        @mouseover="expandMenu(true)"
        @mouseleave="expandMenu(false)"
        >Menu
        <div
          class="item-icon icon-center icon-chevron"
          :class="{ 'icon-chevron-hover': isMenuExpand }"
        ></div>
        <div class="menu-expand flex" v-if="isMenuExpand">
          <router-link
            v-for="category in listCategories"
            :key="category.id"
            :to="{ name: getRouterLink(category.category_name) }"
            class="menu-item"
            >{{ category.category_name }}</router-link
          >
        </div>
      </router-link>
      <router-link to="/news" class="navbar-item flex">Tin tức</router-link>
      <router-link to="/contact" class="navbar-item flex">Liên hệ</router-link>
      <router-link
        to="/cart"
        class="icon-cart icon-center navbar-icon flex"
        title="Giỏ hàng"
      ></router-link>
      <div class="flex account">
        <div class="default-avatar flex">
          <img src="@/assets/Icons/default-avatar.jpg" alt="" />
        </div>
        <div class="account-main">
          <div class="account-text flex">
            <div class="user-header-selection" v-if="isUserOptionExpand && isLogin">
              <div @click="linkToUserOption('/user')" class="user-selection-item">Thông tin người dùng</div>
              <div @click="linkToUserOption('/cart')" class="user-selection-item">Giỏ hàng của tôi</div>
              <div @click="linkToUserOption('/checkout')" class="user-selection-item">Lịch sử mua hàng</div>
              <div @click="userLogoutOnClick" class="user-selection-item logout-item flex">Đăng xuất</div>
            </div>
            Tài khoản
            <div class="icon-user-down flex" @click="expandUserOption">
              <div class="icon-center icon-down-2"></div>
            </div>
          </div>
          <div v-if="isLogin">{{ user ? user.email : "" }}</div>
          <router-link to="/auth/login" v-if="!isLogin" class="login-text"
            >Đăng nhập</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      isMenuExpand: false,
      isLogin: false,
      isUserOptionExpand: false,
    };
  },
  computed: {
    ...mapGetters(["listCategories", "user"]),
  },
  created() {
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if (vuex) {
      const user = vuex.user.user;
      const userToken = vuex.user.userToken;
      if (user !== null) {
        this.setUser(user);
        this.isLogin = true;
      } else if (userToken !== null) {
        this.getUserDetail();
        this.isLogin = true;
      }
    }
  },
  methods: {
    ...mapMutations(["setListCategories", "setUser"]),
    ...mapActions(["getListCategories", "getUserDetail", "userLogout"]),

    expandMenu(isExpand) {
      this.isMenuExpand = isExpand;
    },

    getRouterLink(categoryName) {
      const unidecode = require("unidecode");
      let str = unidecode(categoryName.toLowerCase());
      let router = str.replace(/\s+/g, "-");
      return router;
    },
    expandUserOption(){
      this.isUserOptionExpand = !this.isUserOptionExpand;
      if (this.isUserOptionExpand == true) {
        setTimeout(() => {
          this.isUserOptionExpand = false;
        }, 5000);
      }
    },
    linkToUserOption(path){
      this.$router.push({ path: path});
      this.isUserOptionExpand = false
    },
    userLogoutOnClick(){
      if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        this.userLogout();
      } else {
        this.isUserOptionExpand = false;
      }
    }
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 65px;
  box-shadow: 0 4px 2px -1px rgb(233, 232, 232);
  box-sizing: border-box;
  background-color: #fff;
  z-index: 100;
  position: relative;
}

.logo {
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  cursor: pointer;
}

.logo-text {
  font-family: Pacifio-Regular;
  font-size: 2rem;
  padding: 8px;
  cursor: pointer;
  margin-left: 4px;
}

.header-navbar {
  height: 65px;
  width: 100%;
  margin-left: 24%;
  position: relative;
}
.navbar-item {
  height: 65px;
  width: fit-content;
  justify-content: center;
  cursor: pointer;
  margin-right: 4%;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-family: Font Bold;
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
}
.navbar-item:hover {
  color: var(--text-blue-color) !important;
}
.header-navbar .router-link-active {
  color: var(--text-blue-color) !important;
}
.navbar-icon {
  height: 54px;
  min-width: 54px;
  width: 54px;
  box-sizing: border-box;
  cursor: pointer;
}
.icon-cart {
  margin: 0 12px 0 32px;
  background-color: #000 !important;
}
.icon-cart:hover {
  background-color: var(--text-blue-color) !important;
}

.header-logo {
  position: absolute;
  left: 10%;
}

.navbar-item-login {
  font-size: 1rem;
  font-family: Font SemiBold;
  cursor: pointer;
}
.navbar-item-login:hover {
  color: var(--text-blue-color) !important;
}
.navbar-item-login.router-link-active {
  color: var(--text-blue-color) !important;
}
.item-icon {
  width: 28px;
  height: 28px;
  margin-top: 6px;
}
.router-link-active .icon-chevron {
  background-color: var(--text-blue-color) !important;
}
.menu-expand {
  position: absolute;
  z-index: 200 !important;
  top: 56px;
  left: -8px;
  width: 168px;
  padding: 12px 10px 10px 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 0px 0px 1.5px rgb(211, 210, 210);
  flex-direction: column;
  box-sizing: border-box;
}
.menu-item {
  width: 100%;
  color: var(--text-primary-color) !important;
  font-size: 1rem;
  font-family: Font Regular;
  padding: 10px 16px;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 2px;
}
.menu-item:hover,
.menu-item.router-link-active {
  color: var(--text-white-primary-color) !important;
  background-color: var(--primary);
}
.default-avatar {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
}

.default-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
}
.account-text {
  font-family: Font SemiBold;
  white-space: nowrap;
  position: relative;
}
.account-main {
  margin-left: 8px;
  white-space: nowrap;
}
.account {
  align-items: flex-end;
}
.login-text:hover {
  color: var(--text-red-color) !important;
}
.icon-user-down {
  width: 18px;
  height: 18px;
  justify-content: center;
  position: relative;
  margin-left: 2px;
}
.icon-user-down:hover{
  background-color: var(--grid-row-hover-bg);
  cursor: pointer;
}
.user-header-selection{
  position: absolute;
  left: 0px;
  padding: 8px 8px;
  top: 20px;
  width: 240px;
  box-sizing: border-box;
  border: 1px solid var(--input-normal-border-color);
  background-color: var(--grid-row-hover-bg);
}
.user-selection-item{
  width: 100%;
  padding: 8px 8px;
  font-size: 1rem;
  box-sizing: border-box;
  border-radius: 2px;
}
.user-selection-item:hover{
  cursor: pointer;
  background-color: #fff;
}
.logout-item{
  margin-top: 4px;
  border-top: 1px solid var(--input-normal-border-color);
  justify-content: center;
}
</style>