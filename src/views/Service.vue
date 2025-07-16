<template>
  <adminnav></adminnav>
  <div class="dashboard">
    <h3 class="dashboard-title">Services</h3>

    <div class="card-container">
      <div v-for="serv in service" :key="serv.id" class="service-card">
        <h4>{{ serv.name }}</h4>
        <p><strong>Description:</strong> {{ serv.description }}</p>
        <p><strong>Time Required:</strong> {{ serv.time_required }} Hours</p>
        <p><strong>Price:</strong> ₹{{ serv.price }}</p>

        <div class="card-actions">
          <router-link :to="{ name: 'updateService', params: { id: serv.id } }" class="btn update-btn">Update</router-link>
          <button v-if="!serv.delete" @click="deleteservice(serv.id)" class="btn delete-btn">Delete</button>
        </div>
      </div>
    </div>

    <router-link to="/addService" class="btn add-btn">Add New Service</router-link>
  </div>
</template>

  
  <script>
  import adminnav from '../components/adminnav.vue';
  import addService from '../views/AddService.vue';
  import axios from 'axios';
  export default{
    components: { adminnav },
    name: 'service',
    data() {
      return {
        token: null,
        message: null,
        service: [],
        service_id: null,
      };
    },
    created() {
      this.token = localStorage.getItem('authtoken');
      if (!this.token) {
        this.$router.push('/login');
      } else {
        this.fetchService();
      }
    },
    methods: {
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
      deleteservice(id) {
        axios
          .delete(`http://localhost:5002/api/service/${id}`, {
            headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              this.fetchService();
              alert("Service deleted successfully!")
              location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }
  }
  </script>
  
  <style scoped>
.dashboard {
  position: relative;
  min-height: 100vh;
  padding: 40px 30px;
  text-align: center;
  background-image: url('@/assets/admin.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.dashboard::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.85), rgba(230, 250, 255, 0.85));
  backdrop-filter: blur(4px);
  z-index: 0;
}

.dashboard > * {
  position: relative;
  z-index: 1;
}

.dashboard-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px 25px;
  justify-items: center;
  padding: 0 10px;
  margin-bottom: 40px; /* space below cards */
}

.service-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px 18px;
  width: 100%;
  max-width: 340px;
  text-align: left;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-6px);
}

.service-card h4 {
  font-size: 1.4rem;
  color: #2a5d8f;
  margin-bottom: 10px;
}

.service-card p {
  margin: 5px 0;
  font-size: 1rem;
  line-height: 1.4;
}

.card-actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  padding: 8px 14px;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;
  text-align: center;
}

.update-btn {
  background-color: #4CAF50;
}

.update-btn:hover {
  background-color: #357a38;
}

.delete-btn {
  background-color: #e53935;
}

.delete-btn:hover {
  background-color: #b71c1c;
}

.add-btn {
  display: inline-block;
  margin-top: 20px;
  background-color: #007bff;
  padding: 12px 24px;
  font-size: 1rem;
}

.add-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem;
  }

  .card-container {
    grid-template-columns: 1fr;
  }

  .add-btn {
    padding: 10px 20px;
  }
}

  </style>
  