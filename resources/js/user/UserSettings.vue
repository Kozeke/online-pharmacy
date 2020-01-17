<template>
  <div class="setting_main" v-if="$route.path == '/userSettings'">
    <div class="personal_info">
      <div class="alert alert-success" v-if="show_change">
        <span>Пароль успешно изменены!</span>
      </div>
      <div class="alert alert-danger" v-if="errors&&errors.error.current_password">
        <span>Прежний пароль введён неправильно!</span>
      </div>
      <div class="alert alert-danger" v-if="equal_new_old">
        <span>Прежний пароль и новый пароль не могут совпадать!</span>
      </div>

      <div class="detail_header">
        <h2>Общие настройки</h2>
      </div>

      <div class="detail">
        <div class="infos">
          <a class="col-form-label setting">Редактировать данные аккаунта</a>
          <a class="col-form-label setting">Редактировать адреса доставка</a>
          <a class="col-form-label setting">Управления продуктами</a>
          <a
            class="col-form-label setting"
            v-on:click="set_new_password=!set_new_password;do_change=!do_change"
          >Изменить пароль</a>
          <div
            v-bind:class="{ 'has-error': errors && errors.last_name }"
            class="form-group row"
            v-if="set_new_password"
          >
            <label class="col-6 col-form-label">Введите старый пароль</label>
            <div class="col-6">
              <input class="form-control" type="password" v-model="current_password">
            </div>
          </div>
          <div
            v-bind:class="{ 'has-error': errors && errors.last_name }"
            class="form-group row"
            v-if="set_new_password"
          >
            <label class="col-6 col-form-label">Новый пароль</label>
            <div class="col-6">
              <input class="form-control" type="password" v-model="new_password" placeholder>
            </div>
          </div>
          <div
            v-bind:class="{ 'has-error': errors && errors.last_name }"
            class="form-group row"
            v-if="set_new_password"
          >
            <label class="col-6 col-form-label">Повторие новый пароль</label>

            <div class="col-6">
              <input class="form-control" type="password" v-model="repeat_new_password" placeholder>
              <div v-if="!equal" class="alert alert-danger">Пароли не совпадают!</div>
            </div>
          </div>
        </div>
      </div>
      <div class="make_change" v-if="do_change">
        <a class="cancel" v-on:click="set_new_password=false;do_change=false">Отменить</a>
        <a
          class="save"
          v-on:click="do_change=false;set_new_password=false;changePassword()"
        >Сохранить</a>
      </div>
    </div>
  </div>
</template>
<script>
import { post, get } from "../helpers/api";

