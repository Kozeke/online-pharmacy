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

      <div v-bind:class="{ 'has-error': errors && errors.surname }" class="form-group row">
        <label class="col-3 col-form-label">
          Фамилия
          <span style="color:red;">*</span>
        </label>

        <div class="col-9">
          <input class="form-control" v-model="lastname" type="text" placeholder="Ахметов">
        </div>
        <img
          style="width: 16px;height: 16px;"
          class="form_group_notification-error"
          v-if="errors && errors.name"
          :errors="errors"
          src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
        >
        <span
          class="form_group_notification-error"
          v-if="errors && errors.name"
          :errors="errors"
        >Заполните это поле</span>
      </div>
      <div v-bind:class="{ 'has-error': errors && errors.name }" class="form-group row">
        <label class="col-3 col-form-label">
          Имя
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input class="form-control" v-model="firstname" type="text" placeholder="Алишер">
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
            mask="1 (111) 111 11 11"
            placeholder="8 (707) 465 48 12"
            type="tel"
          />
        </div>
      </div>
      <div v-bind:class="{ 'has-error': errors && errors.email }" class="form-group row">
        <label class="col-3 col-form-label">
          Почта
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input class="form-control" type="text" v-model="user.email" placeholder="email">
        </div>
      </div>
      <!-- <div class="form-group row">
                <label class="col-3 col-form-label">Кем вы являетесь?</label>
                <div class="col-9 form-holder">
                    <b-form-group>
                        <b-form-radio-group id="radios1" v-model="isSeller" :options="seller_options" name="radioOpenions">
                        </b-form-radio-group>
                    </b-form-group>
                </div>
      </div>-->
      <!-- <div class="form-group row"> -->
      <!-- <label class="col-3 col-form-label">
          Область
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_region" @change="resetRegion()">
            <option
              v-for="region in regions"
              :value="region"
              placeholder="Akmola region"
            >{{region.name}}</option>
          </select>
        </div>
      </div>
      <div v-if="selected_region" class="form-group row">
        <label class="col-3 col-form-label">
          Районы/Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_district">
            <option
              v-for="district in selected_region.districts"
              v-if="district.region_id===selected_region.id"
              :value="district"
            >{{district.name}}</option>
            <option
              v-for="city in selected_region.localities"
              v-if="city.region_id===selected_region.id"
              :value="city"
            >{{city.name}}</option>
          </select>
        </div>
      </div>
      <div v-if="selected_district&&!selected_district.is_city" class="form-group row">
        <label class="col-3 col-form-label">
          Населенный пункт
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_locality">
            <option
              v-for="locality in selected_district.localities"
              v-if="locality.district_id===selected_district.id"
              :value="locality"
            >{{locality.name}}</option>
          </select>
        </div>
      </div>-->
      <div class="form-group row">
        <label class="col-3 col-form-label">
          Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_city">
            <option v-for="city in cities" :value="city">{{city.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form-label">
          Адрес
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-holder">
          <input
            class="form-control"
            type="text"
            v-model="user.address"
            placeholder="проспект Кабанбай батыр 53, 11/2"
          >
        </div>
      </div>
      <div v-bind:class="{ 'has-error': errors && errors.password }" class="form-group row">
        <label class="col-3 col-form-label">
          Пароль
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input class="form-control" type="password" v-model="user.password" placeholder="Пароль">
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
            type="password"
            v-model="second_password"
            placeholder="Пароль"
          >
          <div v-if="!equal" class="alert alert-danger">Пароли не совпадают!</div><form-error
        </div>
      </div>
      <b-form-checkbox id="checkbox2" v-model="user_type" value="pharmacy"></b-form-checkbox>

      <div class="form-group row" v-if="!image">
        <label class="col-3 col-form-label">Выберите фото</label>
        <div class="col-9">
          <input class="form-control form_img" type="file" @change="onFileChange">
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
          @click.prevent="checkEquality();user_type?registerPharm():registerUser()"
        >Зарегистрироваться</a>
      </div>
    </div>
  </form>
</template>
<script>
import VueRouter from "../../router";
import { get, post } from "../../helpers/api";
import MaskedInput from "vue-masked-input";
import vSelect from "vue-select";
import Swal from "sweetalert2";

export default {
  components: {
    "masked-input": MaskedInput,
    "v-select": vSelect,
    Swal
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        phone: "",
        locality_id: "",
        address: "",
        image: ""
      },
      user_type: "",
      firstname: "",
      lastname: "",
      second_password: "",
      error: false,
      errors: {},
      success: false,
      formSending: false,
      error_image: false,
      // regions: "",
      cities: "",
      image: "",
      isSeller: true,
      // selected_region: "",
      selected_city: "",
      // selected_district: null,
      // selected_locality: null,
      selectedFile: "",
      equal: true
    };
  },

  methods: {
    registerPharm() {
      let _this = this;
      if (_this.error_image == false && _this.equal == true) {
        console.log("Register pharm called");

        post(
          this,
          "/api/pharm/register",
          {
            name: _this.firstname,
            surname: _this.lastname,
            email: _this.user.email,
            phone: _this.user.phone,
            locality_id: _this.selected_city.id,
            password: _this.user.password,
            address: _this.user.address,
            image: _this.user.image,
            licence_number: 123123,
            pharm_name: "asd"
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
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Signed in successfully"
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
      }
    },
    registerUser() {
      let _this = this;
      if (_this.error_image == false && _this.equal == true) {
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
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: "Signed in successfully"
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
      }
    },

    // resetRegion() {
    //   if (this.selected_region && this.selected_district) {
    //     this.selected_district = null;
    //     this.selected_locality = null;
    //   }
    // },
    getCities() {
      console.log("get city called");
      let _this = this;
      get(
        this,
        "/api/cities",
        {},
        function(response) {
          _this.cities = response.data;
          console.log("asd");

          console.log(response.data);
          console.log("asd");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    checkEquality() {
      if (this.user.password == this.second_password) {
        this.equal = true;
      } else {
        this.equal = false;
      }
    },

    onFileChange(e) {
      console.log("upload image is called");
      this.selectedFile = e.target.files[0];
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      let _this = this;
      console.log(fd);

      post(
        _this,
        "/api/uploadImageUser",
        fd,
        function(response) {
          _this.user.image = response.data;
          _this.error_image = false;
        },
        function(error) {
          console.log(error.response.data[0]);
          error.response.data[0] == "image" ? (_this.error_image = true) : "";
          window.scrollTo(0, 0);

          console.log("got error", error);
        }
      );
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.image = "";
    }
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
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
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
  font-family: "Montserrat";
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


