<template>
  <div class="wrapper">
    <div class="headding">ショッピングカート</div>
    <div class="item-name">ご注文内容</div>
    <!-- <p class="cart-no-stock" v-show="!cartItems.length">現在ショッピングカートに商品はありません。</p> -->
    <div class="cart-products" v-for="product in cartItems" :key="product.id">
      <div class="product-image">
        <img src="" alt="商品画像">
      </div>
      <div class="product-details">
        <p class="product-name">{{ product.product_name }}</p>
        <p class="product-price">価格：￥{{ product.price }}(税込)</p>
      </div>
      <div class="edit-button">
        <div class="edit-quantity">
          <button class="quantity-button" @click="incrementQuantity(product.id)" :disabled="product.quantity >= product.stock">+</button>
          <p class="quantity">{{ product.quantity }}</p>
          <button class="quantity-button" @click="decrementQuantity(product.id)">-</button>
        </div>
        <button class="remove-button" @click="removeFromCart(product.id)"><span class="remove-icon">✕</span>カートから削除する</button>
        <p class="quantity-error" v-if="product.quantity >= product.stock">在庫数が上限のため追加することが出来ません</p>
      </div>
    </div>
    <!-- <div class="cart-total">
      <p class="total-details">商品合計数量：{{ calculateTotalQuantity() }}点</p>
      <p class="total-details">商品合計金額：￥{{ calculateTotalPrice() }}(税込)</p>
    </div> -->
    <div class="cart-button">
      <button class="shopping-button">ショッピングを続ける</button>
      <button class="buy-button">購入手続きに進む</button>
    </div>
    <div v-if="cartIsEmpty">
      <button class="top-button">TOPページに戻る</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  props: ["product"],
  computed: mapGetters(["cartItems"]),
  methods: {
    incrementQuantity(productId) {
      this.$store.dispatch("incrementQuantity", productId);
    },
    decrementQuantity(productId) {
      this.$store.dispatch("decrementQuantity", productId);
    },
    removeFromCart(productId) {
      this.$store.dispatch("removeProductFromCart", productId);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap");
</style>