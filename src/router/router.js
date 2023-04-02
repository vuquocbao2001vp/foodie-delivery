import HomePage from '../screens/UserScreen/HomePage/HomePage.vue'
import IntroPage from '../screens/UserScreen/IntroPage/IntroPage.vue'
import MenuPage from '../screens/UserScreen/MenuPage/MenuPage.vue'
import CategoryPage from '../screens/UserScreen/MenuPage/CategoryPage.vue'
import ContactPage from '../screens/UserScreen/ContactPage/ContactPage.vue'
import CartPage from '../screens/UserScreen/CartPage/CartPage.vue'
import PaymentPage from '../screens/UserScreen/CartPage/PaymentPage.vue'
import LoginPage from '../screens/UserScreen/LoginPage/LoginPage.vue'
import ForgetPwPage from '../screens/UserScreen/LoginPage/ForgetPwPage.vue'
import RegisterPage from '../screens/UserScreen/LoginPage/RegisterPage.vue'
import FoodDetail from '../screens/UserScreen/MenuPage/FoodDetail.vue'
import CheckOutPage from '../screens/UserScreen/CartPage/CheckOutPage.vue'
// import AdminScreen from '../screens/AdminScreen/AdminScreen.vue'
import AdminManagement from '../screens/AdminScreen/AdminManagement/AdminManagement.vue'
import CategoryManagement from '../screens/AdminScreen/CategoryManagement/CategoryManagement.vue'
import OrderManagement from '../screens/AdminScreen/OrderManagement/OrderManagement.vue'
import ProductManagement from '../screens/AdminScreen/ProductManagement/ProductManagement.vue'
import UserManagement from '../screens/AdminScreen/UserManagement/UserManagement.vue'
import OverviewManagement from '../screens/AdminScreen/OverviewManagement/OverviewManagement.vue'


const routers = [
    // {path: "/", component: HomePage},
    {path: "/home", name: "home", component: HomePage},
    {path: "/intro", name: "intro", component: IntroPage},
    {
        path: "/menu/",
        component: MenuPage,
        redirect: "/menu/all",
        children: [
            {path: "all", name: "menu", component: CategoryPage},
            {path: "pizza", name: "pizza", component: CategoryPage},
            {path: "hamburger", name: "hamburger", component: CategoryPage},
            {path: "ga-ran", name: "ga-ran", component: CategoryPage},
            {path: "do-an-vat", name: "do-an-vat", component: CategoryPage},
            {path: "do-uong", name: "do-uong", component: CategoryPage},
        ]
    },
    {path: "/contact", name: "contact", component: ContactPage},
    {path: "/cart", name: "cart", component: CartPage},
    {
        path: "/login/",
        name: "login",
        component: LoginPage,
        children: [
            {path: "forget-password", name: "forget-password", component: ForgetPwPage},
            {path: "register", name: "register", component: RegisterPage},
        ]
    },
    {path: "/detail", name: "detail", component: FoodDetail},
    {path: "/payment", name: "payment", component: PaymentPage},
    {path: "/checkout", name: "checkout", component: CheckOutPage},
    {
        path: "/admin/",
        name: "admin",
        // component: AdminScreen,
        redirect: "/admin/overview",
        children: [
            {path: "overview", name: "Tổng quan", component: OverviewManagement},
            {path: "admin-management", name: "Quản trị viên", component: AdminManagement},
            {path: "category-management", name: "Danh mục", component: CategoryManagement},
            {path: "order-management", name: "Quản lý đơn hàng", component: OrderManagement},
            {path: "product-management", name: "Sản phẩm", component: ProductManagement},
            {path: "user-management", name: "Danh sách người dùng", component: UserManagement},
        ]
    },
]
export default routers;