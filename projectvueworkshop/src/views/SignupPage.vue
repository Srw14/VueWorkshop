<template>
    <v-container>
        <v-row class="align-center justify-center">
            <v-col cols="12" md="6" lg="4">
                <p style="font-size: 5vh; font-weight: 1000; font-family: sans-serif; margin-top: 11vh; ">W0rk.Sh</p>
                <p style="font-weight: 10; font-family: sans-serif; ">Now let's make you a W0rk.Sh Member.</p>
                <v-form v-model="valid">
                    <v-text-field v-model="postdata.email" :rules="emailRules" style="margin-top: 4vh; width: 100%;" label="Email*" outlined required></v-text-field>
                <v-row>
                    <v-col v-col cols="12" sm="6">
                        <v-text-field v-model="postdata.firstname" :rules="fnameRules" label="First Name*" outlined required></v-text-field>
                    </v-col>
                    <v-col v-col cols="12" sm="6">
                        <v-text-field v-model="postdata.lastname" :rules="lnameRules" label="Last Name*" outlined required></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field v-model="postdata.phonenumber" :rules="phonenumberRules" style="width: 100%;" label="Phone Number*" outlined required></v-text-field>
                <v-text-field v-model="postdata.password" :rules="passwordRules" style="width: 100%;" label="Password*" type="password" outlined required></v-text-field>
                </v-form>
                <div style="margin-top: 5vh;">
                    <v-btn rounded block @click="savePostData()" :disabled="!valid" class="white--text" color="#000">Create Account</v-btn>
                </div>
                <p style="font-size: 2vh; margin-top: 2vh; color: #757575;">Already have an account? <a style="color: #757575;" href="/login">Login in</a> now</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            fnameRules: [
                v => !!v || 'First Name is required',
            ],
            lnameRules: [
                v => !!v || 'Last Name is required',
            ],
            phonenumberRules: [
                v => !!v || 'Phone Number is required',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
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