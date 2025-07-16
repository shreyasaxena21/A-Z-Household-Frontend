<template>
  <custnav></custnav>
  <div class="dashboard">
    <h2 class="welcome">👋 Welcome, {{ name }}</h2>

    <!-- Active Service Professionals -->
    <section>
      <h3 class="section-title">⚡ Active Service Professionals</h3>
      <div class="card-grid">
        <div v-for="active in active_prof" :key="active.id" class="card">
          <h4>{{ active.name }}</h4>
          <p><strong>Email:</strong> {{ active.email }}</p>
          <p><strong>Service:</strong> {{ active.service_type }}</p>
          <p><strong>Location:</strong> {{ active.location }}</p>
          <p><strong>Experience:</strong> {{ active.experience }} years</p>
          <div class="form-group">
            <input type="text" v-model="active.message" placeholder="Enter message" />
            <input type="date" v-model="active.date_of_completion" />
          </div>
          <button class="btn-book" @click="createServiceRequest(active.id, active.message, active.date_of_completion, active.service_type)">📅 Book</button>
        </div>
      </div>
    </section>

    <!-- Service Requests -->
    <section>
      <h3 class="section-title">📋 Current Service Requests</h3>
      <div class="card-grid">
        <div v-for="request in service_request" :key="request.id" class="card">
          <h4>{{ request.prof_name }} — {{ request.service_name }}</h4>
          <p><strong>Requested on:</strong> {{ request.date_of_request }}</p>
          <p><strong>Message:</strong> {{ request.message }}</p>
          <p><strong>Status:</strong> {{ request.service_status }}</p>
          <p><strong>Completion:</strong> {{ request.date_of_completion }}</p>
          <div class="action-links">
            <router-link :to="{ name: 'updateservicerequest', params: { id: request.id } }" class="btn-edit">✏️ Edit</router-link>
            <router-link :to="{ name: 'closeservicerequest', params: { id: request.id } }" class="btn-close">❌ Close</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Completed Service Requests -->
    <section>
      <h3 class="section-title">✅ Past Service Requests</h3>
      <div class="card-grid">
        <div v-for="request in completed_service_request" :key="request.id" class="card">
          <h4>{{ request.prof_name }} — {{ request.service_name }}</h4>
          <p><strong>Requested on:</strong> {{ request.date_of_request }}</p>
          <p><strong>Remarks:</strong> {{ request.remarks }}</p>
          <p><strong>Status:</strong> {{ request.service_status }}</p>
          <p><strong>Completed on:</strong> {{ request.date_of_completion }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

  
<script>
import custnav from '../components/custnav.vue'
import addservicerequest from './UpdateServiceRequest.vue'
import axios from 'axios';
export default{
    name : "customerdashboard",
    components: {
      addservicerequest,
      custnav
    },
    data() {
      return {
        customer_id : localStorage.getItem('id'),
        token: null,
        message: null,
        date_of_completion: null,
        service: [],
        service_id: null,
        active_prof : [],
        active_prof_id : null,
        service_request : [],
        service_request_id : null,
        completed_service_request : [],
        completed_service_request_id : null,
        name : localStorage.getItem('name')
      };
    },
    created() {
      this.token = localStorage.getItem('authtoken');
      if (!this.token) {
        this.$router.push('/login');
      } else {
        this.fetchActiveProfessional();
        this.fetchService()
        this.fetchServiceRequests();
        this.fetchCompletedRequests();
      }
    },
    methods: {
      createServiceRequest(professionalId, message, date_of_completion, service_type) {
        console.log('Customer ID:', this.customer_id);
        console.log('Service Type:', service_type);
        console.log('Professional ID:', professionalId);
        console.log('Message:', message);
        console.log('Date of Completion:', date_of_completion);  
        // console.log(`Booking professional with ID: ${professionalId}, Message: ${message}, date_of_completion : ${date_of_completion}`);
          axios
          .post('http://localhost:5002/api/createservicerequest', 
            {
              professional_id: professionalId,
              message: message,
              date_of_completion : date_of_completion,
              service_type : service_type,
              customer_id : this.customer_id
            },
            {
              headers: { Authorization: `${this.token}` },
            }
          )
          .then(response => {
            if (response.status === 201) {
              console.log(response.data);
              alert("Service booked successfully!");
              location.reload();
            }
          })
          .catch(error => {
            console.error("Error booking service:", error);
          });
        },



      fetchActiveProfessional(){
        axios
        .get('http://localhost:5002/api/getactiveprof',{
          headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.active_prof = response.data.data;
              console.log('active_prof:', this.active_prof);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      fetchService() {
        axios
          .get('http://localhost:5002/api/service', {
            headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.service = response.data.data;
              
              console.log('service:', this.service);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      
       fetchServiceRequests(){
        axios
          .get(`http://localhost:5002/api/servicerequest/${this.customer_id}`, {
            headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.service_request = response.data.data;
              
              console.log('service:', this.service);
            }
          })
          .catch((error) => {
            console.log(error);
          });

       },

       fetchCompletedRequests(){
        axios
          .get('http://localhost:5002/api/completedservicerequest', {
            headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.completed_service_request = response.data.data;
            }
          })
          .catch((error) => {
            console.log(error);
          });

       }
    },
    mounted() {
    this.active_prof = this.active_prof.map(prof => ({
      ...prof,
      message: "",
      date_of_completion: "",
    }));
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');

.dashboard {
  font-family: 'Rubik', sans-serif;
  padding: 30px;
  background: linear-gradient(to right, #fdfbfb, #ebedee);
  min-height: 100vh;
}

.welcome {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.section-title {
  font-size: 1.6rem;
  margin: 40px 0 20px;
  text-align: center;
  color: #34495e;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 24px;
}

.card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.card h4 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.card p {
  margin: 6px 0;
  color: #555;
}

.form-group {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group input[type="text"],
.form-group input[type="date"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
}

.btn-book {
  margin-top: 10px;
  padding: 10px 16px;
  background-color: #00b894;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-book:hover {
  background-color: #019874;
}

.action-links {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-close {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  color: white;
  transition: background 0.3s ease;
}

.btn-edit {
  background-color: #6c5ce7;
}

.btn-edit:hover {
  background-color: #4834d4;
}

.btn-close {
  background-color: #d63031;
}

.btn-close:hover {
  background-color: #c0392b;
}



</style>