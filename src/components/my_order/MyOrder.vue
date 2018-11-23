<template>
    <section>
        <h1 class="title">My Orders</h1>
        <data-tables :data="orders" :pagination-props="{ pageSizes: [5, 10, 15] }" style="width: 97%;">
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
        <div :class="[ isModalActive ? 'is-active' : '', 'modal' ]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Why do you want to cancel this order?</p>
                    <button class="delete" aria-label="close" @click="closeModal()"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <textarea name="reason" v-model="input.reason" cols="30" class="input" style="padding-left: 0.75em;" rows="5" placeholder="Reason..."></textarea>
                        </p>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <el-button type="danger" @click="confirmCancel()">I want to cancel this order</el-button>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
    import {
        homeUrl
    } from '../../helper.js';
    const axios = require('axios');

    export default {
        name: 'my-order',

        data() {
            return {
                isModalActive: false,
                rowData: null,
                orders: [],
                columnTitles: [{
                        prop: 'Id',
                        label: 'Order Id'
                    },
                    {
                        prop: 'ProductName',
                        label: 'Product Name'
                    },
                    {
                        prop: 'TotalPrice',
                        label: 'Price'
                    },
                    {
                        prop: 'OrderStatus',
                        label: 'Order Status'
                    },
                    {
                        prop: 'ReturnTime',
                        label: 'Return Time'
                    }
                ],
                input: {
                    reason: ''
                }
            };
        },

        computed: {
            userLoggedIn: function () {
                return this.$store.getters.userLoggedIn;
            }
        },

        mounted() {
            this.loadOrder();
        },

        methods: {
            closeModal() {
                this.isModalActive = false;
            },
            openModal(row) {
                this.isModalActive = true;
            },
            customActionButton(row) {
                if (row.OrderStatus == 'ON_PROCESS') {
                    return [{
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            label: 'Retrive Product',
                            handler: _ => {
                                this.rowData = row;
                                this.handleRetrieve();
                            }
                        },
                        {
                            props: {
                                type: 'danger',
                                size: 'small'
                            },
                            label: 'Cancel Order',
                            handler: _ => {
                                this.rowData = row;
                                this.handleCancel();
                            }
                        }
                    ];
                } else if (row.OrderStatus == 'RETRIEVED') {
                    return [{
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        label: 'Return Product',
                        handler: _ => {
                            this.rowData = row;
                            this.handleReturn();
                        }
                    }, ];
                }
            },
            handleRetrieve() {
                console.log(this.rowData);
                axios.post(homeUrl + 'api/orders/retrieve', {
                    OrderId: this.rowData.Id
                }).then((response) => {
                    if (response.data.ErrorCode == 0) {
                        this.$message('Product Retrieved');
                        this.loadOrder();
                        this.rowData = null;
                    } else {
                        this.$message('Order Not Found!');
                    }
                });
            },
            handleReturn() {
                console.log(this.rowData);
                axios.post(homeUrl + 'api/orders/return', {
                    OrderId: this.rowData.Id
                }).then((response) => {
                    if (response.data.ErrorCode == 0) {
                        this.$message('Product Returned');
                        this.loadOrder();
                        this.rowData = null;
                    } else {
                        this.$message('Order Not Found!');
                    }
                });
            },
            handleCancel() {
                console.log(this.rowData);
                this.openModal();
            },
            confirmCancel() {
                if (this.reason !== '') {
                    axios.post(homeUrl + 'api/orders/cancellation', {
                        OrderId: this.rowData.Id,
                        Reason: this.input.reason
                    }).then((response) => {
                        if (response.data.ErrorCode == 0) {
                            this.$message('Product Cancelled!');
                            this.loadOrder();
                            this.closeModal();
                            this.rowData = null;
                        } else if (response.data.ErrorCode == 150) {
                            this.$message('The product was already retrieved!');
                        } else {
                            this.$message('Order Not Found!');
                        }
                    });
                }
            },
            loadOrder() {
                axios.get(homeUrl + 'api/users/' + this.userLoggedIn.Id + '/orders')
                    .then((response) => {
                        this.orders = response.data.Data;
                    });
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
</style>