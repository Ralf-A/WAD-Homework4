// store.js
import { createStore } from 'vuex';
import createModule from './create';
import fetchModule from './fetch';
import updateModule from './update';
import deleteModule from './delete';
import mutations from './mutations'; // Adjust the path accordingly

export default createStore({
  modules: {
    createModule,
    fetchModule,
    updateModule,
    deleteModule,
  },
  mutations, // Include the mutations
  state: {
    posts: [], // Assuming you have a 'posts' array in your state
  },
});
