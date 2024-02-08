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
          "https://script.googleusercontent.com/macros/echo?user_content_key=SqBvW90wLNFSZfcAEJ_N_7FiQZY_rUznp1O8qKuRHfFIWvG-yIm_wQYf1fSouW4cBgkuk1wwLHNQ6aJHkHtLCJW45aSiZSTqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCu8plIgsszfWHN9GH2X5xfwNRKeMwcy75H4AdGt_pjz0A7UNvYybWbZyScdO3bwS-A8bFv8bxHat4OxCRKGyvHm29bzSkpNwtz9Jw9Md8uu&lib=MUh3wknkaoNR2nbBFL9cU_ZVcsU9CMSyN"
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