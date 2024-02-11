<template>
  <div class="text-center">
    <div class="row" style="margin-top: 10px">
      <div class="col-md-3">
        <filter-off-canvas></filter-off-canvas>
      </div>
      <div class="col-md-6">
        <FormHome></FormHome>
      </div>
    </div>
    <Modal v-if="isModalVisible" @close="closeAuthenticationModal">
      <template v-slot:header> This is a new modal header. </template>
      <template v-slot:modal-body> This is a new modal body. </template>
      <template v-slot:footer> This is a new modal footer. </template>
    </Modal>
    <div class="row restaurant-cards">
      <div
        v-for="(chunk, chunkIndex) in chunkedCardData"
        :key="chunkIndex"
        class="col-12 col-md-6 col-lg-4 mb-4"
      >
        <div v-for="(cardItem, index) in chunk" :key="index" class="card-wrapper">
          <CardComponent
            :imageSrc="cardItem.imageSrc"
            :lastUpdated="cardItem.lastUpdated"
            :restaurantDescription="cardItem.restaurantDescription"
            :restaurantName="cardItem.restaurantName"
          ></CardComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterOffCanvas from "@/components/homePageComponent/FilterOffCanvas.vue";
import FormHome from "@/components/homePageComponent/FormHome.vue";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";
import Modal from "@/components/generalComponent/BaseModal.vue";
import { EventBus } from "@/App.vue";

export default {
  components: {
    FilterOffCanvas,
    FormHome,
    CardComponent,
    Modal,
  },
  created() {
    EventBus.emit("open-authentication-modal", this.openAuthenticationModal);
  },
  data() {
    return {
      value: null,
      isRestaurantOpen: true,
      closingHour: "22:00",
      openingHour: "08:00",
      isModalVisible: false,
      cardData: [
        {
          imageSrc: "https://placekitten.com/300/300",
          restaurantName: "Restaurant 1",
          restaurantDescription: "Description 1",
          lastUpdated: "Last updated 3 mins ago",
          restaurantHour: true,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 2",
          restaurantDescription: "Description 2",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 3",
          restaurantDescription: "Description 3",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 4",
          restaurantDescription: "Description 4",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 5",
          restaurantDescription: "Description 5",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 6",
          restaurantDescription: "Description 6",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 7",
          restaurantDescription: "Description 7",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 8",
          restaurantDescription: "Description 8",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
        {
          imageSrc: "https://placekitten.com/300/301",
          restaurantName: "Restaurant 9",
          restaurantDescription: "Description 9",
          lastUpdated: "Last updated 5 mins ago",
          restaurantHour: false,
        },
      ],
    };
  },
  computed: {
    chunkedCardData() {
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < this.cardData.length; i += chunkSize) {
        chunks.push(this.cardData.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  methods: {
    openAuthenticationModal() {
      this.isModalVisible = true;
    },
    closeAuthenticationModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.card-container {
  flex: 1 0 100%;
}

.card-wrapper {
  margin: 0 auto;
}

@media (min-width: 768px) {
  .col-md-6 .card-wrapper {
    margin: 0; /* Reset margin for larger screens */
  }
}

@media (min-width: 992px) {
  .col-lg-4 .card-wrapper {
    margin: 0; /* Reset margin for larger screens */
  }
}
</style>
