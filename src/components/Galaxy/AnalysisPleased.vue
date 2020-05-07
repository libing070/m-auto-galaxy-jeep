<template>
  <div class="analysispleased">
    <div class="item">
      <div class="column">
        <span class="title">一级维度</span>
        <span class="btn-box">
          <span class="btn active pleased-btn">满意</span>
          <span class="btn dissatisfied-btn">不满意</span>
        </span>
      </div>
      <div class="draw-group">
        <div class="draw">
          <!--<div id="echartpleased1_1" :style="{ width: '200px',height: '400px'}"></div>-->
        </div>
      </div>
      <img @click="zoomInClick(1)" class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="rotate-div" v-if="isShowZoomIn">
      <zoom-in :downloadName="downloadName" v-on:isShowZoomOut="isShowZoomOutMethods"></zoom-in>
    </div>

  </div>
</template>

<script>
  import ZoomIn from "./../common/ZoomIn";

  export default {
    name: "analysis-pleased",//产品满意&不满意因子
    props:['chidlrenParams'],
    components: {
      ZoomIn
    },
    data () {
      return {
        isShowZoomIn:false,
        drawData1:[],
        drawData2:[],
        downloadName:'',
      }
    },
    created(){
    },
    watch:{
      'chidlrenParams': function () {
       // console.log(this.chidlrenParams);
      },
    },
    created(){

    },
    mounted(){
      $(".draw-group .draw").html('');
      var obj=this.chidlrenParams;
      this.chidlrenParams['xType']="pleasure";
      this.loadData1();
      $(".analysispleased").on("click",'.column .btn',function () {
          if(!$(this).hasClass("active")){
            $(this).addClass("active").siblings().removeClass("active");
          }
      })
    },
    methods: {
      loadData1(){
        var that=this;
        this.$axios
          .post("praise/first", that.chidlrenParams)
          .then(res => {
            if (res.data.status ==1) {
              console.log(res.data.data.series);
              that.drawData1=res.data.data;
               that.drawLine1('echartpleased1_1');
            } else {
              this.$toast(res.data.msg);
            }
          });
      },
      drawLine1($el){
         var that=this;
         var groupLen=that.drawData1.series.length;
         var yAxisData=that.drawData1.x;
         var html='';
         for(var i=1;i<=groupLen;i++){
           var w=i==1?"300":'200';
           html+='<div style="display: inline-block;width: '+w+'px;height: 400px" id="echartpleased1_'+i+'"></div>';
         }
         $(".draw-group .draw").append(html);
         $(".draw").css("width",(220*groupLen)+"px");
         for(var k=1;k<=groupLen;k++){
           that.$echarts.init(document.getElementById('echartpleased1_'+k)).setOption({
             title: {
               top:40,
               left:(k-1)==0?145:'',
               textStyle:{
                 fontSize:'14'
               },
               text: that.drawData1.series[k-1].name,
             },
             tooltip: {
               trigger: 'axis',
               axisPointer: {
                 type: 'shadow'
               }
             },
             legend: {
               show:false
               //data: ['2011年']
             },
             grid: {
               left: '3%',
               right: '4%',
               containLabel: true
             },
             xAxis: {
               show:false,
             },
             yAxis: {
               type: 'category',
               data: k==1?yAxisData:'',
               // axisLabel: {
               //   interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
               //   rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
               // }
             },
             series: [
               {
                 name: '2011年',
                 type: 'bar',
                 data: that.drawData1.series[k-1].data,
                 itemStyle: {
                   normal: {
                     color: '#fabe00',
                     label : {
                       show: true,
                       position: 'right',
                     }
                   }
                 },
               }
             ]
           })
         }
      },
      zoomInClick(num){
        var that=this;
        that.isShowZoomIn=true;
        that.$nextTick(() => {
          if(num==1){
            that.drawLine1('zoomIds');
            that.downloadName='交叉购买考虑-垂媒留资数据';
          }else if(num==2){
            that.drawLine2('zoomIds');
            that.downloadName='交叉购买考虑-用户提及数据';
          }
        });

      },
      isShowZoomOutMethods: function (val) {
        // childValue就是子组件传过来的值
        this.isShowZoomIn = val
      }
    }
    }
</script>

<style lang="scss" scoped>
  .analysispleased{
    position: relative;
    width: 95%;
    margin: auto;
    .item{
      position: relative;
      background-color: white;
      width: 100%;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding-top: 120px;
      padding-bottom: 10px;
      .column{
        position: absolute;
        top: 30px;
        width: 100%;
        height: 65px;
        line-height: 65px;
        .title{
          position: absolute;
          left: 30px;
          font-weight: bold;
          font-size:26px;
          display: inline-block;
        }
        .btn-box{
          width: 300px;
          position: absolute;
          right: 0;
          left: 0;
          margin: auto;
          text-align: center;
          display: inline-block;
          .btn{
            font-weight: bold;
            width: 150px;
            display: inline-block;
            background-color: #f9f9f9;
            color: #000000;
            font-size: 26px;
          }
          .btn:nth-child(1){
            float: left;
          }
          .btn:nth-child(2){
            float: right;
          }
          .btn.active{
            background-color: #fabe00;

          }
        }
      }
      .draw-group{
       margin: 10px;
        height: 800px;
        overflow: scroll;
        .draw{
          height: 800px;
        }
      }
      .zoom-btn{
        position: absolute;
        right: 30px;
        top: 30px;
        width: 60px;
      }
    }
    .rotate-div{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      background-color: #fabe00;
    }
  }
</style>
