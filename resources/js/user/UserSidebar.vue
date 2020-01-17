<template>
  <div
    class="sidebar"
    v-if="$route.path == '/userInfo' || $route.path == '/userProducts' || $route.path == '/userAddress' || $route.path == '/userHistory' || $route.path == '/userSettings'"
  >
    <div>
      <ul class="list">
        <li
          class="list-group-item d-flex justify-content-between align-items-center list-item"
          @click="$router.push({path: '/userInfo'})"
        >
          <i class="fas fa-user-alt"></i>
          <span href class="category-header">Детали аккаунта</span>
        </li>
        <!-- <li
          class="list-group-item d-flex justify-content-between align-items-center list-item"
          @click="$router.push({path: '/userAddress'})"
        >
          <i class="fas fa-map-marker-alt"></i>
          <span href class="category-header">Детали адреса</span>
        </li>-->
        <li
          class="list-group-item d-flex justify-content-between align-items-center list-item"
          @click="$router.push({path: '/userProducts'})"
        >
          <i class="fas fa-archive"></i>
          <span href class="category-header">Мои продукты</span>
        </li>

        <li
          class="list-group-item d-flex justify-content-between align-items-center list-item"
          @click="$router.push({path: '/userHistory'})"
        >
          <i class="fas fa-history"></i>
          <span href class="category-header">История заказов</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-center list-item"
          @click="$router.push({path: '/userSettings'})"
        >
          <i class="fas fa-cog"></i>
          <span href class="category-header">Настройки</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center list-item">
          <i class="fas fa-sign-out-alt"></i>
          <span href @click="logOut()" class="category-header">Выйти</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$auth.destroyToken();
      this.$router.push({ name: "login" });
      this.$root.user.data = "";
    }
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.sidebar {
  width: 24%;
  margin-right: 4%;
}
.list {
  li {
    cursor: pointer;
    font-family: montserrat;
  }
  li:last-of-type {
    background-color: #afc9c1;
  }
  li:last-of-type:hover {
    background-color: #5d897c;
  }
}
.list-group-item {
  cursor: pointer;
  padding: 8px;
  border: 1px solid rgb(22, 127, 146, 0.2);
  color: #167f92;
  i {
    height: 20px;
    width: 20px;
    margin-left: 5px;
  }
  .category-header {
    font-family: montserrat;
    margin: auto;
    margin-left: 5%;
  }
}
.list-group-item:hover {
  background: #167f92;
  color: #fff;
}
.category-items,
.items {
  border: 1px solid #167f92;
  border-radius: 3px;
}

@media screen and (max-width: 1024px) {
  .sidebar {
    width: 100%;
    margin-right: 0;
  }
}
@media screen and (max-width: 667px) {
  .list-group-item {
    font-size: 12px;
  }
}
</style>

