<template>
  <v-app class="app">
    <Navbar />
    <v-main>
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./navbar.vue";
import Footer from "./footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
// Variaveis globais
:root {
  --primaryText: #fff;
  --secondaryText: #f08d49;
  --neutralText: #282c2c;
  --primaryBackground: #282c2c;
  --secondaryBackground: #454a4a;
  --subtitleColor: #bcbcbc;
}

* {
  margin: 0;
  padding: 0;
  color: var(--primaryText);
}

body {
  overflow: hidden !important;
}

.app {
  background-color: var(--primaryBackground) !important;
}
</style>
