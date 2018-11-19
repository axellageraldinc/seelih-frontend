<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-third">
        <figure class="levle-item image">
          <img src="https://placeimg.com/400/200/any">
        </figure>
      </div>
      <div class="column is-two-third">
        <h2 class="title is-4">{{ product.title }}</h2>
        <span class="title is-5"><strong>Rp {{ product.price }}</strong></span>
        <div class="plus-minus-button">
          <i class="fa fa-minus button button-minus" v-on:click="minus"></i>
          <input type="number" class="quantity" :disabled="product.isAddedToCart" v-model="quantity"/>
          <i class="fa fa-plus button button-plus" v-on:click="plus"></i>
        </div>
        <div class="is-pulled-right">
          <button class="button is-primary" v-if="!product.isAddedToCart" v-on:click="addToCart(product.id, quantity)">Add to Cart</button>
          <button class="button is-primary" v-else v-on:click="removeFromCart(product.id)">Remove from Cart</button>
        </div>
      </div>
    </div>
    <h2><strong>Product Detail</strong></h2>
    <div class="box__details row">
      <div class="box__details__description">
        <h3>Description</h3>
        <p>{{ product.description }}</p>
      </div>
      <div>
        <h3>Other Information</h3>
        <p class="other-details">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque aut nihil, nostrum, ea eius praesentium totam temporibus ratione dolore rerum, neque magni quia maiores blanditiis dignissimos fugiat perspiciatis numquam? Facere?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-detail',
  props: ['id', 'img', 'price', 'description'],
  data: function() {
    return {
      sectionTitle: 'Product Detail',
      product: this.$store.getters.findProductById(this.$props.id),
      quantity: 1,
    };
  },
  methods: {
    plus: function() {
      if (!this.product.isAddedToCart) {
        this.quantity += 1;
      }
    },
    minus: function() {
      if (this.quantity > 1 && !this.product.isAddedToCart) {
        this.quantity -= 1;
      }
    },
    addToCart: function(id, total) {
      this.$store.commit('addToCart', {
        id: id,
        total: total
      });
    },
    removeFromCart(id) {
      this.$store.commit('removeFromCart', id);
    },
  }
};
</script>

<style lang="scss" scoped>
.plus-minus-button {
  margin-top: 10px;
}
.quantity {
  max-width: 60px;
  text-align: center;
  outline: 0;
  border-width: 0 0 2px;
  border-color: blue;
  margin: 0px 10px;
  -moz-appearance:textfield; 
}
.quantity:focus {
  border-color: green
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.row {
  display: flex;
  margin: 5px 0;
}
h2 {
  font-size: 140%;
}
h3 {
  font-size: 120%;
  font-weight: bold;
}
</style>
