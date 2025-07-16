<template>
       <pronav></pronav>
  <div class="dashboard">
 
    <div class="form">
      <h1>Edit Customer with ID: {{ this.id }}</h1>
      <form>
        <input type="text" placeholder="Professional name" v-model="this.name"><br><br>
        <input type="text" placeholder="Professional Service Type" v-model="this.service_type"><br><br>
        <input type="number" placeholder="Professional experience" v-model="this.experience"><br><br>
        <button type="button" id="submit" @click="edit()">Submit</button> 
        <button type="button" id="cancel" @click="cancel()"> Cancel</button>
      </form>
      <p>{{ this.message }}</p>
    </div> 
  </div>   
</template>

<script>
import axios from 'axios';
import pronav from '@/components/pronav.vue'
export default {
  name: 'editprofessionalprofile',
  components: {
    pronav
  },
  data() {
    return {
      name: null,
      service_type: null,
      experience: null,
      token: null,
      message: null,
      id: localStorage.getItem('id')
    }
  },
  created() {
    this.token = localStorage.getItem('authtoken')
    if (!this.token) {
      this.$router.push('/login')
    }
    this.GetProfessional()
  },
  methods: {
    edit() {
      axios
        .put(`http://localhost:5002/api/editprofessional/${this.id}`,
          {
            name: this.name,
            service_type: this.service_type,
            experience: this.experience,
          },
          { headers: { Authorization: `${this.token}` } }
        )
        .then(response => {
          this.message = response.data.message
          if (response.status == 200) {
            alert('Updated Successfully!')
            this.$router.push('/professionaldashboard')
          }
        })
        .catch(error => {
          console.log(error);
        })
    },

    GetProfessional() {
      axios
        .get(`http://localhost:5002/api/getprofessional/${this.id}`,
          { headers: { Authorization: `${this.token}` } }
        )
        .then(response => {
          if (response.status == 200) {
            this.name = response.data.data.name
            this.service_type = response.data.data.service_type
            this.experience = response.data.data.experience
          }
        })
        .catch(error => {
          console.log(error);
        })
    },

    cancel() {
      this.$router.push('/professionaldashboard');
    }
  }
}
</script>

<style scoped>
.dashboard {
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f0f4f8; /* High contrast background */
  padding: 30px;
  min-height: 100vh;
}

.form {
  max-width: 450px;
  margin: 30px auto;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8em;
  color: #2c3e50;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input,
button {
  margin: 10px 0;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #bbb;
  border-radius: 5px;
}

#submit {
  cursor: pointer;
  background-color: #2e8b57;
  color: white;
  border: none;
}

#cancel {
  background-color: #dc3545;
  color: white;
  border: none;
}

button:hover {
  opacity: 0.95;
}

p {
  color: #2e8b57;
  font-size: 1em;
  margin-top: 15px;
}
</style>
