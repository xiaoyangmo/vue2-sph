<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev" :class="{disabled:pageNo===1}" @click="getPage(pageNo-1)">
          <a>«上一页</a>
        </li>
        <li v-if="startAndEnd.start>1" @click="getPage(1)">
          <a>1</a>
        </li>
        <li class="dotted" v-if="startAndEnd.start>2"><span>...</span></li>
        <template v-for="index in startAndEnd.end">
        <li v-if="index>=startAndEnd.start" :key="index" :class="{active:pageNo===index}" @click="getPage(index)">
          <a>{{ index }}</a>
        </li>
        </template>
        <li class="dotted" v-if="startAndEnd.end<totalPages-1"><span>...</span></li>
        <li v-if="startAndEnd.end<totalPages" @click="getPage(totalPages)">
          <a>{{ totalPages }}</a>
        </li>
        <li class="next" :class="{disabled:pageNo===totalPages}" @click="getPage(pageNo+1)">
          <a>下一页»</a>
        </li>
      </ul>
      <div><span>共{{ totalPages }}页&nbsp;</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','totalPages','continues'],
  computed: {
    startAndEnd() {
      let {pageNo,totalPages,continues}=this.$props;
      let start=pageNo-Math.floor(continues/2);
      let end=pageNo+Math.floor(continues/2);
      if (continues>totalPages){
        start=1;
        end=totalPages;
      }else {
        if (start<1){
          start=1;
          end=continues;
        }
        if (end>totalPages){
          start=totalPages-continues;
          end=totalPages;
        }
      }
      return {start,end}
    }
  },
  methods: {
    getPage(value) {
      if(value>0&&value<=this.$props.totalPages){
        this.$emit('getPage',value);
      }
    }
  },
}
</script>

<style scoped lang="less">
.page{
  min-width: 533px;
  height: 66px;
  margin-left: 50%;
.sui-pagination{
  min-width: 533px;
  margin: 18px 0 18px -50%;
ul{
  margin-right: 10px;
  vertical-align: middle;
  float: left;
li{
  line-height: 18px;
  display: inline-block;
  cursor: pointer;
a{
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #e0e9ee;
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}
&.active{
a{
  background-color: #f40;
  color: #fff;
  border-color: #f40;
  cursor: default;
}
}
&.prev{
a{
  margin: 0 5px;
  background-color: #fafafa;
}
}
&.disabled{
a{
  color: #999;
  cursor: default;
}
}
&.dotted{
  cursor: default;
span{
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  font-size: 14px;
  border: 0;
  padding: 9px 10px;
  color: #333;
}
}
&.next{
a{
  background-color: #fafafa;
  margin: 0 5px;
}
}
}

}
div{
  color: #333;
  font-size: 14px;
  float: left;
  padding: 10px 0;
}
}
}
</style>