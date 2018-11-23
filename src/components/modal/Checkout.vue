<template>
    <div :class="[ isCheckoutActive ? 'is-active' : '', 'modal' ]">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ modalTitle }}</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
                <p class="error-message">{{ errorMessage }}</p>
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
            primaryBtnLabel: 'Next',
            errorMessage: '',
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
            this.errorMessage = '';
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
                   self.handleResponse(response);
                   if (response.data.ErrorCode == 0) {
                        self.$store.commit('removeAllProductInCart');
                        self.closeModal();
                   }
               });
            });
        },
        handleResponse(response) {
            let self = this;
            switch (response.data.ErrorCode) {
                case 120:
                    self.errorMessage = 'Product is not available for renting';
                    break;
                case 121:
                    self.errorMessage = 'Rent duration exceeds form the borrower terms';
                    break;
                case 122:
                    self.errorMessage = 'Product is not available';
                    break;
                case 123:
                    self.errorMessage = 'Quantity request exceeds from the borrower terms';
                    break;
                case 124:
                    self.errorMessage = 'Borrower is not available';
                    break;
                case 125:
                    self.errorMessage = 'Requested rent duration doesn\'t meet the borrower terms';
                    break;
                case 126:
                    self.errorMessage = 'You can\'t borrow your own product';
                    break;
                default:
                    self.errorMessage = '';
                    self.$store.commit('removeAllProductInCart');
                    self.closeModal();
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.error-message {
    text-align: center;
    color: rgb(219, 36, 36);
}
</style>
