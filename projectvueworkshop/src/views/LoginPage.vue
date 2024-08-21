<template>
    <v-container>
        <v-row class="align-center justify-center">
            <v-col cols="12" md="6" lg="4">
                <p style="font-size: 5vh; font-weight: 1000; font-family: sans-serif; margin-top: 11vh; ">
                    W0rk.Sh
                </p>
                <p style="font-weight: 10; font-family: sans-serif;">
                    Enter your email to join us or sign in.
                </p>
                <v-text-field v-model="logindata.email" label="Email*" outlined class="input-field"></v-text-field>
                <v-text-field v-model="logindata.password" label="Password*" type="password" outlined
                    class="input-field"></v-text-field>
                <div style="margin-top: 5vh;">
                    <v-btn rounded block @click="seveLoginData()" class="white--text" color="#000">Login</v-btn>
                </div>
                <p style="font-size: 2vh; margin-top: 3vh; color: #757575;">
                    Don't have an account? <a style="color: #757575;" href="/signup">sign up</a> now
                </p>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            apidata: [],
            logindata: {
                email: '',
                password: '',
            },
            logindefault: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async seveLoginData() {
            try {
                const { data } = await this.axios.post('http://127.0.0.1:3000/users/login', this.logindata);
                const { token, id, role } = data;
                localStorage.setItem("Token", token)
                localStorage.setItem("UserID", id)
                localStorage.setItem("UserRole", role)
                console.log(data)
                alert('Login Complete')
                this.$router.push('/main')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
    }
}
</script>

<style></style>