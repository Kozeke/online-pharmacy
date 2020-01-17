import VueRouter from "vue-router";
import MainProducts from "./views/products/List";
import Product from "./views/products/Product";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import AddProduct from "./views/products/AddProduct";
import Cart from "./views/products/Cart";
import WishList from "./views/products/WishList";
import Checkout from "./views/products/Checkout.vue";
import SingleProduct from "./views/products/SingleProduct";
import userProducts from "./user/userProducts.vue";
import userInfo from "./user/userInfo.vue";
import userSettings from "./user/userSettings.vue";
import userAddress from "./user/userAddress.vue";
import userHistory from "./user/userHistory.vue";
import AdminLogin from "./views/admin/Login.vue";
import Logout from "./views/auth/Login";
import ForgotPassword from "./views/auth/ResetPassword";
import Admin from "./views/admin/Admin.vue";
import Dashboard from "./views/admin/Dashboard.vue";
import Order from "./views/admin/Order.vue";

import Pharmacy from "./views/admin/Pharmacies.vue";
import SinglePharm from "./views/admin/SinglePharm.vue";
import SingleUser from "./views/admin/SingleUser.vue";

import UsersProducts from "./views/admin/AddedProductsUsers.vue";
import PharmProducts from "./views/admin/AddedProductsPharms.vue";
import RegisteredUsers from "./views/admin/RegisteredUsers.vue";
import updateProduct from "./views/admin/UpdateProduct.vue";
import HowToRegister from "./views/info/HowToRegister";

import AboutPay from "./views/info/AboutPay";
import AboutShipping from "./views/info/AboutShipping";
import AboutUs from "./views/info/AboutUs";
import AgreePolicy from "./views/info/AgreePolicy";
import Complain from "./views/info/Complain";
import HowToAdd from "./views/info/HowToAdd";
import HowToBuy from "./views/info/HowToBuy";

