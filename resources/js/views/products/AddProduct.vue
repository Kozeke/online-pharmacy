<template>
  <form
    id="register-form"
    class="register_form"
    novalidate="true"
    v-if="$route.path == '/addProduct'"
  >
    <div v-if="!$root.chosen_product" class="add_product_content">
      <div class="form-group-header">
        <div v-if="error&&!added" class="alert alert-danger">Заполните все обязательные поля!</div>
        <div
          v-if="error_image"
          class="alert alert-danger"
        >Загрузите фото с расширением .jpg или .png!</div>
        <div v-if="error_size" class="alert alert-danger">Память фото не должно превышать 5 мб.</div>
        <h2 class="col-12 col-header">Информация о продукте</h2>
      </div>

      <div class="form-group row">
        <label class="col-3 col-form-label">
          Название
          <span style="color:red;">*</span>
        </label>
        <div class="col-9" style="z-index: 999;">
          <!-- <vue-bootstrap-typeahead v-model="selected_medicine" :data="medicines?medicines:''"/> -->
          <!-- <select class="form-control" v-model="selected_medicine">
            <option disabled value>Выберите</option>
            <option v-for="medicine in medicines">{{ medicine }}</option>
          </select>-->
          <multiselect
            v-model="selected_medicine"
            label="name"
            track-by="id"
            placeholder="Type to search"
            open-direction="bottom"
            :options="medicines"
            :multiple="false"
            :searchable="true"
            :internal-search="false"
            :clear-on-select="false"
            :close-on-select="true"
            :max-height="15"
            :options-limit="30"
            :show-no-results="false"
            :loading="isLoading"
            :hide-selected="true"
            @search-change="getMedicine"
          >
            <template slot="tag" slot-scope="{ option, remove }">
              <span class="custom__tag">
                <span>{{ option }}</span>
                <span class="custom__remove" @click="remove(option)">❌</span>
              </span>
            </template>
            <!-- <template slot="clear" slot-scope="props">
            <div
                class="multiselect__clear"
                v-if="selected_.length"
                @mousedown.prevent.stop="clearAll(props.search)"
            ></div>
            </template>-->
            <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>
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
      <div class="form-group row">
        <label class="col-3 col-form-label">
          Категория
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select
            class="form-control"
            v-model="selected_category"
            value="sds"
            :class="{ 'red_border': errors && errors.cat_id}"
          >
            <option v-for="category in categories" :value="category">{{category.name}}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.cat_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.cat_id"
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
          Сабкатегория<span style="color:red;">*</span>
        </label>
        <div class="col-9 form-select">
          <select class="form-control" v-model="selected_subcat" value="sds" :class="{ 'red_border': errors && errors.name}">
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
      <div v-bind:class="{ 'form_group-error': errors && errors.dose }" class="form-group row">
        <label class="col-3 col-form">Форма выпуска</label>

        <div class="col-3 form-select">
          <select class="form-control" v-model="selected_form">
            <option disabled value>Выберите</option>
            <option v-for="form in forms">{{ form }}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.form"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.form"
            :errors="errors"
          >Заполните это поле</span>
        </div>
        <label class="col-2 col-form">Дозировка</label>
        <div class="col-3 form-select">
          <input v-model="selected_dose" class="form-control" placeholder="250мг" />
        </div>
      </div>
      <!-- <label class="col-3 col-form-label">
        Количество
        <span style="color:red;">*</span>
      </label>
      <div class="col-3 form-select">
        <input
          v-model="product.count"
          class="form-control"
          placeholder="200"
          :class="{ 'red_border': errors && errors.name}"
        >
        <img
          style="width: 16px;height: 16px;"
          class="form_group_notification-error"
          v-if="errors && errors.count"
          :errors="errors"
          src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
        >
        <span
          class="form_group_notification-error"
          v-if="errors && errors.count"
          :errors="errors"
        >Заполните это поле</span>
      </div>
      <div class="col-3 form-select">
        <select
          class="form-control"
          v-model="selected_volume"
          :class="{ 'red_border': errors && errors.name}"
        >
          <option disabled value>Выберите</option>
          <option v-for="volume in volumes">{{ volume }}</option>
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
      </div>-->
      <div v-bind:class="{ 'form_group-error': errors && errors.dose }" class="form-group row">
        <label class="col-3 col-form-label">
          Количество
          <span style="color:red;">*</span>
        </label>
        <div class="col-3">
          <input
            v-model="count"
            class="form-control"
            placeholder="200"
            :class="{ 'red_border': errors && errors.count}"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.count"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.count"
            :errors="errors"
          >Заполните это поле</span>
        </div>
        <div class="col-3 form-select">
          <select
            class="form-control"
            v-model="selected_volume"
            :class="{ 'red_border': errors && errors.volume}"
          >
            <option disabled value>Выберите</option>
            <option v-for="volume in volumes">{{ volume }}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.volume"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.volume"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.volume }" class="form-group row">
        <label class="col-3 col-form-label">
          Срок годности
          <span style="color:red;">*</span>
        </label>
        <div class="col-9 form-holder">
          <masked-input
            v-model="product_expiration_date"
            class="form-control"
            mask="11-11-1111"
            placeholder="07-08-2021"
            :class="{ 'red_border': errors && errors.expiration_date}"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.expiration_date"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
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
          <!-- <span style="color:red;">*</span> -->
        </label>
        <div class="col-9 form-holder">
          <input
            v-model="product.manufacturer"
            class="form-control"
            type="text"
            placeholder="Ношпа"
            :class="{ 'red_border': errors && errors.manufacturer  }"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
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
          <input v-model="substanse" class="form-control" type="text" placeholder="Ношпа" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Краткое описание</label>
        <div class="col-9 form-holder">
          <textarea
            class="form-control"
            type="text"
            v-model="annotation"
            placeholder="причина продажи"
          ></textarea>
        </div>
      </div>
      <div class="form-group row" id="my-strictly-unique-vue-upload-multiple-image">
        <label class="col-3 col-form-label">Добавить картинки</label>
        <div class="col-9 form-holder">
          <input type="file" @change="uploadImageSuccess" />
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.price }" class="form-group row">
        <label class="col-3 col-form-label">
          Цена (тг)
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            v-model="product.price"
            class="form-control"
            placeholder="4200 тг"
            :class="{ 'red_border': errors && errors.price_initial}"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.price_initial"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.price_initial"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Наличие скидки</label>
        <div class="col-3 form-select">
          <input v-model="product_discount" class="form-control" placeholder />
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
      <div class="form-group row">
        <label class="col-3 col-form-label">
          Город
          <span style="color:red;">*</span>
        </label>
        <div
          v-b-tooltip.hover
          title="Введите город откуда можно будет забрать добавляемое лекарство"
          class="col-9 form-select"
        >
          <select
            :class="{ 'red_border': errors && errors.locality_id}"
            class="form-control"
            v-model="selected_city"
          >
            <option v-for="city in cities" :value="city">{{city.name}}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.locality_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div class="form-group row" v-bind:class="{ 'has-error': errors_dostavka }">
        <label class="col-3 col-form-label">
          Воспользоваться курьерской службой?
          <span style="color:red;">*</span>
        </label>
        <div class="col-4">
          <label class="col-1 col-form-label">да</label>
          <b-form-checkbox id="checkbox1" v-model="dostavil" value="1"></b-form-checkbox>
          <form-error v-if=" errors_dostavka" :errors="errors">Выберите способ доставки</form-error>
        </div>
        <div class="col-4">
          <label class="col-4 col-form-label">нет, я сам могу доставить</label>
          <b-form-checkbox id="checkbox" v-model="dostavil" value="2"></b-form-checkbox>
          <form-error v-if="errors && errors.dostavka" :errors="errors">{{ errors.dostavka[0] }}</form-error>
        </div>
      </div>

      <div class="col-9"></div>
      <div
        v-b-tooltip.hover
        title="Введите адресс откуда можно будет забрать добавляемое лекарство"
        v-if="dostavil==1"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Адрес
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.address}"
            type="text"
            v-model="selected_address"
            placeholder="проспект Кабанбай батыр 53, 11/2"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.address"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.address"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-if="dostavil==2"
        v-bind:class="{ 'has-error': errors && errors.product_shipping_free }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">Бесплатная доставка</label>
        <div class="col-9">
          <b-form-checkbox id="checkbox2" v-model="product_shipping_free" value="1"></b-form-checkbox>
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
            v-model="extra_field"
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
          @click.prevent="isPharm?storeProductPharm():storeProduct()"
        >Добавить продукт</a>
      </div>
    </div>

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
          <multiselect
            v-model="selected_medicine"
            label="name"
            track-by="id"
            placeholder="Type to search"
            open-direction="bottom"
            :options="medicines"
            :multiple="false"
            :searchable="true"
            :internal-search="false"
            :clear-on-select="false"
            :close-on-select="true"
            :max-height="15"
            :options-limit="30"
            :show-no-results="false"
            :loading="isLoading"
            :hide-selected="true"
            @search-change="getMedicine"
          >
            <template slot="tag" slot-scope="{ option, remove }">
              <span class="custom__tag">
                <span>{{ option }}</span>
                <span class="custom__remove" @click="remove(option)">❌</span>
              </span>
            </template>
            <!-- <template slot="clear" slot-scope="props">
            <div
                class="multiselect__clear"
                v-if="selected_.length"
                @mousedown.prevent.stop="clearAll(props.search)"
            ></div>
            </template>-->
            <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>

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
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.subcat_id"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.volume }" class="form-group row">
        <label class="col-3 col-form">Форма выпуска</label>
        <img
          style="width: 16px;height: 16px;"
          class="form_group_notification-error"
          v-if="errors && errors.volume"
          :errors="errors"
          src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
        />
        <span
          class="form_group_notification-error"
          v-if="errors && errors.volume"
          :errors="errors"
        >Заполните это поле</span>
        <div class="col-3 form-select">
          <select class="form-control" v-model="update_product.form">
            <option disabled value>Выберите</option>
            <option v-for="form in forms">{{ form }}</option>
          </select>
        </div>

        <label class="col-2 col-form">Дозировка</label>
        <div class="col-3 form-select">
          <input v-model="update_product.dose" class="form-control" placeholder="250мг" />
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.dose }" class="form-group row">
        <label class="col-3 col-form-label">
          Количество
          <span style="color:red;">*</span>
        </label>
        <div class="col-3">
          <input
            v-model="update_product.count"
            class="form-control"
            placeholder="200"
            :class="{ 'red_border': errors && errors.count}"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.count"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.count"
            :errors="errors"
          >Заполните это поле</span>
        </div>
        <div class="col-3 form-select">
          <select
            class="form-control"
            v-model="update_product.volume"
            :class="{ 'red_border': errors && errors.volume}"
          >
            <option disabled value>Выберите</option>
            <option v-for="volume in volumes">{{ volume }}</option>
          </select>
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.volume"
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
            v-model="update_product.expiration_date"
            class="form-control"
            mask="1111-11-11"
            placeholder="2021-12-20"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.expiration_date"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
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
          <!-- <span style="color:red;">*</span> -->
        </label>
        <div class="col-9 form-holder">
          <input
            v-model="update_product.manufacturer"
            class="form-control"
            type="text"
            placeholder="Ношпа"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.manufacturer"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
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
          <input
            v-model="update_product.substanse"
            class="form-control"
            type="text"
            placeholder="Ношпа"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form">Краткое описание</label>
        <div class="col-9 form-holder">
          <textarea
            class="form-control"
            type="text"
            v-model="update_product.annotation"
            placeholder="введите несколько строчек"
          ></textarea>
        </div>
      </div>
      <div class="form-group row" id="my-strictly-unique-vue-upload-multiple-image">
        <label class="col-3 col-form-label">Добавить картинки</label>
        <div class="col-9 form-holder">
          <input type="file" @change="uploadImageSuccess" />
        </div>
      </div>
      <div v-bind:class="{ 'form_group-error': errors && errors.price }" class="form-group row">
        <label class="col-3 col-form-label">
          Цена (тг)
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input v-model="update_product.price_initial" class="form-control" placeholder="4200 тг" />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.price"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
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
          <input
            v-model="update_product.discount_in_percent"
            class="form-control"
            type="text"
            placeholder="Ношпа"
          />
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
      <div class="form-group row">
        <label class="col-3 col-form-label">
          Город
          <span style="color:red;">*</span>
        </label>
        <div
          v-b-tooltip.hover
          title="Введите город откуда можно будет забрать добавляемое лекарство"
          class="col-9 form-select"
        >
          <select
            :class="{ 'red_border': errors && errors.locality_id}"
            class="form-control"
            v-model="update_product.locality_id"
          >
            <option v-for="city in cities" :value="city.id">{{city.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row" v-bind:class="{ 'has-error': errors_dostavka }">
        <label class="col-3 col-form-label">
          Воспользоваться курьерской службой?
          <span style="color:red;">*</span>
        </label>
        <div class="col-4">
          <label class="col-1 col-form-label">да</label>
          <b-form-checkbox id="checkbox1" v-model="update_product.shipping" value="1"></b-form-checkbox>
          <form-error v-if=" errors_dostavka" :errors="errors">Выберите способ доставки</form-error>
        </div>
        <div class="col-4">
          <label class="col-4 col-form-label">нет, я сам могу доставить</label>
          <b-form-checkbox id="checkbox" v-model="update_product.shipping" value="2"></b-form-checkbox>
          <form-error v-if="errors && errors.dostavka" :errors="errors">{{ errors.dostavka[0] }}</form-error>
        </div>
      </div>

      <div class="col-9">
        <img
          style="width: 16px;height: 16px;"
          class="form_group_notification-error"
          v-if="errors && errors.locality_id"
          :errors="errors"
          src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
        />
        <span
          class="form_group_notification-error"
          v-if="errors && errors.locality_id"
          :errors="errors"
        >Заполните это поле</span>
      </div>
      <div
        v-b-tooltip.hover
        title="Введите адресс откуда можно будет забрать добавляемое лекарство"
        v-if="update_product.shipping==1"
        class="form-group row"
      >
        <label class="col-3 col-form-label">
          Адрес
          <span style="color:red;">*</span>
        </label>
        <div class="col-9">
          <input
            class="form-control"
            :class="{ 'red_border': errors && errors.address}"
            type="text"
            v-model="update_product.address"
            placeholder="проспект Кабанбай батыр 53, 11/2"
          />
          <img
            style="width: 16px;height: 16px;"
            class="form_group_notification-error"
            v-if="errors && errors.address"
            :errors="errors"
            src="https://png.pngtree.com/svg/20170718/error_icon_509209.png"
          />
          <span
            class="form_group_notification-error"
            v-if="errors && errors.address"
            :errors="errors"
          >Заполните это поле</span>
        </div>
      </div>
      <div
        v-if="update_product.shipping==2"
        v-bind:class="{ 'has-error': errors && errors.product_shipping_free }"
        class="form-group row"
      >
        <label class="col-3 col-form-label">Бесплатная доставка</label>
        <div class="col-9">
          <b-form-checkbox id="checkbox2" v-model="update_product.free_shipping" value="1"></b-form-checkbox>
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
            v-model="update_product.extra_field"
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
          @click.prevent="isPharm?updateProductPharm():updateProduct()"
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
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

export default {
  components: {
    "masked-input": MaskedInput,
    "v-select": vSelect,
    VueBootstrapTypeahead,
    Swal,
    Multiselect
  },

  data() {
    return {
      options: ["asd", "qwe", "asd"],
      selected_medicine: "",
      selected_med: "",
      product: {
        name: this.$root.product ? this.$root.product.name : "",
        locality_id: "",
        manufacturer: "",
        price: "",
        image: ""
      },
      volumes: ["амп.", "таб.", "фл.", "уп.", "шт.", "тубы"],
      forms: [
        "таблетки",
        "капсулы",
        "порошки",
        "гранулы",
        "драже",
        "капли",
        "сиропы",
        "суспензии",
        "эмульсии"
      ],
      selected_dose: "",
      error: false,
      errors: [],
      formSending: false,
      regions: "",
      districts: "",
      localities: "",
      added: false,
      selected_category: null,
      annotation: "",
      price: "",
      extra_field: "",
      //   selected_subcat: null,
      substanse: "",
      selected_form: "",
      count: "",
      selected_city: "",
      cities: "",
      selected_address: "",
      selected_volume: null,
      categories: "",
      medicines: [],
      product_shipping_free: "",
      product_discount: "",
      product_expiration_date: "",
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
      updating_locality: "",
      errors_dostavka: false,
      dostavil: "",
      error_size: false
    };
  },

  methods: {
    ChangeCat() {
      this.showCat = true;
      console.log(this.chosen_category_name[0]);
    },
    uploadImageSuccess(event) {
      this.selectedFile = event.target.files[0];

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
          error.response.data[0] == "image"
            ? (_this.error_image = true)
            : (_this.error_size = true);
          window.scrollTo(0, 0);

          console.log("got error", error);
        }
      );
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

    storeProductPharm() {
      console.log(this.dostavka);
      let _this = this;

      if (_this.dostavil == 1 || _this.dostavil == 2) {
        console.log("post products called");
        let _this = this;
        window.scrollTo(0, 0);
        if (_this.error_image == false) {
          post(
            this,
            "/api/pharm/products/create",
            this.dostavil == 1
              ? {
                  name: _this.selected_medicine.name,
                  cat_id: _this.selected_category
                    ? _this.selected_category.id
                    : "",
                  locality_id: _this.selected_city.id,
                  address: _this.selected_address,
                  manufacturer: _this.product.manufacturer,
                  price_initial: _this.product.price,
                  user_id: _this.$root.user.data
                    ? _this.$root.user.data.id
                    : "",
                  volume: _this.selected_volume,
                  image: _this.product.image,
                  count: _this.count,
                  expiration_date: _this.product_expiration_date,
                  form: _this.selected_form,
                  dose: _this.selected_dose,
                  substanse: _this.substanse,
                  annotation: _this.annotation,
                  discount_in_percent: _this.product_discount,
                  price_with_discount: _this.product_total_price,
                  extra_field: _this.extra_field,
                  shipping: 1
                }
              : {
                  name: _this.selected_medicine.name,
                  cat_id: _this.selected_category
                    ? _this.selected_category.id
                    : "",
                  manufacturer: _this.product.manufacturer,
                  locality_id: _this.selected_city.id,
                  price_initial: _this.product.price,
                  user_id: _this.$root.user.data
                    ? _this.$root.user.data.id
                    : "",
                  volume: _this.selected_volume,
                  image: _this.product.image,
                  count: _this.count,
                  expiration_date: _this.product_expiration_date,
                  form: _this.selected_form,
                  dose: _this.selected_dose,
                  substanse: _this.substanse,
                  annotation: _this.annotation,
                  discount_in_percent: _this.product_discount,
                  price_with_discount: _this.product_total_price,
                  free_shipping: _this.product_shipping_free,
                  extra_field: _this.extra_field,
                  shipping: 0
                },
            function(response) {
              console.log(response);
              window.scrollTo(0, 0);

              Swal.fire(
                "Поздравляем!",
                "Ваша заявка принята в оброботку!",
                "success"
              );
              // setTimeout(function() {
              //   self.window.location.reload();
              // }, 2000);

              // window.scrollTo(0, 0);
            },
            function(error) {
              _this.formSending = false;
              _this.error = true;
              _this.errors = error.response.data.error;
              console.log(error.response.data[0]);
              window.scrollTo(0, 0);
            }
          );
        } else {
          window.scrollTo(0, 0);
        }
      }
    },
    storeProduct() {
      let _this = this;

      if (_this.dostavil == 1 || _this.dostavil == 2) {
        let _this = this;

        console.log("post called");
        window.scrollTo(0, 0);
        if (_this.error_image == false) {
          post(
            this,
            "/api/products/create",
            this.dostavil == 1
              ? {
                  name: _this.selected_medicine.name,
                  cat_id: _this.selected_category
                    ? _this.selected_category.id
                    : "",
                  locality_id: _this.selected_city.id,
                  address: _this.selected_address,
                  manufacturer: _this.product.manufacturer,
                  price_initial: _this.product.price,
                  user_id: _this.$root.user.data
                    ? _this.$root.user.data.id
                    : "",
                  volume: _this.selected_volume,
                  image: _this.product.image,
                  count: _this.count,
                  expiration_date: _this.product_expiration_date,
                  form: _this.selected_form,
                  dose: _this.selected_dose,
                  substanse: _this.substanse,
                  annotation: _this.annotation,
                  discount_in_percent: _this.product_discount,
                  price_with_discount: _this.product_total_price,
                  extra_field: _this.extra_field,
                  shipping: 1
                }
              : {
                  name: _this.selected_medicine.name,
                  cat_id: _this.selected_category
                    ? _this.selected_category.id
                    : "",
                  locality_id: _this.selected_city.id,

                  manufacturer: _this.product.manufacturer,
                  price_initial: _this.product.price,
                  user_id: _this.$root.user.data
                    ? _this.$root.user.data.id
                    : "",
                  volume: _this.selected_volume,
                  image: _this.product.image,
                  count: _this.count,
                  expiration_date: _this.product_expiration_date,
                  form: _this.selected_form,
                  dose: _this.selected_dose,
                  substanse: _this.substanse,
                  annotation: _this.annotation,
                  discount_in_percent: _this.product_discount,
                  price_with_discount: _this.product_total_price,
                  free_shipping: _this.product_shipping_free,
                  extra_field: _this.extra_field,
                  shipping: 0
                },
            function(response) {
              console.log(response);
              window.scrollTo(0, 0);

              Swal.fire(
                "Поздравляем!",
                "Ваша заявка принята в оброботку!",
                "success"
              );
              setTimeout(function() {
                self.window.location.reload();
              }, 2000);

              //

              // window.scrollTo(0, 0);
            },
            function(error) {
              _this.formSending = false;
              _this.error = true;
              _this.errors = error.response.data.error;
              console.log(error.response.data[0]);
              window.scrollTo(0, 0);
            }
          );
        } else {
          window.scrollTo(0, 0);
        }
      }
    },
    clearAll() {
      this.selectedCountries = [];
    },
    updateCard(text) {
      let _this = this;

      post(
        this,
        "/api/update/card",
        {
          user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
          card_number: text
        },
        function(response) {
          // _this.storeProduct();
        },
        function(error) {
          Swal.fire({
            type: "error",
            title: "Ошибка",
            text: "Введите 16 цифр вашей карты",
            footer:
              "<a href>Если не смогли решить проблему свяжитесь с администратором</a>"
          });
        }
      );
    },
    updateProduct() {
      console.log("update product called");
      let _this = this;
      window.scrollTo(0, 0);
      if (_this.update_product.shipping == 0) {
        _this.update_product.address = "";
      }
      if (_this.error_image == false) {
        post(
          this,
          "/api/products/update",
          this.update_product.shipping == 1
            ? {
                product_id: _this.update_product.id,
                name: _this.selected_medicine.name,
                cat_id: _this.update_product ? _this.update_product.cat_id : "",
                locality_id: _this.update_product.locality_id,
                address: _this.update_product.address,

                manufacturer: _this.update_product.manufacturer,
                price_initial: _this.update_product.price_initial,

                user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
                volume: _this.update_product.volume,
                image: _this.product.image,
                count: _this.update_product.count,
                expiration_date: _this.update_product.expiration_date,
                form: _this.update_product.form,
                dose: _this.update_product.dose,
                substanse: _this.update_product.substanse,
                annotation: _this.update_product.annotation,
                discount_in_percent: _this.update_product.discount_in_percent,
                price_with_discount: _this.update_product.price_with_discount,
                extra_field: _this.update_product.extra_field,
                shipping: 1
              }
            : {
                product_id: _this.update_product.id,
                name: _this.selected_medicine.name,
                cat_id: _this.update_product ? _this.update_product.cat_id : "",
                locality_id: _this.update_product.locality_id,
                free_shipping: _this.update_product.free_shipping,
                manufacturer: _this.update_product.manufacturer,
                price_initial: _this.update_product.price_initial,
                address: _this.update_product.address
                  ? ""
                  : _this.update_product.address,

                user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
                volume: _this.update_product.volume,
                image: _this.product.image,
                count: _this.update_product.count,
                expiration_date: _this.update_product.expiration_date,
                form: _this.update_product.form,
                dose: _this.update_product.dose,
                substanse: _this.update_product.substanse,
                annotation: _this.update_product.annotation,
                discount_in_percent: _this.update_product.discount_in_percent,
                price_with_discount: _this.update_product.price_with_discount,
                extra_field: _this.update_product.extra_field,
                shipping: 0
              },
          function(response) {
            console.log(response);
            Swal.fire(
              "Поздравляем!",
              "Ваша заявка принята в оброботку!",
              "success"
            );
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
    updateProductPharm() {
      console.log("update product called");
      let _this = this;
      window.scrollTo(0, 0);
      if (_this.error_image == false) {
        post(
          this,
          "/api/pharm/products/update",
          this.update_product.shipping == 1
            ? {
                product_id: _this.update_product.id,
                name: _this.selected_medicine.name,
                cat_id: _this.update_product ? _this.update_product.cat_id : "",
                locality_id: _this.update_product.locality_id,
                address: _this.update_product.address,

                manufacturer: _this.update_product.manufacturer,
                price_initial: _this.update_product.price_initial,

                user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
                volume: _this.update_product.volume,
                image: _this.product.image,
                count: _this.update_product.count,
                expiration_date: _this.update_product.expiration_date,
                form: _this.update_product.form,
                dose: _this.update_product.dose,
                substanse: _this.update_product.substanse,
                annotation: _this.update_product.annotation,
                discount_in_percent: _this.update_product.discount_in_percent,
                price_with_discount: _this.update_product.price_with_discount,
                extra_field: _this.update_product.extra_field,
                shipping: 1
              }
            : {
                product_id: _this.update_product.id,
                name: _this.selected_medicine.name,
                cat_id: _this.update_product ? _this.update_product.cat_id : "",
                locality_id: _this.update_product.locality_id,
                free_shipping: _this.update_product.free_shipping,
                manufacturer: _this.update_product.manufacturer,
                price_initial: _this.update_product.price_initial,

                user_id: _this.$root.user.data ? _this.$root.user.data.id : "",
                volume: _this.update_product.volume,
                image: _this.product.image,
                count: _this.update_product.count,
                expiration_date: _this.update_product.expiration_date,
                form: _this.update_product.form,
                dose: _this.update_product.dose,
                substanse: _this.update_product.substanse,
                annotation: _this.update_product.annotation,
                discount_in_percent: _this.update_product.discount_in_percent,
                price_with_discount: _this.update_product.price_with_discount,
                extra_field: _this.update_product.extra_field,
                shipping: 0
              },
          function(response) {
            console.log(response);
            Swal.fire(
              "Поздравляем!",
              "Ваша заявка принята в оброботку!",
              "success"
            );
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
    getMedicine(query) {
      let _this = this;
      this.isLoading = true;

      console.log("get med");
      // if (_this.selected_medicine.length == 1) {
      console.log("get medicine called");
      get(
        this,
        "/api/medicine",
        {
          params: {
            search_medicine: query
          }
        },
        function(response) {
          _this.medicines = response.data;
          console.log(response.data);
          console.log(_this.regions);
          this.isLoading = false;
        },
        function(error) {
          console.log("got error", error);
        }
      );
      // }
    },
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

    saveChange: function() {
      this.show_change = true;
      var self = this;
      setTimeout(function() {
        self.show_change = false;
      }, 3000);
      self.added = false;
    }
    // Upload image api
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
    dostavka() {
      return this.update_product
        ? this.update_product.shipping == 0
          ? 2
          : 1
        : "";
    },
    // marketplace_id() {
    //   return this.marketplace && this.marketplace.hasOwnProperty("value")
    //     ? this.marketplace.value
    //     : 0;
    // },
    product_total_price: function() {
      if (this.update_product.discount_in_percent)
        return (
          (100 - this.update_product.discount_in_percent) *
          0.01 *
          this.update_product.price_initial
        ).toFixed(0);
      else {
        return (
          (100 - this.product_discount) *
          0.01 *
          this.product.price
        ).toFixed(0);
      }
    },
    search_medicine: function() {
      return this.selected_medicine;
    },
    chosen_product: function() {
      return this.$root.chosen_product;
    },
    isPharm() {
      return this.$root.user ? this.$root.user.data.isPharmacy : "";
    }
  },

  created() {
    this.getCategory();
    this.getCities();
    // this.getMedicine();
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

.input-file {
  display: none;
}
.select {
  font: 5px;
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
  font-family: montserrat;
}
.col-9 {
  padding-right: 0px !important;
}
.form-control:focus {
  border: 1px solid #0059b3;
}
.multiselect {
  border: 1 px solid black !important;
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
.form_group_notification-error {
  font-family: montserrat;
}
.red_border {
  border-color: red !important;
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



