<template>
  <div class="body_content" v-if="$route.path == '/'">
    <div v-if="$route.path == '/'" class="carousel_main">
      <agile
        :arrows="false"
        :speed="750"
        :timing="'linear'"
        :fade="true"
        :autoplay="true"
        :pauseOnHover="false"
        :dots="false"
      >
        <div class="slide slide--1"></div>
        <div class="slide slide--2"></div>
        <div class="slide slide--3"></div>
      </agile>
    </div>
    <div class="product_cart" v-for="product in products">
      <div class="section_image">
        <img v-if="product.photos.length" class="image" :src="product.photos[0].url">
        <img v-else :src="image" class="image">

        <div class="discount-label red" v-if="product.discount_in_percent != 0">
          <span>-{{product.discount}}%</span>
        </div>
        <div class="overlay">
          <div class="image_text">
            <a class="btn btn-sm shopping_cart" href="#" @click="updateCart(product.id)">В корзину</a>
            <a
              class="btn btn-sm product_buy"
              href="#"
              @click="$router.push({path: '/register'})"
            >Купить</a>
          </div>
        </div>
      </div>
      <div class="section_text">
        <div class="text_top" href="#" @click="singleProduct(product.id,product.cat_id)">
          <h2>{{product.name}}</h2>
        </div>
        <div class="text_bottom">
          <h2 class="price_real">{{product.price}}</h2>
          <h2 class="price_discount">{{product.price}}</h2>
          <span
            @click="changeColor(product,product.id)"
            :class="{ 'fa fa-star': product.clicked_star, 'far fa-star': !product.clicked_star}"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "./Product";