export default new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
        {
            path: "/",
            name: "Главная",
            component: MainProducts,
            meta: {
                title: "Добро пожаловать | МирАптек",
                forVisotrs: true
            }
        },
        {
            name: "Выйти",
            path: "/logout",
            component: Logout,
            meta: {
                title: "Добро пожаловать | МирАптек",
                forVisotrs: true
            }
        },
        {
            name: "Забыли пароль",
            path: "/forgotPassword",
            component: ForgotPassword,
            meta: {
                title: "Восстановление доступа",
                forVisotrs: true
            }
        },
        {
            name: "Войти",
            path: "/login",
            component: Login,
            meta: {
                forVisotrs: true,
                title: "Войти | МирАптек"
            }
        },
        {
            name: "Регистрация",
            path: "/register",
            component: Register,
            meta: {
                forVisotrs: true,
                title: "Регистрация | Мир Аптек"
            }
        },
        {
            name: "Добавить продукт",
            path: "/addProduct",
            component: AddProduct,
            meta: {
                forAuth: true,
                title: "Добавить продукт | МирАптек"
            }
        },
        {
            name: "Корзина",
            path: "/cart",
            component: Cart,
            meta: {
                forVisotrs: true,
                title: "Корзина | МирАптек"
            }
        },
        {
            name: "Избранные",
            path: "/wishList",
            component: WishList,
            meta: {
                forAuth: true,
                title: "Избранные | МирАптек"
            }
        },
        {
            name: "Оформить заказ",
            path: "/checkout",
            component: Checkout,
            meta: {
                forAuth: true,
                title: "Оформить заказ | МирАптек"
            }
        },
        {
            name: "Продукты",
            path: "/products",
            component: Product,
            meta: {
                forVisotrs: true,
                title: "Препараты | МирАптек"
            }
        },
        {
            name: "Продукт",
            path: "/single_product",
            component: SingleProduct,
            meta: {
                forVisotrs: true,
                title: "Продукт"
            }
        },
        {
            path: "/userProducts",
            name: "Мои продукты",
            component: userProducts,
            meta: {
                title: "Мои продукты",
                forAuth: true
            }
        },
        {
            path: "/userInfo",
            name: "Детали Аккаунта",
            component: userInfo,
            meta: {
                title: "Детали Аккаунта",
                forAuth: true
            }
        },
        {
            path: "/userSettings",
            name: "Настройки",
            component: userSettings,
            meta: {
                title: "Настройки",
                forAuth: true
            }
        },
        {
            path: "/userAddress",
            name: "Детали адреса",
            component: userAddress,
            meta: {
                title: "Детали адреса",
                forAuth: true
            }
        },
        {
            path: "/userHistory",
            name: "История заказов",
            component: userHistory,
            meta: {
                title: "История заказов",
                forAuth: true
            }
        },
        {
            path: "/aboutPay",
            name: "Об оплате",
            component: AboutPay,
            meta: {
                title: "Об оплате",
                forVisotrs: true
            }
        },
        {
            path: "/aboutShipping",
            name: "О доставке",
            component: AboutShipping,
            meta: {
                title: "aboutShipping",
                forVisotrs: true
            }
        },
        {
            path: "/aboutUs",
            name: "О нас",
            component: AboutUs,
            meta: {
                title: "aboutUs",
                forVisotrs: true
            }
        },
        {
            path: "/howToRegister",
            name: "HowToRegister",
            component: HowToRegister,
            meta: {
                title: "howToRegister",
                forVisotrs: true
            }
        },
        {
            path: "/agreePolicy",
            name: "agreePolicy",
            component: AgreePolicy,
            meta: {
                title: "agreePolicy",
                forVisotrs: true
            }
        },
        {
            path: "/complain",
            name: "Книга жалоб",
            component: Complain,
            meta: {
                title: "complain",
                forVisotrs: true
            }
        },
        {
            path: "/howToAdd",
            name: "Как добавит продукт",
            component: HowToAdd,
            meta: {
                title: "howToAdd",
                forVisotrs: true
            }
        },
        {
            path: "/howToBuy",
            name: "Как совершить покупку",
            component: HowToBuy,
            meta: {
                title: "howToBuy",
                forVisotrs: true
            }
        },
        {
            path: "/admin",
            name: "AdminPage",
            component: Dashboard,
            meta: {
                title: "Панель  админа",
                forAdmin: true
            }
        },
        {
            path: "/orders",
            name: "Order",
            component: Order,
            meta: {
                title: "Заказы",
                forAdmin: true
            }
        },
        {
            path: "/pharmacy",
            name: "Pharmacy",
            component: Pharmacy,
            meta: {
                title: "Зарегистрированные аптеки",
                forAdmin: true
            }
        },
        {
            path: "/registeredUsers",
            name: "registeredUsers",
            component: RegisteredUsers,
            meta: {
                title: "Зарегистрированные аптеки",
                forAdmin: true
            }
        },
        {
            path: "/singlePharm",
            name: "singlePharm",
            component: SinglePharm,
            meta: {
                title: "Зарегистрированные аптеки",
                forAdmin: true
            }
        },
        {
            path: "/singleUser",
            name: "singleUser",
            component: SingleUser,
            meta: {
                title: "Зарегистрированные пользователи",
                forAdmin: true
            }
        },
        {
            path: "/pharmProducts",
            name: "pharmProducts",
            component: PharmProducts,
            meta: {
                title: "Лекарства добавленные аптеками",
                forAdmin: true
            }
        },
        {
            path: "/usersProducts",
            name: "usersProducts",
            component: UsersProducts,
            meta: {
                title: "Лекарства добавленные пользователями",
                forAdmin: true
            }
        },
        {
            name: "Изменить продукт",
            path: "/updateProduct",
            component: updateProduct,
            meta: {
                forAdmin: true,
                title: "Добавить продукт"
            }
        }
    ]
});
