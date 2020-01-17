<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Аптеки</h3>

      <div class="card-tools">
        <button class="btn btn-success" data-toggle="modal" data-target="#AddNewCenter">
          Add New
          <i class="fas fa-user-plus"></i>
        </button>
        <!-- <div class="input-group input-group-sm" style="width: 150px;">
                <input
                  type="text"
                  name="table_search"
                  class="form-control float-right"
                  placeholder="Search"
                >

                <div class="input-group-append">
                  <button type="submit" class="btn btn-default">
                    <i class="fa fa-search"></i>
                  </button>
                  <div>
                  
                  </div>
                </div>
        </div>-->
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body table-responsive p-0">
      <table class="table table-hover">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <!-- <th>Status</th> -->
            <th>Licence number</th>
            <th>Approved</th>
            <th>Modify</th>
          </tr>
          <tr v-for="pharm in pharms">
            <td>{{pharm.id}}</td>
            <td>{{pharm.pharms[0].name}}</td>
            <td>{{pharm.pharms[0].licence_number}}</td>
            <td>{{pharm.status?true:"false"}}</td>
            <td>
              <span @click="singlePharm(pharm)">
                <i class="fa fa-edit"></i>
              </span>/
              <a href="#">
                <i class="fa fa-trash red"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
  <!-- </div>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#AddNewCenter"
  >Launch demo modal</button>-->

  <!-- Modal -->
  <!-- <div
      class="modal fade"
      id="AddNewCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="AddNewCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddNewCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="createUser">
            <div class="modal-body">
              <div class="form-group">
                <label>Username</label>
                <input
                  placeholder="name"
                  v-model="form.name"
                  type="text"
                  name="username"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                >
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  placeholder="name"
                  v-model="form.email"
                  type="text"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                >
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                >
                <has-error :form="form" field="password"></has-error>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                >
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
  </div>-->
</template>
<script>
import { post, get } from "../../helpers/api";
export default {
  data() {
    return {
      users: "",
      pharms: ""
    };
  },
  methods: {
    // getUser() {
    //   console.log("get user called");
    //   let _this = this;
    //   get(
    //     this,
    //     "/api/getUser",
    //     {},
    //     function(response) {
    //       _this.users = response.data;

    //       console.log("success");
    //     },
    //     function(error) {
    //       console.log("got error", error);
    //     }
    //   );
    // },
    singlePharm(pharm) {
      let component = this;

      this.loading = true;
      console.log("post is sending");
      post(
        this,
        "/api/singlePharm",
        pharm,
        function(response) {
          console.log(response);

          component.$router.push({ name: "singlePharm" });
        },
        function(error) {
          console.log("ERROR");
        }
      );
    },
    getPharms() {
      console.log("get user called");
      let _this = this;
      get(
        this,
        "/api/getSpecific",
        {
          params: { is_pharm: 1 }
        },
        function(response) {
          _this.pharms = response.data;

          console.log("success");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    }
  },
  mounted() {
    // this.getUser();
    this.getPharms();
  }
};
</script>