<template>
  <div class="navigate">
    <a
      href
      class="link"
      @click="$router.push({name:'Главная'})"
      v-if="this.$route.name != 'Главная'"
    >Главная</a>
    <i class="fas fa-chevron-right" v-if="this.$route.name != 'Главная'"></i>
    <a
      href
      class="link"
      v-if="this.$route.name != 'Главная'"
      @click="$router.push({name: this.$route.name})"
    >{{this.$route.name}}</a>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.navigate {
  padding: 12px 7%;
  display: flex;
  flex-direction: row;
}
i {
  margin: auto 4px auto 0;
  font-size: 12px;
}
a {
  margin: 8px 6px 8px 0;
  font-size: 0.9rem;
  font-family: montserrat;
  font-weight: 500;
  cursor: pointer;
  color: #000;
}
a:hover {
  color: rgb(22, 127, 146);
  text-decoration: none;
}
</style>