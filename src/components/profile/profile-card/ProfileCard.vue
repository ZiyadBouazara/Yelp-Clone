<template>
  <div class="card" style="max-width: 18rem">
    <div>
      <img
        v-if="user"
        :src="getGravatarUrl(user.email)"
        alt="User Profile Picture"
        class="profile-picture"
      />
      <p v-else>No email provided.</p>
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col">
          <h4 class="card-title">{{ user.name }}</h4>
          <h5 class="card-text">{{ user.email }}</h5>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <div class="row">
            <div class="col-6">
              <div>
                <button
                  :data-bs-target="`#modal-followers`"
                  class="btn btn-light"
                  data-bs-toggle="modal"
                  type="button"
                >
                  <span class="ms-2">{{ props.followers.length }}</span>
                  <br />
                  <span class="ms-2">followers</span>
                </button>
                <UserFollowers :followers="props.followers" />
              </div>
            </div>
            <div class="col-6">
              <div>
                <button
                  :data-bs-target="`#modal-following`"
                  class="btn btn-light"
                  data-bs-toggle="modal"
                  type="button"
                >
                  <span class="ms-2">{{ props.following.length }}</span>
                  <br />
                  <span class="ms-2">following</span>
                </button>
                <UserFollowing :following="props.following" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <p><i class="far fa-star"></i> Rating : {{ user.rating }}</p>
      </div>
    </div>
    <hr style="background-color: #ccc; margin: 0" />
  </div>
</template>

<script setup>
import UserFollowing from "@/components/profile/profile-card/UserFollowing.vue";
import UserFollowers from "@/components/profile/profile-card/UserFollowers.vue";
import md5 from "md5";

const props = defineProps({
  user: { type: Object, required: true },
  followers: { type: Array },
  following: { type: Array },
});

function getGravatarUrl(email, size = 80) {
  const emailHash = md5(email.trim().toLowerCase()); // Hash the email (MD5)
  return `https://secure.gravatar.com/avatar/${emailHash}?s=${size}&d=mm`; // Gravatar URL with size and default image (mm = mystery man)
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ghostwhite;
  border-radius: 10px;
  border: 1px solid #ccc;
  max-height: 400px;
  transition: box-shadow 0.3s;
}

.profile-picture:hover {
  opacity: 0.8;
  cursor: pointer;
  transform: scale(1.1);
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.profile-picture {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.card-body {
  text-align: center;
  background-color: ghostwhite;
}

.btn-light {
  background-color: ghostwhite !important;
  border: 1px solid transparent !important;
}

.btn-light:hover {
  border-color: #ddd !important;
}

.btn-light span {
  font-size: 1rem;
}

p {
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(110, 112, 114, 1);
  text-align: center;
  margin: 0;
  padding: 0;
  border: 0;
}

h4 {
  font-family: "Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: black;
  font-size: 28px;
  font-weight: 700;
}

h5 {
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgba(110, 112, 114, 1);
}
</style>
