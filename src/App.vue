<template>
  <v-app>
    <v-app-bar>
      <HeaderComponent />
    </v-app-bar>
    <div class="link">
      <router-link to="/homepage">ホーム</router-link>
      <router-link to="/shoppingCart">ショッピングカート</router-link>
      <router-link to="/shoppingMethod">支払い情報入力</router-link>
      <router-link to="/orderConfirmation">注文確認</router-link>
    </div>
    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <FooterComponent />
    </v-footer>
  </v-app>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
@import "@/assets/CSS/reset.css";
.link {
  display: flex;
  justify-content: space-between;
}
.v-app-bar {
  overflow: visible;
}
</style>
