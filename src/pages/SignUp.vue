<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <form class="row g-3 mx-auto" @submit.prevent="handleSignUp">
              <div style="padding: 0">
                <h3 class="card-title text-center">Sign Up for UFood</h3>
                <h4 class="card-body text-center lead" style="padding: 0">
                  Connect with great local restaurants
                </h4>
              </div>
              <div class="col-md-6">
                <input
                  v-model="firstName"
                  id="inputFirstName"
                  class="form-control"
                  placeholder="First Name"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <input
                  v-model="lastName"
                  id="inputLastName"
                  class="form-control"
                  placeholder="Last Name"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <input
                  v-model="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div class="col-md-6">
                <input
                  v-model="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div class="col-md-12">
                <button class="btn btn-danger" type="submit">Sign Up</button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <p>
                Already on UFood?
                <router-link to="/login">Log in</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-3 mt-md-0">
        <img
          alt="Illustration"
          class="img-fluid rounded"
          src="@/assets/signup_illustration.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/styles/registration.css";
import { ref } from "vue";
import { router } from "@/router";
import store from "@/store";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  try {
    const name = firstName.value.concat(" ", lastName.value);
    await store.dispatch("signUp", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push("/login");
  } catch (error) {
    console.error("Sign up failed:", error);
  }
};
</script>
