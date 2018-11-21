import Vue from 'vue';
import Vuex from 'vuex';
import { homeUrl } from './helper';
const axios = require('axios');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('userId'),
    errorMessage: null,
    products: [],
    userLoggedIn: {}
  },
  
  getters: {
    productsAdded: state => {
      return state.products.filter(el => {
        return el.isAddedToCart;
      });
    },
    findProductById: (state) => (id) => {
      return state.products.find(product => product.Id == id);
    },
    isUserLoggedIn: (state) => {
      return state.isLoggedIn;
    },
    userLoggedIn: (state) => {
      return state.userLoggedIn;
    }
  },
  
  mutations: {
    addToCart: (state, data) => {
      data.product.isAddedToCart = true;
      data.product.totalInCart = data.total;
      state.products.push(data.product);
    },
    removeFromCart: (state, id) => {
      state.products.forEach((element, index, object) => {
        if (id === element.Id) {
          object.splice(index, 1); 
        }
      });
    },
    removeAllProductInCart: (state) => {
      state.products = [];
    },
    setErrorMessage: (state, errorMessage) => {
      state.errorMessage = errorMessage;
    },
    setUserLoggedIn: (state, data) => {
      state.isLoggedIn = data.isLoggedIn;
      state.userLoggedIn = data.user;
    },
    setUserData: (state, data) => {
      state.userLoggedIn = data.user;
    }
  },
  
  actions: {
    userLogin({ commit }, data) {
      axios.post(homeUrl + 'api/users/login', {
        Email: data.email,
        Password: data.password
      }).then((response) => {
          console.log(response)
          if (response.data.ErrorCode != 100) {
            commit('setErrorMessage', "");
            commit('setUserLoggedIn', {
              isLoggedIn: true,
              user: response.data.Data
            });
            localStorage.setItem('userId', response.data.Data.Id.toString());
          } else {
            commit('setErrorMessage', "Email and Password doesn't match");
          }
        }).catch((response) => {
          console.log(response);
        })
    },
    userLogout({ commit }) {
      localStorage.removeItem('userId');
      commit('setUserLoggedIn', { isLoggedIn: false });
    },
    getUserLoggedInData({ commit }) {
      let userId = localStorage.getItem('userId');
      axios.get(homeUrl + 'api/users/' + userId)
        .then((response) => {
          if (response.data.ErrorCode == 0) {
            commit('setUserData', {
              user: response.data.Data
            });
          }
        });
    }
  },
});
