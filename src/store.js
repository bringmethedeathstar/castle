import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: '',
    host: '',
  },
  mutations: {
    setAddress(state, address) {
      state.address = address;
    },

    setHost(state, host) {
      state.host = host;
    },
  },
  actions: {},
});
