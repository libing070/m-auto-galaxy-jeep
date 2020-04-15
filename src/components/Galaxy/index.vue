<template>
   <div class="galaxy">
    <top-bar :isshowBackbtn="true"></top-bar>
    <div class="galaxy-warp" id="galaxyWarp">
      <div class="title">
        <span class="line"></span>
        <div class="desc">{{this.$t('dimension.depart1')}}</div>
      </div>
      <div class="item-type">
        <div class="box">
          <span class="name">品牌</span>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select>
              <option>Jeep</option>
              <option>三菱</option>
              <option>丰田</option>
            </select>
          </div>
        </div>
        <div class="box">
          <span class="name">车型</span>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select>
              <option>Jeep</option>
              <option>三菱</option>
              <option>丰田</option>
            </select>
          </div>
        </div>
        <div class="big-box">
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select>
              <option>年款</option>
              <option>2019款</option>
              <option>2018款</option>
              <option>2017款</option>

            </select>
          </div>
        </div>
      </div>
      <div class="item-time">
        <div class="box">
          <span class="radio-name">时间选择：</span>
          <span class="radio-option"><img :src="require('../../assets/img/radio-checked.png')"><span class="text">自定义</span></span>
          <span class="radio-option"><img :src="require('../../assets/img/radio-nochecked.png')"><span class="text">上市期</span></span>
        </div>
        <div class="box">
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select>
              <option>按月</option>
              <option>按日</option>
            </select>
          </div>
          <div class="choose-time">
            <span class="text start-time-text" @click="chooseStartTimeClick">{{currentStartDateText}}</span>
            <span class="time-line"></span>
            <span class="text end-time-text" @click="chooseEndTimeClick">{{currentEndDateText}}</span>
          </div>
        </div>
      </div>
      <div class="item-area">
        <div class="box">
          <span class="area-name">区域选择：</span>
        </div>
        <div class="box">
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <input type="text" readonly class="select-sheet"v-bind:value="areaText"  @click="chooseAreaSheetClick"></input>
          </div>
          <div class="cc" style="margin: 0 15px">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <input type="text"readonly v-bind:disabled="provinceDisabled" class="select-sheet" v-bind:value="provinceText" @click="chooseProvinceSheetClick"></input>
          </div>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <input type="text"readonly v-bind:disabled="cityDisabled" class="select-sheet" v-bind:value="cityText" @click="chooseCitySheetClick"></input>
          </div>
        </div>
        <div class="list-area"  >
          <span v-for="(item, index) in resultDataList" class="list">
            <span class="text">{{item}}</span>
            <img @click="deleteCurrArea(item)"  class="icon" :src="require('../../assets/img/icon-close.png')">
          </span>
        </div>
      </div>
      <div class="item-user-form">
        <div class="box">
          <span class="user-attribute">用户属性：</span>
        </div>
        <div class="box">
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-checked.png')"><span class="text">车主</span></span>
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-checked.png')"><span class="text">一般用户</span></span>
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-checked.png')"><span class="text">水军</span></span>
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-nochecked.png')"><span class="text">媒体</span></span>
        </div>
      </div>
      <div class="item-user-form" style="border: none">
        <div class="box">
          <span class="user-attribute">来源媒体：</span>
        </div>
        <div class="box">
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-checked.png')"><span class="text">汽车之家</span></span>
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-checked.png')"><span class="text">易车</span></span>
          <span class="checked-option"><img :src="require('../../assets/img/icon-checkbox-checked.png')"><span class="text">爱卡汽车</span></span>
        </div>
      </div>
      <div class="start-wrap">
        开始分析
      </div>
      <div class="retractable-btn" @click="retractableClick">
        <img :src="require('../../assets/img/retractable-button.png')">
      </div>
    </div>
     <van-datetime-picker
       v-show="startPicker"
       v-model="currentStartDate"
       title="开始日期"
       @cancel="startCancelClick"
       @confirm="startConfirmClick"
       type="year-month"
       :min-date="sminDate"
       :max-date="smaxDate"
       :formatter="formatter"
     />

     <van-datetime-picker
       v-show="endPicker"
       v-model="currentEndDate"
       title="结束日期"
       @cancel="endCancelClick"
       @confirm="endConfirmClick"
       type="year-month"
       :min-date="eminDate"
       :max-date="emaxDate"
       :formatter="formatter"
     />

     <van-action-sheet v-model="areaShow" :actions="areaActions" @select="onAreaSelect" />

     <span v-if="areaText=='省市'">
            <van-action-sheet ref="provinceActionsheet" id="provinceActionsheet" :close-on-click-overlay=false  cancel-text="确定" @cancel="onProvinceCancel" v-model="provinceShow" :actions="provinceActions" @select="onProvinceSelect" />
     </span>
     <span>
            <van-action-sheet  v-model="provinceShow" :actions="provinceActions" @select="onProvinceSelect" />
     </span>
       <van-action-sheet id="cityActionsheet" :close-on-click-overlay=false  cancel-text="确定" @cancel="onCityCancel"  v-model="cityShow" :actions="cityActions" @select="onCitySelect" />
   </div>

