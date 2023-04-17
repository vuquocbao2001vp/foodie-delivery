import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";

import HomePage from "../screens/UserScreen/HomePage/HomePage.vue";
import IntroPage from "../screens/UserScreen/IntroPage/IntroPage.vue";
import MenuPage from "../screens/UserScreen/MenuPage/MenuPage.vue";
import CategoryPage from "../screens/UserScreen/MenuPage/CategoryPage.vue";
import ContactPage from "../screens/UserScreen/ContactPage/ContactPage.vue";
import CartPage from "../screens/UserScreen/CartPage/CartPage.vue";
import PaymentPage from "../screens/UserScreen/CartPage/PaymentPage.vue";
import LoginScreen from "../screens/LoginScreen/LoginScreen.vue";
import LoginPage from "../screens/LoginScreen/LoginPage.vue";
import ForgetPwPage from "../screens/LoginScreen/ForgetPwPage.vue";
import RegisterPage from "../screens/LoginScreen/RegisterPage.vue";
import FoodDetail from "../screens/UserScreen/MenuPage/FoodDetail.vue";
import CheckOutPage from "../screens/UserScreen/CartPage/CheckOutPage.vue";
import AdminManagement from "../screens/AdminScreen/AdminManagement/AdminManagement.vue";
import CategoryManagement from "../screens/AdminScreen/CategoryManagement/CategoryManagement.vue";
import OrderManagement from "../screens/AdminScreen/OrderManagement/OrderManagement.vue";
import ProductManagement from "../screens/AdminScreen/ProductManagement/ProductManagement.vue";
import UserManagement from "../screens/AdminScreen/UserManagement/UserManagement.vue";
import OverviewManagement from "../screens/AdminScreen/OverviewManagement/OverviewManagement.vue";

const routers = [
  {
    path: "/",
    redirect: "/home",
    children: [
      { path: "home", name: "home", component: HomePage },
      { path: "intro", name: "intro", component: IntroPage },
      { path: "contact", name: "contact", component: ContactPage },
      { path: "cart", name: "cart", component: CartPage },
      { path: "detail", name: "detail", component: FoodDetail },
      { path: "payment", name: "payment", component: PaymentPage },
      { path: "checkout", name: "checkout", component: CheckOutPage },
    ],
  },
  {
    path: "/menu/",
    component: MenuPage,
    redirect: "/menu/all",
    children: [{ path: "all", name: "menu", component: CategoryPage }],
  },
  {
    path: "/auth/",
    name: "auth",
    component: LoginScreen,
    children: [
      { path: "login", name: "login", component: LoginPage },
      {
        path: "forget-password",
        name: "forget-password",
        component: ForgetPwPage,
      },
      { path: "register", name: "register", component: RegisterPage },
      { path: "admin/login", name: "_login", component: LoginPage },
      {
        path: "admin/forget-password",
        name: "_forget-password",
        component: ForgetPwPage,
      },
      { path: "admin/register", name: "_register", component: RegisterPage },
    ],
  },
  {
    path: "/admin/",
    name: "admin",
    redirect: "/admin/overview",
    children: [
      { path: "overview", name: "Tổng quan", component: OverviewManagement },
      {
        path: "admin-management",
        name: "Quản trị viên",
        component: AdminManagement,
      },
      {
        path: "category-management",
        name: "Danh mục",
        component: CategoryManagement,
      },
      {
        path: "order-management",
        name: "Quản lý đơn hàng",
        component: OrderManagement,
      },
      {
        path: "product-management",
        name: "Sản phẩm",
        component: ProductManagement,
      },
      {
        path: "user-management",
        name: "Danh sách người dùng",
        component: UserManagement,
      },
    ],
  },
];

const unidecode = require("unidecode");
const vuex = JSON.parse(localStorage.getItem("vuex"));

if (vuex) {
  const categories = vuex.user.listCategories;
  if (categories) {
    categories.forEach((category) => {
      let str = unidecode(category.category_name.toLowerCase());
      let link = str.replace(/\s+/g, "-");
      routers[1].children.push({
        path: link,
        name: link,
        component: CategoryPage,
      });
    });
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

// Thêm navigation guard trước khi vào mỗi route
router.beforeEach((to, from, next) => {
  // Kiểm tra xem route tồn tại hay không
  const exists = router.getRoutes().some((route) => route.path === to.path);
  if (exists) {
    // Nếu tồn tại thì tiếp tục điều hướng
    next();
  } else {
    if (to.path.split("/")[1] == "admin" && vuex.admin.adminToken !== null) {
      next("/admin");
    } else {
      next("/home");
    }
  }

  // về login
  if (
    vuex.admin.adminToken !== null && vuex.user.userToken == null &&
    to.path.split("/")[1] == "auth" &&
    from.path == "/"
  ) {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      store.dispatch("adminLogout");
    } else {
      router.go(-1);
    }
  }
  else if (
    vuex.user.userToken !== null && vuex.admin.adminToken == null &&
    to.path.split("/")[1] == "auth" &&
    from.path == "/"
  ) {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      store.dispatch("userLogout");
    } else {
      router.go(-1);
    }
  }
  if (
    vuex.admin.adminToken == null &&
    to.path.split("/")[1] == "admin" &&
    from.path == "/"
  ) {
    store.dispatch("linkToLoginPage")
  }
});

export default router;
