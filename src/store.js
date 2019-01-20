import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'search',
    url: '',
    host: '',
    search: '',
    tax: [],
    place: {
      // title: '',
      images: [],
      address: '',
      postcode: '',
      price: 0,
      rooms: 0,
      type: '',
      pets: null,
      propertyId: '',
      description: '',
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

    setTax(state, tax) {
      state.tax = tax;
    },
  },

  actions: {
    mode({ commit }, mode) {
      commit('setMode', mode);
    },

    search({ commit }, { url, host }) {
      commit('setMode', false);
      commit('setHost', host);
      commit('setUrl', url);
      commit('setSearch');
    },

    async place({ commit }, place) {
      let res = await axios.get(
        '.netlify/functions/fetch?url=' +
          encodeURIComponent(
            `http://www.mycounciltax.org.uk/results?postcode=${place.postcode}`
          )
      );

      let r = /<td( align="center")?>(.+?)<\/td>/g;

      let tax = res.data
        .replace(/\r?\n|\r/g, '')
        .match(/<tr>.+?<\/tr>/g)
        .map(row => {
          let match = row.match(r);

          if (match) {
            return match.map(col =>
              col
                .replace(r, '$2')
                .replace(/^\s|\s$/g, '')
                .replace('&pound;', '')
            );
          }
        })
        .filter(t => typeof t !== 'undefined')
        .map(item => ({
          number: item[0].replace(/(.+?),.*/, '$1'),
          address: item[0],
          band: item[1],
          year: parseInt(item[2]),
          month: Math.ceil(item[2] / 12),
        }));

      commit('setTax', tax);
      commit('setPlace', place);
      commit('setMode', 'edit');
    },
  },
});
