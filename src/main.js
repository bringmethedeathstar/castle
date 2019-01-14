import Vue from 'vue';
import Castle from './Castle.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Castle),
}).$mount('#castle');
