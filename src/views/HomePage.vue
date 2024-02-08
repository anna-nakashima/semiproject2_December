<template>
  <div class="wrapper">
    <div class="search-menu">
      <div class="keyword-search">
        <div class="search-box">
          <label for="search-keyword-box">キーワード検索：</label>
          <div class="input-container">
            <input type="text" id="search-keyword-box" name="search-keyword">
            <button type="button">
              <img class="search-icon" src="" alt="">
            </button>
          </div>
        </div>
      </div>
      <div class="category-menu">
        <div class="category-radio-buttons">
          <div class="main-label">カテゴリー：</div>
          <div class="radio-container"></div>
        </div>
      </div>
    </div>
    <h1 class="list-title">商品一覧</h1>
    <ul class="product-list">
      <li class="product-list-items" v-for="product in filteredProducts" :key="product.id">
        <div class="item-card">
          <div class="image-box">
            <img src="" alt="商品画像" class="image-item"/>
          </div>
          <div class="product-text-box">
            <p class="product-name">{{ product.product_name }}</p>
            <div class="item-text-row">
              <div class="item-price-box">
                <p class="product-price">￥<span>{{ product.price }}</span>(税込)</p>
              </div>
              <div class="button-area">
                <button class="cart-button">
                  <router-link class="button-label" type="button" @click="addToCart" to="/shoppingCart">カートに入れる</router-link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- <div class="item-search-box">
      <input class="search-box" type="text" v-model="searchKeyword" name="keyword" placeholder="検索">
      <button type="submit">
        <img class="search-icon" src="../assets/search-icon.png" alt="">
      </button>
    </div>
    <div class="category-checkboxes">
      <div class="category-item"><span>分類</span><span>▽</span></div>
      <div v-for="category in categories" :key="category.category_id">
        <label class="category-label">
          {{ category.category_name }}
          <input type="checkbox" v-model="selectedCategories" :value="category.category_id"/>
        </label>
      </div>
    </div> -->
    <!-- <div class="slide-photo-box">
      <carousel :perPage="1">
        <slide v-for="(photo, index) in photos" :key="index">
          <img src="photo.url" alt="Fashion Photo">
        </slide>
      </carousel>
    </div> -->
  </div>
</template>

<script>
// import Carousel from "vue3-carousel";
// import 'vue-carousel/dist/vue-carousel.css';
import { useProductStore } from "../store/ProductsStore.js";
// import { useCartStore } from "../store/CartStore.js";
import axios from "axios";

export default {
  // components: {
  //   Carousel,
  // },
  // data() {
  //   return {
  //     photos: [
  //       { url: "../assets/product_image_1.jpg" },
  //       { url: "../assets/product_image_2.jpg" },
  //       { url: "../assets/product_image_3.jpg" },
  //       { url: "../assets/product_image_4.jpg" },
  //     ],
  //   };
  // },
  data() {
    return {
      products: [],
      addToCart: [],
      categories: [],
      selectedCategories: [],
      showPopup: false,
    };
  },
  computed: {
    saleProducts() {
      return this.products.filter(
        (product) => product.price_down !== "" && product.price_down !== null
      );
    },
    filteredProducts() {
      if (this.selectedCategories.length === 0) {
        return this.products;
      }
      return this.products.filter((product) =>
        this.selectedCategories.includes(product.category_id)
      );
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
          "https://script.googleusercontent.com/macros/echo?user_content_key=SqBvW90wLNFSZfcAEJ_N_7FiQZY_rUznp1O8qKuRHfFIWvG-yIm_wQYf1fSouW4cBgkuk1wwLHNQ6aJHkHtLCJW45aSiZSTqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCu8plIgsszfWHN9GH2X5xfwNRKeMwcy75H4AdGt_pjz0A7UNvYybWbZyScdO3bwS-A8bFv8bxHat4OxCRKGyvHm29bzSkpNwtz9Jw9Md8uu&lib=MUh3wknkaoNR2nbBFL9cU_ZVcsU9CMSyN"
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
          "https://script.googleusercontent.com/macros/echo?user_content_key=fXR1PEljayFNMYEa7qEbqRI3GLReoq8kRG1l2VGZ-KbBaEEfRyXwdHy0BBjPXD9UhuoINLEVBkaq9UIJyLHVTgAfpjHT-f4Wm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC8zlJ-ExAm3ilBrR1z75ntQAYteR_w7QTST5VWjE-NbDa9j_gWtImvujrd377eFiSQfpwOFjgSQRxaF5o_6d0Pt4F7qy-f4Vtz9Jw9Md8uu&lib=MOvWUG3RPQCg8JS4Ge-63FZVcsU9CMSyN"
        )
        .then((response) => {
          this.categories = response.data.map((category, index) => ({
            ...category,
            imageFileName: `category_image_${index + 1}.jpg`,
          }));
        })
        .catch((error) => {
          console.error("カテゴリーデータの取得に失敗しました", error);
        });
    },
    async updatePassProductNumber(productNo) {
      const productStore = useProductStore();
      await productStore.searchProduct(productNo);
      this.$router.push({
        name: "productDetails",
        params: { productNo: productNo },
      });
    },
    async fetchProductData() {
      const productStore = useProductStore();
      await productStore.fetchProductData();
    },
  },
  // setup() {
  //   const cartStore = useCartStore();
  //   const addToCart = async () => {
  //     const passproductData = product_data.value;
  //     passproductData.size = selectedSizes[product_no.value];

  //     // ここでPromiseを返す
  //     return new Promise((resolve) => {
  //       // 非同期処理を行う
  //       cartStore.addToCart(passproductData);

  //       // 非同期処理が完了したらresolveを呼ぶ
  //       resolve();
  //     });
  //   };
  //   return {
  //     addToCart,
  //   };
  // },
};
</script>

<style></style>