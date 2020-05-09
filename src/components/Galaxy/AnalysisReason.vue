<template>
  <div class="analysisreason">
    <div class="item">
      <div class="column">
        <span class="title">一级维度</span>
        <span class="btn-box">
          <span class="btn active pleased-btn">购买</span>
          <span class="btn unpleasure-btn">拒绝</span>
        </span>
      </div>
      <div class="draw-group">
        <div class="draw" id="analysisreason1"></div>
      </div>
      <!--<img @click="zoomInClick(1)" class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>-->
    </div>
    <div class="item">
      <div class="column">
        <span class="title">二级维度</span>
      </div>
      <div class="draw" id="analysisreason2" :style="{ height: '260px'}"></div>
      <!--<img @click="zoomInClick(2)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>-->
    </div>
    <div class="item">
      <div class="column">
        <span class="title">三级维度</span>
      </div>
      <div class="draw" id="analysisreason3" :style="{ height: '260px'}"></div>
      <!--<img @click="zoomInClick(3)"  class="zoom-btn" src="../../assets/img/icon-zoom-in.png"/>-->
    </div>
    <div class="rotate-div" v-if="isShowZoomIn">
      <zoom-in :downloadName="downloadName" v-on:isShowZoomOut="isShowZoomOutMethods"></zoom-in>
    </div>
  </div>
</template>

