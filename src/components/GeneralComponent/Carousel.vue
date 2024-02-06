<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        type="button"
        :data-bs-target="'#carouselExampleDark'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : null"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 0 }"
        :data-bs-interval="slide.interval"
      >
        <img
          :src="slide.imageSrc"
          class="d-block w-100"
          :alt="'Slide ' + (index + 1)"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ slide.title }}</h5>
          <p>{{ slide.content }}</p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slides: [
        {
          imageSrc: "https://picsum.photos/1024/480/?image=52",
          title: "First slide label",
          content:
            "Some representative placeholder content for the first slide.",
          interval: 10000,
        },
        {
          imageSrc: "https://picsum.photos/1024/480/?image=54",
          title: "Second slide label",
          content:
            "Some representative placeholder content for the second slide.",
          interval: 2000,
        },
        {
          imageSrc: "https://picsum.photos/1024/480/?image=58",
          title: "Third slide label",
          content:
            "Some representative placeholder content for the third slide.",
          interval: 0,
        },
      ],
    };
  },
};
</script>

<style></style>
