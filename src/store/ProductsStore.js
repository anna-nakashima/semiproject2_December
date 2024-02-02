import {  defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    products: [],
    cartItems: [],
  }),
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, product) {
      const existingItem = state.cartItems.find(item => item.id ===product.id);
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
        }
      } else {
        state.cartItems.push({
          id: product.id,
          quantity: 1,
          stock: product.stock
        });
      }
    },
    incrementCartItem(state, productId) {
      const cartItem = state.cartItems.find(item => item.id === productId);
      if (cartItem && cartItem.quantity < cartItem.stock) {
        cartItem.quantity++;
      }
    },
    decrementCartItem(state, productId) {
      const cartItem = state.cartItems.find(item => item.id === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
    removeCartItem(state, productId) {
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      try {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=xRbexgKgtcFLVao_hsUokO0YuybW0VIdaAlVEuqyxpkKXms_bhuVlvp88SXTGwTKeNj3XxuFeQyihKgRqe6Z52lbZflWZKbOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCu8plIgsszfWHN9GH2X5xfwNRKeMwcy75H4AdGt_pjz0A7UNvYybWbZyScdO3bwS-A8bFv8bxHat4OxCRKGyvHm29bzSkpNwtz9Jw9Md8uu&lib=MUh3wknkaoNR2nbBFL9cU_ZVcsU9CMSyN");
        const products = await response.json();
        commit("setProducts", products);
      } catch (error) {
        console.error("商品一覧の取得中にエラーが発生しました", error);
      }
    },
    addProductToCart({ commit }, product) {
      commit("pushProductToCart", product)
    },
    incrementCartQuantity({ commit, state }, productId) {
      const cartItem = state.cartItems.find(item => item.id === productId);
      if (cartItem && cartItem.quantity < cartItem.stock) {
        commit("incrementCartItem", productId);
      }
    },
    decrementCartQuantity({ commit }, productId) {
      commit("decrementCartItem", productId);
    },
    removeProductFromCart({ commit }, productId) {
      commit("removeCartItem", productId);
    },
  },
  getters: {
    cartProduct: state => {
      return state.cartItems.map(item => {
        const product = state.products.find(product => product.id === item.id)
        return {
          title: product.Product_name,
          price: product.price,
          quantity: item.quantity,
        }
      })
    }
  },
});