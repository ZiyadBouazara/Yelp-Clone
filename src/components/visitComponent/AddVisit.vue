<template>
  <div>
    <button
      class="btn btn-outline-danger btn-lg"
      data-bs-target="#visitModal"
      data-bs-toggle="modal"
      style="position: absolute; bottom: 0; right: 60px; margin: 10px"
      type="button"
    >
      <i class="fa-regular fa-star"></i> Write a review
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
            <h2 class="modal-title fs-4">Tell us more about your visit !</h2>
            <button
              aria-label="Close"
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitReview">
              <div class="mb-3">
                <label class="col-form-label" for="recipient-name">Date:</label>
                <input
                  id="recipient-name"
                  v-model="review.date"
                  class="form-control"
                  required
                  type="date"
                />
              </div>
              <div class="mb-3">
                <label class="col-form-label">Grade:</label>
                <div class="grade-section d-flex align-items-center">
                  <span
                    v-for="n in 5"
                    :key="n"
                    :class="{ checked: review.grade >= n }"
                    class="star me-1"
                    @click="setGrade(n)"
                  >
                    <i class="fas fa-star"></i>
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label class="col-form-label" for="message-text"
                  >Comment:</label
                >
                <textarea
                  id="message-text"
                  v-model="review.comment"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <button class="btn btn-outline-danger btn-lg" type="submit">
                Send review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const review = ref({
  date: "",
  grade: 0,
  comment: "",
});

const submitReview = () => {
  console.log("Submitting review:", review.value);
  review.value = { date: "", grade: 0, comment: "" }; // Reset form after submit
};

const setGrade = (grade) => {
  review.value.grade = grade;
};
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
  cursor: pointer;
}

.grade-section {
  font-size: 20px;
}

.grade-section .star {
  font-size: 24px;
}

.grade-section .star.checked i {
  color: gold;
}
</style>
