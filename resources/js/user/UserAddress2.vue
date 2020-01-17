<template>
  <div class="address_main" v-if="$route.path == '/userAddress'">
    <div class="personal_info">
      <div class="detail_header">
        <h2>Адрес доставки</h2>

        <a class="text_right" v-on:click="do_change=true">
          <i class="fas fa-sliders-h"></i>
          <span>Изменить</span>
        </a>
      </div>
      <div v-if="errors" class="alert alert-danger">Все поля должны быть заполнены!</div>

      <div class="detail">
        <div class="infos">
          <div class="form-group row">
            <label class="col-4 col-form-label">Область</label>
            <div class="col-8 form-select">
              <select
                class="form-control"
                :class="{ 'red_border': errors && errors.name}"
                v-model="selected_region"
                @change="resetRegion()"
                v-if="do_change"
              >
                <option
                  v-for="region in regions"
                  :value="region"
                  placeholder="Akmola region"
                >{{region.name}}</option>
              </select>
              <img
                style="width: 16px;height: 16px;"
                class="form_group_notification-error"
                v-if="errors && errors.name&&do_change"
                :errors="errors"
                src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
              >
              <span
                class="form_group_notification-error"
                v-if="errors && errors.name&&do_change"
                :errors="errors"
              >Заполните это поле</span>
              <span class="col-form-info" v-if="!do_change">
                {{ user_place.length === 2?
                this.user_region = user_place[1]:this.user_region = user_place[2]}}
              </span>
            </div>
          </div>
          <div v-if="selected_region" class="form-group row">
            <label class="col-4 col-form-label">Районы/Город</label>
            <div class="col-8 form-select">
              <select
                class="form-control"
                :class="{ 'red_border': errors && errors.name}"
                v-model="selected_district"
                v-if="do_change"
              >
                <option
                  v-for="district in selected_region.districts"
                  v-if="district.region_id===selected_region.id"
                  :value="district"
                >{{district.name}}</option>
                <!-- <option
                  v-for="city in selected_region.localities"
                  v-if="city.region_id===selected_region.id"
                  :value="city"
                >{{city.name}}</option>-->
              </select>
              <img
                style="width: 16px;height: 16px;"
                class="form_group_notification-error"
                v-if="errors && errors.name&&do_change"
                :errors="errors"
                src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
              >
              <span
                class="form_group_notification-error"
                v-if="errors && errors.name&&do_change"
                :errors="errors"
              >Заполните это поле</span>
              <span
                class="col-form-info"
                v-if="!do_change"
              >{{user_place.length===3?user_place[1]:user_place[0]}}</span>
            </div>
          </div>
          <div v-if="selected_district" class="form-group row">
            <!-- v-if="user_place.length===3||selected_district&&!selected_district.is_city" -->

            <label class="col-4 col-form-label">Населенный пункт</label>
            <div class="col-8 form-select">
              <select
                class="form-control"
                :class="{ 'red_border': errors && errors.name}"
                v-model="selected_locality"
              >
                <!-- <option default value>{{('regions.select_district')}}</option> -->
                <option
                  v-for="locality in selected_district.localities"
                  v-if="selected_district&&locality.district_id===selected_district.id"
                  :value="locality"
                >{{locality.name}}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-4 col-form-label">Адрес</label>
            <div class="col-8 form-select">
              <!-- <select class="form-control" v-model="selected_address" v-if="do_change">
                <option
               
              ></option>-->

              <!-- </select> -->
              <input
                class="form-control"
                :class="{ 'red_border': errors && errors.name}"
                type="text"
                v-model="selected_address"
                v-if="do_change"
              >

              <span class="col-form-info" v-if="!do_change">{{user_address}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="make_change" v-if="do_change">
        <a class="cancel" v-on:click="do_change=false">Отменить</a>
        <a class="save" v-on:click="updateLocality();do_change=false">Сохранить</a>
      </div>
      <div class="alert alert-success" v-if="show_change">Изменения успешно сохранены!</div>
    </div>
  </div>
</template>
<script>
import { post, get } from "../helpers/api";

import MaskedInput from "vue-masked-input";
export default {
  components: {
    "masked-input": MaskedInput
  },
  data() {
    return {
      show_change: false,
      do_change: false,
      user_region: "",
      selected_region: "",
      selected_district: "",
      selected_locality: "",
      user_district: "",
      user_locality: "",
      regions: "",
      user_place: "",
      user_address: "",
      selected_address: "",
      errors: ""
    };
  },
  methods: {
    updateLocality() {
      let _this = this;
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
      post(
        this,
        "/api/locality/update",
        {
          user_id: _this.$root.user ? _this.$root.user.data.id : "",
          locality_id: _this.selected_locality.id,
          address: _this.selected_address
        },
        function(response) {
          console.log("SUCCESS");
          alert("Ваши данные успешно изменены!");
          _this.do_change = true;

          window.location.reload();
        },
        function(error) {
          console.log("got error", error);
          _this.errors = error.response.data.error;
        }
      );
    },
    resetRegion() {
      console.log("Heloos");
      let _this = this;
      if (_this.selected_region && _this.selected_district) {
        _this.selected_district = null;
        _this.selected_locality = null;
      }
    },

    // saveChange: function() {
    //   this.show_change = true;
    //   var self = this;
    //   setTimeout(function() {
    //     self.show_change = false;
    //   }, 3000);
    // },
    getRegions() {
      console.log("get address called");
      let _this = this;
      get(
        this,
        "/api/regions",
        {},
        function(response) {
          _this.regions = response.data;
          console.log("asd");

          console.log(response.data);
          console.log("asd");
          console.log(_this.regions);
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    getLocality() {
      console.log("get users locality called");
      let _this = this;
      get(
        this,
        "/api/user/locality",
        {
          params: {
            locality_id: _this.$root.user
              ? _this.$root.user.data.locality_id
              : ""
          }
        },
        function(response) {
          _this.user_place = response.data;
          console.log("asd");
          _this.assigning();

          console.log(response.data);
          console.log("asd");
          console.log(_this.regions);
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    getAddress() {
      console.log("get users address called");
      let _this = this;
      get(
        this,
        "/api/address",
        {
          params: {
            user_id: _this.$root.user ? _this.$root.user.data.id : ""
          }
        },
        function(response) {
          _this.user_address = response.data;
          console.log("asd");
          _this.assigning();

          console.log(response.data);
          console.log("asd");
          console.log(_this.regions);
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },

    assigning() {
      if (this.user_place.length === 2) {
        this.user_region = this.user_place[1];
      }
      this.user_region = this.user_place[2];
    }
  },
  mounted() {
    this.getRegions();
    // this.getLocality();
  },
  watch: {
    user_id: function() {
      this.getLocality();
      this.getAddress();
    },
    getLocality: function() {
      this.assigning();
    }
  },
  computed: {
    user_id() {
      return this.$root.user.data ? this.$root.user.data.locality_id : "";
    }
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.address_main {
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
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
}
.detail {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
    font-family: montserrat;
  }
  input:hover {
    border: 1px solid rgb(93, 137, 124, 0.5);
    color: #fff;
    cursor: pointer;
  }
  width: 30%;
  margin: auto;
}
.col-8 {
  height: 45px;
}
.col-form-info {
  font-family: montserrat;
  border-radius: 3px;
  border: 1px solid rgb(93, 137, 124, 0.1);
  color: rgb(93, 137, 124);
  height: 37px;
  width: 100%;
  padding-left: 10px;
  display: block;
  line-height: 37px;
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
.form_group_notification-error {
  font-family: montserrat;
}
.red_border {
  border-color: red;
}
::placeholder {
  font-family: montserrat;
  color: #000;
  opacity: 0.4;
}
@media screen and (max-width: 1224px) {
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
  .address_main {
    width: 100%;
  }
}
@media screen and (max-width: 802px) {
  .make_change {
    margin-left: 54%;
  }
}
@media screen and (max-width: 667px) {
  .infos {
    margin-top: 20px;
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
  .form-control,
  .form_group_notification-error {
    font-size: 12px;
  }
  .btn {
    margin-bottom: 0;
    height: 32px;
  }
  .col-form-label,
  .col4 {
    line-height: 12px;
  }
  .change {
    height: 32px !important;
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
    margin-top: 12px;
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
  .form-control,
  .form_group_notification-error {
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
    padding-top: 6px;
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
