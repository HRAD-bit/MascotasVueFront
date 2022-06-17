<template>
  {{ check() }}
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><img class="logoSvg" src="../../public/img/petsLogo.svg" alt=""
      /></a>
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
                <a class="dropdown-item disabled" href="#">{{ this.email }}</a>
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
  <div class="container">
    <h2>Mascotas</h2>
    <div class="text-center">
      <Transition>
        <table class="table caption-top" v-if="!show">
          <caption>
            List of Pets
          </caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Raza</th>
              <th scope="col">Edad</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mascota, index) in mascotas" :key="index">
              <th scope="row">{{ index }}</th>
              <td>{{ mascota.id }}</td>
              <td>{{ mascota.nombre }}</td>
              <td>{{ mascota.raza }}</td>
              <td>{{ mascota.edad }}</td>
              <th>
                <div class="btn-group">
                  <button
                    type="button"
                    @click="deletepets(mascota.id)"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="modifyPet(mascota)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </Transition>
    </div>

    <button
      type="button"
      class="btn btn-primary"
      @click="newPet()"
      v-if="!show"
    >
      Agregar
    </button>
    <Transition>
      <div class="my-4" v-if="show">
        <form>
          <div class="form-group my-4">
            <label for="nombre">Nombre Mascota</label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              placeholder="Nombre de mascota"
              v-model="mascotaslocal.nombre"
              ref="nombre"
            />
          </div>
          <div class="form-group my-4">
            <label for="raza">Raza</label>
            <input
              type="text"
              class="form-control"
              id="raza"
              placeholder="Raza de mascota"
              v-model="mascotaslocal.raza"
              ref="raza"
            />
          </div>
          <div class="form-group my-4">
            <label for="edad">Edad</label>
            <input
              type="number"
              class="form-control"
              id="edad"
              placeholder="Edad de mascota"
              min="0"
              max="50"
              v-model="mascotaslocal.edad"
              ref="edad"
            />
          </div>
          <button
            type="button"
            class="btn btn-primary mx-2"
            @click="petsInsert()"
            v-if="showRegister"
          >
            Registrar
          </button>
          <button
            type="button"
            class="btn btn-primary mx-2"
            @click="petsModify()"
            v-if="!showRegister"
          >
            Modificar
          </button>
          <button
            type="button"
            @click="cancel()"
            v-if="show"
            class="btn btn-secondary mx-2"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="clean()"
            v-if="show"
            class="btn btn-secondary mx-2"
          >
            Limpia datos
          </button>
          <label class="form-control my-2" for="">{{ mascotaslocal }}</label>
        </form>
      </div>
    </Transition>
  </div>
