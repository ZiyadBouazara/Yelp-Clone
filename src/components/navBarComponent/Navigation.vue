<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Logo />
        <button class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="['collapse', 'navbar-collapse']"
          id="navbarSupportedContent"
        >
          <SearchForm />
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <Dropdowns :dropdowns="dropdowns" />
            <Links :links="links" :isHovered="isHovered" @hover="setHover" />
          </ul>
        </div>
      </div>
    </nav>
    <div class="category-container floating-text">
      <p class="category-text_one text">Welcome to uFood,</p>
      <p class="category-text_princ text">Choose and</p>
      <p class="category-text_Enjoy text">Enjoy...</p>

      <div class="container">
        <base-sec-nav-bar></base-sec-nav-bar>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/navbar.css";
import Logo from "./NavBarLogo.vue";
import SearchForm from "./NavBarSearchForm.vue";
import Dropdowns from "./NavBarDropDowns.vue";
import Links from "./NavBarLinks.vue";
// import ProfileDropdown from './ProfileDropdown.vue';
import { computed, ref } from "vue";
import BaseSecNavBar from "@/components/generalComponent/baseSecNavBar.vue";

export default {
  components: {
    BaseSecNavBar,
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
