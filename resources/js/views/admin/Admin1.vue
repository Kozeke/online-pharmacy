<template>
  <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#">
          <i class="fa fa-bars"></i>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input
          class="form-control form-control-navbar"
          type="search"
          placeholder="Search"
          aria-label="Search"
        >
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-comments-o"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img
                src="dist/img/user1-128x128.jpg"
                alt="User Avatar"
                class="img-size-50 mr-3 img-circle"
              >
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger">
                    <i class="fa fa-star"></i>
                  </span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted">
                  <i class="fa fa-clock-o mr-1"></i> 4 Hours Ago
                </p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img
                src="dist/img/user8-128x128.jpg"
                alt="User Avatar"
                class="img-size-50 img-circle mr-3"
              >
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  John Pierce
                  <span class="float-right text-sm text-muted">
                    <i class="fa fa-star"></i>
                  </span>
                </h3>
                <p class="text-sm">I got your message bro</p>
                <p class="text-sm text-muted">
                  <i class="fa fa-clock-o mr-1"></i> 4 Hours Ago
                </p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img
                src="dist/img/user3-128x128.jpg"
                alt="User Avatar"
                class="img-size-50 img-circle mr-3"
              >
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Nora Silvester
                  <span class="float-right text-sm text-warning">
                    <i class="fa fa-star"></i>
                  </span>
                </h3>
                <p class="text-sm">The subject goes here</p>
                <p class="text-sm text-muted">
                  <i class="fa fa-clock-o mr-1"></i> 4 Hours Ago
                </p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-bell-o"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fa fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
          <i class="fa fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>

  <!-- Main Sidebar Container -->
</template>
<script>
import { post } from "../../helpers/api";

export default {
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: ""
      },
      error: "",
      id: "",
      select: false,
      accounts: []
    };
  },
  methods: {
    getProducts() {
      let _this = this;
      console.log("asdasd");
      get(
        this,
        "/api/admin/products",
        {
          params: {
            locality_id: this.$root.selected_locality_id,
            user_id: _this.$root.user ? _this.$root.user.data.id : ""
          }
        },
        function(response) {
          console.log(response);
          _this.products = response.data.data;
        },
        function(error) {
          console.log(error);
        }
      );
    },
    updateProduct() {
      console.log("update called");
      let _this = this;
      post(
        this,
        "/api/admin/products/update",
        {
          product_id: _this.update_product.id
        },
        function(response) {
          console.log(response);
          alert("продукт изменен!");
          _this.error = "";
          // window.scrollTo(0, 0);
        },
        function(error) {
          console.log(error.response.data[0]);
        }
      );
    },
    setAccount(object) {
      this.id = object.id;
      this.$nextTick(function() {
        this.login();
      });
    },

    login() {
      let component = this;

      this.loading = true;
      console.log("post is sending");
      post(
        this,
        "/api/admin/login",
        this.user,
        function(response) {
          console.log(response);
          component.$auth.setToken(response.data.success.token);

          component.loading = false;

          component.error = "";

          component.$router.push({ name: "AdminPage" });

          // component.$root.userInit(true);
        },
        function(error) {
          console.log("ERROR");
          component.select = false;
          component.loading = false;
          component.error = {
            message: "Имя пользователя и пароль не совпадают."
          };
        }
      );
    },
    resetpass() {}
  }
};
</script>
