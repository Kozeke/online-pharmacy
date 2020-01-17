<template>
  <div>
    <div class="nav nav_max">
      <div class="nav_top">
        <div class="top_text">
          <span class="link" @click="$router.push({name: 'О нас'})">О нас</span>
          <span @click="$router.push({name: 'О доставке'})">О доставке</span>
        </div>
        <div class="add_product" @click="addProductBtn">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          <span>Добавить препарат</span>
        </div>
        <div v-if="!($root.user.data)" class="registration_form">
          <a href class="btn btn-sm log_in" @click.prevent="$router.push({path: '/login'})">Войти</a>
          <a
            href
            class="btn btn-sm sign_up"
            @click.prevent="$router.push({path: '/register'})"
          >Регистрация</a>
        </div>
        <div v-else-if="$root.user.data" class="user_form dropdown">
          <a data-toggle="dropdown" class="dropdown-toggle">
            {{$root.user?$root.user.data.name:''}}
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu" id="menu1">
            <li>
              <a @click="$router.push({path: '/userInfo'})">
                <i class="fas fa-user"></i>Личный кабинет
              </a>
            </li>
            <li>
              <a @click="$router.push({path: '/userProducts'})">
                <i class="fas fa-archive"></i>Мои продукты
              </a>
            </li>
            <li>
              <a @click="$router.push({path: '/userSettings'})">
                <i class="fas fa-cog"></i>Настройки
              </a>
            </li>
            <li v-if="$root.user.data.isAdmin">
              <a @click="adminPage()">
                <i class="fas fa-cog"></i>Админ
              </a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="#" v-on:click="logOut();user=true">
                <i class="fas fa-sign-out-alt"></i>Выйти
              </a>
            </li>
          </ul>
          <img v-if="image_user" :src="image_user" />
          <img v-else :src="image" />
        </div>
      </div>
      <div class="nav_bottom">
        <div class="logo">
          <a class="nav-link logo_text" @click="$root.key='';$router.push({path: '/'})">
            Мир
            <span>аптек</span>
          </a>
        </div>

        <div class="bot_right">
          <div class="search_form">
            <form class="search">
              <div class="inner-form">
                <div class="input-field first-wrap">
                  <input
                    v-model="$root.key"
                    id="search"
                    type="text"
                    placeholder="Введите название препарата"
                  />
                </div>
                <div class="input-field second-wrap">
                  <select v-model="$root.selected_locality_id" value="sds">
                    <option v-for="city in cities" :value="city.id">{{city.name}}</option>
                  </select>
                  <!-- <div class="input-field second-wrap">
                  <div class="ex3">
                    <label v-on:click="changeCity()" for="item-3">
                      <i class="fas fa-caret-down"></i>
                      {{chosenCity?chosenCity:chosenDistrict}}
                  </label>-->
                  <!-- <div class="input-field second-wrap">
                  <div class="ex3">
                    <label v-on:click="changeCity()" for="item-3">
                      <i class="fas fa-caret-down"></i>
                      {{chosenCity?chosenCity:chosenDistrict}}
                  </label>-->
                  <!-- <div class="hide3" v-if="cityDiv">
                      <div class="inner3">
                        <ul class="outer_ul city_display">
                          <li class="outer_li" v-for="region in regions">
                            <a class="region">{{region.name}}</a>
                            <div class="inner_ul">
                              <a
                                class="inner_li"
                                v-for="(city,index) in region.localities"
                                v-on:click="cityChanger(city)"
                              >{{city.name}}</a>
                              <a
                                class="inner_li"
                                v-for="(district,index) in region.districts"
                                v-on:click="districtChanger(district)"
                              >{{district.name}}</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>-->
                </div>
                <div class="input-field third-wrap">
                  <button @click.prevent="searchProduct()" class="btn-search">Искать</button>
                </div>
              </div>
            </form>
          </div>
          <div class="shopping_cart" @click="$router.push({path: '/wishList'})">
            <i class="fas fa-star"></i>
            <span>Избранные</span>
            <!-- <span class="badge">{{initial_length_wishlist}}</span> -->
          </div>
          <div class="shopping_cart" @click="$router.push({path: '/cart'})">
            <i class="fas fa-shopping-cart"></i>
            <span>Корзина</span>
            <span class="badge">{{initial_length}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-default navbar-static-top">
      <div
        class="side_menu w3-sidebar w3-bar-block w3-animate-left"
        :class="{ 'sidemenu_show': menu_clicked, 'menu_hide': !menu_clicked }"
        id="mySidebar"
      >
        <div class="side_top">
          <div class="registration_form" v-if="user">
            <a
              class="btn btn-sm side_log_in"
              href="#"
              @click="$router.push({path: '/login'});side_change()"
            >Войти</a>
          </div>
          <div class="side_user_form dropdown" v-else v-on:click="user_menu=!user_menu">
            <a href="#" class="side_user_name">
              Динмухамед
              <b class="caret"></b>
              <i class="fas fa-caret-down"></i>
            </a>
            <img
              src="https://cdn2.theweek.co.uk/sites/theweek/files/styles/16x8_465/public/bill-gates.jpg?itok=mOEi1tyQ"
            />
          </div>
          <button class="side_close" @click="side_change();user_menu=false">Закрыть &times;</button>
        </div>
        <div class="user_submenu" v-if="user_menu">
          <ul class="side_dropdown-menu">
            <li>
              <a href="#" @click="$router.push({path: '/userInfo'});side_change()">
                <i class="fas fa-user"></i>Личный кабинет
              </a>
            </li>
            <li>
              <a href="#" @click="$router.push({path: '/userProducts'});side_change()">
                <i class="fas fa-archive"></i>Мои продукты
              </a>
            </li>
            <li>
              <a href="#" @click="$router.push({path: '/userSettings'});side_change()">
                <i class="fas fa-cog"></i>Настройки
              </a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="#" v-on:click="user=true;user_menu=false">
                <i class="fas fa-sign-out-alt"></i>Выйти
              </a>
            </li>
          </ul>
        </div>
        <div class="side_cat">
          <a href="#" @click="$router.push({path: '/sub-category'});side_change()">Лекарства и БАДы</a>
          <a href="#">Против гриппа и простуды</a>
          <a href="#">Косметика и средства гигиены</a>
          <a href="#">Здоровое и спортивное питание</a>
          <a href="#">Травы, сборы, бальзамы</a>
          <a href="#">Изделия медицинского назначения и медтехника</a>
          <a href="#">Мама и малыш</a>
          <a href="#">ЧЗВ и Помощь</a>
        </div>
      </div>
      <div class="nav_header">
        <button class="nav_tog" @click="side_change()" :class="{ 'menu_show': !menu_clicked}">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="logo">
          <a class="nav-link logo_text" @click="$router.push({path: '/'})">
            Мир
            <span>аптек</span>
          </a>
        </div>
        <div class="right_buttons">
          <div class="icons">
            <i class="fas fa-search" @click="search_form = true"></i>
          </div>
          <div class="icons">
            <i class="fas fa-plus-circle" @click="$router.push({path: '/addProduct'})"></i>
          </div>
          <div class="icons">
            <i class="far fa-bookmark" @click="$router.push({path: '/wishList'})"></i>
          </div>
        </div>
        <div
          class="shopping"
          v-if="!($route.path == '/login' || $route.path == '/addProduct' || $route.path == '/register' || $route.path == '/cart' || $route.path == '/checkout')"
        >
          <i class="fas fa-shopping-cart" @click="$router.push({path: '/cart'})"></i>
        </div>
      </div>
    </div>
    <div class="menu_search" v-if="search_form">
      <form class="search">
        <div class="inner-form">
          <div class="input-field first-wrap">
            <input id="search" type="text" placeholder="Я ищу ..." />
          </div>
          <div class="input-field second-wrap">
            <div class="ex3">
              <label v-on:click="cityChange()" for="item-3">
                <i class="fas fa-caret-down"></i>
                {{chosenCity}}
              </label>
              <div class="hide3" v-if="cityDiv">
                <div class="inner3">
                  <ul class="outer_ul city_display">
                    <li class="outer_li" v-for="city in cities">
                      <a href="#" class="region">{{city.name}}</a>
                      <!--  <div class="inner_ul">
                        <a
                          class="inner_li"
                          v-for="(city,index) in region.cities"
                          v-on:click="selectCity(city);cityChange()"
                        >{{city}}</a>
                      </div>-->
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="input-field third-wrap">
            <button class="btn-search">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      <div class="close_search" @click="search_form = false">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post, del } from "../helpers/api";
