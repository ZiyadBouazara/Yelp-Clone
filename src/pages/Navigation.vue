<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Logo />
        <button class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
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
import BaseSecNavBar from "@/components/generalComponent/baseSecNavBar.vue";

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

<style scoped></style>
