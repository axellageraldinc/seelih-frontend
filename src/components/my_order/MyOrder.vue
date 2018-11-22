<template>
    <h2>My Orders</h2>    
</template>

<script>
import { homeUrl } from '../../helper.js';
const axios = require('axios');

export default {
   name: 'my-order',
   
   data() {
       return {
           orders: []
       };
   },

   computed: {
       userLoggedIn: function() {
           return this.$store.getters.userLoggedIn;
       }
   },

   mounted() {
      axios.get(homeUrl + 'api/users/' + userLoggedIn.Id + '/orders')
        .then((response) => {
            this.orders = response.data.Data;
        });
   }

}
</script>
