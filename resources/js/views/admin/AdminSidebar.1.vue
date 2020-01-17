<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <div @click="window.location.href = 'http://localhost:8000'" class="brand-link">
      <img
        src="storage/image/medicine.png"
        alt="MirAptek Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      >
      <span class="brand-text font-weight-light">MirAptek</span>
    </div>
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="storage/image/team.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ $root.user?$root.user.data.name:""}}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
          with font-awesome or any other icon font library-->
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt blue"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li @click="$router.push({name:'registeredUsers'})" class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-users"></i>
              <p>
                Users
                <i class="right fa fa-angle-left"></i>
              </p>
            </a>
          </li>
          <li @click="$router.push({name:'usersProducts'})" class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-users"></i>
              <p>
                Users Products
                <i class="right fa fa-angle-left"></i>
              </p>
            </a>
          </li>
          <li @click="$router.push({name:'Pharmacy'})" class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fas-clinic-medical green"></i>

              <p>
                Pharmacies
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
          </li>
          <li @click="$router.push({name:'pharmProducts'})" class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fas-clinic-medical yellow"></i>
              <p>
                Pharmacies Products
                <i class="right fa fa-angle-left"></i>
              </p>
            </a>
          </li>
          <!-- <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/users" class="nav-link">
                  <i class="fas fa-users yellow nav-icon"></i>
                  <p>Users</p>
                </router-link>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-circle-o nav-icon"></i>
                  <p>Inactive Page</p>
                </a>
              </li>
          </ul>-->
          <!-- </li> -->
          <li class="nav-item">
            <router-link to="/orders" class="nav-link">
              <i class="nav-icon fas fa-user orange"></i>
              <p>Заказы</p>
            </router-link>
          </li>
          <li class="nav-item">
            <div @click="logOut()" class="nav-link">
              <i class="nav-icon fa fa-power-off red"></i>
              <p>LogOut</p>
            </div>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  methods: {
    logOut() {
      this.$auth.destroyToken();
      window.location.href = "http://localhost:8000";
      this.$root.user.data = "";
    }
  }
};
</script>
