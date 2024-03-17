import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import store from "./store/index";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
