<template>
    <homenav></homenav>
  <div class="panel">

    <!-- FORM SIDE -->
    <div class="container">
      <h2>Register as a</h2>
      <label for="role">Select Role : </label>
      <select v-model="role" @change="handleRoleChange">
        <option value="" disabled>Select a role</option>
        <option value="customer">Customer</option>
        <option value="service_professional">Service Professional</option>
      </select>

      <!-- Customer Registration -->
      <div v-if="role === 'customer'">
        <h3>Customer Registration</h3>
        <form @submit.prevent="submitCustomerForm">
          <input type="text" v-model="customerData.name" placeholder="Name" required />
          <input type="text" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <input type="text" v-model="customerData.city" placeholder="City" required />
          <input type="text" v-model="customerData.pincode" placeholder="Pincode" required />
          <input type="text" v-model="customerData.mobileNo" placeholder="Mobile No" required />
          <button type="button" @click="register_fn">Register</button>
        </form>
      </div>

      <!-- Service Professional Registration -->
      <div v-else-if="role === 'service_professional'">
        <h3>Service Professional Registration</h3>
        <form @submit.prevent="submitServiceProfessionalForm">
          <input type="text" v-model="service_professionalData.name" placeholder="Name" required />
          <input type="text" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <input type="text" v-model="service_professionalData.experience" placeholder="Experience" required />
          <input type="text" v-model="service_professionalData.serviceType" placeholder="Service Type" required />
          <input type="text" v-model="service_professionalData.description" placeholder="Description" required />
          <input type="text" v-model="service_professionalData.location" placeholder="Location" required />
          <button type="button" @click="register_fn">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import homenav from '../components/homenav.vue'

export default {
  name: 'register',
  components:{
     homenav
  },
  data() {
    return {
      role: null,
      email : null,
      password : null,
     
      customerData: {
        name: null,
        city: null,
        pincode: null ,
        mobileNo: null
      },
      service_professionalData: {
        name: null ,
        experience: null ,
        serviceType: null ,
        description: null ,
        location : null,
        // image : null
      }
    };
  },

  methods: {
    // addFile(e){
    //     this.service_professionalData.image = e.target.files[0];
    //     console.log(this.service_professionalData.image);
        

    // },

    register_fn() {
        let formData = new FormData();
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('role', this.role)
       
        if (this.role === "customer") {
          formData.append('name', this.customerData.name)
          formData.append('city', this.customerData.city)
          formData.append('pincode', this.customerData.pincode)
          formData.append('mobileNo', this.customerData.mobileNo)
        
        } else if (this.role === "service_professional") {
            formData.append('name', this.service_professionalData.name)
            formData.append('experience', this.service_professionalData.experience)
            formData.append('serviceType', this.service_professionalData.serviceType)
            formData.append('description', this.service_professionalData.description)
            formData.append('location', this.service_professionalData.location)
            formData.append('documents', this.service_professionalData.documents)
            // formData.append('image', this.service_professionalData.image)
      
        }

        axios
          .post("http://localhost:5002/api/register", formData)
          .then((response) => {
            console.log(response.data.message);
            if (response.status == 201) {
              this.$router.push("/login");
            }
          })
          .catch((error) => {
            console.log("Caught error: " + error);
          });
      }
      }
      }

</script>

<style scoped>
.panel {
  display: flex;
  height: 100vh;
  background-color: #e8f0f5;
  background-image: url('@/assets/register.png');
  align-items: center;
  justify-content: center;
  gap: 60px;
  padding: 40px;
  box-sizing: border-box;
}

/* FORM STYLING */
.container {
  flex: 1;
  max-width: 500px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.5s ease-in-out;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.6rem;
  color: #1b0534;
  font-weight: 600;
}

h3 {
  font-size: 1.2rem;
  color: #0d5176;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
}

input,
select {
  margin-bottom: 12px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 12px;
  color: white;
  background-color: #0d9b24;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background-color: #00b306;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .panel {
    flex-direction: column;
    padding: 20px;
  }

  .image-container {
    margin-bottom: 20px;
  }

  .container {
    width: 100%;
    max-width: 90%;
  }
}
</style>