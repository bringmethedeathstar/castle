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

      let tax = res.data
        .replace(/\r?\n|\r/g, '')
        .match(/<tr>.+?<\/tr>/g)
        .map(row => {
          let match = row.match(/<td( align="center")?>.+?<\/td>/g);

          if (match) {
            return match.map(col =>
              col
                .replace(/<td( align="center")?>(.+?)<\/td>/g, '$2')
                .replace(/^\s|\s$/g, '')
                .replace('&pound;', '')
            );
          }
        });

      commit('setTax', tax.filter(t => typeof t !== 'undefined'));
      commit('setPlace', place);
      commit('setMode', 'edit');
    },
  },
});
