import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RoomDetails from "./views/RoomDetails.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/room/:id',
      component: RoomDetails
    },
  ]
})
