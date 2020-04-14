<template>
   <div class="galaxy">
    <top-bar :isshowBackbtn="true"></top-bar>
    <div class="galaxy-warp">
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
            <select>
              <option>全国</option>
              <option>省市</option>
              <option>城市</option>
            </select>
          </div>
          <div class="cc" style="margin: 0 15px">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select>
              <option>全国</option>
              <option>省市</option>
              <option>城市</option>
            </select>
          </div>
          <div class="cc">
            <img class="select-arrow" :src="require('../../assets/img/select.png')">
            <select>
              <option>全国</option>
              <option>省市</option>
              <option>城市</option>
            </select>
          </div>
        </div>
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

    </div>

</template>

<script>
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
          currentEndDateText:'结束日期'
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
            margin-top: 40px;
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
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
          .box {
            margin-top: 40px;
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
              width: 190px;
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
                padding-left: 10px;
                width: 100%;
                height: 100%;
                display: inline-block;
              }
            }
          }
        }
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
</style>
