<template>
  <div class="dimension-wrap">
    <top-bar></top-bar>
    <div class="dimension-item first">
      <div class="title">
        <span class="line"></span>
        <div class="desc">{{this.$t('dimension.depart1')}}</div>
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list112')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list27')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list15')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list14')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list12')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list28')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
    </div>
    <div class="dimension-item">
      <div class="title">
        <span class="line"></span>
        <div class="desc">{{this.$t('dimension.depart2')}}</div>
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list21')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list22')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list23')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
      <div class="item">
        <img class="icon" :src="require('../../assets/img/line.png')">
        <span class="desc">{{this.$t('dimension.list24')}}</span>
        <img class="arrow-right" :src="require('../../assets/img/arrow-right.png')">
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "../common/TopBar";
  export default {
        name: "index",
       components: {
         TopBar,

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
        font-size: 0.9rem;
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
