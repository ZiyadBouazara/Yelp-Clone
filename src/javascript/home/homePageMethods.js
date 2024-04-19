export const homePageMethods = {
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
  goToPage() {
    const pageNumber = parseInt(this.inputPage);
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    } else {
      alert("Please enter a valid page number.");
    }
  },
  getPriceRangeSymbol(priceRange) {
    switch (priceRange) {
      case 1:
        return "$";
      case 2:
        return "$$";
      case 3:
        return "$$$";
      default:
        return " ";
    }
  },
  openAuthenticationModal() {
    this.isModalVisible = true;
  },
  getRestaurant(restaurant) {
    const restaurantId = restaurant.id;
    return this.$store.getters.getRestaurantById(restaurantId);
  },
  async getMap() {
    this.showMap = true;
    await this.initMap();
    this.loading = false;
  },
  getList() {
    this.showMap = false;
    this.loading = true;
  },
  getLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            resolve({ latitude: this.latitude, longitude: this.longitude });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            reject(error);
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  },
  initMarkerLocation() {
    let num = 0;
    const filteredRestaurants = this.filteredRestaurants;
    this.markerLocations = filteredRestaurants.map((restaurant) => {
      const coordinates = restaurant.location.coordinates;
      const [longitude, latitude] = coordinates;
      return [latitude, longitude];
    });

    filteredRestaurants.forEach((restaurant) => {
      num++;
      console.log("filtered restaurants: ", restaurant.location.coordinates);
    });

    console.log("number of restaurants: ", num);
  },
  async initMap() {
    try {
      const leaflet = await import("leaflet");
      await this.getLocation();
      this.map = leaflet
        .map("map")
        .setView([this.latitude, this.longitude], 15);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        })
        .addTo(this.map);
      const customIcon = leaflet.divIcon({
        className: "custom-leaflet-div-icon",
        html: '<i class="fas fa-map-marker-alt fa-3x text-danger"></i>',
        iconAnchor: [18, 36],
      });
      this.initMarkerLocation();
      this.markerLocations.forEach((location) => {
        leaflet.marker(location, { icon: customIcon }).addTo(this.map);
      });
    } catch (error) {
      console.error("Error loading Leaflet:", error);
    }
  },
};
