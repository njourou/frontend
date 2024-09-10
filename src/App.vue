<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="!isAuthenticated" to="/admin/login">Admin Login</router-link>
      <router-link v-if="!isAuthenticated" to="/admin/register">Admin Register</router-link>
      <router-link v-if="isAuthenticated" to="/admin">Admin Dashboard</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('authToken');
    },
  },
};
</script>

