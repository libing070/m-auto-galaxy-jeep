<template>
  <div class="zoomin">
    <div class="draw" id="zoomIds" :style="{ height: '97%'}"></div>
    <img @click="cameraClick" class="camera-btn" src="../../assets/img/icon-camera.png"/>
    <img @click="zoomOutClick" class="zoom-btn" src="../../assets/img/icon-zoom-out.png"/>
  </div>
</template>

<script>
    export default {
      name: "zoom-in",
      props:['downloadName'],
      data () {
        return {
        }
      },
      watch:{
        'downloadName': function () {
         // console.log(this.downloadName);
        },
      },
      mounted(){
        var that=this;

      },
      methods:{
        zoomOutClick(){
          // childByValue是在父组件on监听的方法
          // 第二个参数this.childValue是需要传的值
          this.$emit('isShowZoomOut', false)
        },
        cameraClick(){
          var that=this;
          var mycanvas = $("#zoomIds").find("canvas")[0];
          var image = mycanvas.toDataURL("image/png");
          var $a = document.createElement('a');
          $a.setAttribute("href", image);
          $a.setAttribute("download", that.downloadName);
          $a.click();
        }
      }
    }
</script>

<style lang="scss" scoped>
.zoomin{
  transform: rotate(90deg);
  transform-origin:50vw 50vw;
  -ms-transform: rotate(90deg); /* IE 9 */
  -ms-transform-origin:50vw 50vw; /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  -webkit-transform-origin:50vw 50vw; /* Safari and Chrome */
  width: 100vh;
  height: 100vw;
  .draw{
    background-color: white;
    position: relative;
    width: 98%;
    left: 0;
    right: 0;
    bottom: -1.5%;
    margin: auto;
    border-radius: 5px;
  }
  .zoom-btn{
    position: absolute;
    right: 30px;
    top: 30px;
    width: 60px;
  }
  .camera-btn{
    position: absolute;
    right: 140px;
    top: 30px;
    width: 60px;
  }
}
</style>
