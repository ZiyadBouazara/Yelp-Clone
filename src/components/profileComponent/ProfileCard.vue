<template>
  <div class="card" style="max-width: 18rem">
    <img
      alt="Profile picture"
      class="profile-picture"
      src="@/assets/default_user_avatar.png"
    />
    <div class="card-body">
      <div class="row mb-3">
        <div class="col">
          <h4 class="card-title">{{ name }}</h4>
          <h5 class="card-text">{{ location }}</h5>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <div class="row">
            <div class="col">
              <button class="btn btn-light" @click="editProfile">
                <i class="far fa-pen-to-square"></i>
                <span class="ms-2">Edit Profile</span>
              </button>
            </div>
            <div class="col">
              <button class="btn btn-light" @click="addPhoto">
                <i class="far fa-image"></i>
                <span class="ms-2">Add Photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <p><i class="far fa-star"></i> Score : {{ score }}</p>
      </div>
    </div>
    <hr style="background-color: #ccc; margin: 0" />
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    name: String,
    location: String,
    score: Number,
  },
  methods: {
    editProfile() {
      // Handle edit profile action
    },
    addPhoto() {
      // Handle add photo action
    },
  },
};
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
