<template>
  <div class="body_content" v-if="$route.path == '/userProducts'">
    <div class="detail_header">
      <h2>Мои продукты</h2>
      <a class="text_right" v-on:click="do_change=false" v-if="do_change">
        <i class="fas fa-times-circle"></i>
        <span>Отменить</span>
      </a>
      <a class="text_right" v-on:click="do_change=true" v-else>
        <i class="fas fa-sliders-h"></i>
        <span>Изменить</span>
      </a>
    </div>
    <div class="alert_change" v-if="show_change">
      <span>Данные успешно изменены</span>
    </div>
    <div class="detail no_product" v-if="!products">
      <i class="fas fa-archive"></i>
      <h2>
        Здесь мы можете посмотреть список своих товаров.
        <span
          @click="$router.push({path: '/addProduct'})"
        >Добавтье препарат</span> чтобы совершать продажы.
      </h2>
    </div>
    <div class="detail" v-if="products">
      <div class="product_cart" v-for="product in products">
        <div class="section_image">
          <img v-if="product.photos.length" :src="product.photo_url" class="image">
          <img
            v-else
            src="https://pypik.ru/uploads/posts/2018-09/1536907413_foto-net-no-ya-krasivaya-4.jpg"
            class="image"
          >
        </div>

        <div class="section_text">
          <div class="text_body">
            <div class="text_top" href="#" @click="$router.push({path: '/single_product'})">
              <h2>{{product.name}}</h2>
              <h4>{{product.manufacturer}}</h4>
            </div>
            <div class="text_bottom">
              <h4>{{product.amount}} шт.</h4>
            </div>
            <div class="product_features">
              <div class="discount">
                <i class="fas fa-tags"></i>
                <span>-10%</span>
              </div>
              <div class="access">
                <i class="fas fa-check-square"></i>
                <span>В наличии</span>
              </div>
              <div class="shipping">
                <i class="fas fa-truck"></i>
                <span>Бесплатная доставка</span>
              </div>
            </div>
          </div>
          <div class="product_counter">
            <h4>{{product_final_price}} тг.</h4>
            <div class="do_change" v-if="do_change">
              <div class="edit" @click="getLocality(product)">
                <span>Изменить</span>
                <i class="fas fa-edit"></i>
              </div>
              <div class="remove">
                <span @click="Remove(product.id)">Удалить</span>
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, del } from "../helpers/api";

