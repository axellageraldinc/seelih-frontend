<template>
    <div :class="[ isLoginActive ? 'is-active' : '', 'modal' ]">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ modalTitle }}</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
                <p>{{ errorMessage }}</p>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email" v-model="input.email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="input.password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    </p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="login()">{{ primaryBtnLabel }}</button>
            </footer>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'login-component',
    props: ['isLoginActive'],

    data () {
        return {
            modalTitle: 'Log in',
            primaryBtnLabel: 'Log in',
            input: { 
                email: '',
                password: ''
            },
        }
    },

    computed: {
        errorMessage: function() {
           return this.$store.state.errorMessage; 
        },
        isLoggedId: function() {
            return this.$store.getters.isUserLoggedIn;
        }
    },

    watch: {
        isLoggedId(newStatus, oldStatus) {
            if (newStatus) {
                this.closeModal();
            }
        }
    },

    methods: {
        closeModal () {
            this.$emit('update:isLoginActive', false);
        },
        login() {
            this.$store.dispatch('userLogin', {
                email: this.input.email,
                password: this.input.password
            });
        }
    }
}
</script>

