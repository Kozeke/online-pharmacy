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
    <div class="card-body table-responsive p-0" v-if="!single_page">
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
            <th>Номер покупки</th>
            <th>Номер продукта</th>
            <th>Название продукта</th>
            <th>Общая цена лекарства</th>
            <th>Цена с доставкой</th>
            <th>Дата покупки</th>
            <th>Одобрено</th>
            <th></th>
          </tr>
          <tr @click="single_page=!single_page;test(order);" v-for="order in orders">
            <td>
              <input
                type="checkbox"
                :id="'product' + order.id"
                :value="order.id"
                v-model="marked_products"
              >
            </td>
            <td>{{order.id}}</td>
            <td>{{order.product_id}}</td>
            <td>{{order.product.name}}</td>
            <td>{{order.total_price}}</td>
            <td>{{order.total_price_with_delivery}}</td>
            <td>{{order.created_at}}</td>
            <td v-if="order.approved==1" class="user_success">
              <span>Принято</span>
            </td>
            <td v-if="order.approved==0" class="user_new">
              <span>Новое</span>
            </td>
            <td v-if="order.approved==2" class="user_fail">
              <span>Отказано</span>
            </td>

            <td>
              <span @click="singleProduct(order.id,order.cat_id)">
                <i class="fa fa-trash red"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-body table-responsive p-0" v-if="single_page">
      <div v-for="order in individual_order">
        <span @click="order.show=!order.show">Info {{order.id}}</span>
        <table class="table table-hover">
          <tbody v-if="order.show">
            <tr>
              <td class="table_header">
                <div class="header_left">
                  <div class="go_back">
                    <i class="fas fa-arrow-alt-circle-left" @click="single_page = false"></i>
                    <span>Информация о покупке</span>
                  </div>
                </div>
              </td>
              <td class="table_header">
                <div class="header_right">
                  <div class="make_change">
                    <span>Удалить</span>
                    <i class="fa fa-edit"></i>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 40%;">Номер покупки</td>
              <td>{{order.id}}</td>
            </tr>
            <tr>
              <td>Номер продукта</td>
              <td>{{order.product.id}}</td>
            </tr>
            <tr>
              <td>Название продукта</td>
              <td>{{order.product.name}}</td>
            </tr>
            <tr>
              <td>Количества</td>
              <td>{{order.product.count}}</td>
            </tr>
            <tr>
              <td>Производства</td>
              <td>{{order.product.manufacturer}}</td>
            </tr>
            <tr>
              <td>Общая цена</td>
              <td>{{order.total_price}}</td>
            </tr>
            <tr>
              <td>Общая цена с доставкой</td>
              <td>{{order.total_price_with_delivery}}</td>
            </tr>
            <tr>
              <td>Дата покупки</td>
              <td>{{order.created_at}}</td>
            </tr>
            <tr style="background-color:rgb(255, 193, 7,0.2);">
              <td>ID пользователя</td>
              <td>{{order.user.id}}</td>
            </tr>
            <tr style="background-color:rgb(255, 193, 7,0.2);">
              <td>Покупатель</td>
              <td>{{order.user.name}} {{order.user.surname}}</td>
            </tr>
            <tr style="background-color:rgb(255, 193, 7,0.2);">
              <td>Номер покупателя</td>
              <td>{{order.user.phone}}</td>
            </tr>
            <tr style="background-color:rgb(255, 193, 7,0.2);">
              <td>Почта покупателя</td>
              <td>{{order.user.email}}</td>
            </tr>
            <tr style="background-color:rgb(255, 193, 7,0.2);">
              <td>Город покупателя</td>
              <td>{{order.user.locality.name}}</td>
            </tr>
            <tr style="background-color:rgb(255, 193, 7,0.2);">
              <td>Адрес покупателю</td>
              <td>{{order.user.address}}</td>
            </tr>
            <tr style="background-color:rgb(32, 201, 151,0.3);">
              <td>ID продавца</td>
              <td>{{order.owner[0].id}}</td>
            </tr>
            <tr style="background-color:rgb(32, 201, 151,0.3);">
              <td>Продавец</td>
              <td>{{order.owner[0].name}} {{order.owner[0].surname}}</td>
            </tr>
            <tr style="background-color:rgb(32, 201, 151,0.3);">
              <td>Номер продавца</td>
              <td>{{order.owner[0].phone}}</td>
            </tr>
            <tr style="background-color:rgb(32, 201, 151,0.3);">
              <td>Номер продавца</td>
              <td>{{order.owner[0].email}}</td>
            </tr>
            <tr style="background-color:rgb(32, 201, 151,0.3);">
              <td>Город продавца</td>
              <td>{{order.owner[0].locality.name}}</td>
            </tr>
            <tr style="background-color:rgb(32, 201, 151,0.3);">
              <td>Адрес продавца</td>
              <td>{{order.owner[0].address}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div class="accept">
          <span>Одобрить</span>
          <input type="radio" id="one" value="1" v-model="accept_order">
          <label for="one">Да</label>
          <input type="radio" id="two" value="2" v-model="accept_order">
          <label for="two">Нет</label>
        </div>
      </div>
      <div class="header_right">
        <!-- <div class="delete_change" v-if="!make_change" @click="make_change = false">
                  <span>Удалить</span>
                  <i class="fas fa-trash-alt"></i>
        </div>-->
        <div class="save_change" @click="Approve(chosen_page.user_id)">
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
    </div>
  </div>
</template>
<script>
import MaskedInput from "vue-masked-input";
import Paginate from "vuejs-paginate";
import { post, get, del } from "../../helpers/api";

export default {
  components: {
    "masked-input": MaskedInput
  },
  data() {
    return {
      marked_products: [],
      single_page: false,
      chosen_page: "",
      orders: "",
      individual_order: "",
      accept_order: ""
    };
  },
  methods: {
    test(order) {
      this.chosen_page = order;
      let _this = this;
      get(
        this,
        "/api/order",
        {
          params: {
            user_id: order.user_id
          }
        },
        function(response) {
          _this.individual_order = response.data;

          console.log("success");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    getOrder() {
      console.log("get order called");
      let _this = this;
      get(
        this,
        "/api/order",
        {},
        function(response) {
          _this.orders = response.data;

          console.log("success");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    Approve(id) {
      let _this = this;

      post(
        this,
        "/api/order/approve",
        { accept_order: _this.accept_order, id: id },
        function(response) {
          console.log(response);
          _this.chosen_product = "";
          _this.sendMessage(id);
        },
        function(error) {
          console.log(error.response.data.error);
        }
      );
    },
    sendMessage(user_id) {
      let component = this;

      console.log("send message", user_id);
      post(
        this,
        "/api/sendMail/order",
        { id: user_id },
        function(response) {
          console.log(response);
          component.single_page = false;
          component.getOrder();
          alert("Успешно апрув!!!");
        },
        function(error) {
          console.log("ERROR");
        }
      );
      _this.getOrder();
    }
  },
  mounted() {
    this.getOrder();
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
  //   margin-left: 13%;
  position: absolute;
  //   margin-top: 24px;
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
.add_user_btn,
.card-title,
.table td,
.table th {
  font-family: montserrat;
}
.card-tools {
  display: flex;
  flex-direction: row;
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
.user_success span {
  padding: 4px 6px;
  background: #38c172;
  border-radius: 3px;
  color: #fff;
}
.user_fail span {
  padding: 4px 6px;
  background: #e3342f;
  border-radius: 3px;
  color: #fff;
}
.user_new span {
  padding: 4px 6px;
  background: #2153be;
  border-radius: 3px;
  color: #fff;
}
.make_change {
  margin: auto 0 auto auto;
  background-color: #dc3545;
}
.save_change {
  margin: auto 0 auto auto;
  background-color: #007bff;
}
.make_change,
.save_change,
.undo_change {
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


