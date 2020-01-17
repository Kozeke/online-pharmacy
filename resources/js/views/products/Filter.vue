<template>
  <div class="sidefilter" v-if="$route.path == '/'">
    <form class="form">
      <h4>Checkboxes</h4>
      <div class="input_group" v-for="filter in filters">
        <input type="checkbox" :id="filter.name" :value="filter.name" v-model="selectedFilters" />
        <label :for="filter.name">{{filter.name}}</label>
      </div>
      <h4>Checkboxes</h4>
      <div>
        <div class="rangeFilters price">
          От
          <input type="number" id="amountFrom" v-model="value[0]" />
          до
          <input type="number" id="amountTo" v-model="value[1]" />
        </div>
        <!-- <vue-slider ref="slider" v-model="value" 
                    width='auto'
                    :height='12'
                    direction='horizontal'
                    :dotSize="16"
                    :min='price_min'
                    :max='price_max'
                    :interval='50'
                    :tooltipStyle="{
                        borderColor: 'green',
                    }"
                    :bgStyle="{
                        borderColor: 'green',
                    }"
                    :processStyle="{
                        backgroundColor: 'green',
                    }"
        ></vue-slider>-->
      </div>
    </form>
  </div>
</template>
<script>
// import vueSlider from 'vue-slider-component/src/vue2-slider.vue'
export default {
  data() {
    return {
      filters: [
        {
          name: "В наличии"
        },
        {
          name: "Только с фото"
        },
        {
          name: "Акционные товары"
        },
        {
          name: "Бесплатная доставка"
        }
      ],
      selectedFilters: [],
      value: [0, 400],
      price_min: 0,
      price_max: 500
    };
  },
  methods: {}
};
//# sourceURL=pen.js
</script>
<style scoped lang="scss">
.sidefilter {
  width: 20%;
  background-color: #fff;
  -webkit-box-shadow: 2px 3px 18px 11px rgba(0, 0, 0, 0.76);
  -moz-box-shadow: 2px 3px 18px 11px rgba(0, 0, 0, 0.76);
  box-shadow: 0px 0px 10px #a6a6a6;
  border-radius: 3px;
  margin-top: 50px;
  height: 100%;
  padding: 10px;
  h4 {
    text-align: center;
    margin: 10px;
    margin-top: 20px;
  }
}
.input_group {
  display: block;
  margin: 0;
  position: relative;
  border-top: 1px solid rgb(209, 209, 209);
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
      background-color: #54e0c7;
      border-color: #54e0c7;
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
    border: 1px solid red;
    margin: 5px;
  }
  input:first-of-type {
    margin-right: 15px;
  }
}
</style>

