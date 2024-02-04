<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" :class="navbarClass">
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
          <!--          <ProfileDropdown-->
          <!--            :dropDownProfile="dropDownProfile"-->
          <!--            :isDropdownActive="isDropdownActive"-->
          <!--            @toggle="toggle"-->
          <!--          />-->
        </div>
      </div>
    </nav>
    <div>
      <carousel></carousel>
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
import Carousel from "@/components/GeneralComponent/Carousel.vue";
import { computed, ref } from "vue";

export default {
  components: {
    Logo,
    SearchForm,
    Dropdowns,
    Links,
    Carousel,
    // ProfileDropdown,
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

    const isDropdownActive = ref(
      dropDownProfile && dropDownProfile[0].items.length > 0,
    );

    const navbarClass = computed(() => {
      const backgroundColor = calculateBackgroundColor();
      return {
        "bg-body-tertiary": true,
        "bg-fading": backgroundColor !== "#ababab",
      };
    });

    const onSlideStart = (slide) => {
      sliding.value = true;
    };

    const onSlideEnd = (slide) => {
      sliding.value = false;
    };

    const setHover = (index, value) => {
      isHovered[index].value = value;
    };

    const toggle = () => {
      if (profileDropdownList.value) {
        profileDropdownList.value.classList.toggle("active");
      }
    };

    const calculateBackgroundColor = () => {
      const slideColors = ["#ababab"];
      const currentIndex = slide.value % slideColors.length;
      return slideColors[currentIndex];
    };

    const mounted = () => {
      profileDropdownList.value = document.querySelector(
        ".profile-dropdown-list",
      );
      btn.value = document.querySelector(".profile-dropdown-btn");

      if (profileDropdownList.value && btn.value) {
        window.addEventListener("click", (e) => {
          console.log("Window Clicked");
          if (!btn.value.contains(e.target)) {
            profileDropdownList.value.classList.remove("active");
          }
        });
      } else {
        console.error("Elements not found");
      }
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
      isDropdownActive,
      navbarClass,
      onSlideStart,
      onSlideEnd,
      setHover,
      toggle,
      calculateBackgroundColor,
      mounted,
    };
  },
};
</script>

<!--Create a loop so that the dropdown element and link be reduced and less complicated code-->
<!--     KEEP THESE OPTION FOR AFTER LOGIN IN           -->
<!--            <li class="profile-dropdown-list-item">-->
<!--              <a href="#">-->
<!--                <i class="fa-regular fa-user"></i>-->
<!--                Edit Profile-->
<!--              </a>-->
<!--            </li>-->

<!--            <li class="profile-dropdown-list-item">-->
<!--              <a href="#">-->
<!--                <i class="fa-regular fa-envelope"></i>-->
<!--                Inbox-->
<!--              </a>-->
<!--            </li>-->

<!--            <li class="profile-dropdown-list-item">-->
<!--              <a href="#">-->
<!--                <i class="fa-solid fa-chart-line"></i>-->
<!--                Analytics-->
<!--              </a>-->
<!--            </li>-->

<!--            <li class="profile-dropdown-list-item">-->
<!--              <a href="#">-->
<!--                <i class="fa-solid fa-sliders"></i>-->
<!--                Settings-->
<!--              </a>-->
<!--            </li>-->

<!--            <li class="profile-dropdown-list-item">-->
<!--              <a href="#">-->
<!--                <i class="fa-regular fa-circle-question"></i>-->
<!--                Help & Support-->
<!--              </a>-->
<!--            </li>-->
<!--            <hr />-->

<!--            <li class="profile-dropdown-list-item">-->
<!--              <a href="#">-->
<!--                <i class="fa-solid fa-arrow-right-from-bracket"></i>-->
<!--                Log out-->
<!--              </a>-->
<!--            </li>-->
