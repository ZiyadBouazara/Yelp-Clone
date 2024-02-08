<template>
  <div class="text-center">
    <div class="row" style="margin-top: 10px">
      <div class="col-md-3">
        <filter-off-canvas></filter-off-canvas>
      </div>
      <div class="col-md-6" style="margin-left: 90px">
        <FormHome></FormHome>
      </div>
    </div>
    <div class="row" style="margin-left: 90px">
      <div
        v-for="(card, index) in chunkedCardData"
        :key="index"
        class="card-container d-flex overflow-auto hide-scrollbar"
      >
        <div
          v-for="(cardItem, cardIndex) in card"
          :key="cardIndex"
          class="card-wrapper"
          style="margin: 20px"
        >
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
import CardComponent from "@/components/generalComponent/baseRestaurantCards.vue";

export default {
  components: {
    FilterOffCanvas,
    FormHome,
    CardComponent,
  },
  data() {
    return {
      value: null,
      isRestaurantOpen: true,
      closingHour: "22:00",
      openingHour: "08:00",
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
        // Add more card data as needed
      ],
    };
  },
  computed: {
    chunkedCardData() {
      const chunkSize = 3;
      return this.cardData.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);
    },
  },
};
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.hide-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
