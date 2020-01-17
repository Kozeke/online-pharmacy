<template>
  <div class="body_content" v-if="$route.path == '/cart'">
    <div class="detail_header">
      <h2>Мои продукты</h2>
      <a class="text_right" v-on:click="do_change=false" v-if="do_change">
        <i class="fas fa-times-circle"></i>
        <span>Отменить</span>
      </a>
      <a class="text_right" v-on:click="do_change=true;$emit('cleaned-cart')" v-else>
        <i class="fas fa-trash-alt"></i>
        <span>Очистить</span>
      </a>
    </div>
    <div class="product_cart" v-for="product in products">
      <div class="section_image">
        <img v-if="product.product.photo_url" class="image" :src="product.product.photo_url">
        <img v-else :src="image" class="image">
      </div>
      <div class="section_text">
        <div class="text_body">
          <div class="text_top" href="#" @click="singleProduct(product.id,product.cat_id)">
            <h2>{{product.product.name}}</h2>
            <h4>{{product.product.manufacturer}}</h4>
          </div>
          <div class="text_bottom">
            <button class="down_count btn btn-info" v-on:click="substruct(index)">
              <i class="fas fa-minus"></i>
            </button>
            <input class="counter" type="text" v-model="product.count">
            <button class="up_count btn btn-info" v-on:click="increase(product)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="product_features">
            <div v-if="product.product.discount_in_percent" class="discount">
              <i class="fas fa-tags"></i>
              <span>-{{product.product.discount_in_percent}}%</span>
            </div>
            <div v-if="product.product.count" class="access">
              <i class="fas fa-check-square"></i>
              <span>В наличии</span>
            </div>
          </div>
        </div>
        <div class="product_counter">
          <h4>{{calculateTotal(product.product, product.count)}} тг.</h4>
          <div class="remove">
            <span @click="Remove(product.id)">Удалить</span>
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
      <div class="result_cart">
        <div class="text">
          <h2>Итого без учета доставки:</h2>
          <!-- <h2>{{productFinalPrice(product.product.price_initial)}}</h2> -->
          <h2 v-if="totalPrice">{{totalPrice?totalPrice:''}}</h2>
          <h2>Итого:</h2>
          <h2>{{forPayment}}</h2>
          <h4>Доставка:</h4>
          <h4>{{forDelivery}}</h4>
          <p>Почему столько вышло?</p>
        </div>
        <div class="result_submit">
          <a @click="Oformit()">Оформить заказ с доставкой</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post, del } from "../../helpers/api";
import Swal from "sweetalert2";

export default {
  components: {
    Swal
  },
  data() {
    return {
      do_change: false,
      categories: "",
      icon: {
        clicked: false
      },
      product_name: "",
      product_discount: "",
      product_price: "",
      product_final_price: 0,
      product_total_price: 0,
      images: [],
      product_price: "",
      count: 1,
      products: "",
      amount: "",
      registered: false,
      btn_disable: false,
      price: [],
      totalPrice: "",
      array: [],
      fixed_locality: 1,
      forDelivery: ""
    };
  },
  mounted() {},
  methods: {
    getCart() {
      console.log("get cart called");
      let _this = this;
      get(
        this,
        "/api/carts",
        {
          params: {
            user_id: _this.$root.user ? _this.$root.user.data.id : ""
          }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.products = response.data[0];
          _this.forDelivery = response.data[1];
          _this.array = response.data[2];
          _this.$emit(
            "updated-length",
            _this.products ? _this.products.length : ""
          );
          // console.log(_this.products ? _this.products.length : "");
        },
        function(error) {
          console.log(error);
        }
      );
    },
    changeColor(icon) {
      icon.clicked = !icon.clicked;
    },
    substruct(index) {
      if (this.products.product[index].count > 1) {
        this.products.product[index].count--;
      }
    },
    increase(product) {
      if (product.count < product.product.count) {
        product.count++;
        this.array.push(product.product.price_with_discount);
        // this.array += 1;
      }
    },
    buy() {
      this.$root.user.data
        ? (this.registered = true)
        : alert("Вы должны зарегистрироваться!"),
        this.$router.push({ name: "register" });
    },

    Oplatit() {},
    //check prikrepil li prodovec karty
    //esli net kurier mojet dostavit no ob oplate leakrstva dogovoritsia klientom
    //kak tolko dogovoritec daite nam znat chtobi vaw zakaz viwel v obrabotku
    Oformit() {
      this.$router.push({name:"Оформить заказ"});
    },
    Remove(id) {
      let _this = this;
      console.log(id);
      Swal.fire({
        title: "Предупреждение",
        text: "Вы уверены что хотите удалить препарат из корзины?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да!"
      }).then(result => {
        if (result.value) {
          del(
            this,
            "api/carts",
            {
              params: {
                id: id
              }
            },
            function(response) {
              console.log(response);
              console.log("deleted");
              _this.error = "";
              _this.$root.delete_cart += 1;

              _this.getCart();
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
    },
    calculateTotal(product, count) {
      if (count <= product.count) {
        product.price_initial = product.price_with_discount * count;
        return product.price_initial;
      }
    },

    overallPrice() {
      this.totalPrice = this.array.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  },
  watch: {
    user_id: function(val, oldVal) {
      this.getCart();
    },
    registered: function() {
      this.Oformit();
    },
    deleted: function(val, oldVal) {
      this.getCart();
    },
    array() {
      this.overallPrice();
    }
  },
  computed: {
    user_id: function() {
      return this.$root.user.data ? this.$root.user.data.id : "";
    },
    deleted: function() {
      return this.$root ? this.$root.deleted : "";
    },
    image() {
      return window.location.origin + "/storage/product_photos/netphoto.png";
    },
    forPayment() {
      return this.forDelivery + this.totalPrice;
    }
  },
  created() {
    this.getCart();
    // this.$emit("cart-length", this.products ? this.products.length : "");
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
  .remove {
    width: 100px;
    color: #fff;
    background-color: #ff6666;
    border-radius: 3px;
    margin-top: 140px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.5;
    span {
      font-size: 14px;
      margin: auto 5px auto 5px;
      font-family: montserrat;
    }
    i {
      font-size: 14px;
      margin: auto;
    }
  }
  .remove:hover {
    opacity: 1;
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
    .remove {
      width: 90px;
      margin-top: 130px;
      padding: 2px 4px;
      span {
        font-size: 13px;
      }
      i {
        font-size: 13px;
      }
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
      .remove {
        margin-top: 120px;
        i {
          font-size: 12px;
        }
        span {
          font-size: 12px;
        }
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
      .remove {
        margin-top: 100px;
        width: 80px;
        padding: 1px 3px;
        i {
          font-size: 11px;
        }
        span {
          font-size: 11px;
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
      .remove {
        margin-top: 110px;
        width: 68px;
        height: 27px;
        padding: 0;
        i {
          font-size: 10px;
        }
        span {
          font-size: 10px;
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

