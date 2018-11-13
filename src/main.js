// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(VueSocketio, socketio('ws://127.0.0.1:8899'))
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name === 'home') {
    next()
  } else {
    if (!localStorage.getItem('chatuser')) { // 判断当前用户是否存在
      alert('请先登录')
      next('/')
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
