<template>
  <div class="wrapper">
    <div class="search-boxs">
      <div class="search-text">検索</div>
      <input class="search-box" type="search" v-model="searchKeyword" name="search" placeholder="キーワードを入力"/>
    </div>
    <div class="category-checkboxes">
      <div class="category-item"><span>分類</span><span>▽</span></div>
      <div v-for="category in categories" :key="category.category_id">
        <label class="category-label">
          {{ category.category_name }}
          <input type="checkbox" v-model="selectedCategories" :value="category.category_id"/>
        </label>
      </div>
    </div>
    <!-- <div class="slide-photo-box">
      <carousel :perPage="1">
        <slide v-for="(photo, index) in photos" :key="index">
          <img src="photo.url" alt="Fashion Photo">
        </slide>
      </carousel>
    </div> -->
    <div class="products-list-wrapper">
      <div class="list-title">商品一覧</div>
      <div class="product-list" v-for="product in products" :key="product.id">
        <div class="image-box">
          <img src="product.image" alt="商品画像" class="image-item"/>
        </div>
        <div class="product-text-box">
          <p class="product-name">{{ product.product_name }}</p>
          <p class="product-price">￥<span>{{ product.price }}</span>(税込)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Carousel from "vue3-carousel";
// import 'vue-carousel/dist/vue-carousel.css';

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
};
</script>

<style></style>