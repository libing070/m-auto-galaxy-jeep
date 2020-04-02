<template>
  <div class="dimension-wrap">
    <top-bar></top-bar>
    <div class="dimension-item first">
      <div class="title">
        <span class="line"></span>
        <div class="desc">产品竞争力舆情洞察</div>
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">交叉购买考虑</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">产品垂媒声量</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">产品口碑</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">产品满意&不满意因子</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">产品购买&拒绝原因</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">高频疑问</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
    </div>
    <div class="dimension-item">
      <div class="title">
        <span class="line"></span>
        <div class="desc">消费者画像 & 需求洞察</div>
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">人口统计</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">触媒习惯</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">兴趣爱好</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">内容偏好</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "../common/TopBar";
  import BgLayout from "../common/BgLayout";

  export default {
        name: "index",
       components: {
         TopBar,
         BgLayout

  }
    }
</script>

<style lang="scss" scoped>
  .dimension-wrap{
    .dimension-item{
      position: relative;
      margin: auto;
      width: 90%;
      border-radius: 5px;
      background: white;
      margin-bottom: 1rem;
      padding-bottom: 2rem;
      .title{
        width: 100%;
        height: 2.5rem;
        position: relative;
        top: 1rem;
        .line{
          position: absolute;
          background: #fabe00;
          left: 0;
          width: 2px;
          height: 2rem;
          top: 0;
          bottom: 0;
        }
        .desc{
          height: 2rem;
          font-weight: bold;
          border-bottom: 0.5px solid #fabe00;
          line-height: 2rem;
          padding-left: 0.5rem;
          width: 90%;
          margin: auto;

        }
      }
      .item{
        width: 90%;
        margin: auto;
        height: 2.6rem;
        line-height: 2.6rem;
        border-bottom: 0.5px solid #d8d8d8;
        position: relative;
        top: 1rem;
        .icon{
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 70%;
        }
        .desc{
          position: absolute;
          left: 2rem;
          font-weight: bold;
          font-size: 0.8rem;
        }
        .arrow-right{
          display: inline-block;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 30%;
        }
      }
    }
    .dimension-item.first{
      margin-top: -9rem;
    }
  }
</style>
