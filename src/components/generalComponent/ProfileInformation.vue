<script>
import { isVisible } from "bootstrap/js/src/util";

export default {
  name: "ProfileInformation",
  isProfileInformationVisible: false,
  props: {
    isProfileInformationVisible: Boolean,
  },
};
</script>

<template>
  <div class="container" v-if="isProfileInformationVisible">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 profile-information-card">
        <div class="row">
          <h3>Profile</h3>
        </div>
        <div class="row">
          <img src="../../assets/UFood_Profile_Picture.png" />
        </div>
        <div class="row">
          <p>Score: 75</p>
        </div>
        <div class="row">
          <h4>List of visited restaurants</h4>
        </div>
        <div class="row">
          <ul>
            <li>Chez Abde</li>
            <li>Chez Nadi</li>
            <li>Chez Samso</li>
            <li>Chez Zizou</li>
          </ul>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
  padding: 20px;
  width: 50%;
  height: 50%;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-information-card{

  border: 2px solid red;
  border-radius: 7px;
}

.row {
  margin-bottom: 10px;
}

img {
  max-width: 100%;
  height: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 5px;
}
</style>
