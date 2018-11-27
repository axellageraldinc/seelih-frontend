<template>
    <section>
        <h1 class="title">My Products</h1>
        <div class="content">
            <el-button type="success" class="btn-new" @click="openModalUpload()">New Product</el-button>
            <data-tables :data="products" :pagination-props="{ pageSizes: [5, 10, 15] }">
                <el-table-column v-for="title in columnTitles" :key="title.prop" :prop="title.prop" :label="title.label">
                </el-table-column>
                <el-table-column label="Actions" min-width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button v-for="button in customActionButton(scope.row)" :key="button.name" @click="button.handler"
                            :type="button.props.type" :size="button.props.size" style="margin: 5px;">
                            {{ button.label }}
                        </el-button>
                    </template>
                </el-table-column>
            </data-tables>
        </div>
        <div :class="[ isModalUploadActive ? 'is-active' : '', 'modal' ]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Upload New Product</p>
                    <button class="delete" aria-label="close" @click="closeModalUpload()"></button>
                </header>
                <section class="modal-card-body">
                    <p class="error-message">{{ errorMessage }}</p>
                    <div class="field">
                        <input v-model="input.name" type="text" name="Name" class="input" placeholder="Name of Product"><br>
                    </div>
                    <div class="field">
                        <textarea v-model="input.description" name="Description" class="input" placeholder="Description of Product" cols="30" rows="5"></textarea><br>
                    </div>
                    <div class="field">
                        <input v-model="input.price" type="number" name="PricePerItemPerDay" class="input price" placeholder="Price per Day"><br>
                    </div>
                    <div class="field">
                        <select v-model="input.category" class="input" v-bind:class="{ select: input.category == '' }" name="Category">
                            <option value="" disabled hidden class="placeholder">Select the product category</option>
                            <option v-for="(category, index) in categories" :key="index" v-bind:value="category.Id">
                                {{ category.Name }}
                            </option>
                        </select>
                    </div>
                    <div class="field">
                        <input v-model="input.quantity" type="number" name="Quantity" class="input" placeholder="Quantity"><br>
                    </div>
                    <div class="field">
                        <input v-model="input.minimumBorrowedTime" type="number" name="MinimumBorrowedTime" class="input" placeholder="Minimum Borrowed Time (day)"><br>
                    </div>
                    <div class="field">
                        <input v-model="input.maximumBorrowedTime" type="number" name="MaximumBorrowedTime" class="input" placeholder="Maximum Borrowed Time (day)"><br>
                    </div>
                    <div>
                        <label for="image">Image for Product</label><br>
                        <input type="file" name="image" ref="image" @change="handleImage()" accept="image/*"><br><br>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <el-button type="success" @click="submitUpload()">Upload Product</el-button>
                </footer>
            </div>
        </div>
        <div :class="[ isModalImageActive ? 'is-active' : '', 'modal' ]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Preview Image for {{ rowData == null ? '' : rowData.Name }}</p>
                    <button class="delete" aria-label="close" @click="closeModalImage()"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <img :src="rowData == null ? '' : rowData.ImageUrl" :alt="rowData == null ? '' : rowData.Name" width="200px">
                    </div>
                </section>
                <footer class="modal-card-foot">
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
import { homeUrl } from '../../helper.js';
const axios = require('axios');
const moment = require('moment');

export default {
    name: 'my-product',

    data() {
        return {
            products: [],
            categories: [],
            columnTitles: [{
                    prop: 'Id',
                    label: 'Product Id'
                },
                {
                    prop: 'Name',
                    label: 'Product Name'
                },
                {
                    prop: 'PricePerItemPerDay',
                    label: 'Price Per Day'
                },
                {
                    prop: 'UploadedTime',
                    label: 'Upload Time'
                },
            ],
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
            isModalUploadActive: false,
            isModalImageActive: false,
            rowData: null,
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
            });
        axios.get(homeUrl + 'api/users/' + this.userLoggedIn.Id + '/products')
            .then((response) => {
                let self = this;
                self.products = [];
                response.data.Data.forEach(element => {
                   element.UploadedTime = moment(element.UploadedTime).format('LLLL');
                   self.products.push(element); 
                });
            });
    },

    methods: {
        openModalUpload() {
            this.isModalUploadActive = true;
        },
        closeModalUpload() {
            this.isModalUploadActive = false;
        },
        openModalImage() {
            this.isModalImageActive = true;
        },
        closeModalImage() {
            this.isModalImageActive = false;
            this.rowData = null;
        },
        customActionButton(row) {
            return [{
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    label: 'See Image',
                    handler: _ => {
                        console.log(row);
                        this.rowData = this.products.find(product => product.Id == row.Id);
                        this.openModalImage();
                    }
                },
            ];
        },
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
.title {
    font-size: 21px;
    font-weight: bold;
}
.subtitle {
    font-size: 15px;
    font-weight: 500;
}
.field {
    text-align: center;
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
.btn-new {
    float: right;
    margin-bottom: 20px;
}
</style>
