<template>
  <div>
    <button
      class="btn btn-outline-primary btn-lg"
      data-bs-target="#visitModal"
      data-bs-toggle="modal"
      style="position: absolute; bottom: 0; right: 60px; margin: 10px"
      type="button"
    >
      <i class="fa-solid fa-eye"></i> View visit details
    </button>

    <div
      id="visitModal"
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-4">Visit Details</h2>
            <button
              aria-label="Close"
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="col-form-label" for="recipient-name">Date:</label>
              <br />
              <span class="visit-info">{{ visit.date }}</span>
            </div>
            <div class="mb-3 d-flex justify-content-center">
              <label class="col-form-label" for="message-text">Grade:</label>
              <br />
              <div class="grade-section d-flex align-items-center">
                <span v-for="n in visit.grade" :key="n" class="star me-1">
                  <i class="fas fa-star"></i>
                </span>
              </div>
            </div>
            <div class="mb-3">
              <label class="col-form-label" for="message-text">Comment:</label>
              <br />
              <p class="visit-info">{{ visit.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

//TODO : (replace with your logic)
const visit = ref({
  date: "2024-03-11",
  grade: 4,
  comment: "This was a great visit! I will definitely be back soon.",
});
</script>

<style scoped>
label {
  font-family: "Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 15px;
  color: #dc3545;
}

.star {
  cursor: default;
  color: gold;
}

.visit-info {
  font-weight: normal;
  font-size: 16px;
}

.grade-section {
  justify-content: center;
}
</style>
