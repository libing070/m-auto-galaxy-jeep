<template>
  <div class="hello">
    <div class="test">
      <p class="hello">Hello李兵</p>
    </div>

    <h1>{{ msg }}</h1>
    <van-button type="default" @click="changeLanguage">切换语言</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-image
      width="10rem"
      height="10rem"
      fit="contain"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <van-nav-bar :title="this.$t('app.hello')" @click-left="show=true">
      <van-icon name="search" slot="left" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'jeep'
    }
  },
  created () {
    console.log('start to enter created ', this.$t('app.hello'))
  },
  methods:{
    changeLanguage(){
      let lang=this.$i18n.locale==='zh'?'en':'zh';
      this.$i18n.locale=lang;
    }

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test{
    width:20rem;
    height:10rem;
    background-color: bisque;
    text-align:center;
  }
  .hello{
    color:red;
    font-size:1rem;
  }
</style>
