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
// import { ref, onMounted } from "vue";
// import { useProductStore } from "../store/product.js";
// import { useCartStore } from "../store/CartStore.js";

export default {
//   setup() {
//     const productsInCart = ref([]);
//     const maxLengths = ref([]);
//     const selectedNumbers = ref([]);
//     const products = ref([]);

//     const productStore = useProductStore();
//     const cartStore = useCartStore();

//     onMounted(async () => {
//       if (!productStore.productData) {
//         await productStore.fetchProductData();
//       }

//       products.value = Object.values(cartStore.cartItems);
//       maxLengths.value = products.value.map((product) => product.stock);

//       // 各商品ごとに selectedNumbers を初期化
//       selectedNumbers.value = products.value.map(() => 1);
//     });

//     const getStockOptions = (cart) => {
//       const stockOptions = [];
//       for (let i = 1; i <= cart.stock; i++) {
//         stockOptions.push(i);
//       }
//       return stockOptions;
//     };

//     const calculateSubtotal = (cart) => {
//       const index = products.value.findIndex(
//         (item) => item.product_id === cart.product_id
//       );
//       const quantity = selectedNumbers.value[index] || 0;

//       // cart が存在する場合のみ計算を行う
//       if (cart) {
//         return (quantity * cart.price).toLocaleString();
//       }

//       return "0";
//     };

//     const calculateTotalPrice = () => {
//       return selectedNumbers.value
//         .reduce((total, quantity, index) => {
//           const cart = products.value[index];

//           // cart が存在する場合のみ計算を行う
//           if (cart) {
//             return total + quantity * cart.price;
//           }

//           return total;
//         }, 0)
//         .toLocaleString();
//     };

//     const calculateTotalTax = () => {
//       return selectedNumbers.value
//         .reduce((total, quantity, index) => {
//           const cart = products.value[index];

//           // cart が存在する場合のみ計算を行う
//           if (cart) {
//             return Math.round(total + (quantity * cart.price * 10) / 110);
//           }

//           return total;
//         }, 0)
//         .toLocaleString();
//     };

//     // const getCategoryImage = (categoryId) => {
//     //   if (categoryId === 0) {
//     //     return null;
//     //   }
//     //   return require(`../assets/category_image_${categoryId}.jpg`);
//     // };

//     const DeleteItem = (product) => {
//       cartStore.removeFromCart(product);
//       products.value = Object.values(cartStore.cartItems);
//       maxLengths.value = products.value.map((product) => product.stock);
//       if (products.value.length == 1) {
//         cartStore.clearCart();
//       }
//     };

//     // const registerFavoriteItem = (product) =>{
//     //   favoriteStore.addToFavorites(product);
//     // };

//     const getNowkey = () => {
//       return cartStore.nowDeleteKey;
//     };

//     const setBuyCount = (cart, count) => {
//       cart.buyCount = count;
//     };

//     return {
//       productsInCart,
//       maxLengths,
//       selectedNumbers,
//       products,
//       getStockOptions,
//       calculateSubtotal,
//       calculateTotalPrice,
//       calculateTotalTax,
//       // getCategoryImage,
//       DeleteItem,
//       // registerFavoriteItem,
//       getNowkey,
//       setBuyCount,
//     };
//   },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap");
</style>