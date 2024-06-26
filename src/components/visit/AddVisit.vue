<template>
  <div>
    <div
      :id="`visitModal${props.restaurantId}`"
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h3 class="modal-title fs-4">Tell us more about your visit !</h3>
            <button
              aria-label="Close"
              class="btn-close btn-close-white"
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
                  v-model="visitData.date"
                  class="form-control"
                  required
                  type="datetime-local"
                />
              </div>
              <div class="mb-3">
                <label class="col-form-label">Rating:</label>
                <div class="rating-section d-flex align-items-center">
                  <span
                    v-for="n in 5"
                    :key="n"
                    :class="{ checked: visitData.rating >= n }"
                    class="star me-1"
                    @click="setRating(n)"
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
                  v-model="visitData.comment"
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();

const props = defineProps({ restaurantId: String });
const loggedInUser = computed(() => store.getters.getLoggedInUser);
const userId = computed(() => loggedInUser.value?.id);

const visitData = ref({
  date: "",
  rating: 0,
  comment: "",
});

const submitReview = () => {
  visitData.value.date = moment(visitData.value.date)
    .utc()
    .format("YYYY-MM-DDTHH:mm:ssZ");
  const combinedData = {
    restaurant_id: props.restaurantId,
    ...visitData.value,
  };
  store.dispatch("createVisit", {
    userId: userId.value,
    visitData: combinedData,
  });
  resetForm();
};

const resetForm = () => {
  visitData.value = { date: "", rating: 0, comment: "" };
};

const setRating = (rating) => {
  visitData.value.rating = rating;
};
</script>

<style scoped>
label {
  font-family: "Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.modal-title {
  text-align: center;
}

.btn-close-white {
  color: white;
}

.star {
  cursor: pointer;
}

.rating-section {
  font-size: 20px;
}

.rating-section .star {
  font-size: 24px;
}

.rating-section .star.checked i {
  color: gold;
}
</style>
