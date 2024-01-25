<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">UFood</router-link>
    <button
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      class="navbar-toggler"
      data-target="#navbarNav"
      data-toggle="collapse"
      type="button"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/restaurant"
            >Restaurant
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/user">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Log In</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup">Sign Up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
<script setup></script>
