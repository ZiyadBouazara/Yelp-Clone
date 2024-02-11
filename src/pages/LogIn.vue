<template>
  <div class="container mt-5">
    <div class="row justify-content-center log-in-content">
      <div
        class="col-md-6"
        style="display: flex; align-items: center; justify-content: center"
      >
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Log In to UFood</h3>
            <form class="mx-auto" @submit="authenticateUser">
              <div class="form-group">
                <input
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  class="form-control"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div class="form-group">
                <input
                  id="exampleInputPassword1"
                  class="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <button class="btn btn-danger" type="submit">Log In</button>
            </form>
            <div class="mt-3 text-center">
              <p>
                New user?
                <router-link to="/signup">Sign Up</router-link>
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
import { useRouter } from "vue-router";

const router = useRouter();

const authenticateUser = (event) => {
  event.preventDefault();
  if (router && router.push) {
    router.push({ name: "Home", query: { authenticatedUser: true } });
    console.log("it works!");
  } else {
    console.error("router not available");
  }
};
</script>
