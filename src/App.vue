<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('home/getCategory');
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  padding-right: 0 !important;
}
</style>
