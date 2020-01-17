<template>
  <form
    id="register-form"
    class="register_form"
    novalidate="true"
    v-if="$route.path == '/addProduct'"
  >
    <div v-if="$root.chosen_product" class="add_product_content">
      <div class="form-group-header">
        <div v-if="error&&!added" class="alert alert-danger">Заполните все обязательные поля!</div>
        <div
          v-if="error_image"
          class="alert alert-danger"
        >Загрузите фото с расширением .jpg или .png!</div>
        <h2 class="col-12 col-header">Информация продукте(изменить)</h2>
      </div>

      <div class="form-group row" v-bind:class="{'form_group-error': errors && errors.name }">
        <label class="col-3 col-form-label">
          Название
          <span style="color:red;">*</span>
        </label>

        <div class="col-9">
          <vue-bootstrap-typeahead
            v-model="selected_medicine?selected_medicine:product.name"
            :data="medicines?medicines:''"
          />

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
      </div>
      <div
        v-if="!showCat"
        class="form-group row"
        v-bind:class="{'form_group-error': errors && errors.subcat_id }"
      >
        <label class="col-3 col-form-label">
          Категория
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select v-model="update_product.cat_id">
            <option v-for="category in categories" :value="category.id">{{category.name}}</option>
          </select>

          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <!-- <div
        v-if="selected_category"
        class="form-group row"
        v-bind:class="{'form_group-error': errors && errors.subcat_id }"
      >
        <label class="col-3 col-form-label">
          Сабкатегория
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select v-model="selected_subcat" value="sds">
            <option v-for="subcat in selected_category.subcats" :value="subcat">{{subcat.name}}</option>
          </select>
          
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>-->
      <div v-bind:class="{ 'form_group-error': errors && errors.volume }" class="form-group row">
        <label class="col-3 col-form-label">
          Количество
          <span style="color:red;">*</span>
        </label>
        <div class="col-3">
          <input v-model="product.price" class="form-control" placeholder="200">
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
          >Заполните это поле</span>
        </div>
        <label class="col-3 col-form-label">
          Форма выпуска
          <span style="color:red;">*</span>
        </label>
        <div class="col-3 form-select">
          <select>
            <option disabled value>Выберите</option>
            <option v-for="volume in product.volumes">{{ volume }}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'form_group-error': errors && errors.expiration_date }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Срок годности
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-holder">
          <masked-input
            v-model="product_expiration_date"
            class="form-control"
            mask="11/1111"
            placeholder="01/2019"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.expiration_date"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.expiration_date"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'form_group-error': errors && errors.manufacturer }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Производитель
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-holder">
          <input
            v-model="update_product.manufacturer"
            class="form-control"
            type="text"
            placeholder="Ношпа"
          >
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Действующее вещество</label>
        <div class="col-9 form-holder">
          <input class="form-control" type="text" placeholder="Ношпа">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Краткое описание</label>
        <div class="col-9 form-holder">
          <textarea
            class="form-control"
            type="text"
            v-model="product_description"
            placeholder="введите несколько строчек"
          ></textarea>
        </div>
      </div>
      <div class="form-group row" id="my-strictly-unique-vue-upload-multiple-image">
        <label class="col-3 col-form-label">Добавить картинки</label>
        <div class="col-9 form-holder">
          <input type="file" @change="uploadImageSuccess">
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.price }" class="form-group row">
        <label class="col-3 col-form-label">
          Цена (тг)
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input v-model="update_product.price" class="form-control" placeholder="4200 тг">
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Наличие скидки</label>
        <div class="col-3 form-select">
          <select v-model="product_discount" class="form-control">
            <option disabled value>Выберите</option>
            <option v-for="discount in product_discounts" :key="discount.id">{{ discount }}</option>
          </select>
        </div>
        <label class="col-3 col-form total_col">Итого</label>
        <div class="col-3 form-holder">
          <div class="col-form">{{product_total_price}}</div>
        </div>
      </div>
    </div>
    <div v-if="$root.chosen_product" class="add_product_content content_second">
      <div class="form-group-header">
        <h2 class="col-12 col-header">Информация о доставке</h2>
      </div>
      <div
        class="form-group row"
        v-bind:class="{ 'has-error': errors && errors.product_available_all }"
      >
        <label class="col-3 col-form-label">
          По всему Казахстану
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <b-form-checkbox id="checkbox1" v-model="product_available_all" value="accepted1"></b-form-checkbox>
          <form-error
            v-if="errors && errors.product_available_all"
            :errors="errors"
          >{{ errors.product_available_all[0] }}</form-error>
        </div>
      </div>

      <div v-if="updating_place" class="form-group row">
        <label class="col-3 col-form-label">
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
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-if="updating_place&&selected_region" class="form-group row">
        <label class="col-3 col-form-label">
          Районы/Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_district">
            -->
            <!-- <option default value>{{('')}}</option>-->

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
      <div v-if="updating_place&&selected_district" class="form-group row">
        <label class="col-3 col-form-label">
          Населенный пункт
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_locality">
            <!-- <option default value>{{('regions.select_district')}}</option> -->
            <option
              v-for="locality in selected_district.localities"
              v-if="locality.district_id===selected_district.id"
              :value="locality"
            >{{locality.name}}</option>
          </select>
        </div>
      </div>
      <div @click="resetUpdateRegion()" v-if="!updating_place" class="form-group row">
        <label class="col-3 col-form-label">
          Области
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select
            class="form-control"
            @change="resetUpdateRegion()"
            v-model="user_region[0]?user_region[0].id:user_region.id
          "
          >
            <option
              v-if="regions"
              v-for="region in regions"
              :value="region.id"
              placeholder="Akmola region"
            >{{region.name}}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-if="user_district" class="form-group row">
        <label @click="asd()" class="col-3 col-form-label">
          Районы/Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select
            v-if="user_district.length===1"
            class="form-control"
            v-model="user_district[0].id"
          >
            <!-- when user district with locality (raion) -->
            <option
              v-for="district in user_region[0].districts"
              v-if="district.region_id===user_region[0].id"
              :value="district.id"
            >{{district.name}}</option>
            <option
              v-for="city in user_region[0].localities"
              v-if="city.region_id===user_region[0].id"
              :value="city.id"
            >{{city.name}}</option>
          </select>
          <!-- when user district length -->

          <select v-else class="form-control" v-model="user_district">
            <option v-for="city in user_locality" :value="city.id">{{city.name}}</option>
          </select>
        </div>
      </div>

      <div v-if="!user_locality.length" class="form-group row">
        <label class="col-3 col-form-label">
          Населенный пункт
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="user_locality">
            <option
              v-for="locality in user_district[0].localities"
              v-if="locality.district_id===user_district[0].id"
              :value="locality.id"
            >{{locality.name}}</option>
          </select>
        </div>
      </div>
      <div
        v-bind:class="{ 'has-error': errors && errors.product_shipping_free }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">Бесплатная доставка</label>
        <div class="col-9">
          <b-form-checkbox id="checkbox2" v-model="product_shipping_free" value="accepted2"></b-form-checkbox>
          <form-error
            v-if="errors && errors.product_shipping_free"
            :errors="errors"
          >{{ errors.product_shipping_free[0] }}</form-error>
        </div>
      </div>
      <div
        id="editor"
        v-bind:class="{ 'has-error': errors && errors.product_shipping_info }"
        class="form-group row"
      >
        <label class="col-3 col-form">Доп. информация</label>
        <div class="col-9">
          <textarea
            class="form-control"
            type="text"
            v-model="product_shipping_info"
            placeholder="введите несколько строчек"
          ></textarea>
          <form-error
            v-if="errors && errors.product_shipping_info"
            :errors="errors"
          >{{ errors.product_shipping_info[0] }}</form-error>
        </div>
      </div>
      <div class="add_product_btn">
        <a
          class="button button-primary button-block form_button"
          @click.prevent="updateProduct()"
        >Добавить продукт</a>
      </div>
    </div>
    <div v-if="!$root.chosen_product" class="add_product_content">
      <div class="form-group-header">
        <div v-if="error&&!added" class="alert alert-danger">Заполните все обязательные поля!</div>
        <div
          v-if="error_image"
          class="alert alert-danger"
        >Загрузите фото с расширением .jpg или .png!</div>
        <h2 class="col-12 col-header">Информация продукте</h2>
      </div>

      <div class="form-group row" v-bind:class="{'form_group-error': errors && errors.name }">
        <label class="col-3 col-form-label">
          Название
          <span style="color:red;">*</span>
        </label>

        <div class="col-9">
          <vue-bootstrap-typeahead v-model="selected_medicine" :data="medicines?medicines:''"/>
          <!-- <model-select :options="medicines" v-model="product.name" placeholder="select item2"></model-select> -->
          <!-- <kendo-autocomplete
            :data-source="medicines"
            :filter="'contains'"
            :placeholder="'Выберите лекарстов из списка'"
            v-model="selected_medicine"
          ></kendo-autocomplete>-->
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
      </div>
      <div class="form-group row" v-bind:class="{'form_group-error': errors && errors.subcat_id }">
        <label class="col-3 col-form-label">
          Категория
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select v-model="selected_category" value="sds">
            <option v-for="category in categories" :value="category">{{category.name}}</option>
          </select>

          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.name"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-if="selected_category"
        class="form-group row"
        v-bind:class="{'form_group-error': errors && errors.subcat_id }"
      >
        <label class="col-3 col-form-label">
          Сабкатегория
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select v-model="selected_subcat" value="sds">
            <option v-for="subcat in selected_category.subcats" :value="subcat">{{subcat.name}}</option>
          </select>

          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.volume }" class="form-group row">
        <label class="col-3 col-form-label">
          Количество
          <span style="color:red;">*</span>
        </label>
        <div class="col-3">
          <input v-model="product.price" class="form-control" placeholder="200">
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
          >Заполните это поле</span>
        </div>
        <label class="col-3 col-form-label">
          Форма выпуска
          <span style="color:red;">*</span>
        </label>
        <div class="col-3 form-select">
          <select v-model="selected_volume">
            <option disabled value>Выберите</option>
            <option v-for="volume in product.volumes">{{ volume }}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'form_group-error': errors && errors.expiration_date }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Срок годности
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-holder">
          <masked-input
            v-model="product_expiration_date"
            class="form-control"
            mask="11/1111"
            placeholder="01/2019"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.expiration_date"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.expiration_date"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-bind:class="{ 'form_group-error': errors && errors.manufacturer }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Производитель
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-holder">
          <input
            v-model="product.manufacturer"
            class="form-control"
            type="text"
            placeholder="Ношпа"
          >
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Действующее вещество</label>
        <div class="col-9 form-holder">
          <input class="form-control" type="text" placeholder="Ношпа">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Краткое описание</label>
        <div class="col-9 form-holder">
          <textarea
            class="form-control"
            type="text"
            v-model="product_description"
            placeholder="введите несколько строчек"
          ></textarea>
        </div>
      </div>
      <div class="form-group row" id="my-strictly-unique-vue-upload-multiple-image">
        <label class="col-3 col-form-label">Добавить картинки</label>
        <div class="col-9 form-holder">
          <input type="file" @change="uploadImageSuccess">
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.price }" class="form-group row">
        <label class="col-3 col-form-label">
          Цена (тг)
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input v-model="product.price" class="form-control" placeholder="4200 тг">
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Наличие скидки</label>
        <div class="col-3 form-select">
          <select v-model="product_discount" class="form-control">
            <option disabled value>Выберите</option>
            <option v-for="discount in product_discounts" :key="discount.id">{{ discount }}</option>
          </select>
        </div>
        <label class="col-3 col-form total_col">Итого</label>
        <div class="col-3 form-holder">
          <div class="col-form">{{product_total_price}}</div>
        </div>
      </div>
    </div>
    <div v-if="!$root.chosen_product" class="add_product_content content_second">
      <div class="form-group-header">
        <h2 class="col-12 col-header">Информация о доставке</h2>
      </div>
      <div
        class="form-group row"
        v-bind:class="{ 'has-error': errors && errors.product_available_all }"
      >
        <label class="col-3 col-form-label">
          По всему Казахстану
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <b-form-checkbox id="checkbox1" v-model="product_available_all" value="accepted1"></b-form-checkbox>
          <form-error
            v-if="errors && errors.product_available_all"
            :errors="errors"
          >{{ errors.product_available_all[0] }}</form-error>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form-label">
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
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>

      <div v-if="selected_region" class="form-group row">
        <label class="col-3 col-form-label">
          Районы/Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_district">
            <!-- <option default value>{{('')}}</option> -->
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
            <!-- <option default value>{{('regions.select_district')}}</option> -->
            <option
              v-for="locality in selected_district.localities"
              v-if="locality.district_id===selected_district.id"
              :value="locality"
            >{{locality.name}}</option>
          </select>
        </div>
      </div>
      <div
        v-bind:class="{ 'has-error': errors && errors.product_shipping_free }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">Бесплатная доставка</label>
        <div class="col-9">
          <b-form-checkbox id="checkbox2" v-model="product_shipping_free" value="accepted2"></b-form-checkbox>
          <form-error
            v-if="errors && errors.product_shipping_free"
            :errors="errors"
          >{{ errors.product_shipping_free[0] }}</form-error>
        </div>
      </div>
       <!-- <div v-if="updating_place" class="form-group row">
        <label class="col-3 col-form-label">
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
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-if="updating_place&&selected_region" class="form-group row">
        <label class="col-3 col-form-label">
          Районы/Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_district">
            -->
            <!-- <option default value>{{('')}}</option>-->

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
      <div v-if="updating_place&&selected_district" class="form-group row">
        <label class="col-3 col-form-label">
          Населенный пункт
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_locality">
            <!-- <option default value>{{('regions.select_district')}}</option> -->
            <option
              v-for="locality in selected_district.localities"
              v-if="locality.district_id===selected_district.id"
              :value="locality"
            >{{locality.name}}</option>
          </select>
        </div>
      </div>
      <div @click="resetUpdateRegion()" v-if="!updating_place" class="form-group row">
        <label class="col-3 col-form-label">
          Области
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select
            class="form-control"
            @change="resetUpdateRegion()"
            v-model="user_region[0]?user_region[0].id:user_region.id
          "
          >
            <option
              v-if="regions"
              v-for="region in regions"
              :value="region.id"
              placeholder="Akmola region"
            >{{region.name}}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          >
          <span
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-if="user_district" class="form-group row">
        <label @click="asd()" class="col-3 col-form-label">
          Районы/Город
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select
            v-if="user_district.length===1"
            class="form-control"
            v-model="user_district[0].id"
          >
            <!-- when user district with locality (raion) -->
            <option
              v-for="district in user_region[0].districts"
              v-if="district.region_id===user_region[0].id"
              :value="district.id"
            >{{district.name}}</option>
            <option
              v-for="city in user_region[0].localities"
              v-if="city.region_id===user_region[0].id"
              :value="city.id"
            >{{city.name}}</option>
          </select>
          <!-- when user district length -->

          <select v-else class="form-control" v-model="user_district">
            <option v-for="city in user_locality" :value="city.id">{{city.name}}</option>
          </select>
        </div>
      </div>

      <div v-if="!user_locality.length" class="form-group row">
        <label class="col-3 col-form-label">
          Населенный пункт
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="user_locality">
            <option
              v-for="locality in user_district[0].localities"
              v-if="locality.district_id===user_district[0].id"
              :value="locality.id"
            >{{locality.name}}</option>
          </select>
        </div>
      </div>
      <div
        id="editor"
        v-bind:class="{ 'has-error': errors && errors.product_shipping_info }"
        class="form-group row"
      >
        <label class="col-3 col-form">Доп. информация</label>
        <div class="col-9">
          <textarea
            class="form-control"
            type="text"
            v-model="product_shipping_info"
            placeholder="введите несколько строчек"
          ></textarea>
          <form-error
            v-if="errors && errors.product_shipping_info"
            :errors="errors"
          >{{ errors.product_shipping_info[0] }}</form-error>
        </div>
      </div>
      <div class="add_product_btn">
        <a
          class="button button-primary button-block form_button"
          @click.prevent="storeProduct()"
        >Добавить продукт</a>
      </div>
    </div>
  </form>
