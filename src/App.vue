<template>
  <v-app>
    <v-app-bar>
      <HeaderComponent />
    </v-app-bar>
    <div class="link">
      <router-link to="/shoppingCart">ショッピングカート</router-link>
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
.link {
  display: flex;
  justify-content: space-between;
}
</style>
