<template>
  <custnav></custnav>
  <div class="dashboard">
    <div class="form">
      <h1>Edit Customer (ID: {{ id }})</h1>
      <form>
        <input type="text" placeholder="Customer Name" v-model="name" /><br />
        <input type="text" placeholder="City" v-model="city" /><br />
        <input type="number" placeholder="Pincode" v-model="pincode" /><br />
        <input type="number" placeholder="Mobile No." v-model="mobileno" /><br />
        <div class="button-group">
          <button type="button" id="submit" @click="edit">Submit</button>
          <button type="button" id="cancel" @click="cancel">Cancel</button>
        </div>
      </form>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import custnav from '@/components/custnav.vue';

export default {
  name: 'editcustomerprofile',
  components: {
    custnav,
  },
  data() {
    return {
      name: null,
      city: null,
      pincode: null,
      mobileno: null,
      token: null,
      message: null,
      id: localStorage.getItem('id'),
    };
  },
  created() {
    this.token = localStorage.getItem('authtoken');
    if (!this.token) {
      this.$router.push('/login');
    }
    this.GetCustomer();
  },
  methods: {
    edit() {
      axios
        .put(
          `http://localhost:5002/api/editcustomer/${this.id}`,
          {
            name: this.name,
            city: this.city,
            pincode: this.pincode,
            mobileno: this.mobileno,
          },
          {
            headers: { Authorization: `${this.token}` },
          }
        )
        .then((response) => {
          this.message = response.data.message;
          if (response.status === 200) {
            alert('Updated Successfully!');
            this.$router.push('/customerdashboard');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    GetCustomer() {
      axios
        .get(`http://localhost:5002/api/getcustomer/${this.id}`, {
          headers: { Authorization: `${this.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            this.name = response.data.data.name;
            this.city = response.data.data.city;
            this.pincode = response.data.data.pincode;
            this.mobileno = response.data.data.mobno;
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cancel() {
      this.$router.push('/customerdashboard');
    },
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #eaf0f6;
  padding: 50px 0;
  min-height: 100vh;
}

.form {
  background-color: #ffffff;
  max-width: 450px;
  margin: auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 25px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 12px 20px;
  font-size: 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

#submit {
  background-color: #4caf50;
  color: white;
}

#cancel {
  background-color: #f44336;
  color: white;
}

button:hover {
  opacity: 0.95;
}

p {
  margin-top: 20px;
  color: #4caf50;
  font-weight: bold;
}
</style>
