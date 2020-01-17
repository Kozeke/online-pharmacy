<template>
  <form
    id="register-form"
    novalidate="true"
    class="register_form"
    v-if="$route.path == '/register'"
  >
    <div class="register_content">
      <div v-if="error_image" class="alert alert-danger">Загрузите фото с расширением .jpg или .png!</div>
      <div v-if="error" class="alert alert-danger">Ошибка!</div>

      <div v-bind:class="{ 'has-error': errors && errors.picked }" class="form-group row">
        <label class="col-3 col-form-label">
          Вы
          <span style="color:red;">*</span>
        </label>
        <div class="col-4">
          <input type="radio" id="one" value="Аптека" v-model="picked" />
          <label for="one">Аптека</label>
        </div>
        <div class="col-4">
          <input type="radio" id="two" value="Пользователь" v-model="picked" />
          <label for="two">Пользователь</label>
        </div>
        <img
          style="width: 16px;height: 16px;"
          class="form_group_notification-error"
          v-if="errors && errors.name"
          :errors="errors"
          src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
        />
        <span
          class="form_group_notification-error"
          v-if="errors && errors.name"
          :errors="errors"
        >Заполните это поле</span>
      </div>
      <div class="form-group row" v-if="picked=='Аптека'">
        <label
          class="col-form-label"
          style="opacity: 0.4;"
        >Пожалуйста, зарегистрируйтесь как представитель аптеки, все данные будут проверяться</label>
      </div>

      <div v-bind:class="{ 'has-error': errors && errors.first_name }" class="form-group row">
        <label class="col-3 col-form-label">
          Имя
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            v-model="firstname"
            type="text"
            placeholder="Алишер"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'has-error': errors && errors.first_name }"
        class="form-group row"
        v-if="picked=='Аптека'"
      >
        <label class="col-3 col-form-label">
          Название аптеки
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            v-model="pharm_name"
            type="text"
            placeholder="Алишер"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'has-error': errors && errors.first_name }"
        class="form-group row"
        v-if="picked=='Аптека'"
      >
        <label class="col-3 col-form-label">
          Номер лицензий аптеки
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            v-model="licence_number"
            type="text"
            placeholder="Алишер"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-bind:class="{ 'has-error': errors && errors.phone }" class="form-group row">
        <label class="col-3 col-form-label">
          Телефон
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <masked-input
            v-model="user.phone"
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            mask="1 (111) 111 11 11"
            placeholder="8 (707) 465 48 12"
            type="tel"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-bind:class="{ 'has-error': errors && errors.email }" class="form-group row">
        <label class="col-3 col-form-label">
          Почта
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            type="text"
            v-model="user.email"
            placeholder="email"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>

      <div v-bind:class="{ 'has-error': errors && errors.password }" class="form-group row">
        <label class="col-3 col-form-label">
          Пароль
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            type="password"
            v-model="user.password"
            placeholder="Пароль"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'has-error': errors && errors.password_confirmation }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Пароль еще раз
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.name}"
            type="password"
            v-model="second_password"
            placeholder="Пароль"
          />
          <div v-if="!equal" class="alert alert-danger">Пароли не совпадают!</div>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>

      <div class="agree_form">
        <p>
          Зарегистрировашись вы принимаете условия пользовательского
          <a
            href="http://www.africau.edu/images/default/sample.pdf"
            download="DariHub_payment_check"
          >соглашения</a>.
        </p>
      </div>
      <div class="register_btn">
        <a
          class="button button-primary button-block form_button"
          @click.prevent="checkEquality();picked=='Аптека'?registerPharm():registerUser()"
        >Зарегистрироваться</a>
      </div>
    </div>
  </form>
</template>
<script>
import VueRouter from "../../router";
import { get, post } from "../../helpers/api";
import MaskedInput from "vue-masked-input";
import Swal from "sweetalert2";

