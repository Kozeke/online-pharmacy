<template>
  <div class="body_content" v-if="$route.path == '/wishList'">
    <div class="filter">
      <a class="collapse_ctrl">
        <i class="fas fa-sliders-h"></i>
        <h4 class="choose_filter">Выберите фильтр</h4>
        <i class="fas fa-caret-down"></i>
      </a>
      <div class="form collapse">
        <div class="input_group" v-for="filter in filters">
          <input type="checkbox" :id="filter.name" :value="filter.name" v-model="selectedFilters">
          <label :for="filter.name">{{filter.name}}</label>
        </div>
        <h4>Цена</h4>
        <div class="rangeFilters price">
          <span>От</span>
          <input type="number" id="amountFrom" v-model="value[0]">
          <span>до</span>
          <input type="number" id="amountTo" v-model="value[1]">
        </div>
      </div>
    </div>
    <div class="product_content">
      <div class="product_cart" v-for="(product, index) in products">
        <div class="section_image">
          <img
            :src="product.product.photo_url?product.product.photo_url:'https://pypik.ru/uploads/posts/2018-09/1536907413_foto-net-no-ya-krasivaya-4.jpg'"
            class="image"
          >
          <div class="discount-label red" v-if="product.discount_in_percent != 0">
            <span>-{{product_discount}}%</span>
          </div>
          <div class="overlay">
            <div class="image_text">
              <a
                v-if="product.shipping"
                class="btn btn-sm shopping_cart"
                href="#"
                @click="$router.push({path: '/login'})"
              >В корзину</a>
              <a
                v-if="product.shipping"
                class="btn btn-sm product_buy"
                href="#"
                @click="$router.push({path: '/register'})"
              >Купить</a>
            </div>
          </div>
        </div>
        <div class="section_text">
          <div class="text_top" href="#" @click="$router.push({path: '/single_product'})">
            <h2>{{product.product.name}}</h2>
          </div>
          <div class="text_bottom">
            <h2 class="price_real">{{product.product.price}}</h2>
            <h2 class="price_discount">{{product_final_price}}</h2>
            <span
              @click="deleteWishList(product.id)"
              :class="{ 'fa fa-star': product.product.clicked_star, 'far fa-star': !product.product.clicked_star}"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post, del } from "../../helpers/api";
