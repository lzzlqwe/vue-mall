import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
