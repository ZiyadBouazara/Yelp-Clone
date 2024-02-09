<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <!-- Form -->
            <form class="row g-3 mx-auto">
              <div style="padding: 0">
                <h3 class="card-title text-center">Sign Up for UFood</h3>
                <h4 class="card-body text-center lead" style="padding: 0">
                  Connect with great local restaurants
                </h4>
              </div>
              <!-- First Name and Last Name -->
              <div class="col-md-6">
                <input
                  id="inputFirstName"
                  class="form-control"
                  placeholder="First Name"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <input
                  id="inputLastName"
                  class="form-control"
                  placeholder="Last Name"
                  type="text"
                />
              </div>

              <!-- Email and Password -->
              <div class="col-md-6">
                <input
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div class="col-md-6">
                <input
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>

              <!-- ZIP Code -->
              <div class="col-md-12">
                <input
                  id="inputZip"
                  class="form-control"
                  placeholder="ZIP code"
                  type="text"
                />
              </div>

              <!-- Sign Up Button -->
              <div class="col-md-12">
                <button class="btn btn-danger" type="submit">Sign Up</button>
              </div>
            </form>

            <!-- Additional Links -->
            <div class="mt-3 text-center">
              <p>
                Already on UFood?
                <router-link to="/login">Log in</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Image -->
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
import "@/styles/global.css";
import "@/styles/registration.css";
</script>
<style>
.row {
  margin-top: 100px;
}
</style>
