<template>
  <div>
    <div
      :id="`modal-followers`"
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h3 class="modal-title fs-4">followers</h3>
            <button
              aria-label="Close"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>

          <div v-if="props.followers.length === 0">
            <div class="modal-body">You don't have any followers yet.</div>
          </div>

          <div v-else>
            <div class="modal-body">
              <div
                v-for="(user, index) in props.followers"
                :key="index"
                class="follow"
              >
                <div class="mb-3">
                  <label
                    class="col-form-label fw-bold pe-2"
                    for="recipient-name"
                    >Email:</label
                  >
                  <span class="user-info">{{ user.email }}</span>
                </div>
                <div class="mb-3">
                  <label class="col-form-label fw-bold pe-2" for="message-text"
                    >Name</label
                  >
                  <p class="user-info">{{ user.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ followers: Array });
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

.user-info {
  font-size: 16px;
}

.follow {
  border-radius: 10px;
  border: 1px solid #dee2e6;
  padding: 20px;
  transition: box-shadow 0.3s ease-in-out;
}

.follow:hover {
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
