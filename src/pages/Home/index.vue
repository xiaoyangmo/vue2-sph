<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in FloorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import Rank from "./Rank";
import Recommend from "./Recommend";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {ListContainer,Brand,Floor,Like,Rank,Recommend},
  computed:{
    ...mapState('home',['FloorList'])
  },
  mounted() {
    this.$store.dispatch('home/getFloor')
  }
}
</script>

<style scoped>

</style>