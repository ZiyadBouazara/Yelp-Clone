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
            <form class="mx-auto" @submit.prevent="handleLogin">
              <div class="form-group">
                <input
                  v-model="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  class="form-control"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="password"
                  id="exampleInputPassword1"
                  class="form-control"
                  placeholder="Password"
                  type="password"
                />
                <div v-if="loginError?.length" class="error-message">
                  {{ loginError }}
                </div>
              </div>
              <button class="btn btn-danger" type="submit">Log In</button>
            </form>
            <div class="mt-3 text-center">
              <p>
                New user ?
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
import { ref } from "vue";
import store from "@/store";
import { validateForm as loginValidation } from "@/javascript/validateForm";

const router = useRouter();
const email = ref("");
const password = ref("");

const loginError = ref("");

const handleLogin = async () => {
  loginError.value = loginValidation.validateLoginForm();

  try {
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });
    router.push({ path: "/" });
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const authenticateUser = (event) => {
  event.preventDefault();
  if (router && router.push) {
    router.push({
      query: { authenticatedUser: true },
      name: "Home",
    });
    console.log("it works!");
  } else {
    console.error("router not available");
  }
};
</script>
<style scoped>
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
