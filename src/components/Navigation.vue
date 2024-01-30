<template>
  <div class="navBar-BACKGROUND border-css">
    <header class="consumer-navigation border-css">
      <div class="interieur-navBar border-css">
        <div class="nav-firstLine border-css">
          <div class="Logo">
            <router-link to="/" class="logo-link other" role="link">
              UFOOD
            </router-link>
          </div>
          <div class="actionButtons">
            <form
              class="searchBar border-css"
              action="/search-restaurant"
              role="search"
              method="get"
            >
              <input
                type="text"
                placeholder="Search for a restaurant..."
                class="searchInput"
              />
            </form>
            <form
              class="searchBar border-css"
              action="/search-location"
              role="search"
              method="get"
            >
              <input
                type="text"
                placeholder="Search for a location..."
                class="searchInput"
              />
            </form>
            <button class="searchButton">Search</button>
            <div class="buttonSpace"></div>
            <router-link
              to="/login"
              class="transparentButton"
              style="text-decoration: none"
            >
              Log In
            </router-link>
            <router-link
              to="/signup"
              class="redButton"
              style="text-decoration: none"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped></style>

<script setup>
import "@/styles/navbar.css";
</script>
