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
            <h2 v-if="route == '/user/profile'">My Profile</h2>
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
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    display: flex;
}
.sidenav {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 180px;
    background-color: rgb(31, 144, 214);
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
}
</style>

