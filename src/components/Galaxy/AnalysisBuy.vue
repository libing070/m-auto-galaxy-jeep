<template>
  <div class="analysisbuy">
    <div class="item">
      <div class="draw" id="echartbuy1" :style="{ height: '300px'}"></div>
      <img @click="zoomInClick('echartbuy1')" class="zoom-btn" src="../../assets/img/zoom-in-icon.png"/>
    </div>
    <div class="item">
      <div class="draw" id="echartbuy2" :style="{ height: '300px'}"></div>
      <img @click="zoomInClick('echartbuy2')"  class="zoom-btn" src="../../assets/img/zoom-in-icon.png"/>
    </div>
    <div class="rotate-div" v-if="isShowZoomIn">
      <zoom-in v-on:isShowZoomOut="isShowZoomOutMethods" :zoomDrawId="zoomDrawId"></zoom-in>
    </div>

  </div>
</template>

<script>
  import ZoomIn from "./../common/ZoomIn";
  export default {
    props:['chidlrenParams'],
      components: {
        ZoomIn
      },
        name: "analysis-buy",//交叉购买考虑
      data () {
        return {
          isShowZoomIn:false,
          drawData1:[],
          drawData2:[],
          zoomDrawId:'',
        }
      },
      created(){
     // var  target=  this.$route.query.target;
      //console.log(target);
      },
    watch:{
      'chidlrenParams': function () {
        console.log(this.chidlrenParams);
      },
    },
    mounted(){
      this.loadData1();
      this.loadData2();
    },
    methods: {
      loadData1(){
        var that=this;
        this.$axios
          .post("cross/media", that.chidlrenParams)
          .then(res => {
            if (res.data.status ==1) {
              console.log(res.data.data.series);
              that.drawData1=res.data.data.series;
              that.drawLine1('echartbuy1');
            } else {
              this.$toast(res.data.msg);
            }
          });
      },
      drawLine1($el){
        var that=this;
        let seriesData=[];
        for(let index in that.drawData1){
          var currArr=that.drawData1[index];
          var vals=[],name='';
          for(let val in currArr){
            vals= currArr[2];
            name=currArr[3];
          }
          seriesData.push({
            name: name,
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            symbolSize: function (val) {
              return val *0.0005;
            },
            data: [vals]
          });
        }

        // 基于准备好的dom，初始化echarts实例
        let echartbuy1 = that.$echarts.init(document.getElementById($el))
        echartbuy1.setOption({
          grid: {
            left: '15%', //grid 组件离容器左侧的距离。默认值是10%。
          },
          title: {
            text: '交叉购买考虑-垂媒留资数据',
            left:'10',
            top:'10',
            textStyle:{
              fontSize:'16'
            },
            subtext:'反向线索重合度',
          },
          animation: true,

          tooltip: {
          },
          xAxis: {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitLine: {
              show: true
            }
          },
          yAxis: {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitLine: {
              show: true
            }
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 35
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 0,
              end: 35
            }
          ],
          series:seriesData
        });
      },
      loadData2(){
        var that=this;
        this.$axios
          .post("praise/compet", that.chidlrenParams)
          .then(res => {
            if (res.data.status ==1) {
              that.drawData2=res.data.data;
              that.drawLine2('echartbuy2');
            } else {
              this.$toast(res.data.msg);
            }
          });
      },
      drawLine2($el){
        var that=this;
        var yAxisData=[],seriesData=[];
        for(let index in that.drawData2.x){
          yAxisData.push(that.drawData2.x[index]);
        }
        for(let index in that.drawData2.series){
          seriesData.push(that.drawData2.series[index]);
        }
        // 基于准备好的dom，初始化echarts实例
        let echartbuy2 = this.$echarts.init(document.getElementById($el));
        // 绘制图表
        echartbuy2.setOption({
          grid: {
            left: '15%', //grid 组件离容器左侧的距离。默认值是10%。
          },
          title: {
            text: '交叉购买考虑-用户提及数据',
            left:'10',
            top:'10',
            textStyle:{
              fontSize:'16'
            },
            subtext:'提及量',
            // subtextStyle:{
            //   align:'right'
            // },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: yAxisData
          },
          series: [{
            data: seriesData,
            type: 'bar',
            name:'提及量',
            itemStyle: {
              normal: {
                color: '#fabe00',
                // label : {
                //   show: true,
                //   position: 'right',
                // }
              }
            },
          }]
        });
      },
      zoomInClick($el){
        var that=this;
        that.isShowZoomIn=true;
        that.zoomDrawId=$el;
      },
      isShowZoomOutMethods: function (val) {
        // childValue就是子组件传过来的值
        this.isShowZoomIn = val
      }
    }
    }
</script>

<style lang="scss" scoped>
   .analysisbuy{
     position: relative;
     width: 95%;
     margin: auto;
     .item{
       position: relative;
       background-color: white;
       width: 100%;
       border-radius: 5px;
       margin-bottom: 1rem;
       .draw{
         width: 100%;
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
