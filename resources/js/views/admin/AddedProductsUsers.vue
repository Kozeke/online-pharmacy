<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Препараты пользователей</h3>

      <div class="card-tools">
        <div class="input-group input-group-sm" style="width: 150px;">
          <input
            type="text"
            name="table_search"
            class="form-control float-right"
            placeholder="Search"
          >

          <div class="input-group-append">
            <button type="submit" class="btn btn-default">
              <i class="fa fa-search"></i>
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="alert alert-success show_change" v-if="show_change">Изменения успешно сохранены!</div>
    <div class="card-body table-responsive p-0" v-if="single_product==false">
      <table class="table table-hover">
        <tbody>
          <tr>
            <th v-if="marked_products.length">
              <div class="mark_icon">
                <div class="mark_icon_ban" @click="market_products = []">
                  <i class="fas fa-ban"></i>
                </div>
                <div class="mark_icon_trash" @click="alert('Are u sure about this?')">
                  <i class="fas fa-trash-alt"></i>
                </div>
              </div>
            </th>
            <th v-else></th>
            <th>Номер</th>
            <th>Название</th>
            <th>Форма выпуска</th>
            <th>Категория</th>
            <th>Доставка</th>
            <th>Статус</th>
            <th>Изменения</th>
            <th></th>
          </tr>
          <tr @click="test(product);getUser(product.user_id)" v-for="product in products">
            <td>
              <input
                type="checkbox"
                :id="'product' + product.id"
                :value="product.id"
                v-model="marked_products"
              >
            </td>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.form}}</td>
            <td>{{product.category_name[0]}}</td>
            <td v-if="product.shipping">Да</td>
            <td v-if="!product.shipping">Нет</td>
            <td v-if="product.approved==1" class="user_success">
              <span>Принято</span>
            </td>
            <td v-if="product.approved==0" class="user_new">
              <span>Новое</span>
            </td>
            <td v-if="product.approved==2" class="user_fail">
              <span>Отказано</span>
            </td>
            <td v-if="product.change">Да</td>
            <td v-else>Нет</td>

            <td>
              <span @click="singleProduct(product.id,product.cat_id)">
                <i class="fa fa-edit"></i>
              </span>/
              <span @click="singleProduct(product.id,product.cat_id)">
                <i class="fa fa-trash red"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-body table-responsive p-0" v-if="single_product==true">
      <table class="table table-hover">
        <tbody>
          <tr>
            <td class="table_header">
              <div class="header_left">
                <div class="go_back">
                  <i class="fas fa-arrow-alt-circle-left" @click="single_product == false"></i>
                  <span>Информация о продавце</span>
                </div>
              </div>
            </td>
            <td class="table_header"></td>
          </tr>
          <tr>
            <td>Номер</td>
            <td>{{owner.id}}</td>
          </tr>
          <tr>
            <td>Имя</td>
            <td>{{owner.name}} {{owner.surname}}</td>
          </tr>
          <tr>
            <td>Телефон</td>
            <td>{{owner.phone}}</td>
          </tr>
          <tr>
            <td class="table_header">Информация о продукте</td>
            <td class="table_header">
              <div class="header_right">
                <div class="delete_change" v-if="!make_change" @click="make_change = false">
                  <span>Удалить</span>
                  <i class="fas fa-trash-alt"></i>
                </div>
                <div
                  class="save_change"
                  v-if="make_change"
                  @click="saveChange();make_change = false"
                >
                  <span>Сохранить</span>
                  <i class="fas fa-save"></i>
                </div>
                <div class="make_change" v-if="!make_change" @click="make_change = true">
                  <span>Изменить</span>
                  <i class="fa fa-edit"></i>
                </div>
                <div class="undo_change" v-if="make_change" @click="make_change = false">
                  <span>Отменить</span>
                  <i class="far fa-times-circle"></i>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="width: 40%;">Номер</td>
            <td v-if="!make_change">{{chosen_product.id}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Название</td>
            <td v-if="!make_change">{{chosen_product.name}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Форма выпуска</td>
            <td v-if="!make_change">{{chosen_product.form}}</td>
            <td v-else>
              <div>
                <select
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
                  <option disabled value>Выберите</option>
                  <option v-for="volume in volumes">Volume</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Категория</td>
            <td v-if="!make_change">{{chosen_product.category_name[0]}}</td>
            <td v-else>
              <div>
                <select
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
                  <option disabled value>Выберите</option>
                  <option v-for="category in categories" :value="category">Category</option>
                </select>
              </div>
            </td>
          </tr>

          <tr>
            <td>Форма выпуска</td>
            <td v-if="!make_change">{{chosen_product.form}}</td>
            <td v-else>
              <div>
                <select class="form-control" v-model="selected_form">
                  <option disabled value>Выберите</option>
                  <option v-for="form in forms">{{ form }}</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Дозировка</td>
            <td v-if="!make_change">{{chosen_product.dose}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Количество</td>
            <td v-if="!make_change">{{chosen_product.count}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Кл-во в</td>
            <td v-if="!make_change">{{chosen_product.volume}}</td>
            <td v-else>
              <div>
                <select
                  class="form-control"
                  v-model="selected_volume"
                  :class="{ 'red_border': errors && errors.count}"
                >
                  <option disabled value>Выберите</option>
                  <option v-for="volume in volumes">{{ volume }}</option>
                </select>
              </div>
            </td>
          </tr>

          <tr>
            <td>Срок годности</td>
            <td v-if="!make_change">{{chosen_product.expiration_date}}</td>
            <td v-else>
              <div>
                <masked-input
                  mask="11/1111"
                  placeholder="01/2019"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Производитель</td>
            <td v-if="!make_change">{{chosen_product.manufacturer}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Действующее вещество</td>
            <td v-if="!make_change">{{chosen_product.substance}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Краткое описание</td>
            <td v-if="!make_change">{{chosen_product.extra_field}}</td>
            <td v-else>
              <div>
                <textarea
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                ></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <td>Цена (тг)</td>
            <td v-if="!make_change">{{chosen_product.price_initial}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Наличие скидки</td>
            <td v-if="!make_change">{{chosen_product.product_discount_in_percent}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>Итого</td>
            <td v-if="!make_change">{{chosen_product.price_with_discount}}</td>
            <td v-else>
              <div>
                <input
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
              </div>
            </td>
          </tr>
          <tr v-if="chosen_product.locality">
            <td>Город</td>
            <td v-if="!make_change">{{chosen_product.locality.name}}</td>
            <td v-else>
              <div>
                <select
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
                  <option disabled value>Выберите</option>
                  <option v-for="category in categories" :value="category">Category</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_header">Информация о доставке</td>
            <td class="table_header">
              <div class="header_right">
                <div class="delete_change" v-if="!make_change" @click="make_change = false">
                  <span>Удалить</span>
                  <i class="fas fa-trash-alt"></i>
                </div>
                <div
                  class="save_change"
                  v-if="make_change"
                  @click="saveChange();make_change = false"
                >
                  <span>Сохранить</span>
                  <i class="fas fa-save"></i>
                </div>
                <div class="make_change" v-if="!make_change" @click="make_change = true">
                  <span>Изменить</span>
                  <i class="fa fa-edit"></i>
                </div>
                <div class="undo_change" v-if="make_change" @click="make_change = false">
                  <span>Отменить</span>
                  <i class="far fa-times-circle"></i>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Доставка</td>
            <td v-if="chosen_product.shipping && !make_change">Да</td>
            <td v-if="!chosen_product.shipping && !make_change">Нет</td>
            <td v-if="make_change">
              <div class="accept_radio">
                <div class="accept_choice">
                  <input type="radio" id="ship" value="Да" v-model="radio1">
                  <label for="ship">Да</label>
                </div>
                <div class="accept_choice">
                  <input type="radio" id="ships" value="Нет" v-model="radio1">
                  <label for="ships">Нет</label>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="!chosen_product.shipping">
            <td>Бесплатная доставка</td>
            <td v-if="chosen_product.shipping && chosen_product.free_shipping && !make_change">Да</td>
            <td v-if="!chosen_product.free_shipping && !make_change">Нет</td>
            <td v-if="make_change">
              <div class="accept_radio">
                <div class="accept_choice">
                  <input type="radio" id="free_ship" value="Да" v-model="radio2">
                  <label for="free_ship">Да</label>
                </div>
                <div class="accept_choice">
                  <input type="radio" id="free_ships" value="Нет" v-model="radio2">
                  <label for="free_ships">Нет</label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td>Адрес</td>
            <td v-if="!make_change">{{chosen_product.address}}</td>
            <td v-else>
              <div>
                <select
                  v-model="s"
                  class="form-control"
                  :class="{ 'false_error': !error, 'true_error': error}"
                  placeholder="200"
                >
                  <option disabled value>Выберите</option>
                  <option v-for="category in categories" :value="category">Category</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Доп. информация</td>
            <td v-if="!make_change">{{chosen_product.product_shipping_info}}</td>
            <td v-else>
              <div>
                <textarea v-model="s" class="form-control" placeholder="200"></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <td>Принять</td>
            <td>
              <div class="accept_radio">
                <div class="accept_choice">
                  <input type="radio" id="one" value="1" v-model="accept_product">
                  <label for="one">Да</label>
                </div>
                <div class="accept_choice">
                  <input type="radio" id="two" value="2" v-model="accept_product">
                  <label for="two">Нет</label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_header"></td>
            <td class="table_header">
              <div class="header_right">
                <!-- <div class="delete_change" v-if="!make_change" @click="make_change = false">
                  <span>Удалить</span>
                  <i class="fas fa-trash-alt"></i>
                </div>-->
                <div class="save_change" @click="Approve(chosen_product.id)">
                  <span>Сохранить</span>
                  <i class="fas fa-save"></i>
                </div>
                <!-- <div class="make_change" v-if="!make_change" @click="make_change = true">
                  <span>Изменить</span>
                  <i class="fa fa-edit"></i>
                </div>
                <div class="undo_change" v-if="make_change" @click="make_change = false">
                  <span>Отменить</span>
                  <i class="far fa-times-circle"></i>
                </div>-->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
  <!-- </div>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#AddNewCenter"
  >Launch demo modal</button>-->

  <!-- Modal -->
  <!-- <div
      class="modal fade"
      id="AddNewCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="AddNewCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddNewCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="createUser">
            <div class="modal-body">
              <div class="form-group">
                <label>Username</label>
                <input
                  placeholder="name"
                  v-model="form.name"
                  type="text"
                  name="username"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                >
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  placeholder="name"
                  v-model="form.email"
                  type="text"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                >
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                >
                <has-error :form="form" field="password"></has-error>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                >
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
  </div>-->
</template>
<script>
import { get, post, del } from "../../helpers/api";

import MaskedInput from "vue-masked-input";
import Paginate from "vuejs-paginate";
export default {
  components: {
    "masked-input": MaskedInput
  },
  data() {
    return {
      marked_products: [],
      single_product: false,
      owner: "",
      chosen_product: "",
      accept_product: "",
      radio1: "",
      radio2: "",
      radio3: "",
      make_change: false,
      show_change: false,
      error: false,
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
    Approve(id) {
      let _this = this;

      post(
        this,
        "/api/product/approve",
        { accept_product: _this.accept_product, id: id },
        function(response) {
          console.log(response);
          _this.single_product = false;
          _this.error = "";
          _this.chosen_product = "";
          _this.getListSpecific();
        },
        function(error) {
          _this.errors = error.response.data.error;
          console.log(error.response.data.error);
        }
      );
    },
    saveChange() {
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
      let _this = this;
    },
    test(product) {
      this.chosen_product = product;
    },
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
    getUser(id) {
      let _this = this;
      get(
        this,
        "/api/getOwner",
        {
          params: {
            user_id: id
          }
        },
        function(response) {
          _this.single_product = !_this.single_product;
          _this.owner = response.data[0];
        },
        function(error) {
          console.log("got error", error);
        }
      );
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
    getListSpecific(page) {
      console.log("get list of products called", page);
      let _this = this;
      get(
        this,
        "/api/specific/products",
        {
          params: {
            is_pharm: 0
          }
        },
        function(response) {
          _this.products = response.data;
          _this.pagination = response.data;
        },
        function(error) {
          console.log("got error", error);
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
    this.getListSpecific();
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
.card {
  width: 76%;
  // margin-left: 13%;
  position: absolute;
  // margin-top: 24px;
}
.mark_icon {
  display: flex;
  flex-direction: row;
  margin: auto auto auto 0;
  .mark_icon_ban {
    padding: 0 4px 0 0;
    cursor: pointer;
  }
  .mark_icon_trash {
    padding: 0 4px;
    border-left: 1px solid rgb(0, 0, 0, 0.4);
    cursor: pointer;
  }
  i {
    font-size: 0.9rem;
    color: rgb(0, 0, 0, 0.4);
  }
  i:hover {
    color: #000;
  }
}
.show_change {
  position: fixed;
  z-index: 999;
  top: 60px;
  width: 76%;
}
.add_user_btn,
.card-title,
.table td,
.table th {
  font-family: montserrat;
}
.input-group {
  height: 37px;
  margin-right: 12px;
  input {
    height: 37px;
    border-radius: 3px;
    font-family: montserrat;
  }
  .input-group-append {
    height: 37px;
    background-color: rgb(75, 84, 92, 0.3);
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    cursor: pointer;
    i {
      color: #fff;
    }
  }
  .input-group-append:hover {
    background-color: rgb(75, 84, 92) !important;
    button {
      background-color: rgb(75, 84, 92) !important;
    }
    i {
      color: #c2c7d0;
    }
  }
}
.card-tools {
  display: flex;
  flex-direction: row;
}
.user_success span {
  padding: 4px 6px;
  background: #38c172;
  border-radius: 3px;
  color: #fff;
}
.user_new span {
  padding: 4px 6px;
  background: #2153be;
  border-radius: 3px;
  color: #fff;
}
.user_fail span {
  padding: 4px 6px;
  background: #e3342f;
  border-radius: 3px;
  color: #fff;
}
.header_right {
  display: flex;
  flex-direction: row;
}
.go_back {
  margin: auto auto auto 0;
  i {
    margin: auto 6px;
    cursor: pointer;
    font-size: 1.3rem;
    color: #000;
  }
}
.delete_change {
  margin: auto 0 auto auto;
  background-color: #dc3545;
}
.save_change {
  margin: auto 0 auto auto;
  background-color: #007bff;
}
.make_change {
  margin: auto 0 auto 12px;
  background-color: rgb(0, 0, 0, 0.4);
}
.undo_change {
  margin: auto 0 auto 12px;
  background-color: rgb(0, 0, 0, 0.2);
}
.make_change,
.save_change,
.undo_change,
.delete_change {
  border-radius: 0.2rem;
  padding: 0 6px;
  span,
  i {
    margin: auto 3px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #f2f2f2;
  }
  span {
    font-family: montserrat;
  }
}
.table_header {
  background-color: rgba(0, 0, 0, 0.075);
  font-size: 1.1rem;
  font-weight: 550;
}
.false_error {
  border: 1px solid #ebebeb;
  font-family: montserrat;
}
.true_error {
  border: 1px solid #dc3545;
  font-family: montserrat;
}
.accept_radio {
  display: flex;
  flex-direction: row;
  width: 100%;
  .accept_choice {
    width: 56px;
  }
}
</style>