<script>
  import ZoomIn from "./../common/ZoomIn";

  export default {
    name: "analysis-reason",//购买&拒绝
    props:['chidlrenParams'],
    components: {
      ZoomIn
    },
    data () {
      return {
        firstLoad:0,//0 第一次加载，1非第一次加载
        isShowZoomIn:false,
        drawData1:[],
        drawData2:[],
        drawData3:[],
        downloadName:'',
        currFirstBarColumnSeriesName:'',//当前选中的车型
        currFirstBarActiveyAxisName:'',//当前选中的yAxis
        currSecondBarActiveyAxisName:'',
        currThirdBarActiveyAxisName:''
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
      that.chidlrenParams['xType']="purchase";//默认购买
      that.init();
      $(".analysispleased").on("click",'.column .btn',function () {
        $("#analysisreason1 .item").remove();
          if(!$(this).hasClass("active")){
            $(this).addClass("active").siblings().removeClass("active");
          };
        if($(this).hasClass("pleased-btn")){//购买
          that.chidlrenParams['xType']="purchase";
        }else if($(this).hasClass("unpleasure-btn")){//拒绝
          that.chidlrenParams['xType']="refuse";
        }
        that.init();
      });
    },
    methods: {
      async init(){
        var that=this;
        that.drawData1=  await that.loadData1();
        if(that.firstLoad==0){
          that.currFirstBarColumnSeriesName=that.drawData1.series[0].name;
          that.currFirstBarActiveyAxisName=that.drawData1.x[that.drawData1.x.length-1];
        }
        that.drawLine1('analysisreason1');

        that.drawData2= await that.loadData2();
        that.currSecondBarActiveyAxisName=that.drawData2.x[that.drawData2.x.length-1];
        that.drawLine2('analysisreason2');

        that.drawData3=  await that.loadData3();
        that.currThirdBarActiveyAxisName=that.drawData3.x[that.drawData3.x.length-1];
        that.drawLine3('analysisreason3');
      },
      loadData1(){
        var that=this;
         return new Promise(resolve => {
           that.$axios
             .post("praise/first", that.chidlrenParams)
             .then(res => {
               if (res.data.status ==1) {
                 resolve(res.data.data);
               } else {
                 that.$toast(res.data.msg);
               }
             });
         });
      },
      drawLine1($el){
         var that=this;
         var groupLen=that.drawData1.series.length;
         var yAxisData=that.drawData1.x;
         var html='';
         var widthRate = 100/(groupLen+2.5);
         for(var i=1;i<=groupLen;i++){
           var w=i==1? (widthRate*3.5+"%"):(widthRate+'%');
           html+='<div class="item" style="display: inline-block;width: '+w+';height: 350px" id="'+$el+i+'"></div>';
         }
         $("#"+$el).append(html);
         for(var k=1;k<=groupLen;k++){
           that.$echarts.init(document.getElementById($el+k)).setOption({
             title: {
               top:0,
               left:(k-1)==0?'70%':'',
               textStyle:{
                 fontSize:'8'
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
             },
             grid: {
               left: '3%',
               right: (k-1)==0?'12%':'44%',
               bottom:'0',
               top:'6%',
               containLabel: true
             },
             xAxis: {
               show:false,
             },
             yAxis:{
               type: 'category',
               data: yAxisData,
               axisLabel: {
                 show: k==1?true:false,
                 fontSize: '8'
               },
               show: k==1?true:false,
             },
             series: [
               {
                 name: that.drawData1.series[k-1].name,
                 type: 'bar',
                 data: that.drawData1.series[k-1].data,
                 itemStyle: {
                   normal: {
                     color:function (params) {
                       if(params.seriesName==that.currFirstBarColumnSeriesName&&that.currFirstBarActiveyAxisName==params.name){
                         return '#fabe00';
                       }else{
                         return '#BFBFBF';
                       }
                     },
                     label : {
                       show: true,
                       position: 'right',
                       fontSize: '8'
                     }
                   }
                 },
               }
             ]
           });
           that.$echarts.init(document.getElementById($el+k)).on('click', function (params) {
              $("#analysisreason2 .item").remove();
              $("#analysisreason3 .item").remove();
              that.currFirstBarColumnSeriesName=params.seriesName;
              that.currFirstBarActiveyAxisName=params.name;
              that.reloadEchar1();
              that.reloadEchar2(true);
           })
         }
      },
      async reloadEchar1(reloadData = false) {
         var that = this;
         $("#analysisreason1 .item").remove();
         if (reloadData) {
            that.drawData1=  await that.loadData1();
         }
         that.drawLine1('analysisreason1');
      },
      loadData2(){
        var that=this;
        that.chidlrenParams['first']=that.currFirstBarActiveyAxisName;
        return new Promise(resolve => {
          that.$axios
            .post("praise/second", that.chidlrenParams)
            .then(res => {
              if (res.data.status ==1) {
                resolve(res.data.data);
              } else {
                that.$toast(res.data.msg);
              }
            });
        });
      },
      drawLine2($el){
        var that=this;
        var yAxisData=that.drawData2.x;
        var seriesData=that.drawData2.series;
        // 基于准备好的dom，初始化echarts实例
        let analysisreason2 = that.$echarts.init(document.getElementById($el))
        analysisreason2.setOption({
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
            data: yAxisData
          },
          series: [
            {
              name: '2012年',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                normal: {
                  color:function (params) {
                    if(that.currSecondBarActiveyAxisName==params.name){
                      return '#fabe00';
                    }else{
                      return '#BFBFBF';
                    }
                  },
                  label : {
                    show: true,
                    position: 'right',
                  }
                }
              },
            }
          ]
        });
        analysisreason2.off('click');
        analysisreason2.on('click', function (params) {
          that.currSecondBarActiveyAxisName=params.name;
          that.currThirdBarActiveyAxisName=params.name;
          that.reloadEchar2(false);
        })
      },
      async reloadEchar2(reloadData = false) {
         var that = this;
         $("#analysisreason2 .item").remove();
         if (reloadData) {
            that.drawData2=  await that.loadData2();
            that.currSecondBarActiveyAxisName=that.drawData2.x[that.drawData2.x.length-1];
         }
         that.drawLine2('analysisreason2');
         that.reloadEchar3(true);
      },
      loadData3(){
        var that=this;
        that.chidlrenParams['first']=that.currFirstBarActiveyAxisName;
        that.chidlrenParams['second']=that.currSecondBarActiveyAxisName;
        return new Promise(resolve => {
              that.$axios
                .post("praise/third", that.chidlrenParams)
                .then(res => {
                  if (res.data.status ==1) {
                    resolve(res.data.data);
                  } else {
                    that.$toast(res.data.msg);
                  }
                });
        })
      },
      drawLine3($el){
        var that=this;
        var yAxisData=that.drawData3.x;
        var seriesData=that.drawData3.series;
        // 基于准备好的dom，初始化echarts实例
        let analysisreason3 = that.$echarts.init(document.getElementById($el))
        analysisreason3.setOption({
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
            data: yAxisData
          },
          series: [
            {
              name: '',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                normal: {
                  color:function (params) {
                    if(that.currThirdBarActiveyAxisName==params.name){
                      return '#fabe00';
                    }else{
                      return '#BFBFBF';
                    }
                  },
                  label : {
                    show: true,
                    position: 'right',
                  }
                }
              },
            }
          ]
        });
        analysisreason3.off('click');
        analysisreason3.on('click', function (params) {
          that.currThirdBarActiveyAxisName=params.name;
          that.reloadEchar3(false);

        })
      },
      async reloadEchar3(reloadData = false) {
         var that = this;
         $("#echartpleased3 .item").remove();
         if (reloadData) {
            that.drawData3=  await that.loadData3();
            that.currThirdBarActiveyAxisName=that.drawData3.x[that.drawData3.x.length-1];
         }
         that.drawLine3('analysisreason3');
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
  .analysisreason{
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
