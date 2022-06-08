import { createApp } from "vue";
import App from "./App.vue";
import Detalle from "@/views/About.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "bootstrap";
// import "bootbox";
// import "bootbox/dist/bootbox.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.js";

//Componentes
import Mascotas from "../src/components/Mascotas.vue";
import Login from "../src/components/LoginComponent.vue";
import Register from "../src/components/RegisterComponent.vue";


// /Definir las rutas con objeto de rutas -- Config
const routes = [
  {
    path: "/",
    component: Login,
    name: "login",
  },
  {
    path: "/dashboard",
    component: Mascotas,
    name: "mascotas",
  },
  {
    path: "/register",
    component: Register,
    name: "register"
  },
];

// Crear el objeto de las rutas de Vue Router -- Objeto del router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Instancia de Vue
const app = createApp(App);
app.use(router);
app.mount("#app");
