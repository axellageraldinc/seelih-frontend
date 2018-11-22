<template>
    <section class="profile">
        <div class="sidenav">
            <router-link :to="{ path: '/user/products', name: 'my-product' }">
                <a>My Product</a>
            </router-link>
            <router-link :to="{ path: '/user/orders', name: 'my-order' }">
                <a>My Order</a>
            </router-link>
        </div> 
        <div class="main">
            <h2>My Profile</h2>
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
    }
}
</script>

<style lang="scss" scoped>
.profile {
    display: flex;
    padding: 100px;
}
.sidenav {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 150px;
    background-color: rgb(46, 149, 212);
}
.sidenav a {
    display: block;
    color: white;
}
</style>

