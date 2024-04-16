<template>
  <div>
    <div
      :id="`modalAddFavorite${props.restaurantId}`"
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h3 class="modal-title fs-4">
              Add the restaurant to one of your lists!
            </h3>
            <button
              aria-label="Close"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div
                v-for="list in userFavorites"
                :key="list.id"
                class="col-md-6"
              >
                <div
                  class="favorite-pill"
                  data-bs-backdrop="false"
                  data-bs-dismiss="modal"
                  @click="addRestaurantToList(list)"
                >
                  <h5 style="text-align: center">
                    {{ list.name }}
                  </h5>
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const favorites = ref(null);

const props = defineProps({ restaurantId: String });

const userFavorites = computed(() => favorites.value);
const loggedUserId = computed(() => store.getters.getLoggedInUser.id);

const restaurantIdJson = ref({
  id: props.restaurantId,
});

const addRestaurantToList = async (list) => {
  try {
    await store.dispatch("addRestaurantToFavoriteList", {
      restaurantIdJson: restaurantIdJson.value,
      favoriteListId: list.id,
    });
    console.log("Restaurant added to list successfully");

    await store.dispatch("fetchUserFavorites", loggedUserId.value);
  } catch (error) {
    console.error("Error adding restaurant to list:", error);
  }
};

onMounted(async () => {
  try {
    favorites.value = await store.dispatch(
      "fetchUserFavorites",
      loggedUserId.value,
    );
  } catch (error) {
    console.error("Error fetching user favorites:", error);
  }
});
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

.favorite-pill {
  background-color: #ced4da;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
}

.favorite-pill:hover {
  background-color: #ff6666;
}
</style>
