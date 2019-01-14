import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: '',
    host: '',
  },
  mutations: {
    setUrl(state, url) {
      state.url = url;
    },

    setHost(state, host) {
      state.host = host;
    },
  },
  actions: {},
});
