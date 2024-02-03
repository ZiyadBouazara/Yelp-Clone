<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-8">col-8</div>
      <div class="col-4">col-4</div>
    </div>
  </div>
</template>

<script>
import "@/styles/global.css";
import { ref } from "vue";

export default {
  data() {
    return {
      valueFilter: ["apple", "orange"],
      value: null,
      isRestaurantOpen: true,
      closingHour: "22:00",
      openingHour: "08:00",
    };
  },
};
</script>



<!--<b-row style="margin-top: 100px">-->
<!--&lt;!&ndash;      Ajouter effect pour hover dessus&ndash;&gt;-->
<!--<div class="mt-4">-->
<!--  <h4 style="margin-bottom: 5px">-->
<!--    Text indiquant le filtre appliqué sur les resto-->
<!--  </h4>-->
<!--  <b-card-->
<!--    img-src="https://placekitten.com/300/300"-->
<!--    img-alt="Card image"-->
<!--    img-left-->
<!--    class="mb-3"-->
<!--  >-->
<!--    <b-card-text>-->
<!--      Texte de l'avis le plus like Texte de l'avis le plus liké Texte de-->
<!--      l'avis le plus liké Texte de l'avis le plus liké-->
<!--    </b-card-text>-->
<!--    <b-form-rating-->
<!--      icon-empty="heart"-->
<!--      icon-half="heart-half"-->
<!--      icon-full="heart-fill"-->
<!--      icon-clear="slash-circle"-->
<!--      show-clear-->
<!--      variant="danger"-->
<!--      style="margin-top: 10px"-->
<!--      id="rating-inline"-->
<!--      inline-->
<!--      value="4"-->
<!--    ></b-form-rating>-->
<!--    <b-button-->
<!--      href="#"-->
<!--      variant="primary"-->
<!--      style="position: absolute; bottom: 0; right: 0; margin: 10px"-->
<!--    >Order/Book A Table</b-button-->
<!--    >-->
<!--    <p v-if="isRestaurantOpen" class="text-success" style="margin: 10px">-->
<!--      Open until {{ closingHour }}-->
<!--    </p>-->
<!--    <p v-else class="text-danger" style="margin: 10px">-->
<!--      Closed, opens at {{ openingHour }}-->
<!--    </p>-->
<!--    <p>Icone indiquant les filtre</p>-->
<!--    <p>Icone indiquant si fourchette de prix</p>-->
<!--  </b-card>-->
<!--</div>-->
<!--</b-row>-->

<!--<b-col cols="10">-->
<!--<div class="centered-content">-->
<!--  &lt;!&ndash; First Line: Search Bar &ndash;&gt;-->
<!--  <div class="search">-->
<!--    <b-form inline>-->
<!--      <label class="sr-only" for="inline-form-input-name">Name</label>-->
<!--      <b-form-input-->
<!--        id="inline-form-input-name"-->
<!--        class="mb-2 mr-sm-2 mb-sm-0"-->
<!--        placeholder="Restaurant's name..."-->
<!--      ></b-form-input>-->

<!--      <label class="sr-only" for="inline-form-input-username"-->
<!--      >Username</label-->
<!--      >-->
<!--      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">-->
<!--        <b-input-group-prepend is-text>-->
<!--          <b-icon icon="basket"></b-icon>-->
<!--        </b-input-group-prepend>-->
<!--        <b-form-input-->
<!--          type="search"-->
<!--          placeholder="Dining Preference"-->
<!--        ></b-form-input>-->
<!--      </b-input-group>-->

<!--      <b-dropdown-->
<!--        size="sm"-->
<!--        split-->
<!--        text="Sort:{rentrer le sort selectionné}"-->
<!--        class="m-2"-->
<!--        variant="outline-danger"-->
<!--      >-->
<!--        &lt;!&ndash;                replace these with vue.js component&ndash;&gt;-->
<!--        <b-dropdown-item-button>Recommended</b-dropdown-item-button>-->
<!--        <b-dropdown-item-button>Highest Rated</b-dropdown-item-button>-->
<!--        <b-dropdown-item-button>Most Reviewed</b-dropdown-item-button>-->
<!--      </b-dropdown>-->

<!--      <button-->
<!--        class="navbar-toggler"-->
<!--        type="button"-->
<!--        data-bs-toggle="collapse"-->
<!--        data-bs-target="#navbarNavDarkDropdown"-->
<!--        aria-controls="navbarNavDarkDropdown"-->
<!--        aria-expanded="false"-->
<!--        aria-label="Toggle navigation"-->
<!--      >-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->
<!--      <b-button variant="outline-danger" style="margin-top: 10px"-->
<!--      >Search</b-button-->
<!--      >-->
<!--    </b-form>-->
<!--  </div>-->
<!--</div>-->
<!--</b-col>-->
