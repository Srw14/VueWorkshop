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
                <p style="padding-left:3vh; font-size:5vh; font-family:sans-serif; font-weight:1000">Payment</p>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [ { text: 'Home', disabled: false, href:'/main'},{ text: 'Payment', disabled: true, href:'/payment'} ]
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