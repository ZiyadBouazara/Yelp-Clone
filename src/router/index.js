import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";

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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
