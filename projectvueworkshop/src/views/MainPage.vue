<template>
    <div class="background">
        <v-card class="my-card" style="margin-top: 2vh">
            <v-card-title primary-title style="
          margin-left: 2vh;
          padding-top: 5vh;
          font-size: 4.4vh;
          font-family: sans-serif;
          font-weight: 1000;
          line-height: 0.9;
        ">
                FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </v-card-title>
            <v-card-text style="margin-left: 2vh">
                Browse through our diverse range of meticulously crafted garments.
                designed<br />
                to bring out your individuality and cater to your sense of style.
            </v-card-text>
            <div style="margin-left: 3.5vh; width: 25vh; margin-top: 1vh">
                <v-btn rounded block class="white--text" color="#000">SHOP NOW</v-btn>
            </div>
            <v-row class="info-row" style="margin-left: 1vh; margin-top: 1vh">
                <v-col cols="auto">
                    <v-card-title primary-title style="
              margin-left: 2vh;
              padding-top: 2vh;
              font-size: 2.5vw;
              font-family: sans-serif;
              font-weight: 700;
            ">
                        200+
                    </v-card-title>
                    <v-card-text style="margin-left: 2vh; font-family: sans-serif; font-weight: 100">
                        International Brands
                    </v-card-text>
                </v-col>
                <v-divider style="height: 11vh; margin-top: 3vh" class="border-opacity-100" vertical></v-divider>
                <v-col cols="auto">
                    <v-card-title primary-title style="
              margin-left: 2vh;
              padding-top: 2vh;
              font-size: 2.5vw;
              font-family: sans-serif;
              font-weight: 700;
            ">
                        30,000+
                    </v-card-title>
                    <v-card-text style="margin-left: 2vh; font-family: sans-serif; font-weight: 100">
                        Happy Customers
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <p style="
        font-size: 5vh;
        text-align: center;
        margin-top: 10vh;
        font-family: sans-serif;
        font-weight: 1000;
      ">
            New Arrivals
        </p>
        <v-row style="padding: 2vh">
            <v-col cols="6" sm="6" md="2" v-for="(item, index) in displayedItems" :key="index">
                <v-card class="rounded-xl mb-3" width="40vh" height="55vh" @click="goToProductDetail(item._id)">
                    <v-img :src="'http://127.0.0.1:3000/' + item.mainimg" max-height="300" max-width="500"
                        class="mx-auto" />
                    <v-card-title primary-title style="font-size: 3vh; font-weight: 1000">{{ item.productname }}<br />{{
                        item.price }}$</v-card-title>
                    <v-card-actions>
                        <!-- Actions for Card 1 -->
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="6" class="d-flex justify-center">
                <v-btn rounded block outlined color="#000" @click="toggleShowAll">{{
                    showAll ? "Show Less" : "ViewAll"
                    }}</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            apidata: {
                data: []
            },
            showAll: false,
            itemsToShow: 6,
        };
    },
    computed: {
        displayedItems() {
            return Array.isArray(this.apidata.data) && this.apidata.data.length ?
                this.showAll ?
                    this.apidata.data :
                    this.apidata.data.slice(0, this.itemsToShow) : [];
        },
    },
    created() {
        this.getProduct();
    },
    methods: {
        goToProductDetail(id) {
            this.$router.push(`/product/${id}`);
        },
        getProduct() {
            this.axios
                .get("http://127.0.0.1:3000/products/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    this.apidata = response.data;
                });
            this.apidata.data.forEach((item) => {
                console.log(item.mainimg);
            });
        },
        toggleShowAll() {
            this.showAll = !this.showAll;
        },
    },
};
</script>

<style></style>
