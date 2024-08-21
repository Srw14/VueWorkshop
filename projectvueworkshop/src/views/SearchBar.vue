<template>
<div>
    <v-container>
        <v-row class="align-center justify-start">
            <v-btn text href="/main">
                <v-col cols="auto">
                    <h1 style="font-size: 2vh; font-family:sans-serif; font-weight:1000">W0rk.Sh</h1>
                </v-col>
            </v-btn>
            <v-col cols="2" md="8">
                <v-text-field rounded style="margin-top: 0.5vh; margin-left: -3vh;" solo flat hide-details prepend-inner-icon="mdi-magnify" label="Search for products..."></v-text-field>
            </v-col>
            <v-col cols="auto">
                <v-btn icon style="margin-top: 2.5vh; margin-left: -3vh;" @click="checkTokenAndRedirect('/cart')">
                    <v-badge :content="11">
                        <v-icon size="32px">mdi-cart-outline</v-icon>
                    </v-badge>
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn icon style="margin-top: 2.5vh;" @click="checkTokenAndRedirect('/profile')">
                    <v-icon size="32px">mdi-account-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-main>
        <router-view />
    </v-main>
</div>
</template>

<script>
export default {
    data() {

    },
    methods: {
        checkTokenAndRedirect(route) {
            const token = localStorage.getItem('Token');
            if (token) {
                this.$router.push(route);
            } else {
                this.$router.push('/login');
            }
        }
    },
}
</script>

<style></style>