</template>
<script>
import MaskedInput from "vue-masked-input";
import vSelect from "vue-select";
import { get, post } from "../../helpers/api";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import VueSearchSelect from "vue-search-select";
export default {
  components: {
    "masked-input": MaskedInput,
    "v-select": vSelect,
    VueBootstrapTypeahead
  },

  data() {
    return {
      product: {
        name: this.$root.product ? this.$root.product.name : "",
        locality_id: "",
        seller_id: "",
        manufacturer: "",
        price: "",
        subcat_id: "",
        volumes: [1, 2, 3],
        image: ""
      },
      error: false,
      errors: [],
      formSending: false,
      regions: "",
      districts: "",
      localities: "",
      added: false,
      selected_category: null,
      selected_subcat: null,
      selected_region: null,
      selected_district: null,
      selected_locality: null,
      selected_volume: null,
      selected_medicine: null,
      categories: "",
      regions: "",
      medicines: "",
      product_shipping_free: "",
      product_available: "",
      product_description: "",
      product_available_all: "",
      product_discount: "",
      product_discounts: "",
      product_expiration_date: "",
      product_shipping_info: "",
      product_total_price: "",
      error_image: false,
      show_change: "",
      image_clean: false,
      selectedFile: "",
      update_product: this.$root.chosen_product
        ? this.$root.chosen_product
        : "",
      chosen_category_name: "",
      user_place: "",
      user_district: this.$root.user_district ? this.$root.user_district : "",
      user_locality: this.$root.user_locality ? this.$root.user_locality : "",
      showCat: false,
      chosen_region: "",
      user_region: this.$root.user_region ? this.$root.user_region : "",
      select_new_district: false,
      updating_place: false,
      updating_region: "",
      updating_district: "",
      updating_locality: ""
    };
  },

  methods: {
    ChangeCat() {
      this.showCat = true;
      console.log(this.chosen_category_name[0]);
    },
    uploadImageSuccess(event) {
      this.selectedFile = event.target.files[0];

      if (this.error_image == false) {
        console.log("upload image is called");
        const fd = new FormData();
        fd.append("image", this.selectedFile, this.selectedFile.name);
        fd.append("user_id", this.$root.user.data.id);
        let _this = this;
        console.log(fd);

        post(
          _this,
          "/api/uploadImage",
          fd,
          function(response) {
            _this.product.image = response.data;
            _this.error_image = false;
            // _this.error_image = false;
            // window.location.reload();
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

    imageChanged(e) {
      this.selectedFile = e.target.files[0];
      // console.log(e.target);
      // let fileReader = new FileReader();

      // fileReader.readAsDataURL(e.target.files[0]);
      // fileReader.onload = e => {
      //   this.product.image = e.target.result;

      // e.target.result;
      // console.log(e);
      // console.log(e.target.result);
      const fd = new FormData();
      fd.append("image", this.product.image, this.product.image.name);
      this.product.image = fd;
      console.log(this.product.image);
    },
    resetRegion() {
      if (this.selected_region && this.selected_district) {
        this.selected_district = null;
        this.selected_locality = null;
      }
    },
    resetUpdateRegion() {
      if (this.user_district && this.user_locality) {
        this.user_district = null;
        this.user_locality = null;
        this.updating_place = true;
      }
    },
    storeProduct() {
      console.log("post called");
      let _this = this;
      console.log(_this.selected_category);
      window.scrollTo(0, 0);
      if (_this.error_image == false) {
        post(
          this,
          "/api/products/create",
          {
            name: _this.selected_medicine,
            cat_id: _this.selected_category ? _this.selected_category.id : "",
            locality_id: _this.selected_locality
              ? _this.selected_locality.id
              : _this.selected_district
              ? _this.selected_district.id
              : "",
            user_id: _this.$root.user.data.id,
            manufacturer: _this.product.manufacturer,
            price: _this.product.price,
            user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
            volume: _this.selected_volume ? _this.selected_volume : "",
            image: _this.product.image
          },
          function(response) {
            console.log(response);
            alert("продукт добавлен!");
            window.location.reload();
            _this.error = "";
            _this.added = true;
            // window.scrollTo(0, 0);
            _this.product.name = "";
            (_this.product.price = ""),
              (_this.product_expiration_date = ""),
              (_this.selected_region = null),
              (_this.selected_district = null),
              (_this.selected_locality = null),
              (_this.selected_subcat = null),
              (_this.selected_volume = "");
            _this.selected_category = "";
            _this.product.manufacturer = "";
            _this.image_clean = true;
            _this.beforeRemove();
            _this.added = true;
          },
          function(error) {
            _this.formSending = false;
            _this.error = true;
            _this.errors = error.response.data.error;
            console.log(error.response.data[0]);
            window.scrollTo(0, 0);
          }
        );
      }
    },
    updateProduct() {
      console.log("update called");
      let _this = this;
      window.scrollTo(0, 0);
      if (_this.error_image == false) {
        post(
          this,
          "/api/products/update",
          {
            product_id: _this.update_product.id,
            name: _this.update_product.name,
            cat_id: _this.update_product ? _this.update_product.cat_id : "",
            locality_id: _this.selected_locality
              ? _this.selected_locality.id
              : // : _this.selected_district
                // ? _this.selected_district.id
                _this.user_locality,
            manufacturer: _this.update_product.manufacturer,
            price: _this.update_product.price,
            user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
            // volume: _this.update_product.volume,
            image: _this.product.image
          },
          function(response) {
            console.log(response);
            alert("продукт изменен!");
            _this.error = "";
            _this.added = true;
            // window.scrollTo(0, 0);
            _this.$root.chosen_product = null;
            _this.$root.user_district = "";
            _this.$root.user_locality = "";
            _this.$root.user_region = null;
            _this.$router.push({ name: "Мои продукты" });

            _this.image_clean = true;
            _this.beforeRemove();
            _this.added = true;
          },
          function(error) {
            _this.formSending = false;
            _this.error = true;
            _this.errors = error.response.data.error;
            console.log(error.response.data[0]);
            window.scrollTo(0, 0);
          }
        );
      }
    },
    getCategory() {
      console.log("get categories called");
      let _this = this;
      get(
        this,
        "/api/categories",
        {},
        function(response) {
          _this.categories = response.data;
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    getMedicine() {
      let _this = this;
      console.log("get med");
      if (_this.selected_medicine.length == 1) {
        console.log("get medicine called");
        get(
          this,
          "/api/medicine",
          {
            params: {
              search_medicine: _this.selected_medicine
            }
          },
          function(response) {
            _this.medicines = response.data;
            console.log(response.data);
            console.log(_this.regions);
          },
          function(error) {
            console.log("got error", error);
          }
        );
      }
    },
    getRegions() {
      console.log("get address called");
      let _this = this;
      get(
        this,
        "/api/regions",
        {},
        function(response) {
          _this.regions = response.data;
          console.log(response.data);
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    asd() {
      console.log(this.user_district.length);
    },

    // uploadImageSuccess(formData, index, fileList) {
    //   console.log("data", formData, index, fileList);
    //   console.log("asd");
    //   let _this = this;
    //   post(
    //     this,
    //     "/api/uploadImage",
    //     formData,
    //     function(response) {
    //       _this.product.image = response.data;
    //       _this.error_image = false;
    //     },
    //     function(error) {
    //       error.response.data[0] == "image" ? (_this.error_image = true) : "";
    //       window.scrollTo(0, 0);

    //       console.log("got error", error);
    //     }
    //   );
    // },
    saveChange: function() {
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
      self.added = false;
    },
    // Upload image api

    beforeRemove(index, done, fileList) {
      if (this.image_clean == true) {
        done();
      } else {
        var r = confirm("Картина будет удалена");
        if (r == true) {
          done();
        } else {
        }
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
      let _this = this;
      post(
        this,
        "/api/uploadImage",
        formData,
        function(response) {
          _this.product.image = response.data;
          _this.error_image = false;
        },
        function(error) {
          error.response.data[0] == "image" ? (_this.error_image = true) : "";
          window.scrollTo(0, 0);

          console.log("got error", error);
        }
      );
    },
    dataChange(data) {
      console.log(data);
    }

    // getCategoryName() {
    //   console.log("get category name");
    //   let _this = this;
    //   get(
    //     this,
    //     "/api/category",
    //     {
    //       params: {
    //         category_id: _this.update_product ? _this.update_product.cat_id : ""
    //       }
    //     },
    //     function(response) {
    //       _this.chosen_category_name = response.data;
    //       console.log("asd");

    //       console.log(response.data);
    //       console.log("asd");
    //     },
    //     function(error) {
    //       console.log("got error", error);
    //     }
    //   );
    // }
  },
  watch: {
    search_medicine: function(val) {
      this.getMedicine();
    },
    update_product: function() {
      this.selected_medicine = this.$root.chosen_product.name;
    }
  },
  computed: {
    // marketplace_id() {
    //   return this.marketplace && this.marketplace.hasOwnProperty("value")
    //     ? this.marketplace.value
    //     : 0;
    // },
    // product_total_price: function() {
    //   return (
    //     (100 - this.product_discount) *
    //     0.01 *
    //     this.product.price
    //   ).toFixed(0);
    // },
    search_medicine: function() {
      return this.selected_medicine;
    },
    chosen_product: function() {
      return this.$root.chosen_product;
    }
  },

  created() {
    this.getCategory();
    this.getRegions();
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
.content_second {
  margin-top: 50px;
  margin-bottom: 200px;
}
.form-group-header {
  border-bottom: 1px solid rgb(22, 127, 146, 0.8);
  margin-bottom: 50px;
  position: relative;
  width: 100%;
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
  width: 74%;
  margin: auto;
}
.add_product_content {
  background-color: #fff;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  padding: 48px 9%;
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

.form-row {
  margin: 0 -15px;
}
.form-group {
  margin-bottom: 23px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  .form-control {
    border-radius: 3px;
  }
}
.form-select {
  select {
    border-radius: 3px;
    width: 100%;
    border: 1px solid #ebebeb;
    padding: 5px 20px;
    margin: 0;
  }
}
.form-control {
  display: block;
  width: 100%;
  border: 1px solid #ebebeb;
  padding: 10px 20px;
  box-sizing: border-box;
  font-family: "Montserrat";
}
.col-9 {
  padding-right: 0px !important;
}
.form-control:focus {
  border: 1px solid #0059b3;
}
label {
  font-weight: bold;
  margin-bottom: 2px;
  display: block;
}

.add_product_btn {
  a {
    border-radius: 6px;
    height: 40px;
    color: #fff !important;
    cursor: pointer !important;
    border: 1px solid #167f92 !important;
    background-color: #167f92 !important;
    width: 30%;
  }
  a:hover {
    color: #fff !important;
    border: 1px solid #324b51 !important;
    background-color: #324b51 !important;
  }
  text-align: center !important;
}
.form_group-error .form-control,
.form_group-error .form-select select {
  border: 1px solid red;
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
  .form-select select {
    padding: 5px 10px;
  }
  ::placeholder {
    font-size: 14px;
  }
}
@media screen and (max-width: 1024px) {
  .register_form {
    width: 90% !important;
    margin-top: 10px;
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
  .add_product_btn {
    a {
      border-radius: 3px;
      font-size: 12px !important;
      width: 40% !important;
    }
  }
  ::placeholder {
    font-size: 12px;
  }
}
@media screen and (max-width: 667px) {
  .register_form {
    width: 100% !important;
    margin-top: 10px;
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
  .add_product_btn {
    a {
      border-radius: 3px;
      width: 66% !important;
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
  .form-control {
    height: 24px;
  }
  .col-form-label,
  .col-form {
    padding-left: 4px !important;
  }
  .total_col {
    padding-left: 10px;
  }
  .add_product_btn {
    a {
      font-size: 10px;
      width: 78% !important;
    }
  }
}
</style>



