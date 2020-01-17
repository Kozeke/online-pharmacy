<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Аптеки</h3>

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
          </div>
        </div>
        <button class="btn btn-success" data-toggle="modal" data-target="#AddNewCenter">
          Добавить аптеку
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="alert alert-success show_change" v-if="show_change">Изменения успешно сохранены!</div>
    <div class="card-body table-responsive p-0" v-if="!single_pharm">
      <table class="table table-hover">
        <tbody>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Номер лицензии</th>
            <th>Почта</th>
            <th>Телефон</th>
            <th>Город</th>
            <th>Статус</th>
            <th>Изменения</th>
            <th></th>
          </tr>
          <tr @click="single_pharm=!single_pharm;test(pharm);" v-for="pharm in pharms">
            <td>{{pharm.id}}</td>
            <td>{{pharm.pharms[0].name}}</td>
            <td>{{pharm.pharms[0].licence_number}}</td>
            <td>{{pharm.email}}</td>
            <td>{{pharm.phone}}</td>
            <td>{{pharm.locality.name}}</td>
            <td v-if="pharm.approved==1" class="user_success">
              <span>Принято</span>
            </td>
            <td v-if="pharm.approved==0" class="user_new">
              <span>Новое</span>
            </td>
            <td v-if="pharm.approved==2" class="user_fail">
              <span>Отказано</span>
            </td>
            <td v-if="pharm.change">Да</td>
            <td v-if="!pharm.change">Нет</td>
            <td>
              <span @click="singleUser(pharm)">
                <i class="fa fa-edit"></i>
              </span>
              <span @click="deleteUser(pharm.id)">
                <i class="fas fa-trash-alt"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-body table-responsive p-0" v-if="single_pharm">
      <table class="table table-hover">
        <tbody>
          <tr>
            <td class="table_header">
              <div class="header_left">
                <div class="go_back">
                  <i class="fas fa-arrow-alt-circle-left" @click="single_pharm = false"></i>
                  <span>Информация об аптеке</span>
                </div>
              </div>
            </td>
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
            <td>Номер</td>
            <td>{{chosen_pharm.id}}</td>
          </tr>
          <tr>
            <td>Название</td>
            <td v-if="!make_change">{{chosen_pharm.pharms[0].name}}</td>
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
            <td>Номер лицензии</td>
            <td v-if="!make_change">{{chosen_pharm.pharms[0].licence_number}}</td>
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
            <td>Телефон</td>
            <td v-if="!make_change">{{chosen_pharm.phone}}</td>
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
            <td>Почта</td>
            <td v-if="!make_change">{{chosen_pharm.email}}</td>
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
            <td>Город</td>
            <td v-if="!make_change">{{chosen_pharm.locality.name}}</td>
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
            <td>Адрес</td>
            <td v-if="!make_change">{{chosen_pharm.address}}</td>
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
            <td>Принять</td>
            <td>
              <div class="accept_radio">
                <div class="accept_choice">
                  <input type="radio" id="one" value="1" v-model="accept_pharm">
                  <label for="one">Да</label>
                </div>
                <div class="accept_choice">
                  <input type="radio" id="two" value="2" v-model="accept_pharm">
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
                <div class="save_change" @click="Approve(chosen_pharm.id)">
                  <span>Сохранить</span>
                  <i class="fas fa-save"></i>
                </div>
                <!-- <div class="make_change" v-if="!make_change" @click="make_change = true">
                  <span>Изменить</span>
                  <i class="fa fa-edit"></i>
                </div>-->
                <div class="undo_change" @click="make_change = false">
                  <span>Назад</span>
                  <i class="far fa-times-circle"></i>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_header" style="background-color:rgba(0, 0, 0, 0.03);">
              <div class="header_left">
                <div class="go_back">
                  <i class="fas fa-arrow-alt-circle-left" @click="single_pharm = false"></i>
                  <span>Препараты аптеки</span>
                </div>
              </div>
            </td>
            <td class="table_header" style="background-color:rgba(0, 0, 0, 0.03);">
              <div class="card-tools">
                <div
                  class="input-group input-group-sm"
                  style="width: 250px;margin: auto 0 auto auto;"
                >
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
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-body table-responsive p-0" v-if="single_pharm">
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
            <th>Изменения</th>
            <th></th>
          </tr>
          <tr v-for="product in products">
            <td>
              <input
                type="checkbox"
                :id="'product' + product.id"
                :value="product.id"
                v-model="marked_products"
              >
            </td>
            <td @click="single_product=!single_product;test(product);">{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.form}}</td>
            <td>{{product.category_name[0]}}</td>
            <td v-if="product.shipping">Да</td>
            <td v-if="!product.shipping">Нет</td>
            <td v-if="product.change">Да</td>
            <td v-if="!product.change">Нет</td>
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
  </div>
</template>
<script>
import { post, get } from "../../helpers/api";

export default {
  data() {
    return {
      single_pharm: false,
      chosen_pharm: "",
      accept_pharm: "",
      radio1: "",
      radio2: "",
      radio3: "",
      make_change: false,
      show_change: false,
      error: false,
      products: "",

      marked_products: [],
      users: "",
      pharms: ""
    };
  },
  methods: {
    Approve(id) {
      let _this = this;
      post(
        this,
        "/api/approve",
        { accept_pharm: _this.accept_pharm, id: id },
        function(response) {
          console.log(response);
          _this.single_pharm = !_this.single_pharm;
          _this.error = "";
          _this.chosen_pharm = "";
          _this.getPharms();
          _this.sendMessage(id);
        },
        function(error) {
          _this.errors = error.response.data.error;
          console.log(error.response.data.error);
        }
      );
    },
    sendMessage(user_id) {
      let component = this;

      console.log("send message", user_id);
      post(
        this,
        "/api/sendMail",
        { id: user_id },
        function(response) {
          console.log(response);
          alert("Успешно апрув!!!");
          component.pharm.approved = 1;
        },
        function(error) {
          console.log("ERROR");
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
    test(pharm) {
      this.chosen_pharm = pharm;
      let _this = this;
      console.log(pharm.id);
      get(
        this,
        "/api/pharm/getProduct",
        {
          params: {
            pharm_id: _this.chosen_pharm.id
          }
        },
        function(response) {
          _this.products = response.data;

          console.log("success");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    // getUser() {
    //   console.log("get user called");
    //   let _this = this;
    //   get(
    //     this,
    //     "/api/getUser",
    //     {},
    //     function(response) {
    //       _this.users = response.data;

    //       console.log("success");
    //     },
    //     function(error) {
    //       console.log("got error", error);
    //     }
    //   );
    // },
    singlePharm(pharm) {
      let component = this;

      this.loading = true;
      console.log("post is sending");
      post(
        this,
        "/api/singlePharm",
        pharm,
        function(response) {
          console.log(response);

          component.$router.push({ name: "singlePharm" });
        },
        function(error) {
          console.log("ERROR");
        }
      );
    },
    getPharms() {
      console.log("get user called");
      let _this = this;
      get(
        this,
        "/api/getSpecific",
        {
          params: { is_pharm: 1 }
        },
        function(response) {
          _this.pharms = response.data;

          console.log("success");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    }
  },
  mounted() {
    // this.getUser();
    this.getPharms();
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
