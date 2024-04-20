<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="col-sm-2 col-12 application-logo">
        <Logo />
        <button
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler"
          data-bs-target="#navbarSupportedContent"
          data-bs-toggle="collapse"
          type="button"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="col-sm-6 col-12 search-bar">
        <div
          id="navbarSupportedContent"
          :class="['collapse', 'navbar-collapse']"
        >
          <SearchForm />
          <ul class="navbar-nav me-auto">
            <div class="btn-group button-restaurant">
              <button
                aria-expanded="false"
                aria-haspopup="true"
                class="btn btn-outline-danger m-1 dropdown-toggle"
                data-toggle="dropdown"
                type="button"
              >
                Restaurants
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">$</a>
                <a class="dropdown-item" href="#">$$</a>
                <a class="dropdown-item" href="#">$$$</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Vegan Options</a>
              </div>
            </div>

            <div class="btn-group button-location">
              <button
                aria-expanded="false"
                aria-haspopup="true"
                class="btn btn-outline-danger m-1 dropdown-toggle"
                data-toggle="dropdown"
                type="button"
              >
                Location
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Your Location</a>
                <a class="dropdown-item" href="#">Montreal</a>
                <a class="dropdown-item" href="#">Sherbrooke</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Explore locations</a>
              </div>
            </div>
          </ul>
          <router-link style="display: none" to="/profile">Profile</router-link>
          <div
            class="p-1 user-authentication-sign-in d-lg-none"
            @click="navigateTo('/login')"
          >
            <button class="btn btn-outline-danger" type="button">Log In</button>
          </div>
        </div>
      </div>
      <div
        v-if="!loggedInUser"
        class="col-sm-4 d-flex justify-content-end authentication"
      >
        <router-link style="display: none" to="/login">Log In</router-link>
        <router-link style="display: none" to="/signup">Sign Up</router-link>
        <div class="p-1 user-authentication-sign-up d-none d-lg-block">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="navigateTo('/signup')"
          >
            Sign Up
          </button>
        </div>
        <div
          class="p-1 user-authentication-sign-in d-none d-lg-block"
          @click="navigateTo('/login')"
        >
          <button class="btn btn-outline-danger" type="button">Log In</button>
        </div>
      </div>
      <div
        v-if="loggedInUser"
        class="col-sm-4 justify-content-end authenticated-user"
      >
        <button class="btn btn-outline-danger" type="button" @click="logout">
          Log Out
        </button>
        <div class="photo d-flex align-items-center justify-content-center">
          <img
            v-if="loggedInUser.email"
            :src="getGravatarUrl(loggedInUser.email)"
            alt="User Profile Picture"
            id="user-profile-picture"
            @click="navigateTo('/profile')"
          />
          <div class="user-name-lastname ml-2">
            <h6>{{ loggedInUser.name }}</h6>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import "@/styles/navbar.css";
import Logo from "@/components/navBar/NavBarLogo.vue";
import SearchForm from "@/components/navBar/NavBarSearchForm.vue";
import { ref } from "vue";
import { mapState } from "vuex";
import md5 from "md5";

export default {
  components: {
    Logo,
    SearchForm,
  },
  data() {
    return {
      isModalVisible: false,
      routeQuery: ref(this.$route.query.authenticatedUser),
    };
  },
  computed: {
    ...mapState(["loggedInUser"]),
  },
  methods: {
    getGravatarUrl(email, size = 80) {
      const emailHash = md5(email.trim().toLowerCase()); // Hash the email (MD5)
      return `https://secure.gravatar.com/avatar/${emailHash}?s=${size}&d=mm`; // Gravatar URL with size and default image (mm = mystery man)
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  setup() {
    const slide = ref(0);
    const sliding = ref(null);
    const profileDropdownList = ref(null);
    const btn = ref(null);
    const names = ref("Profile");
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
      isHovered,
      dropdowns,
      dropDownProfile,
      setHover,
    };
  },
};
</script>

<style scoped>
.authenticated-user {
  display: flex;
  align-items: center;
}

#user-profile-picture {
  border-radius: 50%;
  max-width: 40px;
  max-height: 40px;
  width: 70%;
  height: 70%;
}

#user-profile-picture:hover {
  border-radius: 50%;
  max-width: 55px;
  max-height: 55px;
  opacity: 0.8;
  cursor: pointer;
  transform: scale(1.1);
  transition:
    opacity 0.3s,
    transform 0.3s;
}

@media (max-width: 576px) {
  #user-profile-picture {
    max-width: 40px;
    height: auto;
    position: fixed;
    top: 5px;
    right: 5px;
    border-radius: 50%;
  }
}

@media (max-width: 576px) {
  .user-name-lastname {
    display: none;
  }
}

.profile-dropdown-btn:hover .profile-img img {
  filter: brightness(0);
}

.profile-img img {
  width: 100%;
  height: 100%;
  border-radius: 4px; /* Adjust the border-radius to make it square */
  transition: filter 0.3s;
}

.profile-img i {
  position: absolute;
  right: 0;
  bottom: 0.3rem;
  font-size: 0.5rem;
  color: green;
}

.profile-dropdown-btn span {
  margin: 0 0 0 0.5rem;
  display: flex;
  align-items: center; /* Center the profile text and icon */
}

.profile-dropdown-list hr {
  border: 0.5px solid green;
}

.profile-dropdown-list-item a {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
}

.profile-dropdown-list-item a i {
  font-size: 1.1rem;
  width: 2.3rem;
  height: 2.3rem;
  background-color: white;
  color: white;
  line-height: 2.3rem;
  text-align: center;
  margin-right: 1rem;
  border-radius: 50%;
  transition: margin-right 0.3s;
}
</style>
