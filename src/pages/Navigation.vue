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
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end authentication">
          <div class="p-1 user-authentication-sign-up">
            <button type="button" class="btn btn-outline-danger">
              Sign Up
            </button>
          </div>
          <div class="p-1 user-authentication-sign-in">
            <button type="button" class="btn btn-outline-danger">
              Sign In
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
// import ProfileDropdown from '@/components/navBarComponent/ProfileDropdown.vue';
import { computed, ref } from "vue";
import BaseSecNavBar from "@/components/generalComponent/BaseSecNavBar.vue";
import BaseButton from "@/components/generalComponent/BaseButton.vue";

export default {
  components: {
    Logo,
    SearchForm,
    Dropdowns,
    Links,
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
.container {
  margin-top: -180px;
  margin-bottom: -180px;
}

.text {
  border: 2px solid #ff6666;
  padding: 10px;
  border-radius: 30px;
}

.category-container {
  margin-top: 30px;
}

.floating-text {
  text-align: center;
  font-size: 40px;
  animation: floatAnimation 2s infinite alternate;
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.category-text_princ {
  text-align: center;
  font-size: 50px;
}

.category-text_one {
  margin-left: 400px;
  font-size: 24px;
  font-weight: bold;
}

.category-text_Enjoy {
  margin-left: 750px;
  font-size: 60px;
  font-weight: bold;
}
</style>
