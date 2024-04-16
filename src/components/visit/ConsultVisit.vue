<template>
  <div>
    <div
      v-if="visits.length > 0"
      :id="`consultModal${props.restaurantId}`"
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h3 class="modal-title fs-4">You have {{ totalVisits }} visit!</h3>
            <button
              aria-label="Close"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div
              v-for="(visit, index) in visits"
              :key="index"
              class="visit-review"
            >
              <div class="mb-3">
                <label class="col-form-label fw-bold pe-2" for="recipient-name"
                  >Date:</label
                >
                <span class="visit-info">{{ parseDate(visit.date) }}</span>
              </div>
              <div class="mb-3">
                <label class="col-form-label fw-bold pe-2" for="message-text"
                  >Rating:</label
                >
                <div class="grade-section d-flex">
                  <span v-for="n in 5" :key="n" class="star me-1">
                    <i
                      :class="{ 'text-muted': n > visit.rating }"
                      class="fas fa-star"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label class="col-form-label fw-bold pe-2" for="message-text"
                  >Comment:</label
                >
                <p class="visit-info">{{ visit.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({ restaurantId: String });

const data = ref(null);

onMounted(async () => {
  const response = await store.dispatch("fetchVisitsForRestaurant", {
    restaurantId: props.restaurantId,
  });
  data.value = response;
});

const visits = computed(() => data.value?.items || []);

const totalVisits = computed(() => data.value?.total || 0);

const parseDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
.modal-header {
  border-bottom: none;
}

.modal-title {
  text-align: center;
}

.btn-close-white {
  color: white;
}

.star {
  color: #f0ad4e;
}

.visit-info {
  font-size: 16px;
}

.grade-section {
  justify-content: flex-start;
}

.visit-review {
  border-radius: 10px;
  border: 1px solid #dee2e6;
  padding: 20px;
  transition: box-shadow 0.3s ease-in-out;
}

.visit-review:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.modal-body {
  padding: 20px;
}

label {
  font-size: 18px;
}
</style>
