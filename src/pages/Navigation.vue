<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="col-2 application-logo">
          <Logo />
          <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="col-6 search-bar">
          <div
            id="navbarSupportedContent"
            :class="['collapse', 'navbar-collapse']"
          >
            <SearchForm />
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <Dropdowns :dropdowns="dropdowns" />
              <Links :isHovered="isHovered" :links="links" @hover="setHover" />
            </ul>
            <router-link style="display: none" to="/profile">Profile</router-link>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="navigateTo('/profile')"
            >
              Profile Example
            </button>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end authentication">
          <router-link style="display: none" to="/login">Log In</router-link>
          <router-link style="display: none" to="/signup">Sign Up</router-link>
          <div class="p-1 user-authentication-sign-up">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="navigateTo('/signup')"
            >
              Sign Up
            </button>
          </div>
          <div
            class="p-1 user-authentication-sign-in"
            @click="navigateTo('/login')"
          >
            <button type="button" class="btn btn-outline-danger">
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import "@/styles/navbar.css";
import Logo from "@/components/navBarComponent/NavBarLogo.vue";
import SearchForm from "@/components/navBarComponent/NavBarSearchForm.vue";
import Dropdowns from "@/components/navBarComponent/NavBarDropDowns.vue";
import Links from "@/components/navBarComponent/NavBarLinks.vue";
import { computed, ref } from "vue";
import { EventBus } from "@/App.vue";

export default {
  components: {
    Logo,
    SearchForm,
    Dropdowns,
    Links,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    openModal() {
      EventBus.emit("open-authentication-modal");
    },
    closeModal() {
      EventBus.emit("close-authentication-modal");
    },
    navigateTo(path) {
      this.$router.push(path);
    },
  },
  setup() {
    const slide = ref(0);
    const sliding = ref(null);
    const profileDropdownList = ref(null);
    const btn = ref(null);
    const names = ref("Profile");
    const links = ["Write A Review"];
    const isHovered = Array.from({ length: 10 }, () => ref(false));

    const dropdowns = [
      {
        text: "Restaurant",
        items: [
          { label: "Action", href: "#" },
          { label: "Another action", href: "#" },
        ],
      },
      {
        text: "Location",
        items: [
          { label: "Action", href: "#" },
          { label: "Another action", href: "#" },
        ],
      },
    ];

    const dropDownProfile = [
      {
        text: "Profile",
        items: [
          { label: "Log In", href: "@/login" },
          { label: "Sign Up", href: "@/signup" },
        ],
      },
    ];

    const setHover = (index, value) => {
      isHovered[index].value = value;
    };

    return {
      slide,
      sliding,
      profileDropdownList,
      btn,
      names,
      links,
      isHovered,
      dropdowns,
      dropDownProfile,
      setHover,
    };
  },
};
</script>

<style scoped></style>
