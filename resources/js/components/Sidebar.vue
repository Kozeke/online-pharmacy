<template>
  <div
    class="sidebar"
    v-if="$route.path == '/' || $route.path == '/wishList' || $route.path == '/cart' || $route.path == '/products' || $route.path == '/single_product'  || $route.path == '/aboutUs'  || $route.path == '/aboutShipping'  || $route.path == '/aboutPay'  || $route.path == '/howToAdd'  || $route.path == '/howToBuy'  || $route.path == '/complain'  || $route.path == '/agreePolicy'"
  >
    <div>
      <ul class="list">
        <li
          class="list-group-item d-flex justify-content-between align-items-center list-item"
          v-for="cat in categories"
          @click="filter(cat.id)"
        >
          <img :src="image(cat.photo_url)">
          <span href class="category-header">{{ cat.name }}</span>
          <!-- <div class="category-group1">
            <a v-for="(subcat, index) in cat.subcats" :key="index" class="text">{{subcat.name}}</a>
          </div>-->
        </li>
      </ul>
    </div>
    <div class="sidefilter" v-if="$route.path != '/single_product'&&$route.path != '/'">
      <form class="form">
        <h4>Выберите фильтр</h4>
        <div class="input_group" v-for="filter in filters">
          <input type="checkbox" :id="filter.name" :value="filter.id" v-model="selectedFilters">
          <label :for="filter.name">{{filter.name}}</label>
        </div>
        <!-- <h4>Цена</h4> -->
        <!-- <div>
          <div class="rangeFilters price">
            От
            <input type="number" id="amountFrom" v-model="value[0]">
            до
            <input type="number" id="amountTo" v-model="value[1]">
          </div>
        </div>-->
      </form>
    </div>
  </div>
</template>
<script>
import { get, post, del } from "../helpers/api";
export default {
  data() {
    return {
      categories: "",
      filters: [
        {
          name: "В наличии",
          id: 1
        },
        {
          name: "Только с фото",
          id: 2
        },
        {
          name: "Товары со скидкой",
          id: 3
        },
        {
          name: "С доставкой",
          id: 4
        }
      ],
      selectedFilters: [],
      value: [0, 400],
      price_min: 0,
      price_max: 500,
      withShipping: "",
      withDiscount: "",
      withPhoto: "",
      inStock: ""
    };
  },
  methods: {
    filter(id) {
      this.$emit("select-subcat", id);
      this.$router.push({ name: "Продукты" });
    },
    getCategory() {
      console.log("get category called");
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
    image: function(url) {
      return window.location.origin + url;
    },
    selectFilters() {
      this.$root.selectedFilter1 = this.selectedFilters[0];
      this.$root.selectedFilter2 = this.selectedFilters[1];
      this.$root.selectedFilter3 = this.selectedFilters[2];
      this.$root.selectedFilter4 = this.selectedFilters[3];
    }
  },
  watch: {
    selectedFilters() {
      this.selectFilters();
    }
  },
  created() {
    this.getCategory();
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.category-group1 {
  background: #fff;
  display: none;
  height: auto;
  position: absolute;
  left: 100%;
  top: -1px;
  width: 300px;
  border: 1px solid #167f92;
  border-radius: 3px;
  a {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 8px;
    color: #167f92;
    font-family: montserrat;
  }
  a:hover {
    color: #fff;
    background-color: #167f92;
  }
}
a:hover + .category-group1,
.category-group1:hover {
  display: block;
}
.sidebar {
  width: 24%;
  margin-right: 4%;
  z-index: 150;
}
.list-group-item {
  cursor: pointer;
  padding: 8px;
  border: 1px solid rgb(22, 127, 146, 0.2);
  color: #167f92;
  img {
    height: 20px;
    width: 20px;
    margin-left: 5px;
  }
  .category-header {
    margin: auto;
    margin-left: 5%;
    font-family: montserrat;
  }
  .badge {
    margin-right: 5px;
  }
}
.list-group-item:hover {
  background: #167f92;
  color: #fff;
}
.category-items,
.items {
  border: 1px solid rgb(22, 127, 146, 0.2);
  border-radius: 3px;
}

.list-group-item:hover div {
  display: block;
}
.badge {
  color: #167f92;
  background-color: #6cd28f;
}
.sidefilter {
  background-color: #fff;
  border: 1px solid rgb(22, 127, 146, 0.2);
  border-radius: 3px;
  margin-top: 20px;
  height: auto;
  padding: 10px;
  h4 {
    text-align: center;
    margin: 10px;
    margin-top: 20px;
    font-family: montserrat;
  }
}
.input_group {
  display: block;
  margin: 0;
  position: relative;
  border-top: 1px solid rgb(22, 127, 146, 0.2);
  label {
    padding: 8px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3c454c;
    cursor: pointer;
    position: relative;
    transition: color 200ms ease-in;
    overflow: hidden;
    font-family: montserrat;
    &:after {
      width: 28px;
      height: 28px;
      content: "";
      border: 2px solid #d1d7dc;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      border-radius: 10%;
      z-index: 2;
      position: absolute;
      right: 5%;
      top: 60%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }
  input:checked ~ label {
    &:before {
      transform: translate(-50%, -50%) scale3d(56, 56, 1);
      opacity: 1;
    }

    &:after {
      background-color: #6cd28f;
      border-color: #6cd28f;
    }
  }
  input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }
}
.price {
  padding: 20px;
  input {
    width: 25%;
    border-radius: 3px;
    border: 1px solid rgb(22, 127, 146, 0.2);
    margin: 5px;
  }
  input:first-of-type {
    margin-right: 15px;
  }
}
@media screen and (max-width: 1451px) {
  .sidefilter {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .sidebar {
    display: none;
  }
}
</style>

