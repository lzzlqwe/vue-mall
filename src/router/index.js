import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'home',
    component: () => import( '@/views/ProductsView.vue')
  },

  {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import( '@/views/SignInView.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
