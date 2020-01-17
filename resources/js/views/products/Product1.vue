<template>
  <div class="body_content" v-if="$route.path == '/products'">
    <div class="sort_by">
      <h4>Сортировать по:</h4>
      <a
        title="Button fade"
        @click="filterDataPrice"
        class="button"
        v-bind:class="{'btn_sort': filter_data_price === 'DESC'}"
      >
        Цена
        <i class="fas fa-sort-amount-up"></i>
      </a>
      <a
        title="Button fade"
        @click="filterDataPrice"
        class="button"
        v-bind:class="{'btn_sort': filter_data_price === 'ASC' }"
      >
        Цена
        <i class="fas fa-sort-amount-down"></i>
      </a>
      <a
        title="Button fade"
        @click="filterDataDate"
        class="button date_max"
        v-bind:class="{'btn_sort': filter_data_date === 'latest'}"
      >
        Дата добавление
        <i class="fas fa-calendar-check"></i>
      </a>
      <a
        title="Button fade"
        @click="filterData.sortBy = 'date';"
        class="button date_min"
        v-bind:class="{'btn_sort': filter_data_date === 'latest'}"
      >
        Новые
        <i class="fas fa-calendar-check"></i>
      </a>
      <a
        title="Button fade"
        class="button btnReset"
        @click="filter_data_price ='';filter_data_date=''"
        v-if="filter_data_date || filter_data_price"
      >
        <span>Сбросить</span>
        <i class="fas fa-ban"></i>
      </a>
    </div>
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
    <div v-if="this.products" class="product_content">
      <div class="product_cart" v-for="product in products" :key="product.id">
        <div class="section_image">
          <img v-if="product.photos.length" class="image" :src="product.photos[0].url">
          <img v-else :src="image" class="image">
          <div class="discount-label red" v-if="product.discount_in_percent != 0">
            <span>-{{product_discount}}%</span>
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
            <h2 class="price_discount">{{product_final_price}}</h2>
            <span
              @click="changeColor(product, product.id)"
              :class="{ 'fa fa-star': product.clicked_star, 'far fa-star': !product.clicked_star}"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <span>Страница {{pagination.current_page}} из {{pagination.last_page}}</span>
      <div class="move">
        <button class="btn btn-default" @click="getList(1)" :disabled="pagination.current_page==1">
          <i class="fas fa-angle-double-left"></i>
        </button>
        <button
          class="btn btn-default"
          @click="getList(pagination.current_page-1)"
          :disabled="!pagination.current_page>1"
        >
          <i class="fas fa-angle-left"></i>
        </button>
        <button
          class="btn btn-default"
          @click="getList(pagination.current_page+1)"
          :disabled="!pagination.next_page_url"
        >
          <i class="fas fa-angle-right"></i>
        </button>
        <button
          class="btn btn-default"
          @click="getList(pagination.last_page)"
          :disabled="pagination.current_page==pagination.last_page"
        >
          <i class="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post, del } from "../../helpers/api";
