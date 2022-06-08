<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center my-5"
  >
    <img
      src="../../public/img/petsLogo.svg"
      class="card-img-top"
      style="max-height: 300px; max-width: 300px"
      alt=""
    />
    <h1>REGISTER</h1>
    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          type="name"
          class="form-control"
          id="name"
          aria-describedby="name"
          ref="name"
          v-model="registerData.name"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          ref="email"
          v-model="registerData.email"
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
          v-model="registerData.password"
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
        ¿Ya estás registrado?
        <router-link :to="{ name: 'login' }">Inicia Sesión</router-link>
      </div>
      <button @click="register()" class="btn btn-primary">Registrarse</button>
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  mounted () {
      this.check();
  },
  methods: {
    check() {
      var me = this;
      if (localStorage.getItem("jwt")) {
        me.$router.push({ name: "mascotas" });
      } else {
      }
    },
    register() {
      var me = this;
      const form = new FormData();
      form.append("name", me.registerData.name);
      form.append("email", me.registerData.email);
      form.append("password", me.registerData.password);
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://localhost:8081/api/register", me.registerData, config)
        .then(function (response) {
          if (response.status == 200) {
              console.log(response);
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("email", response.data.email);
            // console.log(response.data);
            me.$router.push({ name: "mascotas" });
          }
        })
        .catch(function (error) {
          console.log(error);
          // this.logFailStatus = "true";
        });
    },
  },
};
</script>

<style>
</style>