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
        <v-col cols="12" md="3">
          <v-card class="rounded-lg">
            <div style="text-align: center; ">
              <v-icon style="margin-top: 5vh;" size="150px">mdi-account-circle-outline</v-icon>
            </div>
            <p style="text-align: center; margin-top: 3vh;">
              <span style="font-size: 2vh; font-family: sans-serif; font-weight: 1000;">{{ originalFirstname }} {{ originalLastname }}</span><br><span>{{ originalEmail }}</span><br><span>{{ originalPhonenumber }}</span>
            </p>
            <v-card-actions>
              <v-btn style=" margin-top: 1.5vh;" block class="white--text" color="#000" @click="logout()">logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="rounded-lg">
            <v-card-title>My Profile</v-card-title>
            <v-card-subtitle>Manage and protect your account</v-card-subtitle>
            <v-divider style="width: 92%;margin-left: 2vh;  margin-bottom: 3vh;" class="border-opacity-100"></v-divider>
            <v-row style="padding-left: 4vh;">
              <v-col cols="11">
                <v-text-field v-model="userData.email" label="Email*" clearable outlined class="input-field"></v-text-field>
              </v-col>
              <v-col cols="5" style="margin-top: -4vh;">
                <v-text-field v-model="userData.firstname" label="FirstName*" clearable outlined class="input-field"></v-text-field>
              </v-col>
              <v-col cols="6" style="margin-top: -4vh;">
                <v-text-field v-model="userData.lastname" label="LastName*" clearable outlined class="input-field"></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn style=" margin-top: -3vh;" block class="white--text" color="#000" @click="putUserData()"> Save change </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn block outlined color="#000" @click="open()">Add Product</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card class="rounded-lg">
            <v-card-title>My Address</v-card-title>
            <v-card-subtitle>Manage your address</v-card-subtitle>
            <v-divider style="width: 92%;margin-left: 2vh;  margin-bottom: 3vh" class="border-opacity-100"></v-divider>
            <v-row style="padding-left: 4vh">
              <v-col cols="5">
                <v-combobox v-model="userData.firstname" label="Province*" clearable outlined class="input-field"></v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox v-model="userData.lastname" label="District*" clearable outlined class="input-field"></v-combobox>
              </v-col>
              <v-col cols="5" style="margin-top: -4vh">
                <v-combobox v-model="userData.firstname" label="Sub-District*" clearable outlined class="input-field"></v-combobox>
              </v-col>
              <v-col cols="6" style="margin-top: -4vh">
                <v-text-field v-model="userData.lastname" label="PhoneNumber*" clearable outlined class="input-field"></v-text-field>
              </v-col>
              <v-col cols="11" style="margin-top: -4vh">
                <v-text-field v-model="userData.email" label="Address*" clearable outlined
                  class="input-field"></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn style=" margin-top: -3vh;" block class="white--text" color="#000" @click="putUserData()"> Save change </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn block outlined color="#000" @click="opendialog()">Add New Address</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialogedit" max-width="500px">
        <v-card class="rounded-lg">
          <v-card-title primary-title> ADD NEW PRODUCT </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-row>
              <v-col cols="6">
                <v-text-field v-model="postdata.productname" :rules="nameRules" label="Name" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="postdata.price" :rules="priceRules" label="Price" type="number" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="postdata.amount" :rules="amountRules" label="Amount" type="number" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select v-model="postdata.category" :rules="categoryRules" :items="categorylist" label="Category" required editable></v-select>
              </v-col>
              <v-col cols="6">
                <v-select v-model="postdata.color" :rules="colorRules" :items="colorlist" label="Color" chips multiple required editable></v-select>
              </v-col>
              <v-col cols="6">
                <v-select v-model="postdata.size" :rules="sizeRules" :items="sizelist" label="Size" chips multiple required editable></v-select>
              </v-col>
              <v-col cols="6">
                <v-select v-model="postdata.brand" :rules="brandRules" :items="brandlist" label="Brand" required></v-select>
              </v-col>
              <v-col cols="6">
                <v-select v-model="postdata.ships" :rules="shipsRules" :items="provinceList" item-text="name_en" label="Ships From" required editable></v-select>
              </v-col>
              <v-col cols="6">
                <v-file-input v-model="postdata.mainimg" :rules="mainimgRules" label="Main Img" truncate-length="14" required></v-file-input>
              </v-col>
              <v-col cols="6">
                <v-file-input v-model="postdata.img" :rules="imgRules" label="Img" truncate-length="14" multiple required></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="postdata.description" :rules="descriptionRules" label="Description" solo required></v-textarea>
              </v-col>
            </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="#000" @click="close()">cancel</v-btn>
            <v-btn class="white--text" color="#000" @click="saveAddProduct()">save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addressdialog" max-width="500px">
        <v-card class="rounded-lg">
          <v-card-title primary-title> ADD NEW ADDRESS </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="postuser.address" :rules="addressRules" label="Address" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-combobox v-model="postuser.province" :rules="provinceRules" :items="provinceList" item-text="name_th" label="Province" @change="onProvinceChange" required editable></v-combobox>
                </v-col>
                <v-col cols="6">
                  <v-combobox v-model="postuser.amphure" :rules="amphureRules" :items="filteredAmphureList" item-text="name_th" label="District" @change="onAmphureChange" required editable></v-combobox>
                </v-col>
                <v-col cols="6">
                  <v-combobox v-model="postuser.tambon" :rules="tambonRules" :items="filteredTambonList" item-text="name_th" label="Sub-District" required editable></v-combobox>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Phone Number"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="#000" @click="close()">cancel</v-btn>
            <v-btn class="white--text" color="#000" @click="putUserAddress()">save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      nameRules: [ v => !!v || 'Name is required' ],
      priceRules: [ v => !!v || 'Price is required' ],
      amountRules: [ v => !!v || 'Amount is required' ],
      categoryRules: [ v => !!v || 'Category is required' ],
      colorRules: [ v => !!v || 'Color is required' ],
      sizeRules: [ v => !!v || 'Size is required' ],
      brandRules: [ v => !!v || 'Brand is required' ],
      shipsRules: [ v => !!v || 'Ships From is required' ],
      descriptionRules: [ v => !!v || 'Description is required' ],
      mainimgRules: [ v => !!v || 'Main Img is required' ],
      imgRules: [ v => !!v || 'Img is required' ],
      addressRules: [ v => !!v || 'Address is required' ],
      provinceRules: [ v => !!v || 'Province is required'],
      amphureRules: [ v => !!v || 'District is required'],
      tambonRules: [ v => !!v || 'Sub-District is required'],
      categorylist: [ 'T-shirts','Shirts','Polo Shirts' ],
      colorlist: [ 'Gray','Brown','Blue','Green','Orange','Red','Yellow','Purple','Pink','Black','White' ],
      sizelist:[ 'XS','S','M','L','XL','XXL','XXXL' ],
      brandlist:[ 'Nike','Zara','H&M','Uniqlo','Adidas' ],
      provinceList: [],
      amphureList: [],
      tambonList: [],
      filteredAmphureList: [],
      filteredTambonList: [],
      addressdialog: false,
      dialogedit: false,
      id: '',
      originalEmail: '',
      originalFirstname: '',
      originalLastname: '',
      originalPhonenumber: '',
      apidata: [],
      postdata: {
        productname: '',
        price: '',
        amount: '',
        category: '',
        color: '',
        size: '',
        brand: '',
        ships: '',
        description: '',
        mainimg: '',
        img: '',
      },
      postuser: {
        address: '',
        province: '',
        amphure: '',
        tambon: '',
      },
      userData: {},
      items: [ { text: 'Home',disabled: false,href: '/main' },{ text: 'Profile',disabled: true,href: '/profile' } ],
    }
  },
  created() {
    this.getUserData();
    this.getProvince();
    this.getAmphure();
    this.getTambon();
  },
  methods: {
    open() {
      this.dialogedit = true
    },
    close() {
      this.dialogedit = false
      this.addressdialog = false
    },
    opendialog() {
      this.addressdialog = true
    },
    logout() {
      localStorage.clear();
      this.$router.push('/main')
    },
    onProvinceChange(){
      this.filteredAmphureList = this.amphureList.filter(amphure => amphure.province_id === this.postuser.province.id);

      this.postuser.amphure = '';
      this.filteredTambonList = [];
    },
    onAmphureChange(){
      this.filteredTambonList = this.tambonList.filter(tambon => tambon.amphure_id === this.postuser.amphure.id);
      this.postuser.tambon = '';
    },
    async saveAddProduct() {
      try {
        const formData = new FormData();
        formData.append('productname', this.postdata.productname);
        formData.append('price', this.postdata.price);
        formData.append('amount', this.postdata.amount);
        formData.append('category', this.postdata.category);
        formData.append('color', this.postdata.color);
        formData.append('size', this.postdata.size);
        formData.append('brand', this.postdata.brand);
        formData.append('ships', this.postdata.ships);
        formData.append('description', this.postdata.description);
        if (this.postdata.mainimg) {
          formData.append('mainimg', this.postdata.mainimg);
        }
        if (this.postdata.img) {
          this.postdata.img.forEach(file => {
            formData.append('files', file);
          });
        }
        const { data } = await this.axios.post('http://127.0.0.1:3000/products/add', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(data);
        alert('Complete');
        this.$router.push('/main');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : 'An unexpected error occurred');
      }
    },
    getProvince() {
      this.axios.get('http://127.0.0.1:3000/location/province/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }).then((response) => {
        console.log(response.data);
        this.provinceList = response.data.data;
      }).catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    },
    getAmphure() {
      this.axios.get('http://127.0.0.1:3000/location/amphure/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }).then((response) => {
        console.log(response.data);
        this.amphureList = response.data.data;
      }).catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    },
    getTambon() {
      this.axios.get('http://127.0.0.1:3000/location/tambon/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }).then((response) => {
        console.log(response.data);
        this.tambonList = response.data.data;
      }).catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    },
    getProduct() {
      this.axios.get('http://127.0.0.1:3000/products/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }).then((response) => {
        console.log(response.data)
        this.apidata = response.data
      })
    },
    async getUserData() {
      try {
        const UserID = localStorage.getItem("UserID");
        if (UserID) {
          const response = await fetch(`http://127.0.0.1:3000/users/${UserID}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            }
          });
          const data = await response.json();
          this.userData = data.data;
          this.originalEmail = data.data.email;
          this.originalFirstname = data.data.firstname;
          this.originalLastname = data.data.lastname;
          this.originalPhonenumber = data.data.phonenumber
        } else {
          console.error('No UserID');
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : 'An unexpected error occurred');
      }
    },
    async putUserData() {
      try {
        const UserID = localStorage.getItem("UserID");
        if (UserID) {
          const response = await fetch(`http://127.0.0.1:3000/users/${UserID}`, {
            method: 'PUT',
            headers: {
              'Authorization': `bearer ${localStorage.getItem("Token")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.userData.email,
              firstname: this.userData.firstname,
              lastname: this.userData.lastname
            })
          });
          const data = await response.json();
          console.log(data)
          alert('Profile updated complete')
        } else {
          console.error('No UserID found in localStorage');
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : 'An unexpected error occurred');
      }
    },
    async putUserAddress() {
      try {
        // เตรียมข้อมูลเพื่อส่งในการอัพเดตที่อยู่ผู้ใช้
        const addressData = {
          address: this.postuser.address,
          province: this.postuser.province,
          amphure: this.postuser.amphure,
          tambon: this.postuser.tambon
        };

        const UserID = localStorage.getItem("UserID");
        
        // ส่งคำขอ PUT เพื่ออัพเดตที่อยู่ของผู้ใช้
        const { data } = await this.axios.put(`http://127.0.0.1:3000/users/location/${UserID}`, addressData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(data);
        // รีเซ็ตข้อมูล postuser เพื่อให้ฟอร์มกลับไปอยู่ในสถานะเดิม
        this.postuser = {
          address: '',
          province: '',
          amphure: '',
          tambon: '',
        };
        this.close();
      } catch (error) {
        console.error('Error updating address:', error);
      }
    },
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