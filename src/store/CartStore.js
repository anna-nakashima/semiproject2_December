import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: {},
  }),
  actions: {
    addToCart(product) {
      // 商品IDとサイズをキーとしてカートに追加
      const key = `${product.product_id}-${product.size}`;
      this.cartItems[key] = { ...product, saveKey: key, buyCount: 1};
    },
    removeFromCart(product) {
      // 商品IDをサイズをキーとしてカートから削除
      const key = `${product.product_id}-${product.size}`;
      delete this.cartItems[key];
      this.nowDeleteKey = key;
    },
    clearCart() {
      this.cartItems = {}; // カート内のすべての商品をクリア
    },
  },
});