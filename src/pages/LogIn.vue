<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- Left Column: Sign In Form -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Log In to UFood</h3>

            <!-- Sign In Form -->
            <form class="mx-auto">
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

            <!-- Additional Links -->
            <div class="mt-3 text-center">
              <p>
                New user?
                <router-link to="/signup">Sign Up</router-link>
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