import { get, post, del } from "../../helpers/api";
export default {
  data() {
    return {
      categories: "",
      products: ""
    };
  },
  methods: {
    getProducts() {
      let _this = this;
      console.log("asdasd");
      get(
        this,
        "/api/products",
        {
          params: {
            locality_id: this.$root.selected_locality_id,
            user_id: _this.$root.user ? _this.$root.user.data.id : ""
          }
        },
        function(response) {
          console.log(response);
          _this.products = response.data.data;
        },
        function(error) {
          console.log(error);
        }
      );
    },
    singleProduct(id, cat_id) {
      let _this = this;
      post(
        this,
        "/api/singleProduct/create",
        { cat_id: cat_id, product_id: id, user_id: _this.$root.user.data.id },
        function(response) {
          console.log(response);
          _this.error = "";
          _this.$router.push({ path: "/single_product" });
        },
        function(error) {
          _this.formSending = false;
          _this.errors = error.response.data.error;
          console.log(error.response.data.error);
        }
      );
    },
    updateCart(id) {
      if (this.$root.user) {
        console.log("post called");
        let _this = this;
        // console.log(id);

        post(
          this,
          "/api/carts",
          { product_id: id, user_id: _this.$root.user.data.id, count: 1 },
          function(response) {
            console.log(response);
            _this.error = "";
            _this.$emit("cart-length");
          },
          function(error) {
            _this.formSending = false;
            _this.errors = error.response.data.error;
            console.log(error.response.data.error);
          }
        );
      } else {
        alert("Вы должны зарегистрироваться!");
      }
    },
    changeColor(product, id) {
      if (product.clicked_star) {
        let _this = this;
        console.log(id);
        if (confirm("Продукт будет удален из Избранных!")) {
          del(
            this,
            "api/wishlist/destroy",
            {
              params: {
                product_id: id,
                user_id: _this.$root.user ? _this.$root.user.data.id : ""
              }
            },
            function(response) {
              console.log(response);
              console.log("deleted");
              // _this.error = "";
              _this.falseClicked();
              _this.$emit("delete-wish");

              _this.getProducts();
            },
            function(error) {
              // _this.formSending = false;
              console.log("error");
              // _this.deleted = _this.deleted + 1;

              // _this.errors = error.response.data.error;
              // console.log(error.response.data.error);
            }
          );
        }
      } else {
        console.log("post for wish called");
        let _this = this;
        console.log(id);

        post(
          this,
          "/api/wishList",
          { product_id: id, user_id: _this.$root.user.data.id },
          function(response) {
            console.log(response);
            _this.error = "";
            _this.$emit("update-wish");
            product.clicked_star = 1;
          },
          function(error) {
            _this.formSending = false;
            _this.errors = error.response.data.error;
            console.log(error.response.data.error);
          }
        );
      }
    },
    falseClicked() {
      console.log("initial clicked star");
      let _this = this;
      post(
        this,
        "/api/products/resetingStar",
        {},
        function(response) {
          console.log("success");
        },
        function(error) {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    user_id: function() {
      this.getProducts();
    },
    selected_locality_id: function() {
      this.getProducts();
    }
  },
  computed: {
    user_id: function() {
      return this.$root.user.data ? this.$root.user.data.id : "";
    },

    selected_locality_id() {
      return this.$root.selected_locality_id;
    },
    image() {
      return window.location.origin + "/storage/product_photos/netphoto.png";
    }
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.body_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 72%;
  position: static;
}
.far {
  color: rgba(22, 127, 146);
}
.fa {
  color: #ffdb4d;
}
.product_cart {
  border-radius: 6px;
  width: 23%;
  padding: 6px;
  height: 320px;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 4%;
  background-color: #fff;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
}
.product_cart:hover {
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 1);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 1);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 1);
}
.section_image {
  position: relative;
  box-sizing: border-box;
}
.image {
  display: block;
  width: 100%;
  height: 200px;
}
.discount-label {
  position: absolute;
  top: 10px;
  right: 5px;
}
.red {
  background-color: #ff0000;
}
.discount-label {
  padding: 8px;
  width: 70px;
  -webkit-border-radius: 0 4px 0 4px;
  -moz-border-radius: 0 4px 0 4px;
  border-radius: 0 4px 4px 0;
}

.discount-label:after {
  right: 99%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  border-color: rgba(136, 183, 213, 0);
  border-width: 24px;
  top: 42%;
  margin-top: -20px;
}

.discount-label:before {
  z-index: 2;
  position: absolute;
  top: 42%;
  right: 100%;
  width: 7px;
  height: 7px;
  opacity: 0.95;
  background: #ffffff;
  border-radius: 7px;
  -webkit-box-shadow: inset 0.5px 0 rgba(0, 0, 0, 0.6);
  box-shadow: inset 0.5px 0 rgba(0, 0, 0, 0.6);
}
.discount-label span {
  color: #ffffff;
  font-size: 20px;
  text-align: center;
}
.red:after {
  border-right-color: #ff0000;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(22, 127, 146, 0.8);
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.5s ease;
}
.section_image:hover .overlay {
  height: 50%;
}
.image_text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 60%;
  a {
    font-size: 16px;
    border-radius: 6px;
    font-family: monsterrat;
  }
}
/* When you mouse over the container, fade in the overlay title */
.section_image:hover {
  img {
    opacity: 0.4;
  }
  .overlay {
    opacity: 1;
  }
}
.shopping_cart {
  background-color: #2db89b;
  color: #fff;
  margin-bottom: 6px;
}
.shopping_cart:hover {
  background-color: #0059b3;
}
.product_buy {
  background-color: rgb(0, 168, 213);
  color: #fff;
}
.product_buy:hover {
  background-color: #0059b3;
}
.section_text {
  margin: 10px;
  height: 90px;
  h2 {
    font-size: 14px;
    font-family: montserrat;
  }
}
.text_top {
  height: 60px;
  cursor: pointer;
}
.text_bottom {
  display: flex;
  flex-direction: row;
}
.price_real {
  text-decoration: line-through;
  color: grey;
  margin-right: 10px;
}
.text_bottom span {
  cursor: pointer;
  transition: all 0.32s ease;
  font-size: 30px;
  margin-left: 40%;
  margin-top: -5px;
}

.text_bottom span:hover {
  opacity: 0.8;
}

