<template>
  <div class="form-group row">
    <label class="col-3 col-form-label">Место проживания</label>
    <div class="col-md-3">
      <model-select :options="options" v-model="item" placeholder="выберите область"></model-select>
    </div>
    <div class="col-md-3">
      <model-select :options="options2" v-model="item2" placeholder="выберите район"></model-select>
    </div>
    <div class="col-md-3">
      <model-select :options="options2" v-model="item2" placeholder="выберите нас. пункт"></model-select>
    </div>
  </div>
</template>
 
<script>
import { ModelSelect } from "vue-search-select";

export default {
  data() {
    return {
      options: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" }
      ],
      item: {
        value: "",
        text: ""
      },
      options2: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" }
      ],
      item2: ""
    };
  },
  methods: {
    reset() {
      this.item = {};
    },
    selectFromParentComponent1() {
      // select option from parent component
      this.item = this.options[0];
    },
    reset2() {
      this.item2 = "";
    },
    selectFromParentComponent2() {
      // select option from parent component
      this.item2 = this.options2[0].value;
    }
  },
  components: {
    ModelSelect
  }
};
</script> 
<style scoped lang="scss">
.form-group {
  margin-bottom: 23px;
  position: relative;
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  div {
    height: 54px;
    width: 200px;
  }
}
label {
  font-size: 14px;
  font-weight: bold;
  font-family: "Montserrat";
  margin-bottom: 2px;
  display: block;
}
</style>