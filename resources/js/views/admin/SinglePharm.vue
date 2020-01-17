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
          <tr>
            <td>{{pharm.id}}</td>
            <td>{{pharm.name}}</td>
            <td>{{pharm.licence_number}}</td>
            <td>{{pharm.approved?true:"false"}}</td>
            <td>
              <span @click="Approve(pharm.user_id)">
                <i class="fa fa-edit"></i>
              </span>/
              <button class="btn btn-primary" @click="otherProducts()">other Prods</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /.card-body -->
  </div>
</template>
<script>
import { post, get } from "../../helpers/api";
export default {
  data() {
    return {
      pharm: "",
      other_products: ""
    };
  },
  methods: {
    getSinglePharm() {
      console.log("get user called");
      let _this = this;
      get(
        this,
        "/api/singlePharm",
        {},
        function(response) {
          _this.pharm = response.data;

          console.log("success");
        },
        function(error) {
          console.log("got error", error);
        }
      );
    },
    Approve(user_id) {
      let component = this;

      console.log("post is sending");
      post(
        this,
        "/api/approve",
        { id: user_id },
        function(response) {
          console.log(response);
          component.sendMessage(user_id);
        },
        function(error) {
          console.log("ERROR");
        }
      );
    },
    sendMessage(user_id) {
      let component = this;

      console.log("send message", user_id);
      post(
        this,
        "/api/sendMail",
        { id: user_id },
        function(response) {
          console.log(response);
          alert("Успешно апрув!!!");
          component.pharm.approved = 1;
        },
        function(error) {
          console.log("ERROR");
        }
      );
    },
    otherProducts() {
      console.log("get single product called");
      let _this = this;
      get(
        this,
        "/api/user/products",
        {
          params: {
            user_id: _this.product.user_id
            // page
          }
        },
        function(response) {
          console.log(response);
          console.log(response.data);
          _this.other_products = response.data;
        },
        function(error) {
          console.log(error);
        }
      );
    }
  },
  computed: {},
  mounted() {
    // this.getUser();
    this.getSinglePharm();
  }
};
</script>