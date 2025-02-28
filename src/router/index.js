// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductsView from '@/views/ProductsView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';
import SubmitOrderView from '@/views/SubmitOrderView.vue';
import PaymentView from '@/views/PaymentView.vue';
import OrderListView from '@/views/OrderListView.vue';
import ChatView from '@/views/ChatView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: ProductsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: SignInView,
    meta: { requiresAuth: false }
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: SignUpView,
    meta: { requiresAuth: false }
  },
  {
    path: '/shopping_cart',
    name: 'shopping_cart',
    component: ShoppingCartView,
    meta: { requiresAuth: true }
  },
  {
    path: '/submit_order',
    name: 'submit_order',
    component: SubmitOrderView,
    meta: { requiresAuth: true }
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView,
    meta: { requiresAuth: true }
  },
  {
    path: '/order_list',
    name: 'order_list',
    component: OrderListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/home'
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next({ name: 'sign_in' });
  } else {
    next();
  }
});

export default router;