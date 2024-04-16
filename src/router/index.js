import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import LogIn from "@/pages/LogIn.vue";
import SignUp from "@/pages/SignUp.vue";
import Profile from "@/pages/Profile.vue";
import RestaurantDetails from "@/pages/RestaurantDetails.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Log In",
    component: LogIn,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/restaurant/:id",
    name: "Restaurant details",
    component: RestaurantDetails,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isLoggedIn = store.state.loggedInUser;
    if (!isLoggedIn) {
      next({ name: "Log In" });
    } else {
      next();
    }
  } else {
    next();
  }
});
