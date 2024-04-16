<template>
  <router-link class="navbar-brand" to="/">
    <span class="logo-text">UFOOD</span>
  </router-link>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style scoped>
.logo-text {
  font-size: 24px;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 20px;
  }
}
</style>
