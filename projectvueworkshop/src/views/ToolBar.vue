<template>
<div class="background">
    <v-app-bar v-if="appbar" app color="#000" height="30vh">
        <v-container>
            <v-row class="align-center justify-space-between">
                <v-col class="d-flex justify-center">
                    <p class="text1 white--text mt-5">
                        sign up and get 20% off your first order.
                        <a class="aa white--text" href="/signup">Sign Up Now</a>
                    </p>
                </v-col>
                <v-col cols="auto" class="d-flex justify-end">
                    <v-btn icon @click="close">
                        <v-icon class="text1 white--text" color="white" size="20px">mdi-window-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
    <v-main>
        <router-view />
    </v-main>
</div>
</template>

<script>
export default {
    data() {
        return {
            appbar: true,
        };
    },
    created() {
        this.checkToken();
    },
    methods: {
        checkToken() {
            const token = localStorage.getItem('Token');
            this.appbar = !token;
        },
        close() {
            this.appbar = false;
        }
    }
}
</script>

<style>
.background {
    background-color: #f5f5f5;
    min-height: 100vh;
}

.text1 {
    font-size: 10px;
}
</style>
