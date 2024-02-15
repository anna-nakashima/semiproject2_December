import { createPinia } from "pinia";
import { defineStore } from "pinia";
import axios from "axios";

export const pinia = createPinia();
export const useProductStore = defineStore("product", {
  state: () => ({
    passProductNumber: 1,
    productData: null,
  }),
  actions: {
    async fetchProductData() {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbx3_yRnBtesy2zY0FzYBfRQkY5B2WG-JzaZDK4rIHwwUMkcOm3Lh4SlpQoOZVQ0JQek/exec"
        );
        this.productData = response.data;
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    },
    async searchProduct(number) {
      const products = this.productData;
      const product = products.find((product) => product.No === number);
      if (product) {
        return product;
      } else {
        return null;
      }
    },
  },
});