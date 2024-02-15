import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: {},
  }),
  actions: {
    addToCart(product) {
      const key = `${product.product_id}`;
      if (this.cartItems[key]) {
        this.cartItems[key].buyCount++;
      } else {
        this.cartItems[key] = { ...product, saveKey: key, buyCount: 1 };
      }
    },
    removeFromCart(product) {
      const key = `${product.product_id}`;
      delete this.cartItems[key];
      this.nowDeleteKey = key;
    },
    clearCart() {
      this.cartItems = {};
    },
  },
});