export default {
  data() {
    return {
      show_change: false,
      do_change: false,
      categories: "",
      icon: {
        clicked: false
      },
      products: "",
      enable: true,
      images: "",
      product_final_price: "",
      user_place: "",
      user_region: "",
      chosen_product: ""
    };
  },
  methods: {
    getList() {
      let _this = this;
      get(
        this,
        "/api/products",
        {
          params: {
            user_id: _this.$root.user.data ? _this.$root.user.data.id : ""
            // page
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
    Remove(id) {
      let _this = this;
      console.log(id);
      if (confirm("Are You Sure?")) {
        del(
          this,
          "api/products",
          {
            params: {
              id: id
            }
          },
          function(response) {
            console.log(response);
            console.log("deleted");
            _this.getList();
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
    saveChange: function() {
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
    },
    assigning() {
      if (this.user_place.length === 2) {
        this.$root.user_region = this.user_place[1];
        this.$root.user_locality = this.user_place[0];
      } else {
        this.$root.user_locality = this.user_place[0];
        this.$root.user_district = this.user_place[1];
        this.$root.user_region = this.user_place[2];
      }
      this.$emit("send-product", this.chosen_product);
      // this.$emit("send-region", this.user_region);
      // this.$emit("send-district", this.user_district);
      // this.$emit("send-locality", this.user_locality);
      // this.$router.push({ path: "/addProduct" });
    },
    getLocality(product) {
      console.log("get users locality called");
      let _this = this;
      get(
        this,
        "/api/locality",
        {
          params: {
            locality_id: _this.$root.user
              ? _this.$root.user.data.locality_id
              : ""
          }
        },
        function(response) {
          _this.user_place = response.data;
          _this.chosen_product = product;
          _this.assigning();
          _this.$router.push({ path: "/addProduct" });
        },
        function(error) {
          console.log("got error", error);
        }
      );
    }
  },
  watch: {
    userId: function() {
      this.getList();
      this.enable = false;
    }
  },
  computed: {
    userId() {
      return this.$root.user ? this.$root.user.data.id : "";
    }
  },
  created() {
    (this.enable ? this.enable : "") ? this.getList() : "";
  },
  mounted() {
    (this.enable ? this.enable : "") ? this.getList() : "";
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
  flex-direction: column;
  flex-wrap: wrap;
  width: 72%;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  padding: 20px 40px 40px 40px;
  margin-bottom: 100px;
}
.product_cart {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
  height: 240px;
  background-color: #fff;
  border-top: 1px solid rgb(22, 127, 146, 0.2);
  width: 100%;
}
.product_cart:first-of-type {
  border-top: none;
}
.section_image {
  width: 26%;
  margin: auto;
  padding-left: 2%;
  height: 240px;
}
.image {
  width: 180px;
  height: 180px;
  margin: auto;
  margin-top: 20px;
}
.detail_header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 60px;
  padding: 10px;
  h2 {
    font-family: montserrat;
    font-size: 20px;
    padding-left: 50px;
    width: 70%;
    line-height: 30px;
  }
  .text_right {
    width: 30%;
    padding-right: 50px;
    cursor: pointer;
    color: #a6a6a6;
    line-height: 30px;
    font-family: montserrat;
    text-align: right;
  }
  .text_right:hover {
    color: #808080;
  }
}
.section_text {
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.text_body {
  width: 74%;
  padding-left: 4%;
  height: 240px;
}
.product_counter {
  width: 26%;
  height: 240px;
  h4 {
    margin: 10px auto auto 20px;
    font-family: montserrat;
  }
  .do_change {
    width: 100px;
    margin-top: 120px;
    height: 60px;
    .edit {
      width: 100%;
      color: #fff;
      background-color: #ff8c1a;
      border-radius: 3px;
      padding: 2px;
      cursor: pointer;
      opacity: 0.5;
      span {
        font-size: 12px;
        margin: 0 auto 0 6px;
        font-family: montserrat;
      }
      i {
        font-size: 12px;
        margin-left: 6px;
      }
    }
    .edit:hover {
      opacity: 1;
    }
    .remove {
      width: 100%;
      color: #fff;
      background-color: #ff6666;
      border-radius: 3px;
      padding: 2px;
      cursor: pointer;
      opacity: 0.5;
      margin: 6px 0 0 0;
      span {
        font-size: 12px;
        font-family: montserrat;
        margin: 0 auto 0 12px;
      }
      i {
        font-size: 12px;
        margin-left: 6px;
      }
    }
    .remove:hover {
      opacity: 1;
    }
  }
}
.text_top {
  height: 60px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  h2 {
    font-size: 22px;
    font-family: montserrat;
  }
  h4 {
    font-size: 14px;
    font-family: montserrat;
  }
}
.text_bottom {
  display: flex;
  flex-direction: row;
  max-height: 37px;
  width: 30%;
  margin-top: 20px;
  .counter {
    width: 50px;
    text-align: center;
    height: 37px;
    border: 1px solid #167f92;
  }
  .up_count {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .down_count {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
}
.btn-info {
  color: #fff;
  background-color: #167f92;
  border-color: #167f92;
}
.btn-info:hover {
  color: #fff;
  background-color: #324b51;
  border-color: #324b51;
}
.btn-info:focus {
  color: #fff;
  background-color: #324b51;
  border-color: #324b51;
}
.product_features {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .discount {
    margin-top: 10px;
    width: 72px;
    color: #fff;
    background-color: red;
    border-radius: 3px;
    margin-right: 10px;
  }
  .access {
    margin-top: 10px;
    width: 100px;
    color: #fff;
    background-color: #009933;
    border-radius: 3px;
    margin-right: 10px;
  }
  .shipping {
    margin-top: 10px;
    width: 180px;
    color: #fff;
    background-color: orange;
    border-radius: 3px;
    height: 25px;
  }
  i {
    font-size: 14px;
    margin: 6px 5px auto 5px;
  }
  span {
    font-size: 14px;
    margin: 6px 5px auto 0;
  }
}
.result_cart {
  border-top: 1px solid rgb(22, 127, 146, 0.8);
  height: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .text {
    display: flex;
    flex-direction: row;
    height: 80px;
    h2 {
      font-size: 1.35rem;
      margin: auto;
      margin-left: 30px;
      font-family: montserrat;
    }
    h2:last-of-type {
      margin: auto;
      margin-right: 10%;
    }
  }
  .result_submit {
    margin: auto;
    margin-right: 30px;
    background-color: #167f92;
    border-radius: 3px;
    padding: 5px 15px;
    cursor: pointer;
    a {
      font-size: 1.35rem;
      margin: auto 5px auto 5px;
      color: #fff;
      font-family: montserrat;
    }
    a:hover {
      text-decoration: none;
    }
  }
  .result_submit:hover {
    background-color: #324b51;
  }
}
@media screen and (max-width: 1224px) {
  .body_content {
    padding: 20px 30px 30px 30px;
  }
  .product_cart {
    height: 220px;
  }
  .section_image {
    width: 22%;
    margin: auto;
    padding-left: 0 !important;
    height: 220px;
  }
  .image {
    width: 160px;
    height: 160px;
  }
  .section_text {
    height: 220px;
    width: 64%;
    margin-left: 5%;
    .text_body {
      width: 72%;
    }
    .text_top {
      height: 60px;
      h2 {
        font-size: 18px;
      }
      h4 {
        font-size: 13px;
      }
    }
    .product_counter {
      width: 28%;
      h4 {
        margin: auto;
        margin-left: 20px;
        font-size: 18px;
      }
    }
  }
  .text_bottom {
    max-height: 32px !important;
    width: 28% !important;
    .counter {
      width: 42px !important;
      height: 32px !important;
    }
  }
  .result_cart {
    height: 100px !important;
    .text {
      height: 70px !important;
      h2 {
        font-size: 18px !important;
      }
      h2:last-of-type {
        margin-right: 10%;
      }
    }
    .result_submit {
      margin-right: 26px;
      padding: 4px 14px;
      a {
        font-size: 18px !important;
      }
    }
  }
  .product_counter {
    height: 220px;
    margin-top: 10px;
    .do_change {
      width: 100px;
      margin-top: 100px;
    }
  }
  .product_features {
    .discount {
      margin-top: 8px;
      width: 72px;
    }
    .access {
      margin-top: 8px;
      width: 100px;
    }
    .shipping {
      margin-top: 6px;
      width: 170px;
    }
    i {
      font-size: 13px;
    }
    span {
      font-size: 13px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .body_content {
    width: 100%;
    padding: 20px 40px 40px 40px;
    margin-bottom: 50px;
  }
  .detail_header {
    h2 {
      font-size: 18px;
      padding-left: 40px !important;
      width: 68%;
    }
    .text_right {
      width: 32%;
      padding-right: 30px;
      i {
        font-size: 13px !important;
      }
      span {
        font-size: 13px !important;
      }
    }
  }
  .section_image {
    width: 24%;
    margin: auto;
    margin-left: 0;
    padding-left: 0 !important;
  }
  .section_text {
    width: 68%;
    margin-left: 8%;
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 70px;
      margin-right: 6px;
      height: 24px;
    }
    .access {
      margin-top: 6px;
      width: 90px;
      margin-right: 6px;
      height: 24px;
    }
    .shipping {
      margin-top: 6px;
      width: 170px;
      height: 24px;
    }
    i {
      font-size: 13px;
      margin: auto 4px auto 4px;
    }
    span {
      font-size: 13px;
      margin: auto 4px auto 0;
    }
  }
}
@media screen and (max-width: 802px) {
  .product_cart {
    height: 200px;
  }
  .section_text {
    height: 200px;
  }
  .text_bottom {
    width: 36px !important;
    margin-top: 0;
    input {
      font-size: 14px;
    }
  }
  .detail_header {
    h2 {
      font-size: 14px;
      padding-left: 36px !important;
      width: 72%;
    }
    .text_right {
      width: 28%;
      padding-right: 20px;
      i {
        font-size: 11px !important;
      }
      span {
        font-size: 11px !important;
      }
    }
  }
  .section_image {
    width: 20%;
    margin: auto;
    margin-left: 0;
    padding-left: 0 !important;
    height: 200px;
  }
  .image {
    width: 130px;
    height: 130px;
  }
  .section_text {
    .text_top {
      height: 72px;
      h2 {
        font-size: 16px;
      }
      h4 {
        font-size: 12px;
      }
    }
    .product_counter {
      height: 200px;
      h4 {
        margin: auto;
        margin-left: 18px;
        font-size: 16px;
      }
      .do_change {
        width: 100px;
        margin-top: 80px;
      }
    }
  }
  .result_cart {
    height: 100px !important;
    .text {
      height: 70px !important;
      h2 {
        font-size: 16px !important;
      }
      h2:last-of-type {
        margin-right: 10%;
      }
    }
    .result_submit {
      margin-right: 26px;
      padding: 4px 14px;
      a {
        font-size: 16px !important;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 60px;
      margin-right: 6px;
    }
    .access {
      margin-top: 6px;
      width: 82px;
      margin-right: 6px;
    }
    .shipping {
      margin-top: 6px;
      width: 140px;
      height: 24px;
    }
    i {
      font-size: 11px;
      margin: 0 4px !important;
    }
    span {
      font-size: 11px;
      margin: 0 4px 0 0 !important;
    }
  }
}
@media screen and (max-width: 667px) {
  .body_content {
    padding: 8px 12px 20px 12px;
  }
  .product_cart {
    height: 180px;
  }
  .detail_header {
    height: 54px;
    padding: 6px;
    h2 {
      font-size: 14px;
      padding-left: 26px !important;
      width: 64%;
    }
    .text_right {
      width: 36%;
      padding-right: 18px;
      i {
        font-size: 11px !important;
      }
      span {
        font-size: 11px !important;
      }
    }
  }
  .section_text {
    margin-left: 2%;
    width: 82%;
    height: 180px;
  }
  .text_bottom {
    width: 32px !important;
    margin-top: 8px;
    input {
      font-size: 12px;
    }
  }
  .section_image {
    width: 14%;
    margin: auto;
    margin-left: 0;
    padding-left: 0 !important;
    height: 180px;
  }
  .image {
    width: 60px;
    height: 60px;
  }
  .section_text {
    .text_top {
      margin-top: 6px;
      height: 64px;
      h2 {
        font-size: 14px;
      }
      h4 {
        font-size: 11px;
      }
    }
    .product_counter {
      height: 180px;
      h4 {
        margin: auto;
        margin-left: 18px;
        font-size: 14px;
      }
      .do_change {
        width: 80px;
        margin-top: 80px;
        .edit {
          padding: 0 2px;
          span {
            font-size: 11px;
            margin: 0 auto 0 2px;
          }
          i {
            font-size: 11px;
            margin-left: 3px;
          }
        }
        .remove {
          padding: 0 2px;
          margin: 6px 0 0 0;
          span {
            font-size: 11px;
            margin: 0 auto 0 6px;
          }
          i {
            font-size: 11px;
            margin-left: 3px;
          }
        }
      }
    }
  }
  .result_cart {
    height: 100px !important;
    .text {
      height: 70px !important;
      h2 {
        font-size: 14px !important;
      }
      h2:last-of-type {
        margin-right: 10%;
      }
    }
    .result_submit {
      margin-right: 26px;
      padding: 3px 10px;
      a {
        font-size: 14px !important;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 54px;
      margin-right: 6px;
      height: 20px;
      line-height: 18px;
    }
    .access {
      margin-top: 6px;
      width: 80px;
      margin-right: 6px;
      height: 20px;
      line-height: 18px;
    }
    .shipping {
      margin-top: 6px;
      width: 140px;
      height: 20px;
      line-height: 18px;
    }
    i {
      font-size: 11px;
      margin: 0 4px !important;
    }
    span {
      font-size: 11px;
      margin: 0 4px 0 0 !important;
    }
  }
}
@media screen and (max-width: 420px) {
  .body_content {
    padding: 8px 12px;
  }
  .product_cart {
    height: 180px;
    padding: 0;
  }
  .detail_header {
    h2 {
      font-size: 13px;
      padding-left: 26px !important;
      width: 64%;
    }
    .text_right {
      width: 36%;
      padding-right: 18px;
      i {
        font-size: 10px !important;
      }
      span {
        font-size: 10px !important;
      }
    }
  }
  .section_text {
    margin-left: 2%;
    width: 76%;
    height: 180px;
  }
  .text_bottom {
    width: 26px !important;
    margin-top: 8px;
    input {
      font-size: 12px;
    }
  }
  .section_image {
    width: 14%;
    margin: auto;
    margin-left: 0;
    padding-left: 0 !important;
    height: 180px;
  }
  .image {
    width: 60px;
    height: 60px;
  }
  .section_text {
    width: 72%;
    .text_top {
      margin-top: 6px;
      height: 64px;
      h2 {
        font-size: 12px;
      }
      h4 {
        font-size: 10px;
      }
    }
    .product_counter {
      width: 28%;
      height: 180px;
      h4 {
        margin: auto;
        margin-left: 0;
        font-size: 12px;
      }
      .do_change {
        width: 62px;
        margin-top: 90px;
        .edit {
          span {
            font-size: 10px;
            margin: 0 auto 0 2px;
          }
          i {
            display: none;
          }
        }
        .remove {
          span {
            font-size: 10px;
            margin: 0 auto 0 6px;
          }
          i {
            display: none;
          }
        }
      }
    }
  }
  .result_cart {
    height: 84px !important;
    .text {
      height: 48px !important;
      h2 {
        font-size: 12px !important;
        margin: 14px;
      }
      h2:last-of-type {
        margin: 14px;
        margin-right: 0;
      }
    }
    .result_submit {
      margin-right: 8px;
      padding: 3px 8px;
      a {
        font-size: 12px !important;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 34px;
      margin-right: 6px;
      height: 18px;
      line-height: 16px;
    }
    .access {
      margin-top: 6px;
      width: 60px;
      margin-right: 6px;
      height: 18px;
      line-height: 16px;
    }
    .shipping {
      margin-top: 6px;
      width: 112px;
      height: 18px;
      line-height: 16px;
    }
    i {
      font-size: 10px;
      margin: 0 4px !important;
      display: none;
    }
    span {
      font-size: 10px;
      margin: 0 4px 0 4px !important;
    }
  }
}
</style>

