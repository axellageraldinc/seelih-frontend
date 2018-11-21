<template>
    <div :class="[ isCheckoutActive ? 'is-active' : '', 'modal' ]">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ modalTitle }}</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
                <div class="box" v-for="product in products" :key="product.id">
                    <p>{{ product.Name }}</p>
                    <p>Rp {{ product.PricePerItemPerDay * product.totalInCart}}</p>
                    <p>{{ product.totalInCart }} pcs</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button v-if="user && products.length > 0" @click="placeOrder()" class="button is-success">{{ primaryBtnLabel }}</button>
            </footer>
        </div>
    </div>
</template>

<script>
import { homeUrl } from "../../helper.js";
const axios = require('axios');

export default {
    name: 'checkout-component',
    props: ['isCheckoutActive'],
    
    data () {
        return {
            modalTitle: 'Checkout',
            primaryBtnLabel: 'Next'
        }
    },

    computed: {
        products () {
            return this.$store.getters.productsAdded;
        },
        user() {
            if (this.$store.getters.userLoggedIn) {
                return this.$store.getters.userLoggedIn;
            } else {
                return null;
            }
        }
    },

    methods: {
        closeModal () {
            this.$emit('update:isCheckoutActive', false);
        },
        placeOrder() {
            let self = this;
            this.products.forEach(element => {
               axios.post(homeUrl + 'api/orders', {
                   ProductId: element.Id,
                   BorrowerId: self.user.Id,
                   Quantity: element.totalInCart,
                   Duration: 1,
                   DeliveryType: 'PICKED_UP_BY_BORROWER'
               }).then((response) => {
                   if (response.data.ErrorCode == 0) {
                        self.$store.commit('removeAllProductInCart');
                        self.closeModal();
                   }
               });
            });
        }
    }
}
</script>

