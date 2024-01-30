import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";
import Navigation from "@/components/Navigation.vue";
import RestaurantDetails from "@/components/RestaurantDetails.vue";

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
  {
    path: "/restaurants",
    name: "Restaurant-details",
    component: RestaurantDetails,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
