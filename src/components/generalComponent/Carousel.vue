<template>
  <div>
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
          <div
            class="carousel-caption d-none d-md-block text-container"
            :class="{ 'show-text': showText }"
          >
            <div id="scroll-trigger" v-show="showText">
              <p id="scroll-text">Your scrolling text here</p>
            </div>
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
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      showText: false,
      textPosition: 0, // New data property to store the position of the text
      slides: [
        {
          imageSrc:
            "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "Third slide label",
          content:
            "Some representative placeholder content for the third slide.",
          interval: 0,
        },
      ],
    };
  },
  methods: {
    onSlideStart() {
      this.showText = false;
    },
    onSlideEnd() {
      this.showText = true;
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const carouselElement = document.getElementById("carouselExampleDark");
      const triggerPosition =
        carouselElement.offsetTop + carouselElement.offsetHeight / 2;
      const maxTextPosition =
        carouselElement.offsetTop + carouselElement.offsetHeight;

      if (
        scrollPosition > triggerPosition &&
        this.textPosition < maxTextPosition
      ) {
        this.textPosition = scrollPosition / 2;
      } else {
        this.textPosition = maxTextPosition;
      }
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style></style>
