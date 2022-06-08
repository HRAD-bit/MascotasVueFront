<template>
  <div id="app">
    <!-- <MenuComponent></MenuComponent> -->
    <router-view></router-view>
  </div>
</template>

<script>
import MenuComponent from "./components/MenuComponent.vue";

export default {
  name: "App",
  components: { MenuComponent },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logoSvg {
  max-width: 50px;
  max-height: 50px;
}
</style>
