<template>
  <div class="columns is-centered is-multiline">
      <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="product.ImageUrl" :alt="product.Name">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ product.Name }}</p>
            </div>
          </div>
          <div class="content is-clearfix">
            <!-- <p>{{ product.description }}</p>
            <div class="is-pulled-left">
              <span v-html="renderProductRating(product)"></span>
              <p>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</p>
            </div> -->
            <p class="is-pulled-right"><span class="title is-4"><strong>Rp {{ product.PricePerItemPerDay }}</strong></span></p>
          </div>
          <div class="card-footer btn-actions">
            <div class="card-footer-item">
              <button class="button is-primary" v-if="!product.isAddedToCart" @click="addToCart(product, 1)">Add to cart</button>
              <button class="button is-text" v-else-if="product.isAddedToCart" @click="removeFromCart(product)">Remove from cart</button>
              <router-link :to="{ path: '/product-detail', name: 'product-detail', params: { id: product.Id } }">
                <button class="button is-primary is-inverted">Details</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ProductDetail from '../product_detail/ProductDetail';

const axios = require('axios');

export default {
  name: 'products-list',
  
  components: {
    'product-detail': ProductDetail
  },
  
  data() {
    return {
      id: '',
      products: []
    };
  },

  mounted() {
    axios.get('http://localhost:8080/api/products')
      .then((response) => {
        let products = response.data.Data.filter(el => {
          if (this.$store.getters.findProductById(el.Id)) {
            el.isAddedToCart = true;
            return el;
          }
        })
        this.products = response.data.Data;
      });
  },

  methods: {
    addToCart(product, total) {
      this.$store.commit('addToCart', {
        product: product,
        total: total
      });
      this.$forceUpdate()
    },
    removeFromCart(product) {
      delete product.isAddedToCart;
      delete product.totalInCart;
      this.$store.commit('removeFromCart', product.Id);
      this.$forceUpdate()
    },
    renderProductRating(product) {
      let ratingTag = '';
      for (let i=0;i<product.ratings;i++) {
        ratingTag += '<i class="fa fa-star"></i>';
      }
      return ratingTag;
    }
  }

};
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
