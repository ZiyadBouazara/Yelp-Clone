import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import { ref } from "vue";

const app = createApp(App);

app.use(router);
app.mount("#app");
