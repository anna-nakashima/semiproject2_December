<template>
  <div class="wrapper">
    <div class="search-menu">
      <h1 class="search-title">商品を探す</h1>
      <div class="keyword-search">
        <div class="search-box">
          <label for="search-keyword-box" class="main-label">キーワード検索：</label>
          <div class="input-container">
            <input v-model="searchKeyword" type="search" id="search-keyword-box" name="search-keyword" placeholder="キーワードを入力">
          </div>
        </div>
      </div>
      <div class="category-menu">
        <div class="category-radio-buttons">
          <div class="main-label">カテゴリー：</div>
          <div class="radio-container">
            <label class="category-label">
              <input type="radio" v-model="selectedCategory" value="">全商品
            </label>
          </div>
          <div class="radio-container" v-for="category in categories" :key="category.category_id">
            <label class="category-label">
              <input type="radio" v-model="selectedCategory" :value="category.category_id">
              {{ category.category_name}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <h1 class="list-title">商品一覧</h1>
    <ul class="product-list">
      <li class="product-list-items" v-for="product in filteredProducts" :key="product.id">
        <div class="item-card">
          <div class="image-box">
            <img :src="product.image" alt="商品画像" class="image-item"/>
          </div>
          <div class="product-text-box">
            <p class="product-name">{{ product.product_name }}</p>
            <div class="item-text-row">
              <div class="item-price-box">
                <p class="product-price">￥<span>{{ product.price }}</span>（税込）</p>
              </div>
              <div class="button-area">
                <button class="cart-button" type="button" @click="addToCart(product)">カートに入れる</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="showPopup" class="modal">
      <div class="modal-container">
        <p class="cart-add-text">カートに追加しました！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../store/ProductsStore.js";
import { useCartStore } from "../store/CartStore.js";
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: null,
      searchKeyword: "",
    };
  },
  async created() {
    const productStore = useProductStore();
    if (!productStore.productData) {
      await productStore.fetchProductData();
    }
    this.products = productStore.productData || [];
  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory) {
        return this.products.filter(product =>
          product.product_name.includes(this.searchKeyword) ||
          product.description.includes(this.searchKeyword)
        );
      } else {
        return this.products.filter(product =>
          product.category_id === this.selectedCategory &&
          (product.product_name.includes(this.searchKeyword) ||
          product.description.includes(this.searchKeyword))
        );
      }
    },
  },
  mounted() {
    this.fetchData();
    this.fetchCategoryData();
    this.fetchProductData();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbx3_yRnBtesy2zY0FzYBfRQkY5B2WG-JzaZDK4rIHwwUMkcOm3Lh4SlpQoOZVQ0JQek/exec"
        )
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("データの取得に失敗しました", error);
        });
    },
    fetchCategoryData() {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbzWtdPgbt0WG5QZuUDMdjeETXSUqwWxpetzN8oWEvInf6HkA7G2yuEUAu4ld43O4CzetA/exec"
        )
        .then((response) => {
          this.categories = response.data.map((category) => ({
            ...category,
          }));
        })
        .catch((error) => {
          console.error("カテゴリーデータの取得に失敗しました", error);
        });
    },
    async fetchProductData() {
      const productStore = useProductStore();
      await productStore.fetchProductData();
    },
    passProductNumber(product) {
      const productStore = useProductStore();
      productStore.passProductNumber = product.No;
      this.searchKeyword = "";
    },
    showAllProducts() {
      this.selectedCategory = null;
      this.searchKeyword = "";
    },
  },
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const router = useRoute();
    const product_no = ref(productStore.passProductNumber);
    const productNo = router.params.productNo
    const product_name = ref("kari");
    const product_price = ref(0);
    const price_point = ref(0);
    const product_stock = ref(0);
    const product_description = ref("説明テキスト");
    const categoryId = ref(0);
    const product_data = ref(null);
    const showPopup = ref(false);

    const updateProductData = (newProductNumber) => {
      product_no.value = newProductNumber;
      const products = productStore.productData;
      const product = products.find((product) => product.No == productNo);
      if (product) {
        product_name.value = product.product_name;
        product_price.value = product.price;
        price_point.value = product.price / 100;
        product_description.value = product.description;
        product_stock.value = product.stock;
        categoryId.value = product.category_id;
        product_data.value = product;
      }
    };
    const fetchProductInfo = async () => {
      if (!productStore.productData) {
        await productStore.fetchProductData();
      }
      updateProductData(product_no.value);
    };
    onMounted(() => {
      fetchProductInfo();
    });
    const addToCart = async () => {
      const passproductData = product_data.value;
      cartStore.addToCart(passproductData);
      showPopup.value = true;
      setTimeout(() => { showPopup.value = false; }, 2000);
    };
    return {
      product_no,
      product_name,
      product_price,
      price_point,
      product_stock,
      product_description,
      categoryId,
      product_data,
      addToCart,
      showPopup,
    };
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap");

.wrapper {
  padding: 5% 10%;
  color: #54595e;
}
.search-title, .list-title {
  font-size: 34px;
}
.list-title {
  margin-top: 50px;
  position: relative;
}
.list-title::before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #2d4b70;
  position: absolute;
  top: -25px;
  left: 0;
}
.search-box, .category-radio-buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
  margin-top: 20px;
}
.main-label {
  font-weight: bold;
}
.input-container input{
  width: 500px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #dddee3;
  border-radius: 3px;
}
.category-label {
  padding-right: 10px;
}
.product-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  font-size: 18px;
}
.product-list-items {
  width: calc(50% - 15px);
  margin-bottom: 20px;
}
.item-card {
  padding-bottom: 30px;
}
.image-box {
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
}
.image-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.product-text-box, .item-text-row {
  padding-top: 10px;
}
.product-price {
  font-size: 20px;
  padding-right: 20px;
}
.item-text-row {
  display: flex;
  flex-direction: row;
}
.cart-button {
  border: none;
  cursor: pointer;
  background-color: #2d4b70;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px 20px;
}
.modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d4b70;
  border: #2d4b70 1px solid;
  border-radius: 10px;
  color: #ffffff;
  height: 100px;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cart-add-text {
  font-size: 25px;
}
</style>>