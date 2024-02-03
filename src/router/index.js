import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/homePageComponent/Home.vue";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";
import Navigation from "@/components/navBarComponent/Navigation.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user",
    name: "User",
    component: User,
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
    path: "/navigation",
    name: "Navigation",
    component: Navigation,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