export default {
  data() {
    return {
      categories: "",

      filters: [
        {
          name: "В наличии"
        },
        {
          name: "Только с фото"
        },
        {
          name: "Акционные товары"
        },
        {
          name: "Бесплатная доставка"
        }
      ],
      selectedFilters: [],
      value: [0, 400],
      product_name: "",
      product_discount: "",
      product_price: "",
      product_final_price: "",
      images: [],
      product_price: "",
      count: 1,
      products: "",
      amount: "",
      getWishListCalled: false
    };
  },

  methods: {
    deleteWishList(id) {
      let _this = this;
      console.log(id);
      if (confirm("Продукт будет удален из Избранных!")) {
        del(
          this,
          "api/wishlist/delete",
          {
            params: {
              id: id
            }
          },
          function(response) {
            console.log(response);
            console.log("deleted");
            // _this.error = "";
            _this.getWishList();
            _this.$emit("delete-wish");
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
          _this.products = response.data;
          console.log(response);
          _this.falseClicked();
          _this.getWishListCalled = true;
        },
        function(error) {
          console.log(error);
        }
      );
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
  watch: {
    user_id: function() {
      this.getWishList();
    }
  },
  computed: {
    user_id: function() {
      return this.$root.user.data ? this.$root.user.data.id : "";
    }
  },
  mounted() {
    this.getWishList();
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.body_content {
  width: 72%;
}
.product_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.filter {
  border: 1px solid rgba(22, 127, 146, 0.3);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 20px;
  .collapse_ctrl {
    display: flex;
    flex-direction: row;
    i:first-of-type {
      margin: 3px 2% 0 6%;
    }
    i:last-of-type {
      margin: 3px 0 0 1%;
    }
  }
  .choose_filter {
    font-size: 18px;
    font-family: montserrat;
  }
  .form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 6px 10px;
    border-top: 1px solid rgba(22, 127, 146, 0.3);
    h4 {
      margin: 5px 5% 0 4%;
      font-size: 16px;
      font-family: montserrat;
    }
  }
  .input_group {
    width: 44%;
    margin: 0 3%;
  }
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
  background-color: #e80707;
}
.discount-label {
  padding: 8px;
  width: 70px;
  -webkit-border-radius: 0 4px 0 4px;
  -moz-border-radius: 0 4px 0 4px;
  border-radius: 0 4px 4px 0;
}

.discount-label:after {
  right: 100%;
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
  border-right-color: #e80707;
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
  margin: 5px;
  height: 90px;
  h2 {
    font-size: 20px;
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
.input_group {
  display: block;
  margin: 0;
  position: relative;
  label {
    padding: 8px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3c454c;
    cursor: pointer;
    position: relative;
    transition: color 200ms ease-in;
    overflow: hidden;
    font-family: montserrat;
    font-size: 14px;
    &:after {
      width: 28px;
      height: 28px;
      content: "";
      border: 2px solid #d1d7dc;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      border-radius: 10%;
      position: absolute;
      right: 0;
      top: 60%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }
  input:checked ~ label {
    &:before {
      transform: translate(-50%, -50%) scale3d(56, 56, 1);
      opacity: 1;
    }

    &:after {
      background-color: #6cd28f;
      border-color: #6cd28f;
    }
  }
  input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
    font-family: monsterrat;
    font-size: 14px;
  }
}
.price {
  span {
    font-size: 14px;
    font-family: monsterrat;
  }
  input {
    width: 25%;
    border-radius: 3px;
    border: 1px solid rgb(22, 127, 146, 0.2);
    margin: 5px;
    font-size: 14px;
    font-family: monsterrat;
  }
  input:first-of-type {
    margin-right: 15px;
  }
}
@media screen and (min-width: 1451px) {
  .filter {
    display: none;
  }
}
@media screen and (min-width: 1650px) {
  .text_bottom span {
    margin-left: 35% !important;
  }
}
@media screen and (min-width: 2100px) {
  .text_bottom span {
    margin-left: 50% !important;
  }
}
@media screen and (max-width: 1450px) {
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
  .product_cart {
    height: 260px;
    margin-bottom: 3% !important;
  }
  .image {
    display: block;
    width: 100%;
    height: 150px !important;
  }
  .text_bottom h2 {
    font-size: 14px !important;
  }
  .text_bottom h2:first-of-type {
    display: none;
  }
  .text_bottom span {
    margin-left: 40% !important;
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
  .filter {
    border: 1px solid rgba(22, 127, 146, 0.3);
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 20px;
    .choose_filter {
      margin-left: 6%;
      font-size: 15px;
      font-family: montserrat;
    }
    .form {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 6px 10px;
      border-top: 1px solid rgba(22, 127, 146, 0.3);
      h4 {
        margin: 10px 5% 0 4%;
        font-size: 13px;
        font-family: montserrat;
      }
      .rangeFilters {
        width: 60%;
      }
    }
    .input_group {
      width: 90%;
      margin: 0 5%;
    }
  }
  .image_text a {
    font-size: 12px !important;
  }
}
@media screen and (max-width: 546px) {
  .product_cart {
    width: 46%;
    padding: 6px;
    height: 200px;
    margin: 0 2% 4% 2%;
  }
  .image {
    display: block;
    width: 100%;
    height: 120px !important;
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
  .filter {
    border: 1px solid rgba(22, 127, 146, 0.3);
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 20px;
    .choose_filter {
      margin-left: 6%;
      font-size: 13px;
      font-family: montserrat;
    }
    .form {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 6px 10px;
      border-top: 1px solid rgba(22, 127, 146, 0.3);
      h4 {
        margin: 10px 5% 0 4%;
        font-size: 11px;
        font-family: montserrat;
      }
      .rangeFilters {
        width: 60%;
      }
    }
    .input_group {
      width: 90%;
      margin: 0 5%;
      label {
        font-size: 11px;
      }
    }
  }
  .price {
    font-size: 11px;
    input {
      font-size: 11px;
    }
    input:first-of-type {
      margin-right: 10px;
    }
  }
}
</style>

