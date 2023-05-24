<template>
  <div class="b-navbar">
    <div class="b-top-navbar flex">
      <div class="side-bar flex">
        <img class="b-option-navbar" src="@/assets/Icons/pizza.png" alt="">
      </div>
      <span class="b-logo-navbar flex">Foodie</span>
    </div>

    <div class="b-list-navbar">
      <ul>
        <li v-for="item in navbars" :key="item">
          <router-link :to="item.routerLink" class="navbar-item" :title="item.title">
            <!-- <div class="icon-center"><div class="icon-list-navbar" :class="item.icon"></div></div> -->
            <span class="navbar-item-title">{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navbars: [
        {
          routerLink: "/admin/overview",
          title: "Tổng quan",
          icon: "icon-dashboard",
        },
        {
          routerLink: "/admin/category-management",
          title: "Danh mục",
          icon: "icon-dashboard",
        },
        {
          routerLink: "/admin/product-management",
          title: "Sản phẩm",
          icon: "icon-money",
        },
        {
          routerLink: "/admin/article-management",
          title: "Bài viết",
          icon: "icon-money",
        },
        {
          routerLink: "/admin/order-management",
          title: "Danh sách đơn hàng",
          icon: "icon-bank",
        },
        {
          routerLink: "/admin/user-management",
          title: "Danh sách người dùng",
          icon: "icon-cart",
        },
        {
          routerLink: "/admin/admin-management",
          title: "Quản trị viên",
          icon: "icon-sale",
        }
      ],
    };
  },
};
</script>

<style scoped>
.b-container-dashboard{
    display: flex;
    flex-direction: row;
}

.b-navbar{
    display: flex;
    flex-direction: column;
    background-color: #e2e2e2 ;
    width:220px ;
    height: 100vh;
}
.b-top-navbar{
    flex-basis: 48px;
    display: flex;
    align-items: center;
    padding-left: 32px;
}
.b-option-navbar{
	width: 38px;
	height: 38px;
  box-sizing: border-box;
}
.side-bar {
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    margin-top: 4px;
}
.b-logo-navbar{
    font-family: Pacifio-Regular;
    color: var(--text-primary-color);
    font-size: 1.75rem;
    margin-left: 4px;
    margin-top: 2px;
}
.b-list-navbar{
    flex-grow: 2;
}


/* list navbar */

.b-list-navbar{
    padding-top: 14px;
}
.b-list-navbar ul{
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
.b-list-navbar ul li{
    list-style: none;
}
.b-list-navbar ul li  a{
    text-decoration: none;
    color: #FFFFFF;
    width: 200px;
    height: 42px;
}
.b-list-navbar li{
    height: 42px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 8px;
    margin-bottom: 2px;
}
.navbar-item{
    display: flex;
    padding-left: 12px;
    align-items: center;
    box-sizing: border-box;
    border-radius: 4px;
}
.navbar-item:hover {
  background-color: #fff;
}


.router-link-active{
    border: none;
    margin-left: 0;
    font-family: Font Bold;
}
.router-link-active.navbar-item {
  background-color: #fff;
}



</style>