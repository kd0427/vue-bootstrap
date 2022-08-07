<template>
  <div id="app">
    <Header />
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/AppHeader.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
<style scoped>
body {
  margin: 0px;
  padding: 0px;
}
</style>
