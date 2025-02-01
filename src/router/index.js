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

  {
    path: '/sign_up',
    name: 'sign_up',
    component: () => import( '@/views/SignUpView.vue')
  },

  {
    path: '/shopping_cart',
    name: 'shopping_cart',
    component: () => import( '@/views/ShoppingCartView.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