import axios from "axios";
import Swal from "sweetalert2";

import vScroll from "vue-scroll";
export default {
  components: {
    Swal
  },
  data() {
    return {
      user: false,
      user_menu: false,
      menu_clicked: false,
      search_form: false,
      chosenRegion: false,
      cities: "",
      selected: [],
      selectAll: false,
      cityDiv: false,
      chosenCity: "Нур-Султан",
      chosen_city_id: 1,
      chosen_district_id: "",
      chosenDistrict: "",
      loggedOut: false,
      key: "",
      user_products: "",
      initial_length: "",
      initial_length_wishlist: "",
      wish_products: ""
    };
  },
  methods: {
    side_change() {
      this.menu_clicked = !this.menu_clicked;
      this.$emit("change", this.menu_clicked);
    },
    changeCity(city) {
      this.cityDiv = !this.cityDiv;
    },
    cityChanger(city) {
      this.cityDiv = !this.cityDiv;
      this.chosenCity = city ? city.name : " ";
      this.chosen_city_id = city ? city.id : 1;
    },
    districtChanger(district) {
      this.cityDiv = !this.cityDiv;
      this.chosenDistrict = district ? district.name : " ";
      this.chosen_district_id = district ? district.id : 1;
    },
    searchProduct() {
      this.$root.search += 1;
      this.$root.selected_cat_id = "";
      this.$router.push({ name: "Продукты" });
    },
    getLenght() {
      console.log("get cart length called");
      let _this = this;
      get(
        this,
        "/api/carts",
        {
          params: {
            user_id: _this.$root.user.data ? _this.$root.user.data.id : ""
          }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.user_products = response.data[0];

          // console.log(_this.products ? _this.products.length : "");
        },
        function(error) {
          console.log(error);
        }
      );
    },
    getWishList() {
      let _this = this;
      //get all cats with subcats
      get(
        this,
        "/api/wishList",
        {
          params: {
            user_id: _this.$root.user ? _this.$root.user.data.id : ""
          }
        },
        function(response) {
          _this.wish_products = response.data;
          console.log(response);
        },
        function(error) {
          console.log(error);
        }
      );
    },
    adminPage() {
      window.location.href = window.location.origin + "/admin";
    },
    logOut() {
      this.$auth.destroyToken();
      this.$router.push({ name: "Войти" });
      this.$root.user.data = "";
      this.loggedOut = true;
    },
    // this.$root.userInit(false);
    getCities() {
      console.log("get city called");
      let _this = this;
      get(
        this,
        "/api/cities",
        {},
        function(response) {
          _this.cities = response.data;
          console.log("asd");

          console.log(response.data);
          console.log("asd");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    ochistitCart() {
      console.log(this.$root.bought);
      let _this = this;
      if (this.$root.bought !== true) {
        Swal.fire({
          title: "Предупреждение",
          text: "Вы уверены что хотите очистить корзину?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Да!"
        }).then(result => {
          if (result.value) {
            del(
              this,
              "api/cart/delete",
              {
                params: {
                  user_id: _this.$root.user ? _this.$root.user.data.id : ""
                }
              },
              function(response) {
                console.log(response);
                console.log("deleted");
                _this.error = "";
                _this.initial_length = 0;
                _this.$root.deleted += 1;
              },
              function(error) {
                _this.formSending = false;
                console.log("error");

                _this.errors = error.response.data.error;
                console.log(error.response.data.error);
              }
            );
          }
        });
      } else {
        del(
          this,
          "api/cart/delete",
          {
            params: {
              user_id: _this.$root.user ? _this.$root.user.data.id : ""
            }
          },
          function(response) {
            console.log(response);
            console.log("deleted");
            _this.error = "";
            _this.$root.cleaned += 1;
            _this.$root.deleted += 1;
            _this.$router.push({ name: "Главная" });
          },
          function(error) {
            _this.formSending = false;
            console.log("error");

            _this.errors = error.response.data.error;
            console.log(error.response.data.error);
          }
        );
      }
    },
    addProductBtn() {
      this.$root.user.data
        ? this.$router.push({ name: "Добавить продукт" })
        : Swal.fire({
            title: "",
            text:
              "К сожелению вы не можете добавить препарат пока не войдете в систему",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Войти"
          }).then(result => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            } else if (
              // Read more about handling dismissals
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
              );
            }
          });
      // this.$router.push({ name: "Регистрация" }));
    },
    initialization() {
      this.initial_length = this.user_products.length;
    },
    init() {
      this.initial_length_wishlist = this.wish_products.length;
    },
    increaseCart() {
      this.initial_length++;
    },
    increaseWish() {
      this.initial_length_wishlist++;
    },
    decreaseWish() {
      if (this.initial_length_wishlist >= 0) {
        this.initial_length_wishlist -= 1;
      } else {
        this.$root.emergence_wish = true;
      }
    },
    decreaseCart() {
      this.initial_length--;
    }
  },
  watch: {
    chosen_city_id: function() {
      this.chosenDistrict = "";
      this.$root.selected_locality_id = this.chosen_city_id;
    },
    chosen_district_id: function() {
      this.chosenCity = "";
      this.$root.selected_district_id = this.chosen_district_id;
    },
    // key: function() {
    //   this.searchProduct();
    // },
    // cart_length: function() {
    //   this.cart_length = this.$root.length_cart;
    // },
    cart_clean: function() {
      this.ochistitCart();
    },
    user_id: function() {
      this.getLenght();
      this.getWishList();
    },
    cart_length_initial: function() {
      this.initialization();
    },
    wishList_length_inital: function() {
      this.init();
    },
    cart_length: function() {
      this.increaseCart();
    },
    wish_lenght: function() {
      this.increaseWish();
    },
    delete_wish: function() {
      this.decreaseWish();
    },
    delete_cart: function() {
      this.decreaseCart();
    },
    cleaned() {
      this.initial_length = 0;
    }
  },
  computed: {
    cleaned() {
      return this.$root.cleaned;
    },
    image() {
      return window.location.origin + "/storage/user_photos/default_photo.svg";
    },
    delete_cart: function() {
      return this.$root ? this.$root.delete_cart : "";
    },
    delete_wish: function() {
      return this.$root ? this.$root.delete_wish : "";
    },
    cart_length: function() {
      return this.$root ? this.$root.length_cart : "";
    },
    wish_lenght: function() {
      return this.$root ? this.$root.length_wish : "";
    },

    cart_clean: function() {
      return this.$root ? this.$root.cart_clean : "";
    },
    image_user: function() {
      return this.$root ? this.$root.user.data.image : "";
    },
    user_id: function() {
      return this.$root.user ? this.$root.user.data.id : "";
    },

    cart_length_initial: function() {
      return this.user_products ? this.user_products.length : "";
    },
    wishList_length_inital: function() {
      return this.wish_products ? this.wish_products.length : "";
    }
  },

  created() {
    console.log(this.$auth.getAccountRole());
    this.getCities();
    this.getLenght();
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
* {
  font-size: 16px;
}
.menu_show {
  display: block !important;
}
.sidemenu_show {
  display: flex !important;
  position: absolute;
  z-index: 999;
}
.menu_hide {
  display: none;
}
.nav_top {
  height: 42px;
  border-bottom: 1px solid rgb(93, 137, 124, 0.2);
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.top_text {
  width: 15%;
  display: inline-block;
  margin: auto;
  margin-left: 10%;
  a {
    color: #167f92;
  }
  a:hover {
    text-decoration: none;
    color: #000;
  }
  a:first-of-type {
    height: 42px;
    padding: 4px 16px;
    font-family: montserrat;
  }
  a:last-of-type {
    font-family: montserrat;
    border-left: 1px solid #167f92;
    margin-left: 2%;
    padding-left: 2%;
    padding: 4px 16px 4px 24px;
  }
}
.add_product {
  height: 42px;
  border: 1px solid rgb(93, 137, 124, 0.5);
  display: inline-block;
  cursor: pointer;
  padding: 6px 16px;
  margin-left: 25%;
}
.add_product i,
span {
  color: #5d897c;
  margin: auto;
}
.add_product span {
  font-family: montserrat;
  color: #5d897c;
}
.add_product:hover {
  border: 1px solid #5d897c;
  background-color: #5d897c;
  color: #fff;
}
.add_product:hover span {
  color: #fff;
}
.add_product:hover i {
  color: #fff;
}
.registration_form {
  margin: auto;
  width: 20%;
  margin-right: 5%;
}
.log_in {
  border-right: 1px solid #167f92;
  color: #167f92;
  border-radius: 0;
  padding-right: 10px;
  font-family: montserrat;
}
.log_in:hover {
  background-color: #167f92;
  color: #f2f2f2;
  border-radius: 6px;
}
.sign_up {
  border: 1px solid #167f92;
  color: #167f92;
  border-radius: 6px;
  margin-right: 14%;
  margin-left: 10px;
  color: #167f92;
  font-family: montserrat;
}
.sign_up:hover {
  background-color: #167f92;
  color: #f2f2f2;
}
.nav_bottom {
  height: 72px;
  border-bottom: 1px solid rgb(93, 137, 124, 0.2);
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.logo {
  font-weight: bold;
  letter-spacing: 1.5px;
  justify-self: center;
  color: #5d897c;
  margin: auto;
  width: 25%;
  padding-left: 8%;
  cursor: pointer;
  a {
    font-size: 30px;
    font-family: montserrat;
    font-weight: 550;
  }
  span {
    border-radius: 3px;
    color: #fff;
    background: #5d897c;
    padding: 0 8px;
    font-size: 30px;
    font-family: montserrat;
    font-weight: 550;
  }
}
.bot_right {
  width: 75%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.search_form {
  width: 65%;
  margin: auto;
  margin-right: 0px;
  padding-left: 5%;
  form {
    width: 90%;
  }
}
.inner-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.input-field {
  margin: auto;
  height: 46px;
}
.first-wrap {
  width: 60%;
  input {
    width: 100%;
    height: 46px;
    border: none;
    border: 1px solid rgb(22, 127, 146, 0.4);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-right: none;
    padding-left: 6px;
  }
}
.second-wrap {
  padding: 0;
  margin: 0;
  border-radius: 3px;
  overflow: hidden;
  background: #fff
    url("http://www.scottgood.com/jsg/blog.nsf/images/arrowdown.gif") no-repeat
    90% 50%;
  width: 25%;
  select {
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    overflow: hidden;
    margin-top: 4px;
    height: 36px;
    width: 100%;
    border: 1px solid rgb(22, 127, 146, 0.4);
    border-radius: 0;
    border-right: none;
    padding: 13px 0 0 5px;
    background-color: #fff;
    cursor: pointer;
    font-family: montserrat;
    color: #167f92;
    line-height: 16px;
  }
  select:focus {
    outline: none;
  }
}
.third-wrap {
  width: 15%;
  button {
    width: 100%;
    height: 46px;
    background-color: #fff;
    cursor: pointer;
    border: none;
    border: 1px solid rgb(22, 127, 146, 0.4);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #167f92;
    font-family: montserrat;
    padding: 0 2px;
  }
  button:hover {
    background-color: #167f92;
    color: #fff;
  }
}
.shopping_cart {
  border: 1px solid rgb(22, 127, 146, 0.4);
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  margin: auto 5px;
  padding: 7px 6px;
  height: 46px;
  width: 164px;
}
.shopping_cart:last-of-type {
  margin-right: 6.5%;
  padding: 7px 18px;
}
.shopping_cart i,
span {
  color: #167f92;
  margin: auto;
}
.shopping_cart span {
  font-family: montserrat;
}
.shopping_cart:hover {
  border: 1px solid #167f92;
  background-color: #167f92;
  color: #fff;
}
.shopping_cart:hover span {
  color: #fff;
}
.shopping_cart:hover i {
  color: #fff;
}
.badge {
  color: #167f92;
  background-color: #6cd28f;
  border-radius: 50%;
  width: 24px;
  font-weight: 500;
}
.absolute_badge {
  position: absolute;
  top: 0;
  right: 0;
}
.dropdown-toggle:hover {
  text-decoration: none;
}
.dropdown-toggle {
  font-family: montserrat;
  color: #167f92;
}
.dropdown-toggle:focus {
  color: black;
}
.user_form {
  margin: auto;
  width: 20%;
  ul {
    padding: 10px;
    border: 1px solid rgb(22, 127, 146, 0.2);
    border-radius: 3px;
    a {
      color: #167f92;
      font-family: montserrat;
    }
    i {
      padding-right: 10px;
    }
    a:hover {
      color: #000000;
      text-decoration: none;
    }
    li {
      margin: 5px 0;
    }
    li:last-of-type {
      border-top: 1px solid rgb(22, 127, 146, 0.2);
      padding-top: 10px;
    }
  }
}
.dropdown img {
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
.dropdown-menu .sub-menu {
  left: 100%;
  position: absolute;
  top: 0;
  visibility: hidden;
  margin-top: -1px;
  li {
    cursor: pointer;
  }
}

.dropdown-menu li:hover .sub-menu {
  visibility: visible;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
::placeholder {
  color: #8c8c8c;
  opacity: 0.3;
  font-family: montserrat;
  font-style: italic;
  font-size: 12px;
  font-weight: 400;
}

//tablets & phones ------------------------------------------------------------------------------------------------------------------------------
.main {
  margin: 0;
  height: 46px;
}
.nav_header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .logo {
    height: 42px;
    margin: auto;
    margin-left: 0;
    width: 20%;
    margin-top: -5px;
  }
}
.navbar-default .nav_tog .icon-bar {
  background-color: #ffffff;
}
.nav_tog {
  height: 38px;
  margin: 4px 0 0 6%;
  background-color: #167f92;
  border: none !important;
  border-radius: 3px;
}
.nav_tog .icon-bar {
  display: block;
  width: 26px;
  height: 3px;
  border-radius: 1px;
  margin: 5px;
}
.nav_header button:focus {
  background: #fff;
  .icon-bar {
    background-color: #167f92;
  }
}
.right_buttons {
  height: 42px;
  display: flex;
  flex-direction: row;
  margin: auto 6% auto auto;
  .icons {
    padding-left: 50px;
  }
  i {
    font-size: 20px;
    margin: 10px 5px 5px 5px;
  }
}
.navbar-default {
  color: #fff;
  background-color: #167f92;
}

.navbar-default .navbar-nav > li > a {
  color: #000;
}
.navbar-default .navbar-nav > .dropdown > a .caret {
  border-top-color: #fff;
  border-bottom-color: #fff;
}
.second-wrap input {
  width: 100%;
  border: none;
  border: 1px solid rgb(22, 127, 146, 0.4);
  border-right: none;
  height: 36px;
  margin-top: 4px;
  padding-left: 6px;
}
.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 180px;
  overflow: auto;
  width: 100%;
  z-index: 150;
  position: relative;
  background-color: #fff;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}
.autocomplete-result:hover {
  background-color: rgb(22, 127, 146, 0.2);
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #167f92;
  color: white;
}
.side_menu {
  overflow: auto;
  height: 100%;
  display: none;
  flex-direction: column;
  flex-wrap: wrap;
  position: fixed;
  z-index: 999;
  width: 40%;
  left: 0;
  top: 0;
  background-color: #f2f2f2;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  cursor: pointer;
  .side_cat {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    box-sizing: padding-box;
    a {
      color: rgb(22, 127, 146, 0.8);
      padding: 6px 12px;
      font-family: montserrat;
      font-size: 14px;
    }
    a:nth-last-of-type(2n) {
      background-color: rgb(22, 127, 146, 0.5);
      color: #fff;
    }
  }
}
.w3-animate-left {
  animation: animateleft 0.4s;
}
@keyframes animateleft {
  from {
    left: -300px;
    opacity: 0;
  }
  to {
    left: 0;
    opacity: 1;
  }
}

.side_top {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .side_user_name {
    color: #167f92;
  }
  .side_user_name:hover {
    text-decoration: none;
    color: #11616f;
  }
  .side_close {
    margin: auto 12px auto auto;
    height: 56px;
    font-family: montserrat;
    font-size: 14px;
    width: 40%;
    font-weight: 550;
  }
  .side_log_in {
    border: 1px solid #167f92;
    color: #167f92;
    border-radius: 3px;
    padding: 6px 18px;
    font-family: montserrat;
  }
  .side_log_in:hover {
    background-color: #167f92;
    color: #f2f2f2;
  }
}
.side_user_form {
  margin: auto auto auto 36px;
  width: 60%;
  a {
    color: #167f92;
    font-family: montserrat;
  }
  i {
    padding-right: 10px;
  }
  a:hover {
    color: #000000;
    text-decoration: none;
  }
}
.user_submenu {
  margin: 0 auto;
  width: 100%;
  ul {
    padding: 0 12px;
    border-top: 1px solid rgb(22, 127, 146, 0.2);
    a {
      color: #167f92;
      font-family: montserrat;
    }
    i {
      padding-right: 10px;
    }
    a:hover {
      color: #000000;
      text-decoration: none;
    }
    li {
      margin: 5px 0;
    }
    li:last-of-type {
      border-top: 1px solid rgb(22, 127, 146, 0.2);
      padding-top: 10px;
    }
  }
}
.menu_search {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(22, 127, 146, 0.2);
  form {
    width: 90%;
    padding: 12px 5%;
  }
  .close_search {
    width: 10%;
    padding-top: 24px;
    cursor: pointer;
    i {
      font-size: 18px;
    }
  }
}
//responsive ------------------------------------------------------------------------------------------------------------------------------
@media screen and (max-width: 1605px) {
  .search_form {
    width: 54%;
    margin: auto;
    margin-left: 14px;
    padding-left: 5%;
    form {
      width: 100%;
    }
  }
  .logo {
    width: 24%;
    padding-left: 6%;
  }
}
@media screen and (max-width: 1450px) {
  * {
    font-size: 14px;
  }
  .top_text {
    width: 20%;
    display: inline-block;
    margin: auto;
    margin-left: 10%;
    a:first-of-type {
      height: 42px;
      padding: 4px 16px;
    }
    a:last-of-type {
      margin-left: 2%;
      padding-left: 2%;
      padding: 4px 16px 4px 24px;
    }
  }
  .add_product {
    padding: 5px 12px;
    height: 34px;
    margin-top: 4px;
  }
  .badge {
    color: #167f92;
    background-color: #6cd28f;
    border-radius: 50%;
    font-weight: 400;
    width: 18px;
    font-size: 12px;
  }
  .nav_bottom {
    height: 56px;
  }
  .second-wrap label {
    padding: 9px 0 0 5px;
  }
  .search_form {
    width: 54%;
    margin: auto;
    margin-left: 14px;
    padding-left: 5%;
    form {
      width: 100%;
    }
  }
  .logo {
    font-weight: bold;
    letter-spacing: 1.5px;
    width: 25%;
    padding-left: 6%;
    a {
      font-size: 24px;
      font-weight: 500;
    }
    span {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .shopping_cart {
    height: 36px;
    width: 144px;
    padding: 4px 7px;
  }
  .shopping_cart:last-of-type {
    margin-right: 3.5%;
    margin-left: 2%;
    padding: 4px 17px;
  }

  .first-wrap input,
  .second-wrap label,
  .third-wrap button {
    height: 36px;
    margin: 4px 0 0 0;
  }
}
@media screen and (max-width: 1325px) {
  .shopping_cart {
    padding: 5px 8px;
  }
}
@media screen and (max-width: 1256px) {
  .shopping_cart {
    height: 36px;
    width: 144px;
    padding: 5px 8px;
  }
  .shopping_cart:last-of-type {
    margin-right: 2.5%;
    margin-left: 2%;
  }
  .sign_up {
    margin-right: 10%;
  }
}
@media screen and (max-width: 1100px) {
  * {
    font-size: 13px;
  }
  .shopping_cart {
    height: 36px;
    width: 130px;
    padding: 5px 4px;
  }
  .shopping_cart:last-of-type {
    margin-right: 3.5%;
    padding: 5px 13px;
  }
  .sign_up {
    margin-right: 6%;
  }
}

@media screen and (max-width: 1024px) {
  .nav_max {
    display: none;
  }
  form.search {
    display: block !important;
  }
  .logo {
    width: 40%;
    padding-left: 2%;
    .logo_text {
      display: flex;
      flex-direction: row;
    }
    a {
      font-size: 24px;
      font-weight: 500;
    }
    span {
      font-size: 24px;
      font-weight: 500;
      margin-left: 4px;
    }
  }
  .shopping {
    height: 48px;
    width: 48px;
    position: fixed;
    z-index: 100;
    bottom: 42px;
    right: 24px;
    background-color: #0d4d59;
    -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.7);
    -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.7);
    box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.7);
    border-radius: 50%;
    -webkit-animation: jump 1.5s ease 0s infinite normal;
    animation: jump 1.5s ease 0s infinite normal;

    @-webkit-keyframes jump {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      20% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      40% {
        -webkit-transform: translateY(-18px);
        transform: translateY(-18px);
      }
      50% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      60% {
        -webkit-transform: translateY(-12px);
        transform: translateY(-12px);
      }
      80% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }

    @keyframes jump {
      0% {
        transform: translateY(0);
      }
      20% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-18px);
      }
      50% {
        transform: translateY(0);
      }
      60% {
        transform: translateY(-12px);
      }
      80% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(0);
      }
    }
    i {
      padding: 30% 25%;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
@media screen and (min-width: 1025px) {
  .navbar-default {
    display: none !important;
  }
  .menu_search {
    display: none !important;
  }
  .shopping {
    display: none !important;
  }
}
@media screen and (max-width: 802px) {
  .side_menu {
    width: 60%;
  }
}
@media screen and (max-width: 768px) {
  .nav_header .logo {
    margin-left: -5%;
  }
  .right_buttons {
    .icons {
      padding-left: 30px;
    }
    i {
      font-size: 18px;
      margin: 10px 5px 5px 5px;
    }
  }
}
@media screen and (max-width: 667px) {
  .side_menu {
    width: 100%;
  }
  .first-wrap {
    width: 50%;
  }
  .second-wrap {
    width: 35%;
    label {
      font-size: 12px;
      padding-top: 6px;
      i {
        padding-left: 3px;
      }
    }
  }
  ::placeholder {
    font-size: 12px;
  }
}
@media screen and (max-width: 480px) {
  .logo {
    font-weight: bold;
    letter-spacing: 1.2px;
    width: 25%;
    padding-left: 3%;
    padding-top: 3px;
    a {
      font-size: 20px;
      font-weight: 500;
    }
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .navbar-collapse {
    width: 72%;
  }
  .nav_tog {
    margin: 4px 0 0 4%;
  }
  .right_buttons {
    height: 42px;
    display: flex;
    flex-direction: row;
    margin: auto 6% auto auto;
    .icons {
      padding-left: 15px;
    }
    i {
      font-size: 18px;
      margin: 10px 5;
    }
  }
}
@media screen and (max-width: 376px) {
  .first-wrap input {
    height: 32px;
    margin-top: 0;
  }
  .second-wrap {
    width: 35%;
  }
  .second-wrap input {
    height: 32px;
    margin-top: 0;
  }
  .third-wrap button {
    height: 32px;
    margin-top: 0;
  }
  .close_search {
    padding-top: 20px !important;
  }
  ::placeholder {
    font-size: 11px;
  }
  .input-field {
    margin: auto;
    height: 32px;
  }
  .nav_tog {
    margin: 4px 0 0 0;
  }
  .navbar-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .logo {
      width: 25%;
      padding-left: 0;
      .logo_text {
        letter-spacing: 1px;
      }
      span {
        padding: 0 4px;
      }
    }
  }
  .right_buttons {
    height: 42px;
    display: flex;
    flex-direction: row;
    margin: auto 0 auto auto;
    .icons {
      padding-left: 8px;
    }
    i {
      font-size: 16px;
      margin: 10px 5px;
    }
  }
}
</style>

