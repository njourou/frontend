// src/store/index.js
import { createStore } from 'vuex';
import axios from '../plugins/axios';

export default createStore({
  state: {
    admin: null,
  },
  mutations: {
    setAdmin(state, adminData) {
      state.admin = adminData;
    },
    clearAdmin(state) {
      state.admin = null;
    },
  },
  actions: {
    async fetchAdminData({ commit }) {
      try {
        const response = await axios.get('/admin/data');
        commit('setAdmin', response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('authToken');
      commit('clearAdmin');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.admin,
    getAdmin: (state) => state.admin,
  },
});
