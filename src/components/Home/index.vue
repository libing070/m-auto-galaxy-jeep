<template>
  <div class="page-sign-in">
    <div class="top">
      <div class="lang-box">
        <span :class="['item',{lang:true, active:curLang === 'en'}]" data-type="en" @click="toggleLang">EN</span>
        <span :class="['item',{lang:true, active:curLang === 'zh'}]" data-type="zh" @click="toggleLang">中文</span>
      </div>
      <div class="logo-img">
        <img
          src="data:image/png;base64,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"
          alt
          class="logo"
        >
      </div>
      <div class="desc">{{this.$t('login.introduction')}}</div>
      <div class="sponsor">Version 1.1</div>
    </div>
    <div class="login-input">
      <div class="title">{{this.$t('login.welcome')}}</div>
      <div class="username"><input v-model="username" class="username-input" type="text" :placeholder="this.$t('login.name_label')"></div>
      <div class="password"><input v-model="password" class="password-input" type="password" :placeholder="this.$t('login.password_label')"></div>
      <div class="forget-pwd" @click="forgetPwd">{{this.$t('login.forget_password')}}</div>
      <div class="login-btn" @click="loginSystem">{{this.$t('login.button')}}</div>
    </div>
    <div class="end">
      <span class="item">{{this.$t('login.bottom1')}}</span>
      <span class="item">{{this.$t('login.bottom2')}}</span>
      <span class="item">{{this.$t('login.bottom3')}}</span>

    </div>
  </div>
</template>

<script>
    export default {
        name: "SignIn",//登录页面
      data () {
        return {
          msg: '',
          username: "",
          password: ""
        }
      },
      computed: {
        curLang() {
          return this.$i18n.locale;
        }
      },
      created () {
          console.log("login"+this.$i18n.locale);
      },
      methods:{
        loginSystem(){
          var that=this;
          if(this.username===""){
            this.$toast(that.$t("login.name_tip[0]"));
          }else if(this.password===""){
            this.$toast(that.$t("login.password_tip"));
          }else{
            this.$axios
              .post("v2/login", {
                username: this.username,
                password: this.password
              })
              .then(res => {
                if (res.data.status === 1) {
                  localStorage.hasLogin = true;
                  localStorage.isSuperAdmin = res.data.data.isAdmin;
                  localStorage.name = res.data.data.username;
                  localStorage.UserPhone = res.data.data.username;
                  this.$router.push("/dimensions");
                } else {
                  this.$toast(res.data.msg);
                }
              });

          }
        },
        toggleLang(e) {
          this.$i18n.locale = e.target.dataset.type;
          localStorage.lang = e.target.dataset.type;
        },
        forgetPwd(){
          this.$dialog.alert({
            title: '提示',
            message: '请联系市场部数字智能营销团队孙玮颢'
          }).then(() => {
            // on close
          });
        }
      }
    }
</script>

<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
  }
.page-sign-in{
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
    height: 480px;
    .lang-box{
      position:absolute;
      right: 4rem;
      top: 1rem;
       width: 4rem;
      color: #fff;
      font-size: 0.8rem;
      .item{
        display:inline-block;
      }
      .item:nth-child(1){
        border-right:1px solid  #fabe00;
        padding-right: 0.3rem;
      }
      .item.active{
        color: #fabe00;
      }
    }
    .logo-img{
      position:absolute;
      top: 3.6rem;
      left: 3rem;
      width: 6rem;
      img{
        width: 100%;
      }
    }
    .desc{
      position:absolute;
      top: 6.5rem;
      left: 3rem;
      color: #fff;
      font-size: 75px;
    }
    .sponsor{
      position:absolute;
      right: 1rem;
      bottom: 3rem;
      color: #fff;
      font-size: 24px;
    }
  }
  .login-input{
    background-color: #fff;
    width: 710px;
    height: 780px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 12.5rem;
    z-index: 2;
    border-radius: 5px;
    .title{
      border-left: 5px solid #000;
      font-weight: bold;
      width: 90%;
      margin: auto;
      margin-top: 1rem;
      padding-left: 0.3rem;
      line-height: 1.5rem;
      font-size: 36px;
    }
    .username,.password{
      font-size: 36px;
      height: 3.8rem;
      width: 90%;
      margin: auto;
      margin-top: 1rem;
      border-bottom: 1px solid #989898;
      .username-input,.password-input{
         height: 3.8rem;
        color: #919191;
         width: 100%;
          border: 0;  // 去除未选中状态边框
          outline: none; // 去除选中状态边框
          background-color: rgba(0, 0, 0, 0);// 透明背景

      }
    }
    .forget-pwd{
      width: 90%;
      margin: auto;
      text-align: right;
      margin-top: 0.5rem;
      font-size:28px;
      color: #919191;
    }
    .login-btn{
      height: 103px;
      width: 552px;
      margin: auto;
      background-color: #fabe00;
      color: #000;
      font-weight: bold;
      text-align: center;
      font-size:36px;
      line-height: 103px;
      margin-top: 3.5rem;

    }
  }
  .end{
    position: absolute;
    z-index: 3;
    bottom: 60px;
    width: 15rem;
    left:0;
    right:0;
    margin: auto;
    color: #000;
    font-size: 24px;
    text-align: center;
    .item{
      display:inline-block;

    }
    .item:nth-child(2){
      border-left:1px solid  #000;
      border-right:1px solid  #000;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }
  }

}
</style>
<style>
  .van-dialog{
    width: 18rem !important;
  }
</style>
