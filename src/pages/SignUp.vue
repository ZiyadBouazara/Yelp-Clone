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
                <div v-if="firstNameError?.length" class="error-message">
                  {{ firstNameError }}
                </div>
              </div>
              <div class="col-md-6">
                <input
                  v-model="lastName"
                  id="inputLastName"
                  class="form-control"
                  placeholder="Last Name"
                  type="text"
                />
                <div v-if="lastNameError?.length" class="error-message">
                  {{ lastNameError }}
                </div>
              </div>
              <div class="col-md-6">
                <input
                  v-model="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email"
                />
                <div v-if="emailError?.length" class="error-message">
                  {{ emailError }}
                </div>
              </div>
              <div class="col-md-6">
                <input
                  v-model="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                />
                <div v-if="passwordError?.length" class="error-message">
                  {{ passwordError }}
                </div>
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
import { validateForm as registrationValidation } from "@/javascript/validateForm";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const firstNameError = ref("");
const lastNameError = ref("");
const emailError = ref("");
const passwordError = ref("");

const handleSignUp = async () => {
  clearErrors();

  firstNameError.value = registrationValidation.validateFirstName(
    firstName.value,
  );
  lastNameError.value = registrationValidation.validateLastName(lastName.value);
  emailError.value = registrationValidation.validateEmail(email.value);
  passwordError.value = registrationValidation.validatePassword(password.value);

  if (
    firstNameError.value ||
    lastNameError.value ||
    emailError.value ||
    passwordError.value
  ) {
    return;
  }

  const name = firstName.value.concat(" ", lastName.value);

  try {
    await store.dispatch("signUp", {
      name: name,
      email: email.value,
      password: password.value,
    });
    router.push("/login");
  } catch (error) {
    console.error("Sign up failed:", error);
  }
};

const clearErrors = () => {
  firstNameError.value = "";
  lastNameError.value = "";
  emailError.value = "";
  passwordError.value = "";
};
</script>
<style scoped>
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
