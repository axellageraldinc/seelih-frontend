import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    products: [
      {
        id: 1,
        title: 'Product 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 50000,
        ratings: 3,
        reviews: 5,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 35000,
        ratings: 5,
        reviews: 10,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 3,
        title: 'Product 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 110000,
        ratings: 2,
        reviews: 3,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 4,
        title: 'Product 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 50000,
        ratings: 1,
        reviews: 0,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 5,
        title: 'Product 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 35000,
        ratings: 4,
        reviews: 2,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 6,
        title: 'Product 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 110000,
        ratings: 5,
        reviews: 1,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 7,
        title: 'Product 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 50000,
        ratings: 5,
        reviews: 7,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 8,
        title: 'Product 8',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 35000,
        ratings: 3,
        reviews: 0,
        isAddedToCart: false,
        totalInCart: 0
      },
      {
        id: 9,
        title: 'Product 9',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        price: 110000,
        ratings: 4,
        reviews: 2,
        isAddedToCart: false,
        totalInCart: 0
      },
    ],
  },
  
  getters: {
    productsAdded: state => {
      return state.products.filter(el => {
        return el.isAddedToCart;
      });
    },
    findProductById: (state) => (id) => {
      return state.products.find(product => product.id == id);
    }
  },
  
  mutations: {
    addToCart: (state, data) => {
      state.products.forEach(element => {
        if (data.id === element.id) {
          element.isAddedToCart = true;
          element.totalInCart = Number(data.total);
        }
      });
    },
    removeFromCart: (state, id) => {
      state.products.forEach(element => {
        if (id === element.id) {
          element.isAddedToCart = false;
          element.totalInCart = 0;
        }
      });
    }
  },
  
  actions: {

  },
});
