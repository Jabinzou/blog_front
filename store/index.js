import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
const globalState = {
  articleList: {
    count: 0,
    list: []
  }
};
Vue.use(Vuex);

export default function createStore () {
  return new Vuex.Store({
    state: globalState,
    actions,
    mutations,
    getters
  });
};
