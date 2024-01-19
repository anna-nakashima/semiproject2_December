<template>
  <v-app>
    <div class="link">
      <router-link to="/shoppingCart">ショッピングカート</router-link>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
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
