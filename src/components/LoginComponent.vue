<template>
  {{ check() }}
  <div
    class="d-flex flex-column justify-content-center align-items-center my-5"
  >
  <img src="../../public/img/petsLogo.svg" class="card-img-top" style="max-height: 300px; max-width: 300px;;" alt="">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          ref="email"
          v-model="loginData.email"
        />
        <div id="emailHelp" class="form-text">
          No compartiremos esta información con nadie.
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelpInline"
          ref="password"
          v-model="loginData.password"
        />
        <div id="passwordHelpBlock" class="form-text">
          Tu contraseña debe tener entre 8-20 caracteres, conteniendo letras y
          numeros.
        </div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Recuerdame</label>
      </div>
      <div id="" class="form-text m-auto my-3">
        ¿No estás registrado? <router-link :to="{ name: 'register'}">Registrate</router-link>
      </div>
      <button class="btn btn-primary" @click="login()">Ingresar</button>
    </form>
    <!-- <div
      class="
      my-5
        toast toast-demo
        d-flex
        align-items-center
        text-white
        bg-danger
        border-0
        fade
        show
      "
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body">Hello, world! This is a toast message.</div>
      <button
        type="button"
        class="btn-close btn-close-white ms-auto me-2"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div> -->
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      logFailStatus: false,
      logCheck: false,
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    check() {
      var me = this;
      // console.log("asss");
      if (localStorage.getItem("jwt")) {
        // console.log("existe");
        me.$router.push({ name: "mascotas" });
      } else {
        // console.log("No");
      }
    },
    login() {
      var me = this;
      // console.log("Login");
      const form = new FormData();
      form.append("email", me.loginData.email);
      form.append("password", me.loginData.password);
      // console.log(me.loginData.email);
      // console.log(me.loginData.password);
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://localhost:8081/api/login", me.loginData, config)
        .then(function (response) {
          if (response.status == 200) {
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("email", response.data.email);
            // console.log(response.data);
            me.$router.push({ name: "mascotas" });
          }
          //   this.$cookie.set("jwt", response.data.cookie)
        })
        .catch(function (error) {
          console.log(error);
          // this.logFailStatus = "true";
        });
    },
  },
  props: {
    logChecks: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>