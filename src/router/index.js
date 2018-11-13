import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index.vue'
import room from '@/views/room/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/room',
      name: 'room',
      component: room
    }
  ]
})