.text_bottom span:active {
  transform: scale(0.93, 0.93) translateY(2px);
}
@media screen and (min-width: 1650px) {
  .text_bottom span {
    margin-left: 55% !important;
  }
}
@media screen and (min-width: 1850px) {
  .carousel_main {
    height: 420px !important;
  }
  .slide {
    height: 420px !important;
  }
}
@media screen and (min-width: 2100px) {
  .text_bottom span {
    margin-left: 50% !important;
  }
}
@media screen and (max-width: 1849px) {
  .carousel_main {
    height: 380px !important;
  }
  .slide {
    height: 380px !important;
  }
}
@media screen and (max-width: 1450px) {
  .carousel_main {
    height: 340px !important;
  }
  .slide {
    height: 340px !important;
  }
  .section_text {
    margin: 10px;
    height: 90px;
    h2 {
      font-size: 14px !important;
      font-family: montserrat;
    }
  }
  .text_bottom span {
    font-size: 28px !important;
    margin-left: 35% !important;
  }
}
@media screen and (max-width: 1224px) {
  .carousel_main {
    height: 320px !important;
  }
  .slide {
    height: 320px !important;
  }
  .product_cart {
    height: 260px;
    margin-bottom: 3% !important;
    margin-top: 0 !important;
  }
  .section_text {
    margin: 10px;
    height: 90px;
    h2 {
      font-size: 12px !important;
      font-family: montserrat;
    }
  }
  .image {
    display: block;
    width: 100%;
    height: 150px !important;
  }
  .text_bottom h2:first-of-type {
    display: none;
  }
  .text_bottom span {
    margin-left: 35% !important;
  }
  .discount-label {
    top: 8px !important;
    right: 4px !important;
  }
  .discount-label {
    padding: 6px !important;
    width: 60px !important;
  }
  .discount-label:after {
    right: 98%;
    border-width: 21px !important;
    margin-top: -18px;
  }

  .discount-label:before {
    right: 100%;
    width: 7px;
  }
  .discount-label span {
    font-size: 18px;
  }
  .image_text {
    width: 70% !important;
    a {
      font-size: 16px !important;
      border-radius: 3px !important;
      height: 26px;
      padding: 2px 4px !important;
      padding-top: 0px !important;
    }
  }
}
@media screen and (max-width: 1024px) {
  .carousel_main {
    width: 90%;
  }
  .body_content {
    width: 90% !important;
    margin: 0 5% 0 5%;
  }
  .product_cart {
    width: 23%;
    padding: 6px;
    height: 240px;
    margin: 0 1% 4% 1%;
  }
  .text_top {
    height: 44px;
  }
  .section_text {
    height: 70px !important;
  }
  .section_text h2 {
    font-size: 12px !important;
  }
  .text_bottom span {
    font-size: 26px !important;
  }
  .image_text {
    a {
      font-size: 14px !important;
      height: 22px;
      padding: 2px 4px !important;
      padding-top: 0px !important;
    }
  }
}
@media screen and (max-width: 802px) {
  .body_content {
    width: 90% !important;
    margin: 0 5% 0 5%;
  }
  .product_cart {
    width: 29%;
    padding: 6px;
    height: 240px;
    margin: 0 2% 4% 2%;
  }
  .section_text {
    height: 70px;
  }
  .section_text h2 {
    font-size: 12px !important;
  }
  .text_bottom span {
    font-size: 26px !important;
  }
  .image_text a {
    font-size: 13px !important;
  }
}
@media screen and (max-width: 667px) {
  .body_content {
    width: 90% !important;
    margin: 0 5% 0 5%;
  }
  .product_cart {
    width: 29%;
    padding: 6px;
    height: 210px;
    margin: 0 2% 4% 2%;
  }
  .image {
    display: block;
    width: 100%;
    height: 120px !important;
  }
  .section_text {
    height: 60px;
  }
  .section_text h2 {
    font-size: 12px !important;
  }
  .text_bottom span {
    font-size: 24px !important;
  }
  .discount-label {
    padding: 4px !important;
    width: 50px !important;
  }
  .discount-label:after {
    right: 98%;
    border-width: 15px !important;
    margin-top: -13px;
  }
  .discount-label span {
    font-size: 14px;
  }
  .image_text a {
    font-size: 12px !important;
  }
}
@media screen and (max-width: 546px) {
  .product_cart {
    width: 46%;
    padding: 6px;
    height: 180px;
    margin: 0 2% 4% 2%;
  }
  .image {
    display: block;
    width: 100%;
    height: 100px !important;
  }
  .text_top {
    height: 36px;
  }
  .section_text {
    height: 50px;
  }
  .section_text h2 {
    font-size: 11px !important;
  }
  .text_bottom span {
    font-size: 20px !important;
    margin-left: 60% !important;
  }
  .discount-label {
    padding: 4px !important;
    width: 50px !important;
  }
  .discount-label:after {
    right: 98%;
    border-width: 15px !important;
    margin-top: -13px;
  }
  .discount-label span {
    font-size: 14px;
  }
  .image_text {
    width: 70% !important;
    a {
      font-size: 11px !important;
      height: 18px;
      padding: 2px 4px !important;
      padding-top: 0px !important;
    }
  }
}
@media screen and (max-width: 381px) {
  .text_bottom span {
    margin-left: 50% !important;
  }
}
.carousel_main {
  width: 100%;
  height: 281px;
  margin-bottom: 30px;
}
.slide {
  background: {
    position: center;
    size: cover;
  }
  height: 281px;
  border-radius: 5px;
  &--1 {
    background-image: url(http://www.sandstonepharmacies.com/wp-content/uploads/2016/11/Dover-Interior-7_3110x2074.jpg);
  }
  &--2 {
    background-image: url(http://drsparkrx.com/wp-content/uploads/2017/08/pharmacist-drs-park.jpg);
  }
  &--3 {
    background-image: url(https://murphyspharmacies.com/wp-content/uploads/2016/09/pharmacy-kids.jpg);
  }
}
.container {
  display: flex;
  flex-direction: row;
  margin: 30px;
  margin-top: 100px;
}
.top-body {
  flex: 1 1 auto;
  border: 1px red solid;
  text-align: center;
  margin: 5px;
}
.sidebar {
  width: 300px;
}
</style>


