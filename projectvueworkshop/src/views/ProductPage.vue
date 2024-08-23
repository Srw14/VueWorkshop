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
      <v-row>
        <v-col cols="12" md="12" class="mx-auto">
          <v-card class="pa-4">
            <v-row>
              <v-col cols="12" md="4">
                <v-img :src="'http://127.0.0.1:3000/' + mainImage" max-height="300" max-width="500" class="mt-6 mx-auto" height="300px" contain></v-img>
                <v-row class="mt-4">
                  <v-col v-for="(img, index) in product.img" :key="index" cols="4" md="4">
                    <v-img :src="'http://127.0.0.1:3000/' + img" height="100px" class="mb-4" contain @click="changeMainImage(img)" style="cursor: pointer;"></v-img>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-title class="headline">{{ product.productname }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-size: 5vh;" class="my-3">
                  ฿{{ product.price }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-subtitle class="grey--text">
                  Choose Size 
                  <v-chip-group v-model="selectedSize" class="mt-3" mandatory>
                    <v-chip v-for="(size, index) in sizes" :key="index" :value="size" color="#000" outlined>
                      {{ size }}
                    </v-chip>
                  </v-chip-group>
                </v-card-subtitle>
                <v-card-subtitle class="grey--text">
                  Select Colors 
                  <v-chip-group v-model="selectedColor" class="mt-3" mandatory>
                    <v-chip v-for="(color, index) in colors" :key="index" :value="color" color="#000" outlined>
                      {{ color }}
                    </v-chip>
                  </v-chip-group>
                </v-card-subtitle>
                <v-card-text>{{ product.detail }}</v-card-text>
                <v-card-actions>
                  <v-btn-toggle>
                    <v-btn outlined color="#000">
                      <v-icon left>mdi-cart-plus</v-icon> Add To Cart
                    </v-btn>
                    <v-btn class="mx-2 white--text" color="#000">
                      Buy Now
                    </v-btn>
                  </v-btn-toggle>
                </v-card-actions>
              </v-col>
            </v-row>
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
      sizes: [],
      colors: [],
      selectedSize: null,
      selectedColor: null,
      product: {},
      mainImage: '',
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
        this.mainImage = this.product.mainimg;
        this.sizes = this.product.size;
        this.colors = this.product.color;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    changeMainImage(img) {
      this.mainImage = img;
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