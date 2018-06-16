// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import { AjaxPlugin } from 'vux'
import { ConfigPlugin } from 'vux'
import App from './App.vue'
import Home from './components/Home.vue'
import JwBind from './components/JwBind.vue'
import Grade from './components/Grade.vue'
import Course from './components/Course.vue'
import BookSearch from './components/BookSearch.vue'
import BookList from './components/BookList.vue'
import BookPosition from './components/BookPosition.vue'
import LibBind from './components/LibBind.vue'
import Borrow from './components/Borrow.vue'


Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(infiniteScroll)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})

Vue.prototype.BASE_URL = 'http://cark.mynatapp.cc'
Vue.prototype.AUTHORIZE_URL = 'http://cark.mynatapp.cc/wechat/authorize?returnUrl=http://fbne8d.natappfree.cc'

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: Home
},{
  path: '/jwBind',
  component: JwBind
}, {
  path: '/grade',
  component: Grade
}, {
  path: '/course',
  component: Course
} ,{
  path: '/bookSearch',
  component: BookSearch
},{
  path: '/bookList',
  component: BookList
},{
  path: '/bookPosition',
  component: BookPosition
},{
  path: '/libBind',
  component: LibBind
},{
  path: '/borrow',
  component: Borrow
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
