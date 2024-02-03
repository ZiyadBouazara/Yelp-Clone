<template>
  <div class="card mb-3 border-danger" style="margin-top: 40px">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          :src="imageSrc"
          class="img-fluid rounded-start"
          alt="Card image"
          style="margin: 10px"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ cardTitle }}</h5>
          <p class="card-text">{{ cardText }}</p>
          <p class="card-text">
            <small class="text-body-secondary">{{ lastUpdated }}</small>
          </p>
          <button
            type="button"
            class="btn btn-outline-danger btn-lg"
            style="position: absolute; bottom: 0; right: 0; margin: 10px"
          >
            Order/Book A table
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    imageSrc: {
      type: String,
      default: "https://placekitten.com/300/300",
    },
    cardTitle: {
      type: String,
      default: "Card title",
    },
    cardText: {
      type: String,
      default:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.", // Default text if not provided
    },
    lastUpdated: {
      type: String,
      default: "Last updated 3 mins ago",
    },
  },
};
</script>

<style></style>
