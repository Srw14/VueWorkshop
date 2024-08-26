<template>
  <div>
    <v-container>
      <v-breadcrumbs :items="items" class="custom-breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item class="custom-breadcrumbs-item" :href="item.href" :disabled="item.disabled">
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="cart-title">Your Cart</p>
        </v-col>
        <v-col cols="12" md="4" v-for="(item, index) in apidata.data" :key="index">
          <v-card class="product-card">
            <v-img :src="item.mainimg" class="product-img"></v-img>
            <v-card-title>{{ item.productname }}</v-card-title>
            <v-card-subtitle>฿{{ item.price }}</v-card-subtitle>
            <v-card-actions>
              <v-btn icon @click="deleteItem(item)">
                <v-icon color="black">mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="summary-card">
            <v-card-title>Order Summary</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="8">Subtotal ({{ apidata.data.length }} items)</v-col>
                <v-col cols="4" class="text-right">฿{{ total }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="8">Shipping Fee</v-col>
                <v-col cols="4" class="text-right">฿0.00</v-col>
              </v-row>
              <v-row>
                <v-col cols="8">Discount</v-col>
                <v-col cols="4" class="text-right">฿0.00</v-col>
              </v-row>
              <v-divider class="mt-2 mb-2"></v-divider>
              <v-row>
                <v-col cols="8" class="font-weight-bold">Total</v-col>
                <v-col cols="4" class="text-right font-weight-bold">฿{{ total }}</v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn color="primary" @click="checkout">Proceed to Checkout</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      total: 0,
      items: [
        { text: 'Home', disabled: false, href: '/main' },
        { text: 'Cart', disabled: true, href: '/cart' },
      ],
    };
  },
  created() {
    this.getProduct();
    this.getTotal();
  },
  methods: {
    getProduct() {
      this.axios.get('http://127.0.0.1:3000/products/', {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      }).then((response) => {
        this.apidata = response.data;
      });
    },
    getTotal() {
      this.total = this.apidata.data.reduce((sum, item) => sum + item.price, 0);
    },
    checkout() {
      
    },
  },
};
</script>

<style>
.custom-breadcrumbs {
  margin-bottom: 20px;
}
.cart-title {
  padding-left: 3vh;
  font-size: 5vh;
  font-family: sans-serif;
  font-weight: 1000;
}
.product-card {
  margin-bottom: 20px;
  text-align: center;
}
.product-img {
  height: 200px;
  background-size: contain;
}
.summary-card {
  margin-top: 20px;
}
</style>
