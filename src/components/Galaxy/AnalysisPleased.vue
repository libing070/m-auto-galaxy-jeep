<template>
  <div class="analysispleased">
    <div class="item">
      <div class="column">
        <span class="title">一级维度</span>
        <span class="btn-box">
          <span class="btn active pleased-btn">满意</span>
          <span class="btn unpleasure-btn">不满意</span>
        </span>
      </div>
      <div class="draw-group">
        <div class="draw" id="echartpleased1"></div>
      </div>
      <!--<img @click="zoomInClick(1)" class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>-->
    </div>
    <div class="item">
      <div class="column">
        <span class="title">二级维度</span>
      </div>
      <div class="draw" id="echartpleased2" :style="{ height: '260px'}"></div>
      <img @click="zoomInClick(2)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
    </div>
    <div class="item">
      <div class="column">
        <span class="title">三级维度</span>
      </div>
      <div class="draw" id="echartpleased3" :style="{ height: '260px'}"></div>
      <img @click="zoomInClick(3)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>
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
      var that=this;
      $("#echartpleased1 .item").remove();
      var obj=this.chidlrenParams;
      that.chidlrenParams['xType']="pleasure";//默认满意
      that.loadData1();
      that.loadData2();
      that.loadData3();
      $(".analysispleased").on("click",'.column .btn',function () {
        $("#echartpleased1 .item").remove();
          if(!$(this).hasClass("active")){
            $(this).addClass("active").siblings().removeClass("active");
          };
        if($(this).hasClass("pleased-btn")){//满意
          that.chidlrenParams['xType']="pleasure";
        }else if($(this).hasClass("unpleasure-btn")){//不满意
          that.chidlrenParams['xType']="unpleasure";
        }
        that.loadData1();
      })
    },
    methods: {
      loadData1(){
        var that=this;
        this.$axios
          .post("praise/first", that.chidlrenParams)
          .then(res => {
            if (res.data.status ==1) {
              that.drawData1=res.data.data;
               that.drawLine1('echartpleased1');
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
           html+='<div class="item" style="display: inline-block;width: '+w+'px;height: 350px" id="'+$el+i+'"></div>';
         }
         $("#"+$el).append(html);
         $("#"+$el).css("width",(220*groupLen)+"px");
         for(var k=1;k<=groupLen;k++){
           that.$echarts.init(document.getElementById($el+k)).setOption({
             title: {
               top:0,
               left:(k-1)==0?145:'',
               textStyle:{
                 fontSize:'14'
               },
               text: that.drawData1.series[k-1].name,
             },
             tooltip: {
               show:false,
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
               bottom:'0',
               top:'6%',
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
      loadData2(){
        var that=this;
        that.drawLine2('echartpleased2');
      },
      drawLine2($el){
        var that=this;
        // 基于准备好的dom，初始化echarts实例
        let echartpleased2 = that.$echarts.init(document.getElementById($el))
        echartpleased2.setOption({
          grid: {
            left: '3%',
            top:'0',
            bottom:'4%',
            containLabel: true
          },
          title: {
            //top:0,
              // text: '世界人口总量',
              // subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // legend: {
          //     data: ['2012年']
          // },
          xAxis: {
            position: 'top',
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
            }
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          },
          series: [
            {
              name: '2012年',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807],
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
        });
      },
      loadData3(){
        var that=this;
        that.drawLine3('echartpleased3');
      },
      drawLine3($el){
        var that=this;
        // 基于准备好的dom，初始化echarts实例
        let echartpleased3 = that.$echarts.init(document.getElementById($el))
        echartpleased3.setOption({
          grid: {
            left: '3%',
            top:'0',
            bottom:'4%',
            containLabel: true
          },
          title: {
            //top:0,
            // text: '世界人口总量',
            // subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // legend: {
          //     data: ['2012年']
          // },
          xAxis: {
            position: 'top',
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              rotate:38   //调整数值改变倾斜的幅度（范围-90到90）
            }
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          },
          series: [
            {
              name: '2012年',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807],
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
        });
      },
      zoomInClick(num){
        var that=this;
        that.isShowZoomIn=true;
        that.$nextTick(() => {
          if(num==2){
            that.drawLine2('zoomIds');
            that.downloadName='一级维度';
          }else if(num==3){
            that.drawLine3('zoomIds');
            that.downloadName='二级维度';
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
          border-radius: 5px;
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
        height: 750px;
        overflow: scroll;
        .draw{
          height: 750px;
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
