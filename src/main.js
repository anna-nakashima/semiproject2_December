import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import store from "@/store/ProductsStore";
import router from "./router/index.js";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(store);
app.use(createPinia());
app.mount("#app");
// console.log(pinia)
