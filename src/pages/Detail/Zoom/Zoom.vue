<template>
  <div class="spec-preview">
    <img :src="image" />
    <div class="event" @mousemove="handle" ref="box"></div>
    <div class="big">
      <img :src="image" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {throttle} from "lodash";

  export default {
    name: "Zoom",
    props: ['skuImageList'],
    computed: {
      ...mapState('detail',["imgIndex"]),
      image() {
        if(this.skuImageList){
          return this.skuImageList[this.imgIndex].imgUrl
        }else {
          return ''
        }
      }
    },
    methods: {
      handle:throttle(function (event){
        let mask=this.$refs.mask;
        let bigImg=this.$refs.bigImg;
        let box=this.$refs.box;
        let left=event.offsetX-(mask.offsetWidth)/2;
        let top=event.offsetY-(mask.offsetHeight)/2;
        let width=box.offsetWidth-mask.offsetWidth;
        let height=box.offsetHeight-mask.offsetHeight;
        if(left<0) left=0;
        if(left>width) left=width;
        if (top<0) top=0;
        if (top>height) top=height;
        mask.style.left=left+'px';
        mask.style.top=top+'px';
        bigImg.style.left=-left*2+'px';
        bigImg.style.top=-top*2+'px';
        },50)
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>