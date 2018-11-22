<template>
   <h2>My Products</h2>
</template>

<script>
import { homeUrl } from '../../helper.js';
const axios = require('axios');

export default {
   name: 'my-product',
   
   data() {
       return {
           products: []
       };
   },

   computed: {
       userLoggedIn: function() {
           return this.$store.getters.userLoggedIn;
       }
   },

   mounted() {
    //   axios.get(homeUrl + 'api/users/' + userLoggedIn.Id + '/orders')
    //     .then((response) => {
    //         this.order = response.data.Data;
    //     }) 
   }

}
</script>
