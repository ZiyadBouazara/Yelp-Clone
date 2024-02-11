<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="col-sm-2 col-12 application-logo" @click="authenticateUser">
        <Logo />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="col-sm-6 col-12 search-bar">
        <div
          :class="['collapse', 'navbar-collapse']"
          id="navbarSupportedContent"
        >
          <SearchForm />
          <ul class="navbar-nav me-auto">
            <div class="btn-group button-restaurant">
              <button
                type="button"
                class="btn btn-outline-danger m-1 dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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
                type="button"
                class="btn btn-outline-danger m-1 dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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

            <Links :isHovered="isHovered" :links="links" @hover="setHover" />
          </ul>
          <router-link style="display: none" to="/profile">Profile</router-link>
          <div
            class="p-1 user-authentication-sign-in d-lg-none"
            @click="navigateTo('/login')"
          >
            <button type="button" class="btn btn-outline-danger">Log In</button>
          </div>
        </div>
      </div>
      <div
        class="col-sm-4 d-flex justify-content-end authentication"
        v-if="!isUserAuthenticated"
      >
        <router-link style="display: none" to="/login">Log In</router-link>
        <router-link style="display: none" to="/signup">Sign Up</router-link>
        <div class="p-1 user-authentication-sign-up d-none d-lg-block">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="navigateTo('/signup')"
          >
            Sign Up
          </button>
        </div>
        <div
          class="p-1 user-authentication-sign-in d-none d-lg-block"
          @click="navigateTo('/login')"
        >
          <button type="button" class="btn btn-outline-danger">Log In</button>
        </div>
      </div>
      <div
        class="col-sm-4 justify-content-end authenticated-user"
        v-if="isUserAuthenticated"
      >
        <div class="photo d-flex align-items-center">
          <img
            id="user-profile-picture"
            src="@/assets/UFood_Profile_Picture.png"
            alt="A user's profile picture"
            @click="navigateTo('/profile')"
          />
          <div class="user-name-lastname ml-2">
            <h6>Bob</h6>
            <h6>Washington</h6>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import "@/styles/navbar.css";
import Logo from "@/components/navBarComponent/NavBarLogo.vue";
import SearchForm from "@/components/navBarComponent/NavBarSearchForm.vue";
import Links from "@/components/navBarComponent/NavBarLinks.vue";
import { ref } from "vue";
import { EventBus } from "@/App.vue";

export default {
  components: {
    Logo,
    SearchForm,
    Links,
  },
  data() {
    return {
      isModalVisible: false,
      routeQuery: ref(this.$route.query.authenticatedUser),
      isUserAuthenticated: ref(false),
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
    authenticateUser() {
      this.isUserAuthenticated = !this.isUserAuthenticated;
      console.log("user authentified? :" + this.isUserAuthenticated);
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

<style scoped>
.authenticated-user {
  display: flex;
  align-items: center;
}

#user-profile-picture {
  border-radius: 50%;
  max-width: 70px;
  width: 70%;
  height: 70%;
  max-height: 70px;
}

#user-profile-picture:hover {
  border-radius: 50%;
  max-width: 70px;
  max-height: 70px;
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
.profile-dropdown-btn {
  display: flex;
  align-items: center;
  padding-right: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  width: 150px;
  border-radius: 4px;
  color: black;
  border: 1px solid transparent;
  transition:
    box-shadow 0.2s ease-in,
    background-color 0.2s ease-in,
    border 0.3s;
  background-color: transparent;
}

.profile-dropdown-btn:hover {
  background-color: #f8f9fa;
  border-color: #ced4da;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-dropdown-btn:hover .profile-img img {
  filter: brightness(0);
}

.profile-img {
  overflow: hidden;
  width: 30px;
  height: 30px;
  position: relative;
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
  margin: 0 0.5rem;
  margin-right: 0;
  display: flex;
  align-items: center; /* Center the profile text and icon */
}

.profile-dropdown-list {
  position: absolute;
  top: 68px;
  width: 220px;
  right: 0;
  background-color: white;
  border-radius: 10px;
  max-height: 0;
  overflow: hidden;
  box-shadow: darkgrey;
  transition: max-height 0.5s;
}

.profile-dropdown-list hr {
  border: 0.5px solid green;
}

.profile-dropdown-list.active {
  max-height: 500px;
}

.profile-dropdown-list-item {
  padding: 0.5rem 0 0.5rem 1rem;
  transition:
    background-color 0.2s ease-in,
    padding-left 0.2s;
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
  margin-right: 0.8rem;
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

.profile-dropdown-list-item:hover {
  padding-left: 1.5rem;
  background-color: #ff6666;
}

.red-link {
  color: red !important;
  margin-top: 15px;
  margin-right: 10px;
  margin-left: 10px;
  text-decoration: none !important;
}

.red-link:hover {
  color: red !important;
}

.hovered-link {
  color: #ff6666 !important;
  margin-top: 15px;
  margin-right: 10px;
  margin-left: 10px;
  text-decoration: none !important;
}

.bg-fading {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    #ababab 100%
  );
  transition: background 0.5s ease;
}
</style>
