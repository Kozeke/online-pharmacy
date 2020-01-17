<template>
  <div class="single_product_content" v-if="$route.path == '/single_product'">
    <div class="product_top">
      <div class="product_image">
        <div id="product">
          <img v-if="product.photos.length" class="image" :src="product.photos[0].url">
          <img v-else :src="image" class="image">
          <!-- <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide
              v-for="image in product.product.photo_url"
              :key="image.index"
              class="slide-img"
            >
              <img :src="image.link" alt>
            </swiper-slide>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
          </swiper>
          <!-- swiper2 Thumbs-->
          <!-- <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="image in product.images" :key="image.index" class="slide-img">
              <img :src="image.link" alt>
            </swiper-slide>
          </swiper>-->
        </div>
      </div>
      <div v-if="product" class="product_info">
        <div style="display:flex;flex-direction:row;">
          <h4>{{product.name}}</h4>
        </div>
        <button
          class="btn btn-primary"
          v-if="$root.user.data.isAdmin"
          @click="getLocality(product)"
        >Изменить</button>
        <table>
          <tr>
            <td style="font-weight: 550">Цена:</td>
            <td>{{product.price_with_discount}} тг.</td>
          </tr>
          <tr>
            <td style="font-weight: 550">Вес:</td>
            <td>100 г.</td>
          </tr>
          <tr>
            <td style="font-weight: 550">Категория:</td>
            <td>{{category}}</td>
          </tr>
          <tr>
            <td style="font-weight: 550">Производитель:</td>
            <td>{{product.manufacturer}}</td>
          </tr>
          <tr>
            <td style="font-weight: 550">Наличие:</td>
            <td v-if="product.count">{{product.count}}шт.</td>
            <td v-else>Нет в наличии</td>
          </tr>
        </table>
        <div class="product_features">
          <div v-if="product.discount_in_percent" class="discount">
            <i class="fas fa-tags"></i>
            <span>-{{product.discount_in_percent}}%</span>
          </div>
          <div v-if="product.count" class="access">
            <i class="fas fa-check-square"></i>
            <span>В наличии</span>
          </div>
          <div v-if="product.shipping" class="shipping">
            <i class="fas fa-truck"></i>
            <span>С доставкой</span>
          </div>
        </div>
        <div class="product_button">
          <a
            v-if="product.shipping"
            class="btn btn-sm shopping_cart"
            href="#"
            @click="updateCart(product.id,product.user_id)"
          >В корзину</a>
          <!-- <a
            v-if="product.shipping"
            class="btn btn-sm product_buy"
            href="#"
            @click="$router.push({path: '/register'})"
          >Купить</a>-->
        </div>
        <div @click="changeColor(product,product.id)" class="add_fav">
          <i class="fa fa-heart"></i>
          <p>Добавить в избранные</p>
        </div>
      </div>
    </div>
    <div class="product_mid">
      <table v-if="product.shipping">
        <td class="shipping_options">
          <tr class="mid_header">Способы оплаты</tr>
          <tr>
            <img
              src="https://cdn0.iconfinder.com/data/icons/flat-design-business-set-3/24/payment-method-visa-512.png"
            >Виза
          </tr>

          <tr>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Z0TzlLMH72LvBT15I39dVfp7XN0HoPfu8lQFdLKbZHTWEUB5"
            >Мастеркард
          </tr>
          <tr>
            <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678131-money-512.png">Наличкой
          </tr>
        </td>
        <td>
          <tr class="mid_header">Способы доставки</tr>
          <!-- <tr>
            <img src="http://sushi-life.com.ua/wp-content/uploads/2016/03/88937.jpg">Самовывоз
          </tr>-->
          <tr>
            <img
              src="https://cdn0.iconfinder.com/data/icons/flat-global-logistic-icons/48/15-512.png"
            >Курьерская доставка
          </tr>
        </td>
        <td class="mid_header_bot">
          <tr class="mid_header">Условия возврата</tr>
          <tr>
            <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png">не более 14 дней
          </tr>
          <tr>
            <img src="https://cdn1.iconfinder.com/data/icons/folders-3/96/Box-Open-512.png">Товарный вид
          </tr>
          <tr>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCXSB9dtarV-cIysRxUX1po1TtGGhsw3sJ_Z0UNxO6a7eZEiuC"
            >Чек покупки
          </tr>
        </td>
        <td class="mid_header_bot">
          <tr class="mid_header">Регионы доставки</tr>
          <tr>
            <img src="https://img.icons8.com/ios/1600/country-filled.png">Нур-Султан, Алматы, Шымкент
          </tr>
        </td>
      </table>
    </div>
    <div class="product_bottom">
      <p>{{product.annotation}}</p>
      <button class="btn btn-success" @click="getOwner()">owner</button>
      <button class="btn btn-primary" @click="otherProducts()">other Prods</button>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { get, post, del } from "../../helpers/api";
