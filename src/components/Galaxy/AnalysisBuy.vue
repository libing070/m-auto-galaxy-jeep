<template>
  <div>交叉购买考虑
    <van-cell title="选择日期区间" :value="date" @click="show = true" />
    <van-calendar
      v-model="show"
      :min-date="minDate"
      :max-date="maxDate"
      type="range"
      @confirm="onConfirm" />

    <van-cell title="选择日期区间2" :value="date" @click="openMyCalendar" />


    <my-calendar v-show="mycalendarshow"
                 :min-date="myminDate"
                 :max-date="mymaxDate"
                 :current-startdate="currentStartDate"
                 :current-enddate="currentEndDate"

    ></my-calendar>
  </div>
</template>

<script>
  import MyCalendar from "../common/MyCalendar";

  export default {
      components: {
        MyCalendar,
      },
        name: "analysis-buy",//交叉购买考虑
      data () {
        return {

          date: '',
          mycalendarshow:false,
          show: false,
          myminDate: new Date(2018, 7, 1),
          mymaxDate: new Date(2020, 4, 31),
          currentStartDate: new Date(2018, 11, 3),//从月份0开始 表示12月
          currentEndDate: new Date(2020, 1, 3),//从月份0开始

          minDate: new Date(2018, 0, 1),
          maxDate: new Date(2020, 0, 31),
        }
      },
      created(){
      var  target=  this.$route.query.target;
      console.log(target);
      },
    watch:{
      '$store.state.mycalendarshow': function () {
        this.mycalendarshow= this.$store.state.mycalendarshow;
      }
    },
      methods:{

        openMyCalendar(){
          $("body").find("#mycalendar").addClass("open");
          console.log($("body").find("#mycalendar").attr("class"));
          this.$store.commit('changeMyCalendar',true);
          this.mycalendarshow= this.$store.state.mycalendarshow;
        },
        formatDate(date) {
          return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
          const [start, end] = date;
          this.show = false;
          this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
      }
    }
</script>

<style lang="scss" scoped>

</style>
