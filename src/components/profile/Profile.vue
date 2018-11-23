<template>
    <section class="profile">
        <div class="sidenav">
            <router-link :to="{ path: '/user/profile', name: 'profile' }" v-bind:class="{ active: route == '/user/profile' }">
                My Profile
            </router-link>
            <router-link :to="{ path: '/user/products', name: 'my-product' }" v-bind:class="{ active: route == '/user/products' }">
                My Product
            </router-link>
            <router-link :to="{ path: '/user/orders', name: 'my-order' }" v-bind:class="{ active: route == '/user/orders' }">
                My Order
            </router-link>
        </div> 
        <div class="main">
            <div v-if="route == '/user/profile'">
                <h1 class="title">My Profile</h1>
                <p>Name: {{ userLoggedIn.Fullname }}</p><br>
                <p>Email: {{ userLoggedIn.Email }}</p><br>
                <p>Phone: {{ userLoggedIn.Phone }}</p><br>
                <p>Fulladdress: {{ userLoggedIn.Fulladdress }}</p><br>
            </div>
            <router-view v-else></router-view>
        </div>
    </section>
</template>

<script>
import MyOrder from '../my_order/MyOrder';
import MyProduct from '../my_product/MyProduct';

export default {
    name: 'profile',

    components: {
        'my-order': MyOrder,
        'my-product': MyProduct
    },

    data() {
        return {
            user: {}
        };
    },

    computed: {
        route: function() {
            return this.$route.path;
        },
        userLoggedIn: function() {
            return this.$store.getters.userLoggedIn;
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 21px;
    font-weight: bold;
}
.subtitle {
    font-size: 15px;
    font-weight: 500;
}
.profile {
    display: flex;
}
.sidenav {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 180px;
    background-color: rgb(81, 186, 252);
    overflow: auto;
    padding: 0;
    margin: 0;
}
.sidenav a {
    display: block;
    color: white;
    padding: 16px;
    text-decoration: none;
}
.sidenav a.active {
    color: rgb(46, 149, 212);
    background-color: rgb(248, 248, 248);
}
.sidenav a:hover:not(.active) {
    color: rgb(78, 78, 78);
    background-color: white;
}
.main {
    padding: 15px;
    width: 100vw;
}
</style>

