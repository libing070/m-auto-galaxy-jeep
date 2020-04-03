// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './libs/rem.js';
import router from './router'
import axios from 'axios'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.$axios = axios


// 导入资源文件
import {i18n, vantLocales} from './lang'
console.log('当前的语言是：', i18n.locale)
// vant-ui组件国际化
vantLocales(i18n.locale)

console.log('main.js文件温馨提示：', i18n.messages[i18n.locale].app.hello)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
