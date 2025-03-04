<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/reembolsos">Reembolsos</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
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
