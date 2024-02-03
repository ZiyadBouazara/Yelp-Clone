<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" :class="navbarClass">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">UFOOD</router-link>
        <button class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="['collapse', 'navbar-collapse']"
          id="navbarSupportedContent"
        >
          <div class="d-flex mx-auto">
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                type="button"
                class="btn btn-outline-danger"
                style="margin-left: 5px"
              >
                Search
              </button>
            </form>
          </div>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <div
              v-for="(dropdown, index) in dropdowns"
              :key="index"
              class="dropdown m-2"
            >
              <button
                class="btn btn-outline-danger dropdown-toggle"
                type="button"
                :id="'dropdown-' + (index + 1)"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ dropdown.text }}
              </button>
              <ul
                class="dropdown-menu"
                :aria-labelledby="'dropdown-' + (index + 1)"
              >
                <li
                  v-for="(item, itemIndex) in dropdown.items"
                  :key="itemIndex"
                >
                  <a class="dropdown-item" href="#">
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>

            <a
              v-for="(link, index) in links"
              :key="index"
              class="nav-item"
              :class="{
                'red-link': !isHovered[index],
                'hovered-link': isHovered[index],
              }"
              @mouseover="setHover(index, true)"
              @mouseout="setHover(index, false)"
              href="#"
            >
              {{ link }}
            </a>
          </ul>

          <div class="profile-dropdown" style="margin-left: 20px">
            <div @click="toggle" class="profile-dropdown-btn">
              <div class="profile-img">
                <img src="../assets/imageUnknown.png" alt="Profile Image" />
              </div>

              <!-- Displaying the first item in the dropDownProfile array -->
              <span>
                {{ dropDownProfile[0].text }}
                <i class="fa-solid fa-angle-down"></i>
              </span>
            </div>

            <!-- Generating the dropdown list based on dropDownProfile -->
            <ul class="profile-dropdown-list">
              <li
                v-for="(item, index) in dropDownProfile[0].items"
                :key="index"
                class="profile-dropdown-list-item"
              >
                <!-- Using router-link to dynamically generate links -->
                <a :href="item.href" class="nav-link">
                  <i class="fa-regular fa-user"></i>
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import "@/styles/navbar.css";
import { computed, ref } from "vue";

export default {
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
