import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'blank',
    url: '',
    host: '',
    search: '',
    place: {
      title: '',
      address: '',
      postcode: '',
      price: 0,
      rooms: 0,
      type: '',
      pets: null,
      propertyId: '',
    },
  },

  mutations: {
    setMode(state, mode) {
      state.mode = mode;
    },

    setUrl(state, url) {
      state.url = url;
    },

    setHost(state, host) {
      state.host = host;
    },

    setSearch(state) {
      state.search = Date.now();
    },

    setPlace(state, place) {
      state.place = place;
    },
  },

  actions: {
    mode({ commit }, mode) {
      commit('setMode', mode);
    },

    search({ commit }, url) {
      commit('setMode', 'wait');

      commit('setUrl', url);

      commit(
        'setHost',
        url
          .replace(/.*:\/\//, '')
          .replace('www.', '')
          .split('.')[0]
      );

      commit('setSearch');
    },

    place({ commit }, place) {
      commit('setMode', 'edit');

      commit('setPlace', place);
    },
  },
});