import Swal from "sweetalert2";

export default {
  components: {
    swiper,
    Swal,

    swiperSlide
  },
  data() {
    return {
      product: this.$root ? this.$root.singleProduct : "",
      category: "",
      owner: "",
      other_products: "",
      error: ""
    };
  },
  methods: {
    getSingleProduct() {
      console.log("get single product called");
      let _this = this;
      get(
        this,
        "/api/singleProduct",
        {
          // params: {
          //   user_id: _this.$root.user ? _this.$root.user.data.id : ""
          // }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.product = response.data[0];
          _this.category = response.data[1];
          // _this.getCategoryName(_this.product.cat_id);
          // console.log(_this.products ? _this.products.length : "");
        },
        function(error) {
          console.log(error);
        }
      );
    },
    getOwner() {
      console.log("get owner product called");
      let _this = this;
      get(
        this,
        "/api/user",
        {
          params: {
            user_id: _this.product.user_id
          }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.owner = response.data;
        },
        function(error) {
          console.log(error);
        }
      );
    },
    otherProducts() {
      console.log("get single product called");
      let _this = this;
      get(
        this,
        "/api/user/products",
        {
          params: {
            user_id: _this.product.user_id
            // page
          }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.other_products = response.data;
        },
        function(error) {
          console.log(error);
        }
      );
    },
    assigning() {
      if (this.user_place.length === 4) {
        this.$root.user_region = this.user_place[2];
        this.$root.user_district = this.user_place[0];
        this.$root.user_locality = this.user_place[1];
      } else {
        this.$root.user_locality = this.user_place[0];
        this.$root.user_district = this.user_place[1];
        this.$root.user_region = this.user_place[2];
      }
      this.$root.chosen_product = this.product;
      // this.$emit("send-region", this.user_region);
      // this.$emit("send-district", this.user_district);
      // this.$emit("send-locality", this.user_locality);
      // this.$router.push({ path: "/addProduct" });
    },
    getLocality(product) {
      console.log("get products locality called");
      let _this = this;
      get(
        this,
        "/api/product/locality",
        {
          params: {
            locality_id: product.locality_id
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
    },

    updateCart(id, user_id) {
      if (this.$root.user) {
        console.log("post called");
        let _this = this;

        post(
          this,
          "/api/carts",
          {
            product_id: id,
            user_id: _this.$root.user.data.id,
            owner_id: user_id,
            count: 1,
            warned: _this.$root.warned
          },
          function(response) {
            console.log(response);
            _this.error = "";
            _this.$emit("cart-length");
            response.data == "warning"
              ? (_this.$root.warned = true) &&
                (async function acceptTermsAndConditions() {
                  const { value: accept } = await Swal.fire({
                    title: "<strong> <u>Предупреждение!</u></strong>",
                    type: "info",
                    input: "checkbox",
                    inputPlaceholder: "Я понял, больше не показывать",
                    html:
                      "Так как у лекарства которой вы добавили в корзину другой продовец," +
                      "за каждую добавленный продукт" +
                      " другого продовца за доставку " +
                      "  будет добавляться<strong> 1000 тг</strong>" +
                      '<a href="//github.com">Подробнее</a> ',

                    showCancelButton: false,
                    focusConfirm: false
                  });
                  if (accept) {
                    _this.$root.warned = true;
                  }
                })()
              : "";
            response.data[0] == "warning but others have"
              ? (_this.$root.warned = true) &&
                Swal.fire({
                  title: "<strong> <u>Предупреждение!</u></strong>",

                  type: "question",
                  html:
                    "Так как у лекарства которой вы добавили другой продовец," +
                    "за каждую добавленный продукт" +
                    " другого продовца за доставку будет добавляться <strong>1000 тг</strong>" +
                    " Но, похожее лекарство имеется у продавца чье лекарство вы уже добавлили в корзину  " +
                    '<a href="//github.com">Подробнее</a> ',
                  showCloseButton: true,
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  focusConfirm: true,
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Отлично, посмотреть!',
                  confirmButtonAriaLabel: "Посмотреть!"
                }).then(result => {
                  if (result.value) {
                    _this.singleProduct(
                      response.data[1][0].id,
                      response.data[1][0].cat_id
                    );
                  }
                })
              : "";
          },
          function(error) {
            if (error.response.data == "equal") {
              Swal.fire({
                type: "error",
                title: "",
                text: "Это лекарство уже добавлено!"
                // footer: "<a href>Why do I have this issue?</a>"
              });
            }
            console.log(error.response.data);
            _this.formSending = false;
            _this.errors = error.response.data.error;
          }
        );
      } else {
        Swal.fire({
          type: "error",
          title: "",
          text:
            "Чтобы добавить лекарства в корзину вы должны войти или зарегистрироваться!"
          // footer: "<a href>Why do I have this issue?</a>"
        });
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
              _this.getSingleProduct();
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
    },
    substruct() {
      this.amount--;
      if (this.amount < 1) {
        this.amount = 1;
      }
    },
    getCategoryName(cat_id) {
      let _this = this;
      get(
        this,
        "/api/category",
        {
          params: {
            cat_id: cat_id
          }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.product.category = response.data;

          // console.log(_this.products ? _this.products.length : "");
        },
        function(error) {
          console.log(error);
        }
      );
    }
  },
  watch: {
    user_id: function(val, oldVal) {
      this.getSingleProduct();
    }
  },
  computed: {
    product_total_price: function() {
      return this.product_price * this.count;
    },
    user_id: function() {
      return this.$root.user.data ? this.$root.user.data.id : "";
    },
    image() {
      return window.location.origin + "/storage/product_photos/netphoto.png";
    }
  },
  mounted() {
    this.getSingleProduct();
  }
  //     this.$nextTick(() => {
  //       const swiperTop = this.$refs.swiperTop.swiper;
  //       const swiperThumbs = this.$refs.swiperThumbs.swiper;
  //       swiperTop.controller.control = swiperThumbs;
  //       swiperThumbs.controller.control = swiperTop;
  //     });
  //   }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.gallery-top {
  height: 64%;
  width: 80%;
}
.gallery-thumbs {
  height: 20%;
  width: 80%;
}
.gallery-thumbs .swiper-slide {
  width: 100px;
  height: 100px;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
img {
  width: inherit;
  height: inherit;
}
.swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' fill='#E78127'/></svg>") !important;
}

.swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' fill='#E78127'/></svg>") !important;
}
#product {
  width: 100%;
}
.single_product_content {
  width: 72%;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  border-radius: 3px;
  height: 100%;
  margin-bottom: 100px;
}
.product_top {
  display: flex;
  flex-direction: row;
  padding: 2.5%;
}
.product_image {
  width: 340px;
}
.product_info {
  width: 70%;
  margin-left: 0;
  margin-top: 32px;
  h4 {
    font-size: 22px;
    font-family: montserrat;
    padding-left: 12px;
    font-weight: 550;
  }
  table {
    margin-top: 8px;
    width: 100%;
    font-size: 14px;
    font-family: montserrat;
    td {
      padding: 4px 8px 4px 0px;
    }
  }
}
.btn-info {
  color: #fff;
  background-color: #009933;
  border-color: #009933;
}
.btn-info:hover {
  color: #fff;
  background-color: red;
  border-color: #009933;
}
.product_features {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .discount {
    margin-top: 10px;
    width: 80px;
    color: #fff;
    background-color: red;
    border-radius: 3px;
    margin-right: 10px;
    height: 26px;
  }
  .access {
    margin-top: 10px;
    width: 120px;
    color: #fff;
    background-color: #009933;
    border-radius: 3px;
    margin-right: 10px;
    height: 26px;
  }
  .shipping {
    margin-top: 10px;
    width: 210px;
    color: #fff;
    background-color: orange;
    border-radius: 3px;
    height: 26px;
  }
  i {
    font-size: 16px;
    padding: 5px 0 0 5px;
  }
  span {
    font-size: 16px;
    padding: 6px;
  }
}
.product_button {
  display: flex;
  flex-direction: row;
  a {
    font-size: 18px;
    font-family: montserrat;
  }
  .shopping_cart {
    background-color: green;
    color: #fff;
    border-radius: 6px;
    padding: 4px 8px;
    margin: 12px 12px 0 0px;
    font-family: montserrat;
    cursor: pointer;
  }
  .shopping_cart:hover {
    background-color: #0059b3;
  }
  .product_buy {
    background-color: #0059b3;
    color: #fff;
    border-radius: 6px;
    padding: 4px 8px;
    margin: 12px 12px 0 12px;
    font-family: montserrat;
    cursor: pointer;
  }
  .product_buy:hover {
    background-color: #0059b3;
  }
}
.add_fav {
  height: 40px;
  color: green;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  i {
    margin: auto 10px auto 0;
    font-size: 16px;
  }
  p {
    margin: auto 10px auto 0;
    font-family: montserrat;
    font-size: 16px;
  }
}
.product_mid {
  margin: 2.5%;
  table {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    td {
      margin: 0px auto 0px auto;
      font-size: 14px;
      font-family: montserrat;
      width: 25%;
    }
    img {
      height: 36px;
      width: 36px;
      margin-right: 6px;
    }
  }
}
.product_bottom {
  padding: 2.5%;
  font-family: montserrat;
  h2 {
    text-align: center;
    font-size: 22px;
    font-weight: 550;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
  }
}
@media screen and (min-width: 1650px) {
  .product_image {
    width: 470px;
  }
  .product_info {
    width: 70%;
    margin-top: 42px;
    h4 {
      font-size: 24px;
    }
    table {
      margin-top: 16px;
      font-size: 18px;
      td {
        padding: 4px 8px 4px 0px;
      }
    }
  }
  .product_features {
    margin-top: 12px;
    .discount {
      margin-top: 12px;
      width: 105px;
      margin-right: 12px;
      height: 32px;
    }
    .access {
      margin-top: 12px;
      width: 140px;
      margin-right: 12px;
      height: 32px;
    }
    .shipping {
      margin-top: 12px;
      width: 240px;
      height: 32px;
    }
    i {
      font-size: 18px;
      padding: 6px 0 0 6px;
    }
    span {
      font-size: 18px;
      padding: 6px;
    }
  }
  .product_button {
    margin-top: 12px;
    a {
      font-size: 20px;
    }
    .shopping_cart {
      padding: 8px 16px;
      border-radius: 6px;
    }
    .product_buy {
      padding: 8px 16px;
      border-radius: 6px;
    }
  }
  .add_fav {
    margin-top: 8px;
    i {
      font-size: 16px;
    }
    p {
      font-size: 16px;
    }
  }
  .product_mid {
    margin-top: 24px;
    margin: 2.5%;
    table {
      display: flex;
      flex-direction: row;
      td {
        margin: 0px auto 0px auto;
        font-size: 18px;
      }
      img {
        height: 54px;
        width: 54px;
        margin-right: 6px;
      }
    }
  }
  .product_bottom {
    padding: 2.5%;
    h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 550;
      margin-bottom: 12px;
    }
    p {
      font-size: 18px;
    }
  }
}
@media screen and (min-width: 2000px) {
  .product_image {
    width: 500px !important;
  }
  .product_info {
    width: 80% !important;
    margin-left: 10% !important;
  }
}
@media screen and (max-width: 1224px) {
  .product_image {
    width: 280px;
  }
  .product_info {
    margin-top: 24px;
    h4 {
      font-size: 18px;
    }
    table {
      margin-top: 8px;
      font-size: 14px;
      td {
        padding: 3px 6px 3px 0px;
      }
    }
  }
  .product_features {
    margin-top: 0px;
    .discount {
      margin-top: 8px;
      width: 70px;
      margin-right: 8px;
      height: 24px;
    }
    .access {
      margin-top: 8px;
      width: 100px;
      margin-right: 8px;
      height: 24px;
    }
    .shipping {
      margin-top: 8px;
      width: 180px;
      height: 24px;
    }
    i {
      font-size: 14px;
      padding: 4px 0 0 4px;
    }
    span {
      font-size: 14px;
      padding: 4px;
    }
  }
  .product_button {
    margin-top: 6px !important;
    a {
      font-size: 16px;
    }
    .shopping_cart {
      padding: 4px 10px;
      border-radius: 6px;
    }
    .product_buy {
      padding: 4px 10px;
      border-radius: 6px;
    }
  }
  .add_fav {
    margin-top: 0px !important;
    i {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
  }
  .product_mid {
    margin-top: 0px !important;
    margin: 2.5%;
    table {
      display: flex;
      flex-direction: row;
      td {
        margin: 0px auto 0px auto;
        font-size: 14px;
      }
      img {
        height: 24px;
        width: 24px;
        margin-right: 4px;
      }
    }
  }
  .product_bottom {
    padding: 2.5%;
    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: 550;
      margin-bottom: 12px;
    }
    p {
      font-size: 14px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .single_product_content {
    width: 100%;
    border-radius: 3px;
    height: 100%;
    margin-bottom: 100px;
  }
}
@media screen and (max-width: 848px) {
  .gallery-thumbs .swiper-slide {
    width: 80px;
    height: 80px;
    opacity: 0.4;
  }
  .product_image {
    width: 240px;
  }
  .product_info {
    margin-top: 16px;
    h4 {
      font-size: 16px;
    }
    table {
      margin-top: 6px;
      font-size: 12px;
      td {
        padding: 2px 4px 2px 0px;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 60px;
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
      width: 160px;
      height: 24px;
    }
    i {
      font-size: 12px;
      padding: 4px 0 0 4px;
    }
    span {
      font-size: 12px;
      padding: 4px;
    }
  }
  .product_button {
    margin-top: 4px !important;
    a {
      font-size: 14px;
    }
    .shopping_cart {
      padding: 3px 6px;
      border-radius: 3px;
    }
    .product_buy {
      padding: 3px 6px;
      border-radius: 3px;
    }
  }
  .add_fav {
    margin-top: 0px !important;
    i {
      font-size: 12px;
    }
    p {
      font-size: 12px;
    }
  }
  .product_mid {
    margin-top: 0px !important;
    margin: 2.5%;
    table {
      td {
        font-size: 12px;
      }
      img {
        height: 16px;
        width: 16px;
        margin-right: 2px;
      }
    }
  }
  .product_bottom {
    padding: 2.5%;
    h2 {
      text-align: center;
      font-size: 16px;
      font-weight: 550;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
    }
  }
}
@media screen and (max-width: 667px) {
  * {
    line-height: 1;
  }
  .single_product_content {
    margin-bottom: 50px;
  }
  .gallery-thumbs .swiper-slide {
    width: 60px;
    height: 60px;
    opacity: 0.4;
  }
  .product_image {
    width: 200px;
  }
  .product_info {
    margin-top: 16px;
    h4 {
      font-size: 14px;
    }
    table {
      margin-top: 6px;
      font-size: 10px;
      td {
        padding: 4px 6px 4px 0px;
        line-height: 14px;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 56px;
      margin-right: 6px;
      height: 20px;
    }
    .access {
      margin-top: 6px;
      width: 80px;
      margin-right: 6px;
      height: 20px;
    }
    .shipping {
      margin-top: 6px;
      width: 140px;
      height: 20px;
    }
    i {
      font-size: 10px;
      padding: 4px 0 0 4px;
    }
    span {
      font-size: 10px;
      padding: 4px;
    }
  }
  .product_button {
    margin-top: 12px !important;
    a {
      font-size: 12px;
    }
    .shopping_cart {
      padding: 6px 8px;
      border-radius: 3px;
      margin: auto 8px auto 0;
    }
    .product_buy {
      padding: 6px 8px;
      border-radius: 3px;
      margin: auto 8px auto 0;
    }
  }
  .add_fav {
    margin-top: 6px !important;
    i {
      font-size: 10px;
      margin: 0 4px auto 0;
    }
    p {
      font-size: 10px;
      margin: 0 4px auto 0;
    }
  }
  .product_mid {
    margin-top: 0px !important;
    margin: 2.5%;
    table {
      td {
        font-size: 10px;
        tr {
          line-height: 18px;
        }
      }
      img {
        height: 16px;
        width: 16px;
        margin-right: 2px;
      }
    }
  }
  .product_bottom {
    padding: 2.5%;
    h2 {
      text-align: center;
      font-size: 14px;
      font-weight: 550;
      margin-bottom: 8px;
    }
    p {
      font-size: 10px;
      line-height: 16px;
    }
  }
}
@media screen and (max-width: 546px) {
  .single_product_content {
    margin-bottom: 50px;
  }
  .product_top {
    flex-direction: column;
    flex-wrap: wrap;
  }
  .product_image {
    width: 80%;
    margin: 0 10%;
  }
  .gallery-top {
    height: 220px !important;
    width: 100%;
  }
  .gallery-thumbs .swiper-slide {
    width: 60px;
    height: 60px;
    opacity: 0.4;
  }
  .product_info {
    width: 90%;
    margin: 16px 5% 0 5%;
    h4 {
      font-size: 14px;
      text-align: center;
    }
    table {
      margin-top: 6px;
      font-size: 10px;
      td {
        padding: 4px 6px 4px 0px;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 56px;
      margin-right: 6px;
      height: 20px;
    }
    .access {
      margin-top: 6px;
      width: 80px;
      margin-right: 6px;
      height: 20px;
    }
    .shipping {
      margin-top: 6px;
      width: 140px;
      height: 20px;
    }
    i {
      font-size: 10px;
      padding: 4px 0 0 4px;
    }
    span {
      font-size: 10px;
      padding: 4px;
    }
  }
  .product_button {
    margin-top: 12px !important;
    a {
      font-size: 12px;
    }
    .shopping_cart {
      padding: 6px 8px;
      border-radius: 3px;
      margin: auto 8px auto 0;
    }
    .product_buy {
      padding: 6px 8px;
      border-radius: 3px;
      margin: auto 8px auto 0;
    }
  }
  .add_fav {
    margin-top: 6px !important;
    height: 16px;
    i {
      font-size: 10px;
      margin: 0 4px auto 0;
    }
    p {
      font-size: 10px;
      margin: 0 4px auto 0;
    }
  }
  .product_mid {
    margin-top: 0px !important;
    margin: 5%;
    .mid_header_bot {
      margin-top: 12px;
    }
    table {
      td {
        font-size: 10px;
        width: 50% !important;
        tr {
          line-height: 18px;
        }
      }
      img {
        height: 16px;
        width: 16px;
        margin-right: 2px;
      }
    }
  }
  .product_bottom {
    padding: 5%;
    h2 {
      text-align: center;
      font-size: 14px;
      font-weight: 550;
      margin-bottom: 8px;
    }
    p {
      font-size: 10px;
      line-height: 16px;
    }
  }
}
@media screen and (max-width: 421px) {
  .product_top {
    flex-direction: column;
    flex-wrap: wrap;
  }
  .product_image {
    width: 80%;
    margin: 0 10%;
  }
  .gallery-top {
    height: 160px !important;
    width: 100%;
  }
  .gallery-thumbs .swiper-slide {
    width: 40px;
    height: 40px;
    opacity: 0.4;
  }
  .product_info {
    width: 90%;
    margin: 16px 5% 0 5%;
    h4 {
      font-size: 14px;
      text-align: center;
    }
    table {
      margin-top: 6px;
      font-size: 10px;
      td {
        padding: 4px 6px 4px 0px;
      }
    }
  }
  .product_features {
    .discount {
      margin-top: 6px;
      width: 56px;
      margin-right: 6px;
      height: 20px;
    }
    .access {
      margin-top: 6px;
      width: 80px;
      margin-right: 6px;
      height: 20px;
    }
    .shipping {
      margin-top: 6px;
      width: 140px;
      height: 20px;
    }
    i {
      font-size: 10px;
      padding: 4px 0 0 4px;
    }
    span {
      font-size: 10px;
      padding: 4px;
    }
  }
  .product_button {
    margin-top: 12px !important;
    a {
      font-size: 12px;
    }
    .shopping_cart {
      padding: 6px 8px;
      border-radius: 3px;
      margin: auto 8px auto 0;
    }
    .product_buy {
      padding: 6px 8px;
      border-radius: 3px;
      margin: auto 8px auto 0;
    }
  }
  .add_fav {
    margin-top: 6px !important;
    height: 16px;
    i {
      font-size: 10px;
      margin: 0 4px auto 0;
    }
    p {
      font-size: 10px;
      margin: 0 4px auto 0;
    }
  }
  .product_mid {
    margin-top: 0px !important;
    margin: 5%;
    .mid_header_bot {
      margin-top: 12px;
    }
    table {
      td {
        font-size: 10px;
        width: 50% !important;
        tr {
          line-height: 18px;
        }
      }
      img {
        height: 16px;
        width: 16px;
        margin-right: 2px;
      }
    }
  }
  .product_bottom {
    padding: 5%;
    h2 {
      text-align: center;
      font-size: 14px;
      font-weight: 550;
      margin-bottom: 8px;
    }
    p {
      font-size: 10px;
      line-height: 16px;
    }
  }
}
</style>