export default {
  components: {
    "masked-input": MaskedInput,
    Swal
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        phone: "",
        firstname: ""
      },
      user_type: "",
      second_password: "",
      error: false,
      errors: {},
      error_image: false,
      pharm_name: "",
      licence_number: "",
      equal: true
    };
  },

  methods: {
    registerUser() {
      let _this = this;
      console.log("post list called");

      post(
        this,
        "/api/register",
        {
          name: _this.firstname,
          surname: _this.lastname,
          email: _this.user.email,
          phone: _this.user.phone,
          locality_id: _this.selected_city.id,
          password: _this.user.password,
          address: _this.user.address,
          image: _this.user.image
        },
        function(response) {
          _this.user = response.data;
          _this.error_image = true;
          _this.error = false;
          console.log(response.data);
          console.log("SUCCESS");
          window.scrollTo(0, 0);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Вы успешно зарегистрировались"
          });
          _this.$router.push({ name: "Войти" }),
            console.log(response.data.token);
        },
        function(error) {
          _this.errors = error.response.data.error;
          console.log("got error", error);
          _this.error = true;
          window.scrollTo(0, 0);
        }
      );
      this.formSending = true;
    },

    checkEquality() {
      if (this.user.password == this.second_password) {
        this.equal = true;
      } else {
        this.equal = false;
      }
    }

    // onFileChange(e) {
    //   console.log("upload image is called");
    //   this.selectedFile = e.target.files[0];
    //   const fd = new FormData();
    //   fd.append("image", this.selectedFile, this.selectedFile.name);
    //   let _this = this;
    //   console.log(fd);

    //   post(
    //     _this,
    //     "/api/uploadImageUser",
    //     fd,
    //     function(response) {
    //       _this.user.image = response.data;
    //       _this.error_image = false;
    //     },
    //     function(error) {
    //       console.log(error.response.data[0]);
    //       error.response.data[0] == "image" ? (_this.error_image = true) : "";
    //       window.scrollTo(0, 0);

    //       console.log("got error", error);
    //     }
    //   );
    // },
    // createImage(file) {
    //   var image = new Image();
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = e => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
    // removeImage: function(e) {
    //   this.image = "";
    // }
  },
  mounted() {
    this.getCities();
  },
  watch: {
    second_password: function() {
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
* {
  font-size: 15px;
  font-family: montserrat;
  font-weight: 500;
}
.form_control_first {
  margin-right: 20px;
}
.form_control_mid {
  margin-right: 20px;
}
.input-file {
  display: none;
}
.input-file + label {
  color: #fff;
  color: white;
  line-height: 40px;
  background-color: rgb(117, 117, 117);
  padding: 0 20px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 15px;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  cursor: pointer;
}
.register_form {
  width: 60%;
  margin: auto;
  margin-bottom: 100px;
}
.register_content {
  background-color: #fff;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  padding: 8% 9%;
}
.form-control {
  outline: none;
  appearance: unset !important;
  -moz-appearance: unset !important;
  -webkit-appearance: unset !important;
  -o-appearance: unset !important;
  -ms-appearance: unset !important;
}
.form-control:focus {
  outline: none;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -o-box-shadow: none !important;
  -ms-box-shadow: none !important;
}
.form_img {
  height: 50px;
}
.col-9 {
  padding-right: 0px !important;
}
.form-row {
  margin: 0 -15px;
}
.form-group {
  margin-bottom: 23px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  input {
    border-radius: 6px;
  }
}
select.form-control {
  padding: 0 20px;
}
.form-control {
  display: block;
  width: 100%;
  border: 1px solid #ebebeb;
  padding: 10px 20px;
  box-sizing: border-box;
  font-family: montserrat;
}
.form-control:focus {
  border: 1px solid #0059b3;
}
.col-form-label {
  font-weight: bold;
  font-family: montserrat;
  margin-bottom: 2px;
  display: block;
}
.register_btn {
  a {
    border-radius: 6px;
    height: 40px;
    color: #fff !important;
    cursor: pointer !important;
    border: 1px solid #167f92 !important;
    background-color: #167f92 !important;
    width: 40%;
  }
  a:hover {
    color: #fff !important;
    border: 1px solid #324b51 !important;
    background-color: #324b51 !important;
  }
  text-align: center !important;
}
.agree_form {
  width: 90%;
  margin: 0 5%;
  text-align: center;
  p {
    font-size: 12px;
  }
  a {
    color: #167f92;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
  }
  a:hover {
    color: #0d4d59;
  }
}
.red_border {
  border-color: red;
}
.form_group_notification-error {
  font-family: montserrat;
}
::placeholder {
  opacity: 0.5;
  font-family: montserrat;
}
@media screen and (max-width: 1224px) {
  .register_form {
    width: 90% !important;
  }
  select.form-control,
  .col-form-label,
  input.button,
  .col-form,
  label.col-3,
  textarea.form-control input.form-control,
  .form_group_notification-error {
    font-size: 14px !important;
  }
  input.form-control {
    padding: 2px 0px 2px 10px !important;
  }
  .form_img {
    height: 36px;
  }
  ::placeholder {
    font-size: 14px;
  }
}
@media screen and (max-width: 1024px) {
  .register_form {
    width: 90% !important;
    margin-top: 0;
  }
  select.form-control,
  .col-form-label,
  input.button,
  .col-form,
  label.col-3,
  textarea.form-control input.form-control,
  .form_group_notification-error {
    font-size: 12px !important;
  }
  .col-form-label span {
    font-size: 12px !important;
  }
  input.form-control {
    padding: 2px 0px 2px 10px !important;
  }
  select.form-control {
    padding: 0 10px;
  }
  .add_product_content {
    padding: 6%;
  }
  .form-group-header {
    border-bottom: 1px solid rgb(22, 127, 146, 0.8);
    margin-bottom: 30px;
    position: relative;
    width: 100%;
  }
  .content_second {
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .register_btn {
    a {
      border-radius: 3px;
      font-size: 12px !important;
      width: 42% !important;
      font-size: 14px;
    }
  }
  .agree_form {
    width: 100%;
    margin: 0;
    p {
      font-size: 11px;
    }
    a {
      font-size: 11px;
    }
  }
  ::placeholder {
    font-size: 12px;
  }
}
@media screen and (max-width: 667px) {
  .register_form {
    width: 100% !important;
    margin-top: 0;
  }
  select.form-control,
  .col-form-label,
  input.button,
  .col-form,
  label.col-3,
  textarea.form-control input.form-control,
  .form_group_notification-error {
    font-size: 11px !important;
  }
  .col-form-label span {
    font-size: 11px !important;
  }
  input.form-control,
  textarea.form-control {
    padding: 2px 0px 2px 10px !important;
  }
  .add_product_content {
    padding: 4% 6%;
  }
  .form-group-header {
    border-bottom: 1px solid rgb(22, 127, 146, 0.8);
    margin-bottom: 30px;
    position: relative;
    width: 100%;
  }
  .content_second {
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .form_img {
    height: 28px !important;
    font-size: 11px !important;
  }
  .register_btn {
    a {
      border-radius: 3px;
      width: 68% !important;
    }
  }
  .agree_form {
    p {
      font-size: 10px;
    }
    a {
      font-size: 10px;
    }
  }
  ::placeholder {
    font-size: 11px;
  }
}
@media screen and (max-width: 546px) {
  select,
  select.form-control,
  .col-form-label,
  input.button,
  .form-holder,
  .col-form,
  label.col-3,
  textarea.form-control input.form-control,
  .form_group_notification-error {
    font-size: 8px !important;
  }
  .col-form-label span {
    font-size: 8px !important;
  }
  .col-header {
    font-size: 12px;
  }
  ::placeholder {
    font-size: 8px;
  }
  label.full-width {
    font-size: 8px;
  }
  .form_img {
    height: 24px !important;
    font-size: 8px !important;
  }
  .form-control,
  .form-holder {
    height: 24px;
  }
  .col-form-label,
  .col-form {
    padding-left: 4px !important;
  }
  .total_col {
    padding-left: 10px;
  }
  .register_btn {
    a {
      width: 78% !important;
      font-size: 10px;
    }
  }
}
</style>


