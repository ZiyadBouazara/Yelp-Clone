<script setup>
const props = defineProps({
  restaurant: Object,
});
</script>

<template>
  <div id="sideContainer" class="side-container">
    <div class="contact-info">
      <p>{{ restaurant.phone }}</p>
      <i class="fas fa-phone-alt"></i>
    </div>
    <div class="small-line"></div>
    <div class="d-flex justify-content-between">
      <a class="side-container-link">Get Directions</a>
      <i class="fas fa-map-marker-alt"></i>
    </div>
    <div class="d-flex align-items-end">
      <p class="side-container-address">
        {{ restaurant.address.street }}
        {{ restaurant.address.city }}, <br />{{ restaurant.address.province }}
        {{ restaurant.address.zipCode }}
      </p>
    </div>
    <div class="small-line"></div>
    <div class="contact-info">
      <p><a class="side-container-link">Message the business</a></p>
      <i class="fas fa-envelope"></i>
    </div>
    <div class="align-items-center">
      <p>
        <button class="btn btn-outline-dark" style="width: 300px; height: 50px">
          Suggest an edit <i class="fas fa-edit"></i>
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>
.contact-info {
  display: flex;
  justify-content: space-between;
}

.side-container-link {
  font-weight: bold;
  color: #dc3545;
  text-decoration: none;
}

.side-container-link:hover {
  text-decoration: underline;
}

.side-container-address {
  font-size: 0.9rem;
}

.side-container {
  width: 400px;
  height: 320px;
  padding: 20px;
  background-color: Ghostwhite;
  border-radius: 10px;
  margin-right: 40px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  position: absolute;
  right: 1.5%;
  transform: translateY(-50%);
}

.small-line {
  border-bottom: 1px solid #ccc;
  margin: 5px 20px 20px 10px;
}

@media (max-width: 1439px) {
  .side-container {
    display: none;
  }
}
</style>