</template>

<script>
  import pData from '../../assets/json/province'
  import * as t  from '../../assets/js/common'
  import TopBar from "../common/TopBar";
  export default {
        name: "index",
    components: {
      TopBar,
    },
      data () {
        return {
          startPicker:false,
          sminDate: new Date(2020, 0, 1),
          smaxDate: new Date(2025, 10, 1),
          currentStartDate: new Date(),
          currentStartDateText:'开始日期',

          endPicker:false,
          eminDate: new Date(2020, 0, 1),
          emaxDate: new Date(2025, 10, 1),
          currentEndDate: new Date(),
          currentEndDateText:'结束日期',

          areaText:'全国',
          provinceText:'',
          cityText:'',
          provinceDisabled:true,
          cityDisabled:true,

          areaShow: false,
          areaActions: [
            { name: '全国' },
            { name: '省市' },
            { name: '城市' },
            // { name: '城市',disabled: true },
          ],

          provinceShow:false,
          provinceActions:[],

          cityShow:false,
          cityActions:[],

          currPList:[],//当前选中的省份
          currCList:[],//当前选中的城市
          resultDataList:[],//最终展示的结果
        }
      },
      created(){
        var  target=  this.$route.query.target;
        console.log(target);
      },
      methods:{
        chooseStartTimeClick(){
          this.startPicker=true;
        },
        chooseEndTimeClick(){
          this.endPicker=true;
        },
        startCancelClick(){//开始时间 取消事件
          this.startPicker=false;
        },
        startConfirmClick(d){//开始时间 确定事件
          this.startPicker=false;
          this.currentStartDateText=d.getFullYear()+"/"+(this.p(d.getMonth()+1));
        },
        endCancelClick(){//结束时间 取消事件
          this.endPicker=false;
        },
        endConfirmClick(d){//结束时间 确定事件
          this.endPicker=false;
          this.currentEndDateText=d.getFullYear()+"/"+(this.p(d.getMonth()+1));
        },
        p(s) {
          return s < 10 ? '0' + s : s
        },
       formatter(type, val) {
          if (type === 'year') {
            return `${val}年`;
          } else if (type === 'month') {
            return `${val}月`;
          }
          return val;
        },
        chooseAreaSheetClick(){
          this.areaShow = true;
        },
        onAreaSelect(item) {
          // 默认情况下点击选项时不会自动收起
          // 可以通过 close-on-click-action 属性开启自动收起
          this.areaShow = false;
          this.areaText=item.name;
          this.provinceText='';
          this.cityText='';
          this.currPList=[];
          this.currCList=[];
          this.resultDataList=[];
          if(item.name=='全国'){
            this.provinceDisabled=true;//省市选择关闭
            this.cityDisabled=true;//城市选择关闭
          }
         else{
            this.provinceDisabled=false;//省市选择开启
            this.cityDisabled=true;//城市选择关闭
            this.provinceActions=[];
            for(var i=0;i<pData.length;i++){
              this.provinceActions.push({name:pData[i].regionName,color:'',className:''});
            }
            item.name=='省市'?this.provinceActions=this.provinceActions.concat({name:'',color:'',className:''}):'';
          }
        },
        chooseProvinceSheetClick(event){
          this.provinceShow = true;
        },
        onProvinceSelect(item){
          var that=this;
          this.cityText='';
          if(this.areaText=="省市"){
            item.color=item.color==''?'#fabe00':'';
            item.className=((item.className.indexOf('active')!=-1)?'':'active');
            if(item.className=='active'){
              this.currPList.push(item.name);
            }else{
              this.currPList.remove(item.name);
            }
            this.currPList=this.currPList.unique(this.currPList);
          }
          else if(this.areaText=="城市"){
            this.provinceShow = false;//省市选择开启
            this.cityDisabled=false;//城市选择开启
            this.provinceText=item.name;
            this.cityActions=[];
            var currProvinceCity=[];
            pData.forEach((val)=>{
              if(val.regionName==item.name){
                currProvinceCity=val;
              }
            })
            if(currProvinceCity.children!=undefined){
              for(var k=0;k<currProvinceCity.children.length;k++){
                 this.cityActions.push({name:currProvinceCity.children[k].regionName,color:'',className:''});
              }
            }else{
              this.cityActions.push({name:currProvinceCity.regionName,color:'',className:''});//说明是直辖市
            }
           this.cityActions=this.cityActions.concat({name:'',color:''});
          }

        },
        chooseCitySheetClick(){
          this.cityShow = true;

        },
        onCitySelect(item){
          item.color=item.color==''?'#fabe00':'';
          item.className=((item.className.indexOf('active')!=-1)?'':'active');
          if(item.className=='active'){
            this.currCList.push(item.name);
          }else{
            this.currCList.remove(item.name);
          }
          this.currCList= this.currCList.unique(this.currCList);
        },
        onProvinceCancel(v){
           console.log(this.currPList);
          this.resultDataList=[];
           this.resultDataList=this.currPList;
        },
        onCityCancel(){
          console.log(this.currCList);
          this.resultDataList=[];
          this.resultDataList=this.currCList;
        },
        deleteCurrArea(item){
          this.resultDataList.remove(item);
        },
        retractableClick(){
          var currClass=document.getElementById("galaxyWarp").className;
          if(currClass.indexOf("close")>-1){
            document.getElementById("galaxyWarp").classList.add("open");
            document.getElementById("galaxyWarp").classList.remove("close");
          }else{
            document.getElementById("galaxyWarp").classList.add("close");
            document.getElementById("galaxyWarp").classList.remove("open");

          }
          console.log( document.getElementById("galaxyWarp").className );
        }
      }
    }