import Paginate from "vuejs-paginate";
export default {
  data() {
    return {
      products: "",
      categories: "",
      icon: {
        clicked: false
      },
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
      value: "",
      pagination: {},
      filter_data_price: "", //price || date
      filter_data_date: "latest" //ASC or DESC
    };
  },
  methods: {
    filterDataPrice() {
      this.filter_data_price == "ASC"
        ? (this.filter_data_price = "DESC")
        : (this.filter_data_price = "ASC");
      this.filter_data_date = "";
    },
    filterDataDate() {
      this.filter_data_date == "latest"
        ? (this.filter_data_date = "oldest")
        : (this.filter_data_date = "latest");
      this.filter_data_price = "";
    },
    getList(page) {
      console.log("get list of products called", page);
      let _this = this;
      get(
        this,
        "/api/products",
        {
          params: {
            user_id: _this.$root.user ? _this.$root.user.data.id : "",
            locality_id: _this.$root.selected_locality_id,
            cat_id: _this.$root.selected_cat_id,
            district_id: _this.$root.selected_district_id,
            search_text: _this.$root.key,
            filter_data_price: _this.filter_data_price,
            filter_data_date: _this.filter_data_date,
            filter_price_range_top: _this.$root.values[1],
            filter_price_range_bottom: _this.$root.values[0],
            page: page
          }
        },
        function(response) {
          _this.products = response.data.data;
          _this.pagination = response.data;
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    updateCart(id) {
      console.log("post called");
      let _this = this;
      console.log(id);

      post(
        this,
        "/api/carts",
        { product_id: id, user_id: _this.$root.user.data.id, count: 1 },
        function(response) {
          console.log(response);
          _this.error = "";
          _this.$emit("update-cart");
        },
        function(error) {
          _this.formSending = false;
          _this.errors = error.response.data.error;
          console.log(error.response.data.error);
        }
      );
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

              _this.getList();
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

    addToCart() {
      this.$emit("add-to-cart", this.product.id);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },

    changePage: function(page) {
      this.$emit("page-changed", page);
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
    }
  },
  created() {
    this.getList();
  },
  watch: {
    selected_cat_id: function() {
      this.$root.selected_cat_id ? (this.$root.key = "") : "";

      this.$root.selected_cat_id ? this.getList() : "";
    },
    selected_locality_id: function() {
      this.$root.selected_district_id = "";
      this.products = "";
      this.$root.selected_locality_id ? this.getList() : "";
    },
    selected_district_id: function() {
      this.$root.selected_locality_id = "";
      this.products = "";
      this.$root.selected_district_id ? this.getList() : "";
    },
    key: function() {
      this.$root.key ? (this.products = "") : "";
      this.$root.key ? (this.$root.selected_cat_id = "") : "";
      this.$root.key ? this.getList() : "";
    },
    filter_data_price: function() {
      this.filter_data_price ? this.getList() : "";
    },
    filter_data_date: function() {
      this.filter_data_date ? this.getList() : "";
    },
    selected_values: function() {
      this.$root.values ? this.getList() : "";
    },
    search_text: function() {
      this.$root.search ? this.getList() : "";
    }
  },
  computed: {
    selected_cat_id() {
      this.$root.key = "";
      return this.$root.selected_cat_id;
    },
    selected_locality_id() {
      return this.$root.selected_locality_id;
    },
    selected_district_id() {
      return this.$root.selected_district_id;
    },
    key() {
      return this.$root.key;
    },
    values() {
      return this.$root.values;
    },
    image() {
      return window.location.origin + "/storage/product_photos/netphoto.png";
    },
    search_text() {
      return this.$root.search;
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
  width: 72%;
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
.sort_by {
  border: 1px solid rgb(22, 127, 146, 0.2);
  border-radius: 6px;
  margin: 0 1% 30px 1%;
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: auto 0 auto 5%;
    font-family: montserrat;
  }
}

a.button {
  font-size: 16px;
  border-radius: 3px;
  transition: all 0.2s;
  margin: auto;
  padding: 0px 8px;
  box-shadow: none;
  color: #2db89b;
  font-family: montserrat;
  i {
    margin-left: 4px;
  }
}
.date_min {
  display: none;
}
a.button:last-of-type {
  margin-right: 5%;
}
.button {
  background: #fff;
  color: #2db89b;
}
/* FADE */
a.button:hover {
  background: #2db89b;
  color: #fff;
  text-decoration: none;
}
a.btnReset {
  border: 1px solid #ff6666;
  color: #ff6666;
}
a.btnReset:hover {
  background: #ff6666;
  color: #fff;
}
a.btn_sort {
  background: #2db89b;
  color: #fff;
  text-decoration: none;
}
.product_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.far {
  color: black;
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
  margin: 5px;
  height: 90px;
  h2 {
    font-size: 14px;
    font-family: montserrat;
  }
}
.text_top {
  text-transform: uppercase;
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
  .sort_by {
    margin: 0 0 12px 0;
    height: 46px;
    h4 {
      font-size: 14px;
      font-weight: 550 !important;
      margin: auto 0 auto 3%;
    }
  }
  a.button {
    font-size: 14px;
    font-weight: 550 !important;
    margin: 4px auto;
    padding: 6px;
    height: 34px;
    line-height: 1.6;
    i {
      margin-left: 4px;
    }
  }
  a.button:last-of-type {
    margin-right: 3%;
  }
  .product_cart {
    height: 260px;
    margin-bottom: 3% !important;
  }
  .image {
    display: block;
    width: 100%;
    height: 150px !important;
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
  .section_text h2 {
    font-size: 12px !important;
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
}
@media screen and (max-width: 1024px) {
  .body_content {
    width: 90% !important;
    margin: 30px 5% 0 5%;
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
  .sort_by {
    height: 42px;
    h4 {
      font-size: 12px;
      margin: auto 0 auto 2%;
    }
  }
  a.button {
    font-size: 12px;
    font-weight: 500 !important;
    height: 32px;
  }
  a.button:last-of-type {
    margin-right: 2%;
  }
  .body_content {
    width: 90% !important;
    margin: 30px 5% 0 5%;
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
}
@media screen and (max-width: 667px) {
  .date_max {
    display: none;
  }
  .date_min {
    display: block;
  }
  .sort_by {
    margin: 0 0 12px 0;
    height: 42px;
    h4 {
      font-size: 12px;
    }
  }
  a.button {
    font-size: 12px;
    margin: 4px auto;
    padding: 6px;
    height: 32px;
    line-height: 1.6;
    i {
      margin-left: 4px;
    }
  }
  .body_content {
    width: 90% !important;
    margin: 30px 5% 0 5%;
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
  .sort_by {
    h4 {
      display: none !important;
    }
  }
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
  a.btnReset {
    span {
      display: none;
    }
    i {
      margin: auto;
    }
  }
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


