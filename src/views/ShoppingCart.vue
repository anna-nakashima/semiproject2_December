<template>
  <div class="wrapper">
    <h1 class="headding">ショッピングカート</h1>
    <div class="item-name">ご注文内容</div>
    <p class="cart-no-stock" v-if="cartIsEmpty">現在ショッピングカートに商品はありません。</p>
    <div class="cart-products" v-for="(cart, index) in products" :key="cart.saveKey">
      <div class="product-image">
        <img :src="cart.image" alt="商品画像" class="image-item">
      </div>
      <div class="product-details">
        <div class="product-info">
          <p class="product-name">{{ cart.product_name }}</p>
          <p class="product-price">価格：￥{{ cart.price.toLocaleString() }}(税込)</p>
        </div>
      </div>
      <div class="list-right">
        <div class="edit-number">
          <select name="number-dropdown" v-model="selectedNumbers[index]" @change="setBuyCount(cart, selectedNumbers[index])">
            <option v-for="stockOption in getStockOptions(cart)" :key="stockOption" :value="stockOption" :selected="stockOption === selectedNumbers[index]">
              {{ stockOption }}
            </option>
          </select>
        </div>
        <div class="delete-button-box">
          <button class="delete-button-label" type="button" @click="DeleteItem(cart)">カートから削除する</button>
        </div>
        <!-- <p class="max-stock-text" v-show="cart.product.stock === 0">在庫数が上限のため追加することが出来ません</p> -->
      </div>
    </div>
    <div class="total-container">
      <p class="total-items">商品合計数量：{{ calculateTotalQuantity() }}点</p>
      <p class="total-price">商品合計金額：￥{{ calculateTotalPrice() }}（税込）</p>
    </div>
    <div class="cart-button" v-if="!cartIsEmpty" style="text-align: center;">
      <button class="cart-buttons">
        <router-link class="cart-button-label" type="button" to="/homePage">ショッピングを続ける</router-link>
      </button>
      <button class="cart-buttons">
        <router-link class="cart-button-label" type="button" to="/shoppingMethod">購入手続きに進む</router-link>
      </button>
    </div>
    <div v-if="cartIsEmpty" style="text-align: center;">
      <button class="page-buttons">
        <router-link class="page-button-label" type="button" to="/homepage">TOPページに戻る</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useProductStore } from "../store/ProductsStore.js";
import { useCartStore } from "../store/CartStore.js";

export default {
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const cartItems = ref(cartStore.cartItems);
    const products = computed(() => Object.values(cartItems.value));
    const selectedNumbers = ref([]);
    const cartIsEmpty = computed(() => products.value.length === 0);
    const setBuyCount = (cart, count) => {
      cartStore.setBuyCount(cart, count);
    };
    const DeleteItem = (product) => {
      cartStore.removeFromCart(product);
    };
    const calculateTotalQuantity = () => {
      return products.value.reduce((total, cart) => {
        return total + cart.buyCount;
      }, 0);
    };
    const calculateTotalPrice = () => {
      return products.value.reduce((total, cart) => {
        return total + cart.buyCount * cart.price;
      }, 0).toLocaleString();
    };
    const getStockOptions = (cart) => {
      const product = productStore.searchProduct(cart.product_id);
      if (product && product.stock) {
        const stockOptions = [];
        for (let i = 1; i <= product.stock; i++) {
          stockOptions.push(i);
        }
        return stockOptions;
      }
      return [];
    };

    watch(cartStore, () => {
      cartItems.value = cartStore.cartItems;
    });
    onMounted(() => {
      selectedNumbers.value = products.value.map((cart) => cart.buyCount || 1);
    });

    return {
      products,
      selectedNumbers,
      cartIsEmpty,
      setBuyCount,
      DeleteItem,
      calculateTotalQuantity,
      calculateTotalPrice,
      getStockOptions,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap");

.wrapper {
  padding: 5% 10%;
  color: #54595e;
}
.headding {
  font-size: 34px;
}
.cart-products {
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.product-details {
  display: flex;
  flex-direction: row;
}
.product-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.item-name, .total-container {
  margin-top: 30px;
  padding: 10px 10px;
  background-color: #d9d9d9;
  font-size: 18px;
  font-weight: bold;
}
.total-container {
  padding-left: 700px;
}
.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #2d4b70;
}
.product-info {
  padding-left: 40px;
}
.list-right {
  padding-left: 300px;
}
.cart-no-stock {
  font-size: 16px;
  margin: 20px 0 0 30px;
}
.cart-buttons, .page-buttons {
  margin-top: 40px;
  display: inline-block;
  border: none;
  cursor: pointer;
  background-color: #2d4b70;
  border-radius: 5px;
  padding: 10px 50px;
}
.product-price, .delete-button-box {
  margin-top: 20px;
}
.cart-buttons {
  margin-right: 70px;
}
.cart-button-label, .page-button-label {
  text-decoration: none;
  color: #ffffff;
}
</style>