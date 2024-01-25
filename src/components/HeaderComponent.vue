<template>
  <div class="wrapper">
    <router-link class="logo" to="/toppage"></router-link>
    <div class="buttons">
      <router-link class="button-link" v-for="pageButton in filteredPageButtons" :key="pageButton.id" :to="pageButton.pageUrl">
        <v-img class="button-icons" :src="pageButton.imgSrc" :alt="pageButton.imgDesc"/>
        <div class="button-texts">{{ pageButton.btnText }}</div>
      </router-link>
    </div>
  </div>
</template>