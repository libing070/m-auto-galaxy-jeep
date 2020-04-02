<template>
  <div class="bglayout">
    <div class="top"></div>
  </div>
</template>

<script>
    export default {
        name: "bg-layout"
    }
</script>

<style lang="scss" scoped>
  .bglayout{

  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
  min-height: 36rem;
  background-color:#fabe00;
  .top{
    position:absolute;
    top:0;
    left:0;
    right: 0;
    background-color:#000;
    height: 13rem;
  }
  }
</style>
