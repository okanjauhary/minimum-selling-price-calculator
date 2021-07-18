import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    history: []
  },
  getters: {
    getTotalHistory(state) {
      return state.history.length;
    }
  },
  mutations: {
    setHistory(state, payload) {
      const filteredAndUpdated = [];

      for (const item of state.history) {
        if (item.product.name.toLowerCase() === payload.product.name.toLowerCase()) {
          continue;
        }

        filteredAndUpdated.unshift(item);

        if (filteredAndUpdated.length >= 9) {
          break;
        }
      }

      filteredAndUpdated.unshift({ ...payload });
      state.history = filteredAndUpdated;
    }
  },
  plugins: [vuexLocal.plugin]
})
