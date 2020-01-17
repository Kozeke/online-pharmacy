<template>
  <div class="info_main" v-if="$route.path == '/userInfo'">
    <div class="personal_info">
      <div v-if="error_image" class="alert alert-danger">Загрузите фото с расширением .jpg или .png!</div>
      <div class="detail_header">
        <h2>Персональные данные</h2>
        <a class="text_right" v-on:click="do_change=true">
          <i class="fas fa-sliders-h"></i>
          <span>Изменить</span>
        </a>
      </div>

      <div class="detail">
        <div class="photo">
          <img :src="user_image">
          <div class="change">
            <label for="files" class="btn">Изменить фото</label>
            <input id="files" @change="onFileChanged" style="visibility:hidden;" type="file">
          </div>
        </div>
        <div class="infos">
          <div v-bind:class="{ 'has-error': errors && errors.last_name }" class="form-group row">
            <label class="col-3 col-form-label">Фамилия</label>
            <div class="col-9">
              <input
                class="form-control"
                type="text"
                v-model="user.surname"
                placeholder="Ахметов"
                v-if="do_change"
              >
              <span class="col-form-info" v-else>{{user.surname}}</span>
            </div>
          </div>
          <div v-bind:class="{ 'has-error': errors && errors.first_name }" class="form-group row">
            <label class="col-3 col-form-label">Имя</label>
            <div class="col-9">
              <input
                class="form-control"
                v-model="user.name"
                type="text"
                placeholder="Алишер"
                v-if="do_change"
              >
              <label class="col-form-info" v-else>
                <span>{{user.name}}</span>
              </label>
            </div>
          </div>
          <div v-bind:class="{ 'has-error': errors && errors.phone }" class="form-group row">
            <label class="col-3 col-form-label">Телефон</label>
            <div class="col-9">
              <masked-input
                v-model="user.phone"
                class="form-control"
                mask="1 (111) 111 11 11"
                type="tel"
                v-if="do_change"
              />
              <label class="col-form-info" v-else>
                <span>{{user.phone}}</span>
              </label>
            </div>
          </div>
          <div v-bind:class="{ 'has-error': errors && errors.email }" class="form-group row">
            <label class="col-3 col-form-label">Email</label>
            <div class="col-9">
              <input class="form-control" type="text" v-model="user.email" v-if="do_change">
              <label class="col-form-info" v-else>
                <span v-model="user.email">{{user.email}}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="make_change" v-if="do_change">
        <a class="cancel" v-on:click="do_change=false">Отменить</a>
        <a class="save" v-on:click="saveChange()">Сохранить</a>
      </div>
      <!-- <div class="alert alert-success" v-if="show_change">Изменения успешно сохранены!</div> -->
    </div>
  </div>
</template>
<script>
import MaskedInput from "vue-masked-input";
import { post } from "../helpers/api";

