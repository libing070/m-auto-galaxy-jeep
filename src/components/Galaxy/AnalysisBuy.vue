<template>
  <div>交叉购买考虑</div>
</template>

<script>
    export default {
        name: "analysis-buy",//交叉购买考虑
      data () {
        return {
        }
      },
      created(){
      var  target=  this.$route.query.target;
      console.log(target);
      },
      methods:{

      }
    }
</script>

<style lang="scss" scoped>

</style>
