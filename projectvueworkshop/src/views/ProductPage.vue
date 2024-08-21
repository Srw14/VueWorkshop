<template>
  <div>
    <v-container>
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="items" class="custom-breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item class="custom-breadcrumbs-item" :href="item.href" :disabled="item.disabled">
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <!-- Main Image -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-img :src="'http://127.0.0.1:3000/' + product.mainimg" max-height="300" max-width="500" class="mb-4" height="300px" contain></v-img>
          </v-card>
        </v-col>

        <!-- Additional Images -->
      <!-- <v-row>
        <v-col v-for="(img, index) in product.img" :key="index" cols="12" md="3">
          <v-img :src="'http://127.0.0.1:3000/' + img" height="200px" contain></v-img>
        </v-col>
      </v-row> -->

        <!-- Product Details -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title class="headline">{{ product.productname }}</v-card-title>
            <v-card-subtitle class="grey--text">
              Price: {{ product.price }}$
            </v-card-subtitle>
            <v-card-subtitle class="grey--text">
              Available: {{ product.amount }}
            </v-card-subtitle>
            <v-card-text>{{ product.detail }}</v-card-text>
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
      product: {},
      items: [
        { text: 'Home', disabled: false, href: '/main' },
        { text: 'Product', disabled: true, href: '/product' },
      ],
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await this.axios.get(`http://127.0.0.1:3000/products/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        });
        this.product = response.data.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  }
}
</script>

<style>
.custom-breadcrumbs {
  margin-left: -2vh;
}

.custom-breadcrumbs-item a {
  color: #000000;
}
</style>
