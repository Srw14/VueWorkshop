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
        <v-col cols="12" md="8">
          <v-card style="margin-bottom: 3vh;">
            <div class="d-flex justify-space-between align-center" style="padding-left: 3vh;">
              <p style="padding-top: 2vh; font-size: 5vh; font-family: sans-serif; font-weight: 1000;">Your Cart</p>
              <v-btn plain color="error">
                <v-icon>mdi-trash-can-outline</v-icon>
                clear
              </v-btn>
            </div>
          </v-card>
          <v-row>
            <v-col cols="12" md="12" v-for="(item, index) in apidata.data" :key="index">
              <v-card>
                <div class="d-flex justify-space-between align-center" style="padding-left: 3vh;">
                  <v-row no-gutters>
                    <v-col cols="auto">
                      <v-avatar tile size="100" style="margin: 2vh;">
                        <v-img :src="'http://127.0.0.1:3000/' + item.mainimg" class="product-img" />
                      </v-avatar>
                    </v-col>
                    <v-col>
                      <v-card-title>{{ item.brand }} {{ item.category }}</v-card-title>
                      <v-card-subtitle>size: {{ item.size }} <br> color: {{ item.color }} </v-card-subtitle>
                      <v-card-title style="margin-top: -3vh;">฿{{ item.price }}</v-card-title>
                    </v-col>
                    <v-btn plain icon color="error" style="margin-top: 1vh; margin-right: 1vh;">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-row>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
              <v-card-subtitle>
                Location
                <br>
                <v-col cols="9">Subtotal (0 items)</v-col>
              </v-card-subtitle>
              <v-card-text>
                <v-divider></v-divider>
              </v-card-text>
            <v-card-title>
              Order Summary
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="9">Subtotal (0 items)</v-col>
                <v-col cols="3">฿10,000</v-col>
              </v-row>
              <v-row>
                <v-col cols="9">Shipping Fee</v-col>
                <v-col cols="3">฿10,000</v-col>
              </v-row>
              <v-divider class="mt-4 mb-4"></v-divider>
              <v-row>
                <v-col cols="9">Total</v-col>
                <v-col cols="3">฿10,000</v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn block rounded class="white--text " color="#000000">Proceed to checkout</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
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

.custom-breadcrumbs-item a {
  color: #000000;
}
</style>