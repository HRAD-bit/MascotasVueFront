<template>
  {{ check() }}
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-end">
          <!-- <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'mascotas' }"
              >Mascotas</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Perfil
            </a>
            <ul
              class="dropdown-menu dropdown-menu-sm-end dropdown-menu-xl-start"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item disabled" v-if="!logCheck" href="#"
                  >Usuario</a
                >
              </li>
              <li>
                <a class="dropdown-item disabled" v-if="logCheck" href="#"
                  >Jopo</a
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item pointer"
                  v-if="!logCheck"
                  @click="loginRoute()"
                  >Login</a
                >
                <a class="dropdown-item pointer" v-else @click="logout()"
                  >Log out</a
                >
              </li>
              <li></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      logCheck: false,
    };
  },
  methods: {
    check() {
      if (localStorage.getItem("jwt")) {
        // console.log(this.logCheck);
        this.logCheck = true;
      } else {
        // console.log(this.logCheck);
        this.logCheck = false;
        // me.$router.push({ name: "login" });
      }
    },
    loginRoute() {
      this.check();
      this.$router.push({ name: "login" });
    },
    logout() {
      axios.get("http://localhost:8081/api/logout").then((response) => {
        // console.log(response.data);
        localStorage.clear();
        this.$router.push({ name: "login" });
        // this.$cookie.delete("jwt")
      });
      this.check();
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>