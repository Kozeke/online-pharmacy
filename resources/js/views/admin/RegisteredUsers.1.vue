<template>
  <!-- <div class="container"> -->
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Пользователи</h3>

            <div class="card-tools">
              <button class="btn btn-success" data-toggle="modal" data-target="#AddNewCenter">
                Add New
                <i class="fas fa-user-plus"></i>
              </button>
              <div class="input-group input-group-sm" style="width: 150px;">
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
                  <div></div>
                </div>
              </div>
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
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Approved</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="user in users">
                  <td>{{user.id}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.phone}}</td>
                  <td>{{user.approved?true:"false"}}</td>
                  <td>
                    <span @click="singleUser(user)">
                      <i class="fa fa-edit"></i>
                    </span>/
                    <span @click="deleteUser(user.id)">
                      <i class="fa fa-trash red"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="AddNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="AddNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddNewLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { post, get, del } from "../../helpers/api";
export default {
  data() {
    return {
      users: ""
    };
  },
  methods: {
    deleteUser(id) {
      let _this = this;
      console.log(id);
      if (confirm("Are You Sure?")) {
        del(
          this,
          "api/users",
          {
            params: {
              id: id
            }
          },
          function(response) {
            console.log(response);
            console.log("deleted");
            _this.error = "";

            _this.getUsers();
          },
          function(error) {
            _this.formSending = false;
            console.log("error");
            _this.errors = error.response.data.error;
            console.log(error.response.data.error);
          }
        );
      }
    },
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
    singleUser(user) {
      let component = this;

      this.loading = true;
      console.log("post is sending");
      post(
        this,
        "/api/singleUser",
        user,
        function(response) {
          console.log(response);

          component.$router.push({ name: "singleuser" });
        },
        function(error) {
          console.log("ERROR");
        }
      );
    },
    getUsers() {
      console.log("get user called");
      let _this = this;
      get(
        this,
        "/api/getSpecific",
        {
          params: {
            is_pharm: 0
          }
        },
        function(response) {
          _this.users = response.data;

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
    this.getUsers();
  }
};
</script>