<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in CartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="isChecked(cart.skuId,cart.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('mins',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" class="itxt" @change="changeNum('change',$event.target.value,cart)" ref="num">
            <a href="javascript:void(0)" class="plus" @click="changeNum('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice*cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart('one',cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked" @click="AllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCart('all',CartList)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ total.num }}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total.price }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {throttle} from "lodash"

  export default {
    name: 'ShopCart',
    computed: {
      ...mapState("cart",["CartList"]),
      total(){
        let num=0;
        let price=0;
        this.CartList.forEach(item=>{
          if(item.isChecked){
            num++;
            price+=item.skuPrice*item.skuNum
          }
        })
        return {num,price}
      },
      allChecked(){
        return this.CartList.length>0?this.CartList.every(item=>{return item.isChecked===1}):false
      }
    },
    methods: {
      getData() {
        this.$store.dispatch("cart/getCartList")
      },
      async isChecked(skuID,isChecked){
        isChecked=isChecked===1?0:1;
        await this.$store.dispatch("cart/cartChecked", {skuID, isChecked});
        this.getData()
      },
       async AllChecked(e){
        let isChecked=e.target.checked?1:0;
        let queen=[];
        this.CartList.forEach(item => {
          if(item.isChecked!==isChecked){
            let skuID=item.skuId;
            queen.push(this.$store.dispatch("cart/cartChecked", {skuID, isChecked}));
          }
        })
         await Promise.all(queen);
         this.getData()
      },
      changeNum:throttle(function (type,disNum,cart){
       let skuID=cart.skuId;
        switch (type) {
          case "add":
            disNum=1
            break;
          case "mins":
            disNum=cart.skuNum<2?0:-1
            break;
          case "change":
            if(isNaN(disNum*1)){
              disNum=0
            }else{
              disNum=disNum-cart.skuNum
            }
            break;
        }
       let res=this.$store.dispatch("cart/updateShopCar", {skuID, disNum});
        res.then(()=>this.getData()).catch(err=>console.log(err.message))
      },1000),
      async deleteCart(type,cart){
        let queen=[];
        if (type==='one'){
          queen.push(this.$store.dispatch("cart/deleteCart", cart.skuId));
        }else if (type==='all'){
          cart.forEach(item => {
            if(item.isChecked===1){
              let skuID=item.skuId;
              queen.push(this.$store.dispatch("cart/deleteCart", skuID));
            }
          })
        }
        if(queen.length>0){
          await Promise.all(queen);
          this.getData()
        }
      },
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }
    a{
      cursor: pointer;
    }
    .cart-main {

      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>