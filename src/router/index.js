import Vue from 'vue'
import Router from 'vue-router'
const SignIn = resolve => require(['@/components/Home'], resolve)

import Dimensions from '@/components/Dimensions/index'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sign-in',
      component: SignIn,
      meta: {
        permission: false
      }
    },
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dimensions',
      name: 'Dimensions',
      component: Dimensions
    }
  ]
})