</template>
<script>
const axios = require("axios").default;
var URL = "http://servertics.ddns.net:8081";
export default {
  data() {
    return {
      logCheck: false,
      show: false,
      showRegister: false,
      cleaneed: false,
      email: "",
      mascotas: [],
      mascotaslocal: {
        id: 0,
        nombre: "",
        edad: "",
        raza: "",
      },
    };
  },
  mounted() {},
  methods: {
    check() {
      if (localStorage.getItem("jwt")) {
        // console.log(this.logCheck);
        this.email = localStorage.getItem("email");
        this.logCheck = true;
      } else {
        // console.log(this.logCheck);
        this.logCheck = false;
        this.$router.push({ name: "login" });
      }
    },
    petsInsert() {
      var me = this;
      // console.log("Insertando..");
      const form = new FormData();
      form.append("nombre", me.mascotaslocal.nombre);
      form.append("edad", me.mascotaslocal.edad);
      form.append("raza", me.mascotaslocal.raza);

      axios
        // .post("http://localhost:8080/mascotas", form)
        .post(URL + "/api/mascotas/", me.mascotaslocal)
        // .post("https://lic-gamma.000webhostapp.com/public/mascotas/", form)
        .then(function (response) {
          console.log(response);
          me.fillpets();
          me.show = false;
          me.showRegister = false;
          me.$swal.fire(
            "Mascota insertada!",
            "Bienvenid@ " + me.mascotaslocal.nombre,
            "success"
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    fillpets() {
      // bootbox.alert("This is the default alert!");
      // axios.get("http://localhost:8080/mascotas").then((response) => {
      axios.get(URL + "/api/mascotas/").then((response) => {
        // axios.get("https://lic-gamma.000webhostapp.com/public/mascotas/").then((response) => {
        this.mascotas = response.data;
        // console.log("Se arrojó el dato\n");
        // console.log(response.data);
      });
    },
    modifyPet(i) {
      this.show = true;
      this.showRegister = false;
      // console.log("Se retorna: ", i);
      this.mascotaslocal = i;
    },
    petsModify() {
      var me = this;
      // console.log("Modificando..");
      const form = new FormData();
      form.append("nombre", this.mascotaslocal.nombre);
      form.append("edad", this.mascotaslocal.edad);
      form.append("raza", this.mascotaslocal.raza);

      axios
        // .post("http://localhost:8080/mascotas/" + me.mascotaslocal.id, form)
        .put(URL + "/api/mascotas/" + me.mascotaslocal.id, me.mascotaslocal)
        // .post("https://lic-gamma.000webhostapp.com/public/mascotas/", + this.mascotaslocal.id, form)
        .then(function (response) {
          // console.log(response);
          me.fillpets();
          me.show = false;
          me.showRegister = false;
          me.$swal.fire("Mascota editada exitosamente!", "", "success");
        })
        .catch(function (error) {
          // console.log(error);
        });
      // console.log("Se retorna: ", this.mascotaslocal);
    },
    clean() {
      this.mascotaslocal.id = "";
      this.mascotaslocal.nombre = "";
      this.mascotaslocal.edad = "";
      this.mascotaslocal.raza = "";
      this.fillpets();
    },
    cancel() {
      this.mascotaslocal.id = "";
      this.mascotaslocal.nombre = "";
      this.mascotaslocal.edad = "";
      this.mascotaslocal.raza = "";
      this.show = false;
      this.showRegister = false;
      this.fillpets();
    },
    newPet() {
      this.clean();
      this.show = true;
      this.showRegister = true;
    },
    deletepets(i) {
      var me = this;
      this.$swal
        .fire({
          title: "Deseas eliminar el registro?",
          text: "No se podrá revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Confirmar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // console.log("http://localhost:8081/api/mascotas/" + i);
            this.$swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
            // .delete("http://localhost:8080/mascotas/" + i)
            // .delete("https://lic-gamma.000webhostapp.com/public/mascotas/", + i)
            axios
              .delete(URL + "/api/mascotas/" + i)

              .then((response) => {
                me.fillpets();
              })
              .catch((error) => console.log("Error ", error));
          }
        });
      // let ask = confirm("¿Está seguro de eliminar el registro?");
      // if (ask) {
      //   // console.log("http://localhost:8081/api/mascotas/" + i);
      //   axios
      //     // .delete("http://localhost:8080/mascotas/" + i)
      //     .delete("http://localhost:8081/api/mascotas/" + i)
      //     // .delete("https://lic-gamma.000webhostapp.com/public/mascotas/", + i)
      //     .then((response) => {
      //       // console.log(response);
      //       me.fillpets();
      //     })
      //     .catch((error) => console.log("Error ", error));
      // }
    },
    loginRoute() {
      this.check();
      this.$router.push({ name: "login" });
    },
    logout() {
      axios.get(URL + "/api/logout").then((response) => {
        // console.log(response.data);
        localStorage.clear();
        me.$swal.fire("Sesión finalizada!", "", "success");
        this.$router.push({ name: "login" });
        // this.$cookie.delete("jwt")
      });
      this.check();
    },
  },

  mounted() {
    this.fillpets();
  },
};
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>