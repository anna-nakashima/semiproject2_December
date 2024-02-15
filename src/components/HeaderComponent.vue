<template>
  <header>
    <div class="wrapper" v-show="headerWrapper">
      <router-link class="logo" to="/toppage"></router-link>
      <div class="buttons">
        <router-link class="button-link" v-for="pageButton in PageButtons" :key="pageButton.id" :to="pageButton.pageUrl">
          <v-img class="button-icons" :src="pageButton.imgSrc" :alt="pageButton.imgDesc"/>
        </router-link>
      </div>
      <button class="header-open" type="button" @click="menuOpen">
        <span class="humberger"></span>
      </button>
    </div>
    <div class="inner-box" v-show="innerWrapper">
      <button class="menu-close" type="button" @click="muneClose"></button>
      <router-link class="link-button" v-for="innerButton in innerButtons" :key="innerButton.id" :to="innerButton.pageUrl" type="button" @click="menuClose">
        <p class="inner-label">{{ innerButton.label }}</p>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerWrapper: true,
      innerWrapper: false,
      pageButtons: [
        {
          id: 1,
          pageUrl: "/shoppingCart",
          imgSrc: require("../assets/cart-icon.png"),
          imgDesc: "カートボタンのアイコン",
        },
      ],
      innerButtons: [
        {
          id: 1,
          pageUrl: "/homepage",
          label: "TOPページ",
        },
        {
          id: 2,
          pageUrl: "/shoppingMethod",
          label: "お支払い情報入力ページ",
        },
        {
          id: 3,
          pageUrl: "/orderConfirmation",
          label: "ご注文内容確認ページ",
        },
      ],
    }
  },
  methods: {
    menuOpen() {
      this.innerWrapper = true
      this.headerWrapper = false
    },
    menuClose() {
      this.headerWrapper = true
      this.innerWrapper = false
    },
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap");

.wrapper {
  background-color: #2d4b70;
  width: 100vw;
  padding: 2%, 4%;
}
</style>