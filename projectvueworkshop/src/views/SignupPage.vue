<template>
    <v-container>
        <v-row class="align-center justify-center">
            <v-col cols="12" md="6" lg="4">
                <p style="font-size: 5vh; font-weight: 1000; font-family: sans-serif; margin-top: 11vh; ">W0rk.Sh</p>
                <p style="font-weight: 10; font-family: sans-serif; ">Now let's make you a W0rk.Sh Member.</p>
                <v-text-field v-model="postdata.email"  style="margin-top: 4vh; width: 100%;" label="Email*"
                    outlined></v-text-field>
                <v-row>
                    <v-col v-col cols="12" sm="6">
                        <v-text-field v-model="postdata.firstname" label="First Name*" outlined></v-text-field>
                    </v-col>
                    <v-col v-col cols="12" sm="6">
                        <v-text-field v-model="postdata.lastname" label="Last Name*" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field v-model="postdata.phonenumber" style="width: 100%;" label="Phone Number*"
                    outlined></v-text-field>
                <v-text-field v-model="postdata.password" style="width: 100%;" label="Password*" type="password"
                    outlined></v-text-field>
                <div style="margin-top: 5vh;">
                    <v-btn rounded block @click="savePostData()" class="white--text" color="#000">Create Account</v-btn>
                </div>
                <p style="font-size: 2vh; margin-top: 2vh; color: #757575;">Already have an account? <a
                        style="color: #757575;" href="/login">Login in</a> now</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            appbar: false,
            id: '',
            apidata: [],
            postdata: {
                email: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                password: '',
            },
            postdefault: {
                email: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                password: '',
            },
        };
    },
    // created(){
    //     this.getData
    // },
    methods: {
        async savePostData() {
            try {
                const { data } = await this.axios.post('http://127.0.0.1:3000/users/register', this.postdata, {})
                console.log(data)
                alert('Complete')

                this.$router.push('/login');
            } catch (error) {
                console.log(error)
                alert(error)
            }
        },
    }
}
</script>

<style></style>























<!-- <template>
    <div class="background">
        <v-row>
            <v-col cols="6">
                <h1 class="t2">Create your Own Account</h1>
            </v-col>
            <v-col cols="4">
                <h1 class="t3">Already member? <a href="/signup">Login</a> here.</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-center align-center">
                <v-card class="signup-card">
                    <v-card-title primary-title class="ctext mt-5">
                        Login with Password
                    </v-card-title>
                    <v-card-text class="textf">
                        Username
                        <v-text-field class="mb-5 mt-1" name="username" id="Username" outlined></v-text-field>
                        Password
                        <v-text-field name="password" id="password" outlined></v-text-field>
                        <v-btn class="mt-3 white--text text--darken-3" block color="#f57224" elevation="2" href="main"
                            height="50">login</v-btn>
                        <span class="d-flex justify-center align-center my-7">------ Or, login with ------</span>
                        <v-row align="center" justify="space-around">
                            <v-btn class="b" depressed color="primary">
                                Facebook
                            </v-btn>
                            <v-btn class="b" depressed color="error">
                                Google
                            </v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.t2 {
    margin-left: 48vh;
    margin-top: 10vh;
    font-size: 22px;
    color: #424242;
    font-weight: 400;
}
.t3 {
    margin-left: 30vh;
    margin-top: 10vh;
    font-size: 15px;
    color: #424242;
    font-weight: 400;
}
.signup-card {
    margin-top: 2vh;
    width: 100vh;
    height: 60vh;
}
.b {
    width: 33vh;
    height: 50vh;
}
</style> -->