export default {
  components: {
    "masked-input": MaskedInput
  },
  data() {
    return {
      user: {
        surname: this.$root.user.data ? this.$root.user.data.surname : "",
        name: this.$root.user.data ? this.$root.user.data.name : "",
        email: this.$root.user.data ? this.$root.user.data.email : "",
        phone: this.$root.user.data ? this.$root.user.data.phone : ""
      },
      selectedFile: "",

      do_change: false,
      show_change: false,
      updated: false,
      errors: "",
      error_image: false
    };
  },
  methods: {
    //https://www.academind.com/learn/vue-js/snippets/image-upload/
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },
    changeUserImage() {
      if (this.error_image == false) {
        console.log("upload image is called");
        const fd = new FormData();
        fd.append("image", this.selectedFile, this.selectedFile.name);
        fd.append("user_id", this.$root.user.data.id);
        let _this = this;
        console.log(fd);

        post(
          _this,
          "/api/updateImageUser",
          fd,
          function(response) {
            _this.user.image = response.data;
            _this.error_image = false;
            // _this.error_image = false;
            window.location.reload();
          },
          function(error) {
            console.log(error.response.data[0]);
            error.response.data[0] == "image" ? (_this.error_image = true) : "";
            window.scrollTo(0, 0);

            console.log("got error", error);
          }
        );
      }
    },
    saveChange: function() {
      console.log("post list called");
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
      let _this = this;
      post(
        this,
        "/api/update",
        {
          name: _this.user.name,
          surname: _this.user.surname,
          email: _this.user.email,
          phone: _this.user.phone,
          id: _this.$root.user.data ? _this.$root.user.data.id : ""
          // locality_id: _this.selected_locality
          //   ? _this.selected_locality.id
          //   : _this.selected_district.id,
          // password: _this.user.password,
          // address: _this.user.address
        },
        function(response) {
          // _this.show_change = true;
          // var self = this;
          // setTimeout(function() {
          //   self.show_change = false;
          // }, 3000);
          // console.log(response.data.token);
          // _this.updated = true;
          alert("Ваши данные изменены!");
          _this.do_change = false;
          // window.location.reload();
        },
        function(error) {
          _this.errors = error.response.data.error;
          console.log("got error", error);
          _this.do_change = true;
        }
      );
    }
  },
  computed: {
    changed() {
      return this.$root.user.data ? this.$root.user.data.id : "";
    },
    user_image() {
      return this.$root.user.data ? this.$root.user.data.image : "";
    }
  },
  watch: {
    selectedFile: function(val) {
      this.changeUserImage();
    },
    changed: function() {
      (this.user.surname = this.$root.user.data
        ? this.$root.user.data.surname
        : ""),
        (this.user.name = this.$root.user.data
          ? this.$root.user.data.name
          : ""),
        (this.user.email = this.$root.user.data
          ? this.$root.user.data.email
          : ""),
        (this.user.phone = this.$root.user.data
          ? this.$root.user.data.phone
          : "");
    }
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.info_main {
  width: 72%;
  border: 1px solid rgb(22, 127, 146, 0.2);
  border-radius: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
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
    width: 80%;
    line-height: 30px;
  }
  .text_right {
    width: 20%;
    padding-right: 50px;
    cursor: pointer;
    color: #a6a6a6;
    line-height: 30px;
    font-family: montserrat;
  }
  .text_right:hover {
    color: #808080;
  }
}
.infos {
  width: 60%;
}
.photo {
  width: 36%;
  padding: 0px 25px;
  img {
    border-radius: 6px;
    width: 100%;
    height: 150px;
  }
  .change {
    background-color: #5d897c;
    height: 40px;
    margin-top: 5px;
    border-radius: 3px;
    label {
      width: 100%;
      font-family: montserrat;
    }
  }
  .change:hover {
    background-color: #486a60;
  }
}
.alert_change {
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
.detail {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
.form-control {
  display: block;
  width: 100%;
  border: 1px solid #ebebeb;
  padding: 10px;
  box-sizing: border-box;
  font-family: montserrat;
}
.form-control:focus {
  border: 1px solid rgb(93, 137, 124, 0.5);
}
.col-form-label {
  font-weight: bold;
  font-family: montserrat;
  display: block;
}
.register_btn {
  input {
    border-radius: 6px;
    border: 1px solid rgb(93, 137, 124, 0.5);
    color: #0059b3;
    height: 34px;
  }
  input:hover {
    border: 1px solid rgb(93, 137, 124, 0.5);
    color: #fff;
    cursor: pointer;
  }
  width: 30%;
  margin: auto;
}
.col-9 {
  height: 37px;
}
.col-form-info {
  border-radius: 3px;
  border: 1px solid rgb(93, 137, 124, 0.1);
  color: rgb(93, 137, 124);
  height: 37px;
  width: 100%;
  padding-left: 10px;
  display: block;
  line-height: 37px;
  font-family: montserrat;
}
.make_change {
  margin-left: 60%;
  margin-right: 32px;
  text-align: right;
  margin-bottom: 20px;
  a {
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-family: montserrat;
  }
  .cancel {
    background-color: #a6a6a6;
  }
  .cancel:hover {
    background-color: #808080;
  }
  .save {
    background-color: #5d897c;
  }
  .save:hover {
    background-color: #486a60;
  }
}
::placeholder {
  font-family: monsterrat;
  color: #000;
  opacity: 0.4;
}
@media screen and (max-width: 1224px) {
  .infos {
    width: 54%;
  }
  .photo {
    width: 42%;
  }
  .detail_header {
    height: 48px;
    h2 {
      padding-left: 42px;
      width: 70%;
    }
    .text_right {
      width: 30%;
      padding-right: 42px;
      text-align: right;
    }
  }
  .make_change {
    margin-left: 64%;
    margin-bottom: 18px;
  }
}
@media screen and (max-width: 1024px) {
  .info_main {
    width: 100%;
  }
  .infos {
    width: 60%;
  }
  .photo {
    width: 36%;
  }
}
@media screen and (max-width: 802px) {
  .infos {
    width: 54%;
  }
  .photo {
    width: 42%;
  }
  .make_change {
    margin-left: 54%;
  }
}
@media screen and (max-width: 667px) {
  .infos {
    width: 80%;
    margin: 20px 10% auto 10%;
  }
  .photo {
    width: 70%;
    margin: auto 15%;
  }
  .detail_header {
    height: 48px;
    h2 {
      font-size: 14px;
      width: 60%;
      padding-left: 24px;
    }
    .text_right {
      font-size: 12px;
      width: 40%;
      padding-right: 24px;
    }
  }
  .col-form-label,
  .btn,
  .col-form-info,
  .form-control {
    font-size: 12px;
  }
  .btn {
    margin-bottom: 0;
    height: 32px;
  }
  .col-form-info {
    height: 32px;
    line-height: 16px;
    padding-top: 6px;
    overflow: scroll;
  }
  .form-control {
    height: 32px;
    line-height: 16px;
    padding-top: 8px;
  }
  .change {
    height: 32px !important;
  }
  ::placeholder {
    font-size: 14px;
  }
  .make_change {
    margin-left: 42%;
    margin-bottom: 16px;
    margin-right: 42px;
    a {
      padding: 4px 6px;
      font-size: 12px;
    }
  }
}
@media screen and (max-width: 426px) {
  .detail {
    margin-top: 6px;
  }
  .infos {
    width: 80%;
    margin: 12px 10% auto 10%;
  }
  .photo {
    width: 80%;
    margin: auto 10%;
    img {
      height: 100px;
    }
  }
  .detail_header {
    height: 48px;
    h2 {
      font-size: 13px;
      width: 60%;
      padding-left: 12px;
      line-height: 18px;
      font-weight: 550;
    }
    .text_right {
      font-size: 11px;
      width: 40%;
      padding-right: 12px;
    }
  }
  .col-form-label,
  .btn,
  .col-form-info,
  .form-control {
    font-size: 11px;
  }
  .col-form-label {
    height: 26px;
    line-height: 12px;
    padding: 0;
    padding-top: 6px;
    font-weight: 500;
  }
  .col-9 {
    height: 26px;
  }
  .col-form-info {
    height: 26px;
    line-height: 12px;
    padding-top: 6px;
    overflow: scroll;
  }
  .form-control {
    height: 26px;
    line-height: 12px;
    padding-top: 8px;
  }
  .btn {
    margin-bottom: 0;
    height: 32px;
  }
  .change {
    height: 32px !important;
  }
  ::placeholder {
    font-size: 13px;
  }
  .make_change {
    margin-left: 24%;
    a {
      font-size: 11px;
    }
  }
}
</style>
