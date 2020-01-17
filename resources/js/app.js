/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');
import router from "./router";

import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import ProgressBar from "./components/ProgressBar.vue";
import Auth from "./packages/auth/auth";
import User from "./packages/user";

import dropdown from "vue-dropdowns";
import VueAgile from "vue-agile";

import Headbar from "./components/Headbar";
import Navigate from "./components/Navigate";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import UserSidebar from "./user/UserSidebar";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(User);
Vue.use(Auth);
Vue.use(VueAgile);
// Vue.use(Swal);
// Vue.use(DropdownsInstaller);
// Vue.use(AutoComplete);

// global progress bar
const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount());
document.body.appendChild(bar.$el);
router.beforeEach((to, from, next) => {
    document.title = to.meta.title + "";
    if (to.meta.forAuth) {
        if (Vue.auth.isAuthenticated()) {
            next();
        } else {
            next({
                path: "/login"
            });
        }
    } else if (to.meta.forVisitors) {
        if (Vue.auth.isAuthenticated()) {
            next({ path: "/" });
        } else {
            next();
        }
    } else if (to.meta.forAdmin) {
        if (Vue.auth.getAccountRole()) {
            next();
        } else {
            next({ path: "/" });
        }
    }
    next();
});
import { get } from "./helpers/api";
const app = new Vue({
    el: "#app",
    router,
    components: {
        sidebar: Sidebar,
        headbar: Headbar,
        navigate: Navigate,
        footer_page: Footer,
        user_sidebar: UserSidebar
    },
    data() {
        return {
            accounts: "",
            user: "",
            userReady: "",
            selected_cat_id: "",
            selected_locality_id: 1,
            search: 0,
            chosenProducts: "",
            selected_subcat_id: "",
            selected_subcat_name: "",
            selected_cat_name: "",
            key: "",
            values: "",
            chosen_product: "",
            locality_product: "",
            region_product: "",
            cart_clean: 0,
            deleted: 0,
            cleaned: 0,
            have_products: false,
            user_products: "",
            user_region: "",
            user_locality: "",
            user_district: "",
            length_cart: 0,
            length_wish: 0,
            delete_wish: 0,
            delete_cart: 0,
            emergence_wish: false,
            emergence_cart: false,
            warned: false,
            selectedFilter1: "",
            selectedFilter2: "",
            selectedFilter3: "",
            selectedFilter4: "",
            bought: "",
            selected_single_product: ""
        };
    },
    methods: {
        OchistitCart(bought) {
            this.cart_clean += 1;
            this.bought = bought;
        },
        SingleProduct(product) {
            this.selected_single_product = product;
        },
        UpdateLength() {
            this.length_cart += 1;
        },
        // In
        UpdateWish() {
            this.length_wish += 1;
        },
        OnChangedCity(id) {
            this.selected_locality_id = id;
        },
        DeletingWish() {
            this.delete_wish += 1;
        },

        OnSelectedSubcat(id) {
            this.selected_cat_id = id;
        },
        OnChangedDistrict(id) {
            this.selected_district_id = id;
        },
        OnSearchedProduct(key) {
            this.key = key;
        },
        OnSelectedValues(values) {
            this.values = values;
        },
        TakenProduct(product) {
            if (product.shipping === 0) {
                product.shipping = 2;
                this.chosen_product = product;
                console.log(product.shipping);
            } else {
                this.chosen_product = product;
            }
            // this.locality_product = locality;
            // this.locality_region = region;
        },
        TakenLocality(region) {
            this.user_region = region;
        },
        userInit(afterLogin = false, nextRoute) {
            let _this = this;
            if (_this.$auth.isAuthenticated()) {
                console.log("Authenticated");
                console.log(this.$auth.getToken());
                get(
                    _this,
                    "/api/user",
                    {},
                    function(response) {
                        console.log("asd");

                        _this.accounts = response.data;
                        console.log(response.data);
                        let accountId = _this.$auth.getAccountId()
                            ? _this.$auth.getAccountId()
                            : 0;
                        console.log("Ok");
                        console.log();

                        _this.setAccount(response.data[accountId], afterLogin);
                    },
                    function() {
                        console.log("error");
                    }
                );
            }
        },

        setAccount(account, afterLogin) {
            this.$user.data = account;
            this.user = this.$user;
            this.userReady = this.ready = true;
            if (afterLogin) {
                this.afterLogin(this.user);
            }
        },

        afterLogin(user) {
            // if (user.isSeller()) {
            this.$router.push({ name: "Главная" });
            // }
        }
    },
    mounted() {
        this.userInit();
    },
    watch: {
        emergence_wish() {
            this.UpdateWish();
        }
    }
});
