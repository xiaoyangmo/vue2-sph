<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(ImageList,index) in skuImageList" :key="ImageList.id" >
        <img :src="ImageList.imgUrl" :class='{active:hover===index}' @mouseenter="getIndex(index)">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageList",
    data() {
      return {
        hover: 0
      }
    },
    props: ['skuImageList'],
    methods: {
      getIndex(index) {
        this.hover=index;
        this.$store.commit("detail/getIndex",index)
      }
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 66px;
    width: 412px;
    box-sizing: border-box;
    padding: 10px 0 0;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>