import { createRouter, createWebHistory } from "vue-router";
import shoppingCart from "../views/ShoppingCart.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: shoppingCart,
    },
  ],
});

export default router;