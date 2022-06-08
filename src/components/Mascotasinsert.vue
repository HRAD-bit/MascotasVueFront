<template>
  <div class="container">
    <div class="card" v-if="insert">
      <div class="card-body">
        <div class="mb-3">
          <label for="nombre" class="form-label"
            >Nombre</label
          >
          <input
            type="text"
            class="form-control"
            id="nombre"
            v-model="mascota.nombre"
            placeholder="Nombre mascota"
          />
        </div>
        <div class="mb-3">
          <label for="edad" class="form-label"
            >Edad</label
          >
          <input
            type="text"
            class="form-control"
            id="edad"
            v-model="mascota.edad"
            placeholder="Edad de mascota"
          />
        </div>
                <div class="mb-3">
          <label for="raza" class="form-label"
            >Raza</label
          >
          <input
            type="text"
            class="form-control"
            id="raza"
            v-model="mascota.raza"
            placeholder="Raza mascota"
          />
        </div>
                  <button
            type="button"
            class="btn btn-primary"
            @click="insertar()"
          >
            Guardar
          </button>
          {{mascota}}
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body">
        <h5 class="card-title">
          <button
            type="button"
            class="btn btn-primary"
            @click="formularioInsertar()"
          >
            Nuevo
          </button>
          <hr />
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Raza</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mascota in Mascotas" :key="mascota.id">
                <th scope="row">{{ mascota.id }}</th>
                <td>{{ mascota.nombre }}</td>
                <td>{{ mascota.edad }}</td>
                <td>{{ mascota.raza }}</td>
              </tr>
            </tbody>
          </table>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  data() {
    return {
      insert: false,
      Mascotas: [],
      mascota: {
        id: 0,
        nombre: "",
        edad: 0,
        raza: "",
      },
    };
  },
  methods: {
    formularioInsertar() {
      this.insert = true;
    },
    insertar() {
      var me = this;
      console.log("insertando...");

      const form = new FormData();
      form.append("nombre", me.mascota.nombre);
      form.append("edad", me.mascota.edad);
      form.append("raza", me.mascota.raza);

      axios
        .post("https://lic-gamma.000webhostapp.com/public/mascotas/", form)
        .then(function (response) {
          console.log(response);
          me.llenaMascotas();
          me.insert=false
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    llenaMascotas() {
      // axios
      // .get('https://lic-gamma.000webhostapp.com/public/mascotas/')
      // .then((response) => {
      //   this.Mascotas = response.data;
      //    console.log(response.data);
      // })
      // .catch(function (error) {
      //  console.log(error);
      // })
      var me = this;
      axios
        .get("https://lic-gamma.000webhostapp.com/public/mascotas/")
        .then(function (response) {
          // handle success
          me.Mascotas = response.data;
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  },
  mounted() {
    this.llenaMascotas();
  },
};
</script>

<style></style>