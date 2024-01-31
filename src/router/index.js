import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import ShoppingMethod from "../views/ShoppingMethod.vue";
import OrderConfirmation from "../views/OrderConfirmation.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/homePage",
      name: "homePage",
      component: HomePage,
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: ShoppingCart,
    },
    {
      path: "/shoppingMethod",
      name: "shoppingMethod",
      component: ShoppingMethod,
    },
    {
      path: "/orderConfirmation",
      name: "orderConfirmation",
      component: OrderConfirmation,
    },
  ],
});

export default router;