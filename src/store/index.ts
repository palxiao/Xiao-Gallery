import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import base from './modules/base'
// import xxx from './modules/xxxxx'

const store = new Vuex.Store({
  ...base,
  modules: {
    // xxx
  }
});

export default store
