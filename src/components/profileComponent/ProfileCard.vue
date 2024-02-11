<template>
  <div class="card" style="max-width: 18rem">
    <img
      alt="Profile picture"
      class="profile-picture"
      src="@/assets/UFood_Profile_Picture.png"
    />
    <div class="card-body">
      <h3 class="card-title">{{ name }}</h3>
      <p class="card-text location">{{ location }}</p>
      <div class="score">
        <div class="score-info">
          <i class="fas fa-star"></i>
          <p class="score-value">{{ score }}</p>
        </div>
      </div>
    </div>
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 400px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.card-body {
  text-align: center;
}

.location {
  color: #888;
  margin-bottom: 20px;
}

.score {
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-info {
  font-size: 24px;
  color: #000;
}

.score-info i {
  font-size: 24px;
  color: #ffc107;
  margin-right: 5px;
}

.score-value {
  margin: 0;
  font-size: 24px;
  color: #000;
}
</style>