</script>

<style lang="scss" scoped>
  input, select {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
  }
  select{
       background-color:transparent;
       border: none;
       appearance: none;
       -moz-appearance: none;
       -webkit-appearance: none;
     }
  select::-ms-expand { display: none; }

    .galaxy {
      background: #fabe00;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      overflow: auto;
      position: relative;
      .galaxy-warp {
        position: relative;
        margin: auto;
        width: 95%;
        border-radius: 5px;
        background: white;
        margin-bottom: 1rem;
        padding-bottom: 2rem;
        margin-top: -6rem;
        height: 85%;
        transition: all 0.5s ease-out;
        .title {
          width: 100%;
          position: relative;
          top: 1rem;
          font-size: 36px;
          .line {
            position: absolute;
            background: #fabe00;
            left: 0;
            width: 5px;
            height: 2rem;
            top: 0;
            bottom: 0;
          }
          .desc {
            height: 70px;
            font-weight: bold;
            border-bottom: 0.5px solid #fabe00;
            padding-left: 0.5rem;
            width: 90%;
            margin: auto;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .item-type {
          width: 90%;
          top: 1rem;
          position: relative;
          min-height: 130px;
          margin: auto;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            display: inline-block;
            width: 48%;
            height: 100%;
            font-size: 28px;
            .name {
              display: inline-block;
              line-height: 140px;
            }
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 79%;
              height: 65px;
              display: inline-block;
              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              select {
                font-size: 28px;
                padding-left: 30px;
                width: 100%;
                height: 100%;
                display: inline-block;
              }
            }
          }
          .box:nth-child(1) {
            float: left;
          }
          .box:nth-child(2) {
            float: right;
          }
          .big-box {
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 100%;
              height: 65px;
              display: inline-block;
              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              select {
                padding-left: 10px;
                font-size: 28px;
                width: 100%;
                height: 100%;
                display: inline-block;
              }
            }
          }
        }
        .item-time {
          width: 90%;
          top: 1rem;
          position: relative;
          min-height: 130px;
          margin: auto;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 20px;
            display: inline-block;
            font-size: 28px;
            width: 100%;
            radio-name {
              width: 140px;
              height: 35px;
              display: inline-block;
            }
            .radio-option {
              display: inline-block;
              height: 35px;
              padding-left: 50px;
              img {
                vertical-align: middle;
                padding-right: 15px;
                height: 110%;
              }
              .text {
                display: inline-block;
              }
            }
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 150px;
              height: 65px;
              display: inline-block;
              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              select {
                padding-left: 10px;
                width: 100%;
                height: 100%;
                display: inline-block;
                font-size: 28px;
              }
            }
            .choose-time {
              width: 450px;
              height: 65px;
              float: right;
              display: block;
              .text {
                text-align: center;
                display: inline-block;
                width: 200px;
                height: 100%;
                line-height: 65px;
                background-color: #f9f9f9;
              }
              .time-line {
                background-color: #fabe00;
                height: 3px;
                width: 25px;
                vertical-align: middle;
                display: inline-block;
              }
            }
          }
        }
        .item-area{
          width: 90%;
          top: 1rem;
          position: relative;
          min-height: 130px;
          margin: auto;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 20px;
            display: inline-block;
            font-size: 28px;
            width: 100%;
            area-name {
              width: 140px;
              height: 35px;
              display: inline-block;
            }
            .cc {
              position: relative;
              background-color: #f9f9f9;
              width: 180px;
              height: 65px;
              display: inline-block;

              .select-arrow {
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 30%;
                pointer-events: none;
              }
              .select-sheet {
                font-size: 28px;
                padding-left: 10px;
                width: 100%;
                height: 100%;
                line-height: 2;
                display: inline-block;
                border: none;
                background-color: #f9f9f9;
              }
            }
          }
          .list-area{
            width: 100%;
            display: inline-block;
            font-size: 28px;
            max-height: 200px;
            overflow-y: auto;
            .list{
              display: inline-block;
              margin: 10px;
              padding: 5px;
              height: 60px;
              min-width: 150px;
              background-color: #fabe00;
              color: #000;
              text-align: center;
              line-height: 60px;
              border-radius: 10px;
              font-size: 28px;
              .icon{
                height: 50%;
                padding-left: 10px;
                vertical-align: middle;
              }
            }
          }
        }
        .item-user-form{
          width: 90%;
          top: 1rem;
          position: relative;
          margin: auto;
          margin-top: 5px;
          padding-bottom: 20px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 20px;
            display: inline-block;
            font-size: 28px;
            width: 100%;
            .user-attribute {
              width: 140px;
              height: 35px;
              display: inline-block;
            }
            .checked-option {
              display: inline-block;
              height: 35px;
              padding-left: 5px;
              padding-right: 20px;
              img {
                vertical-align: middle;
                padding-right: 15px;
                height: 110%;
              }
              .text {
                display: inline-block;
              }
            }
          }
        }
        .start-wrap{
          width: 550px;
          height: 105px;
          line-height: 105px;
          text-align: center;
          color: #000;
          background-color: #fabe00;
          margin: auto;
          margin-top: 50px;
          font-weight: bold;
          font-size: 40px;
        }
        .retractable-btn{
          width: 40px;
          height: 25px;
          margin: auto;
          margin-top: 30px;
          img{
            width: 100%;
          }
        }
      }
      .galaxy-warp.close{
        height: 200px;
      }
      .galaxy-warp.open{
        height: 85%;
      }
  }

</style>
<style>
  .van-picker{
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
  }
  .van-picker__cancel, .van-picker__confirm{
    color: #fabe00;
  }
  .van-action-sheet__cancel{
     position: fixed;
     bottom: 0;
    background-color: #fabe00;
    color: #000;
  }
</style>
