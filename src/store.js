import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    errorMessage: null,
    products: []
    // products: [
    //   {
    //     id: 1,
    //     title: 'Product 1',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //     price: 50000,
    //     ratings: 3,
    //     reviews: 5,
    //     isAddedToCart: false,
    //     totalInCart: 0
    //   },
    //   {
    //     id: 2,
    //     title: 'Product 2',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //     price: 35000,
    //     ratings: 5,
    //     reviews: 10,
    //     isAddedToCart: false,
    //     totalInCart: 0
    //   },
    //   {
    //     id: 3,
    //     title: 'Product 3',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //     price: 110000,
    //     ratings: 2,
    //     reviews: 3,
    //     isAddedToCart: false,
    //     totalInCart: 0
    //   },
    //   {
    //     id: 4,
    //     title: 'Product 4',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //     price: 50000,
    //     ratings: 1,
    //     reviews: 0,
    //     isAddedToCart: false,
    //     totalInCart: 0
    //   },
    //   {
    //     id: 5,
    //     title: 'Product 5',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //     price: 35000,
    //     ratings: 4,
    //     reviews: 2,
    //     isAddedToCart: false,
    //     totalInCart: 0
    //   },
    //   {
    //     id: 6,
    //     title: 'Product 6',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //     price: 110000,
    //     ratings: 5,
    //     reviews: 1,
    //     isAddedToCart: false,
    //     totalInCart: 0
      // }
    // ],
  },
  
  getters: {
    productsAdded: state => {
      return state.products.filter(el => {
        return el.isAddedToCart;
      });
    },
    findProductById: (state) => (id) => {
      return state.products.find(product => product.Id == id);
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
    setErrorMessage: (state, errorMessage) => {
      state.errorMessage = errorMessage;
    }
  },
  
  actions: {
    userLogin({ commit }, data) {
      axios.post('http://localhost:8080/login')
        .then((response) => {
          if (response.data.ErrorCode != 100) {
            localStorage.setItem('isLoggedIn', true);
          } else {
            commit('setErrorMessage', "Email and Password doesn't match");
          }
        }).catch((response) => {
          console.log(response);
        })
    }
  },
});
