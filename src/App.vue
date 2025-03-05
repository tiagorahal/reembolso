<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  name: "App"
};

</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
}
</style>
