<template>
  <div class="my-overlay">
    <div class="calendar" id="mycalendar">
      <div class="header-title">
        <span class="name">日期选择</span>
        <img @click="onClosecalendar" class="close-btn" :src="require('../../assets/img/close1.png')">
      </div>
      <!--<div class="header-subtitle">2020年</div>-->
      <div class="header-body">
        <div class="item" v-for="(item, index) in list" >
          <div class="title">{{item.year}} 年</div>
          <div class="box">
            <div class="month-list" v-for="j in Math.ceil(item.monthList.length/4)">
              <div :class="info.class" :yearmonth="item.year+'-'+info.id" class="list" v-for="(info,i) in item.monthList.slice((j-1)*4,j*4)" :key="i">
                {{info.cnName}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-btn">
         确定
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "my-calendar",
      data(){
        return {
          sumY:1,
          list:[],
          monthList:[{"id":"01","cnName":'一月',"enName":"Jan",'class':''},
            {"id":"02","cnName":'二月',"enName":"Feb",'class':''},
            {"id":"03","cnName":'三月',"enName":"Mar",'class':''},
            {"id":"04","cnName":'四月',"enName":"Apr",'class':''},
            {"id":"05","cnName":'五月',"enName":"May",'class':''},
            {"id":"06","cnName":'六月',"enName":"June",'class':''},
            {"id":"07","cnName":'七月',"enName":"July",'class':''},
            {"id":"08","cnName":'八月',"enName":"Aug",'class':''},
            {"id":"09","cnName":'九月',"enName":"Sep",'class':''},
            {"id":"10","cnName":'十月',"enName":"Oct",'class':''},
            {"id":"11","cnName":'十一月',"enName":"Nov",'class':''},
            {"id":"12","cnName":'十二月',"enName":"Dec",'class':''}]
        }
      },
      props:{
        minDate: {
          type: Date,
          default: new Date()
        },
        maxDate: {
          type: Date,
          default: new Date()
        },
        currentStartdate: {
          type: Date,
          default: new Date()
        },
        currentEnddate: {
          type: Date,
          default: new Date()
        },
      },
      created(){
          this.appendMonthHtml();
        $("body").on("click",'.month-list .list:not(".disabled")',function () {
          

        })
      },
      watch:{

      },
      methods:{
          appendMonthHtml(){
            var minDate=new Date(this.minDate);
            var maxDate=new Date(this.maxDate);
            //获取开始日期最小年份
           var minY= minDate.getFullYear();
            //获取开始日期可选择的最小月份
           var minM= this.p(minDate.getMonth());
            //获取结束日期最大年份
            var maxY=maxDate.getFullYear();
            //获取结束日期可选择的最大月份
            var maxM= this.p(maxDate.getMonth());
            this.sumY=(maxY-minY+1);
            for(var i=0;i<this.sumY;i++){
              if(i==0){//最小年份中的月份可选择的开始日期不可选择
                var addAttr=JSON.parse(JSON.stringify(this.monthList));//不改变原数组
                for(var n=0;n<addAttr.length;n++){
                  if(Number(addAttr[n].id)<Number(minM)){
                    addAttr[n].class="disabled";
                  }
                }
                this.list.push({'year':minY+i,monthList:addAttr});
              }else if(i==(this.sumY-1)){//最大年份中的月份可选择的结束日期不可选择
                var addAttr=JSON.parse(JSON.stringify(this.monthList));//不改变原数组
                for(var n=0;n<addAttr.length;n++){
                  if(Number(addAttr[n].id)>Number(maxM)){
                    addAttr[n].class="disabled";
                  }
                }
                this.list.push({'year':minY+i,monthList:addAttr})
              }else{
                this.list.push({'year':minY+i,monthList:this.monthList});
              }
            };

            //设置开始日期，结束日期
            var startD=(this.currentStartdate.getFullYear())+"-"+(this.p(this.currentStartdate.getMonth()+1));
              console.log(this.currentStartdate.getMonth());
            console.log(this.list);
            var resultarray=JSON.parse(JSON.stringify(this.list));//不改变原数组
             for(var j=0;j<resultarray.length;j++){
                if(resultarray[j].year==this.currentStartdate.getFullYear()){
                  for(var k=0;k<resultarray[j].monthList.length;k++){
                    if(resultarray[j].monthList[k].id==(this.p(this.currentStartdate.getMonth()+1))){
                         resultarray[j].monthList[k].class+='start-date';
                         break;
                      }
                    }
                }
               if(resultarray[j].year==this.currentEnddate.getFullYear()){
                 for(var k=0;k<resultarray[j].monthList.length;k++){
                   if(resultarray[j].monthList[k].id==(this.p(this.currentEnddate.getMonth()+1))){
                     resultarray[j].monthList[k].class+='end-date';
                     break;
                   }
                 }
               }
            }
            this.list=resultarray;
          },
        p(s) {
          return s < 10 ? '0' + s : s
        },
        onClosecalendar(){
          $("body").find("#mycalendar").removeClass("open");
          this.$store.commit('changeMyCalendar',false);
        }
      }
    }
</script>

<style lang="scss" scoped>
  .my-overlay{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    .calendar{
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height:0%;
      background-color: white;
      border-radius: 40px 40px 0 0;
      transition:all 2s ease-out;;
      -moz-transition:all 2s ease-out;; /* Firefox 4 */
      -webkit-transition:all 2s ease-out;; /* Safari and Chrome */
      -o-transition:all 2s ease-out;; /* Opera */
      .header-title{
      position: relative;
      height: 88px;
      font-weight: 500;
      line-height: 88px;
      text-align: center;
        font-size: 28px;
        .close-btn{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 32px;
        margin: auto;
        height: 40px;
      }
    }
      .header-subtitle{
        height: 88px;
        font-weight: 500;
        line-height: 88px;
        text-align: center;
        font-size: 28px;
      }
      .header-body{
        height: 850px;
        overflow-y: auto;
        .item{
          .title{
            height: 88px;
            font-weight: 500;
            line-height: 88px;
            text-align: center;
            font-size: 28px;
          }
          .box{
            width: 100%;
            border-bottom: 2px solid #d8d8d8;
            .month-list{
              display: -webkit-flex;
              display: flex;
              height: 100px;
              .list{
                position: relative;
                -webkit-flex: 1;
                flex: 1;
                text-align: center;
                height: 100px;
                line-height: 100px;
                font-size: 28px;
              }
              .list.disabled{
                color: #c8c9cc;
              }
              .list.start-date{
                background-color: #fabe00;
                color: #000;
                font-weight: bold;
                border-top-left-radius:10px ;
                border-bottom-left-radius:10px ;
              }
              .list.start-date:after{
                content: '开始';
                font-size: 20px;
              }
              .list.end-date{
                background-color: #fabe00;
                color: #000;
                font-weight: bold;
                border-top-right-radius:10px ;
                border-bottom-right-radius:10px ;
              }
              .list.end-date:after{
                content: '结束';
                font-size: 20px;
              }
            }
          }
        }
      }
      .footer-btn{
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        height: 72px;
        line-height: 68px;
        border-radius: 999px;
        background-color: #fabe00;
        font-size: 28px;
        color: #606266;
        width:90%;
         margin: auto;
        text-align: center;
      }
    }
    .calendar.open{
      height:80%;
    }
  }
</style>
