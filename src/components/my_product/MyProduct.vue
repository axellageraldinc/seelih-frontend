<template>
    <section>
        <h1 class="title">My Products</h1>
        <h2 class="subtitle">Upload Product</h2>
        <p class="error-message">{{ errorMessage }}</p>
        <form v-on:submit.prevent class="form-upload">
            <label for="Name">Product Name</label><br>
            <input v-model="input.name" type="text" name="Name" class="input" placeholder="Name of Product"><br>
            <label for="Description">Description</label><br>
            <textarea v-model="input.description" name="Description" class="input" placeholder="Description of Product" cols="30" rows="5"></textarea><br>
            <label for="PricePerItemPerDay">Price per Day (Rp)</label><br>
            <input v-model="input.price" type="number" name="PricePerItemPerDay" class="input price" placeholder="Price per Day"><br>
            <label for="Name">Product Category</label><br>
            <select v-model="input.category" class="input" v-bind:class="{ select: input.category == '' }" name="Category">
                <option value="" disabled hidden class="placeholder">Select the product category</option>
                <option v-for="(category, index) in categories" :key="index" v-bind:value="category.Id">
                    {{ category.Name }}
                </option>
            </select>
            <label for="Quantity">Quantity</label><br>
            <input v-model="input.quantity" type="number" name="Quantity" class="input" placeholder="Quantity"><br>
            <label for="MinimumBorrowedTime">Minimum Borrowed Time (day)</label><br>
            <input v-model="input.minimumBorrowedTime" type="number" name="MinimumBorrowedTime" class="input" placeholder="Minimum Borrowed Time (day)"><br>
            <label for="MaximumBorrowedTime">Maximum Borrowed Time (day)</label><br>
            <input v-model="input.maximumBorrowedTime" type="number" name="MaximumBorrowedTime" class="input" placeholder="Maximum Borrowed Time (day)"><br>
            <label for="image">Image for Product</label><br>
            <input type="file" name="image" ref="image" @change="handleImage()" accept="image/*"><br><br>
            <button class="button is-success" @click="submitUpload()">Upload Product</button>
        </form>
    </section>
</template>

<script>
import { homeUrl } from '../../helper.js';
const axios = require('axios');

export default {
    name: 'my-product',

    data() {
        return {
            products: [],
            categories: [],
            input: {
                name: '',
                description: '',
                price: '',
                category: '',
                quantity: 1,
                minimumBorrowedTime: 1,
                maximumBorrowedTime: 1,
                image: null,
            },
            errorMessage: '',
        };
    },

    computed: {
        userLoggedIn: function () {
            return this.$store.getters.userLoggedIn;
        }
    },

    mounted() {
        axios.get(homeUrl + 'api/categories')
            .then((response) => {
                this.categories = response.data.Data;
            })
        //   axios.get(homeUrl + 'api/users/' + userLoggedIn.Id + '/orders')
        //     .then((response) => {
        //         this.order = response.data.Data;
        //     }) 
    },

    methods: {
        handleImage() {
            this.input.image = this.$refs.image.files[0];
        },
        submitUpload() {
            let formData = new FormData();
            let productToBeUploaded = {
                TenantId: this.userLoggedIn.Id,
                CategoryId: Number(this.input.category),
                Sku: 'pcs',
                Name: this.input.name,
                Quantity: Number(this.input.quantity),
                PricePerItemPerDay: Number(this.input.price),
                Description: this.input.description,
                MinimumBorrowedTime: Number(this.input.minimumBorrowedTime),
                MaximumBorrowedTime: Number(this.input.maximumBorrowedTime)
            };
            formData.append('product_data', JSON.stringify(productToBeUploaded));
            formData.append('image', this.input.image);
            axios.post(homeUrl + 'api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                this.handleResponse(response);
            });
        },
        handleResponse(response) {
            switch (response.data.ErrorCode) {
                case 160:
                    this.errorMessage = 'Product price is 0 or below';
                    break;
                case 161:
                    this.errorMessage = 'Product quantity is 0 or below';
                    break;
                case 162:
                    this.errorMessage = 'Tenant doesn\'t exists';
                    break;
                case 163:
                    this.errorMessage = 'Category doesn\'t exists';
                    break;
                case 163:
                    this.errorMessage = 'Category doesn\'t exists';
                    break;
                case 164:
                    this.errorMessage = 'File is too big (max: 2 MB)';
                    break;
                case 164:
                    this.errorMessage = 'Invalid file type';
                    break;
                default:
                    this.errorMessage = '';
                    location.reload();
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    width: 50%;
}
.title {
    font-size: 21px;
    font-weight: bold;
}
.subtitle {
    font-size: 15px;
    font-weight: 500;
}
input.price[type=number]::-webkit-inner-spin-button, 
input.price[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
select {
  -webkit-appearance: menulist-button;
  padding-left: 0.25em !important;
}
.select {
    color: #a9a9a9;
}
option:not(:first-of-type) {
  color: black;
}
//     border-radius: 4px;
// }
</style>
