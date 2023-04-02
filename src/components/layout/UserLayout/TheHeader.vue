<template>
  <div v-if="isLinkToLogin == false" class="header flex">
    <router-link to="/home" class="header-logo flex">
      <div class="pizza-logo icon-center logo"></div>
      <div class="logo-text">Foodie</div>
    </router-link>
    <div class="header-navbar flex">
      <router-link to="/home" class="navbar-item flex">Trang chủ</router-link>
      <router-link to="/intro" class="navbar-item flex">Giới thiệu</router-link>
      <router-link
        to="/menu"
        class="navbar-item flex"
        @mouseover="expandMenu(true)"
        @mouseleave="expandMenu(false)"
        >Menu
        <div
          class="item-icon icon-center icon-chevron"
          :class="{ 'icon-chevron-hover': isMenuExpand }"
        ></div>
        <div class="menu-expand flex" v-if="isMenuExpand">
          <router-link to="/menu/pizza" class="menu-item">Pizza</router-link>
          <router-link to="/menu/hamburger" class="menu-item"
            >Hamburger</router-link
          >
          <router-link to="/menu/ga-ran" class="menu-item">Gà rán</router-link>
          <router-link to="/menu/do-an-vat" class="menu-item"
            >Đồ ăn vặt</router-link
          >
          <router-link to="/menu/do-uong" class="menu-item"
            >Đồ uống</router-link
          >
        </div>
      </router-link>
      <router-link to="/contact" class="navbar-item flex">Liên hệ</router-link>
      <router-link
        to="/cart"
        class="icon-cart icon-center navbar-icon flex"
        title="Giỏ hàng"
      ></router-link>
      <router-link to="/login" class="navbar-item-login flex"
        >Đăng nhập</router-link
      >
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      isMenuExpand: false,
    };
  },

  computed: {
    ...mapGetters(["isLinkToLogin"]),
  },

  watch: {
    "$route.path": function(value) {
      if (value === "/login" || value === "/login/forget-password" || value === "/login/register") {
        this.setIsLinkToLogin(true);
      } else {
        this.setIsLinkToLogin(false);
      }
    },
  },

  methods: {
    ...mapMutations(["setIsLinkToLogin"]),
    expandMenu(isExpand) {
      this.isMenuExpand = isExpand;
    },
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 2px -1px rgb(233, 232, 232);
  box-sizing: border-box;
  background-color: #fff;
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
  margin-left: 30%;
}
.navbar-item {
  height: 65px;
  width: fit-content;
  justify-content: center;
  cursor: pointer;
  margin-right: 6%;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-family: Font Bold;
  box-sizing: border-box;
  position: relative;
}
.navbar-item:hover {
  color: var(--text-blue-color) !important;
}
.header-navbar .router-link-active {
  color: var(--text-blue-color) !important;
}
.navbar-icon {
  height: 54px;
  width: 54px;
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
  z-index: 2000;
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
</style>