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
    },
    getNotVisibleHistory(state) {
      return state.history.filter(h => !h.visible).length
    }
  },
  mutations: {
    setHistory(state, payload) {
      const filteredAndUpdated = [];

      for (const item of state.history) {
        if (item.product.name.toLowerCase() === payload.product.name.toLowerCase()) {
          continue;
        }

        filteredAndUpdated.push(item);

        if (filteredAndUpdated.length >= 9) {
          break;
        }
      }

      filteredAndUpdated.unshift({ ...payload });
      state.history = filteredAndUpdated;
    },
    setAllHistoryVisible(state) {
      state.history = state.history.map(h => ({
        ...h, visible: true
      }))
    },
    clearHistory(state) {
      state.history = []
    }
  },
  plugins: [vuexLocal.plugin]
})