export default {
  data() {
    return {
      do_change: false,
      set_new_password: false,
      show_change: false,
      current_password: "",
      new_password: "",
      repeat_new_password: "",
      errors: "",
      equal: true,
      equal_new_old: false
    };
  },
  methods: {
    checkEquality() {
      if (this.new_password == this.repeat_new_password) {
        this.equal = true;
      } else {
        this.equal = false;
      }
    },
    changePassword() {
      let _this = this;
      if (_this.current_password !== _this.new_password) {
        post(
          _this,
          "/api/changePassword",
          {
            current_password: _this.current_password,
            new_password: _this.new_password
          },
          function(response) {
            console.log("password changed succesfully");
            _this.saveChange();
            window.scrollTo(0, 0);
            _this.errors = "";
            _this.repeat_new_password = "";
            _this.new_password = "";
            _this.current_password = "";
            _this.equal_new_old = false;
            // _this.error_image = false;
            // window.location.reload();
          },
          function(error) {
            window.scrollTo(0, 0);
            _this.errors = error.response.data;
            console.log("got error", error);
          }
        );
      } else {
        equal_new_old = true;
      }
    },
    saveChange: function() {
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
    }
  },
  watch: {
    repeat_new_password() {
      this.checkEquality();
    }
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.setting_main {
    width: 72%;
    border: 1px solid rgb(22,127,146,.2);
    border-radius: 3px;
    padding: 10px;
    display: flex;
    flex-direction: column; 
    flex-wrap: nowrap;
}
.detail_header{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 60px;
    padding: 10px;
    h2{
        font-family: montserrat;
        font-size: 20px;
        padding-left: 50px;
        width: 80%;
        line-height: 30px;
    }
}
.infos{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
}
.alert_change{
    width: 40%;
    margin-left: 25px;
    background-color: #1aff1a;
    border: 2px solid #2fb62f;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-family: montserrat;
}
.form-group:first-of-type{
    margin-top: 20px;
}
.setting{
    background-color: #e6e6e6;
    border-radius: 3px;
    cursor: pointer;
    padding: 5px 10px;
    margin-bottom: 10px;
    width: auto;
}
.setting:last-of-type{
    margin-bottom: 0;
}
.detail{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.col-form-label {
    font-weight: 550;
    font-family: montserrat;
    display: block; 
}
  .register_btn{
    input{
        border-radius: 6px;
        border: 1px solid rgb(93, 137, 124,0.5);;
        color: #0059b3;
        height: 34px;
        font-family: montserrat;
    }
    input:hover{        
        border: 1px solid rgb(93, 137, 124,0.5);;
        color: #fff;
        cursor:pointer;
    }
    width: 30%;
    margin:auto;
}
.col-9{
    height: 37px;
}
.col-form-info{
    font-family: montserrat;
    border-radius: 3px;
    border: 1px solid rgb(93, 137, 124,0.5);
    height: 37px;
    width: 100%;
    padding-left: 10px;
    display: block; 
    line-height: 37px;
}
.make_change{
    margin-left: 70%;
    margin-bottom: 20px;
    a{
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-family: montserrat;
    }
    .cancel{
        background-color: #a6a6a6;
    }
    .cancel:hover{
        background-color: #808080;
    }
    .save{
        background-color: #5d897c;
    }
    .save:hover{
        background-color: #486a60;
    }
}
@media screen and (max-width: 1224px) {
    .detail_header{
        height: 48px;
        h2{
            padding-left: 42px;
            width: 70%;
        }
        .text_right{
            width: 30%;
            padding-right: 42px;
            text-align: right;
        }
    }
    .make_change{
        margin-left: 64%;
        margin-bottom: 18px;
    }
}
@media screen and (max-width: 1024px) {
    .setting_main {
        width: 100%;
    }
}
@media screen and (max-width: 802px) {
    .make_change{
        margin-left: 54%;
    }
}
@media screen and (max-width: 667px) {
    .infos{
        margin-top: 20px;
    }
    .detail_header{
        height: 48px;
        h2{
            font-size: 14px;
            width: 60%;
            padding-left: 24px;
        }
        .text_right{
            font-size: 12px;
            width: 40%;
            padding-right: 24px;
        }
    }
    .col-form-label, .btn, .col-form-info, .form-control{
        font-size: 12px; 
    }
    .btn{
        margin-bottom: 0;
        height: 32px;
    }
    .col-form-label, .col4{
        line-height: 12px;
    }
    .change{
        height: 32px !important;
    }
    .col-form-info{
        height: 32px;
        line-height: 16px;
        padding-top: 6px;
        overflow: scroll;
    }
    .form-control{
        height: 32px;
        line-height: 16px;
        padding-top: 8px;
    }
    ::placeholder{
        font-size: 14px;
    }
    .make_change{
        margin-left: 42%;
        margin-bottom: 16px;
        margin-right: 42px;
        a{
            padding: 4px 6px;
            font-size: 12px;
        }
    }
}
@media screen and (max-width: 426px) {
    .detail{
        margin-top: 6px;
    }
    .infos{
        margin-top: 12px;
    }
    .detail_header{
        height: 48px;
        h2{
            font-size: 13px;
            width: 60%;
            padding-left: 12px;
            line-height: 18px;
            font-weight: 550;
        }
        .text_right{
            font-size: 11px;
            width: 40%;
            padding-right: 12px;
        }
    }
    .col-form-label, .btn, .col-form-info, .form-control{
        font-size: 11px; 
    }
    .col-form-label{
        height: 32px;
        font-weight: 500;
    }
    label.col-form-label{
        padding: 0;
        padding-left: 15px;
    }
    .col-9{
        height: 32px;
    }
    .col-form-info{
        height: 32px;
        line-height: 12px;
        padding-top: 6px;
        overflow: scroll;
    }
    .form-control{
        height: 32px;
        line-height: 12px;
        padding-top: 6px;
    }
    .btn{
        margin-bottom: 0;
        height: 32px;
    }
    .change{
        height: 32px !important;
    }
    ::placeholder{
        font-size: 13px;
    }
    .make_change{
        margin-left: 24%;
        a{
            font-size: 11px;
        }
    }
}
</style>
