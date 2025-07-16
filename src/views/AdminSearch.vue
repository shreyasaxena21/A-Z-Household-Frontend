
<template>
   <adminnav></adminnav>
    <div class="dashboard">
  

        <form class="search" @submit.prevent="search">
            <input type="text" v-model="this.search_word" class="input" placeholder="Search a professional"/><button class="search-button" @click="search()">Search</button>
        </form><br><br>
        <h2 v-if="search_word">Search Results for "{{ search_word }}"</h2>
        <table v-if="results && results.length" class="service-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Professional Name</th>
              <th>Email</th>
              <th>Loaction</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results" :key="result.id">
              <td>{{ result.service_type }}</td>
              <td>{{ result.name }}</td>
              <td>{{ result.email }}</td>
              <td>{{ result.location }}</td>
              <td>{{ result.experience }} years</td>
            </tr>
          </tbody>
        </table>
      <!-- <p v-else>No results found.</p> -->
      

       <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;">Service Professionals</h3>
      <table class="service-table">
        <thead>
          <tr>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Id</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Name</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Email</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Service Type</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Location</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Experience</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="active in active_prof" :key="active.id">
            <td>{{ active.id }}</td>
            <td>{{ active.name }}</td>
            <td>{{ active.email }}</td>
            <td>{{ active.service_type }}</td>
            <td>{{ active.location }}</td>
            <td>{{ active.experience }} Years</td>

            <td><button type="button" id="flag" @click="block(active.id)">Block</button></td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;">Blocked Users</h3>
      <table class="service-table">
        <thead>
          <tr>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Id</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Name</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Email</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Location</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u1 in blocked_user" :key="u1.id">
            <td>{{ u1.id }}</td>
            <td>{{ u1.name }}</td>
            <td>{{ u1.email }}</td>
            <td>{{ u1.location }}</td>


            <td><button type="button" id="unblock" @click="unblock(u1.id)">Unblock</button></td>
          </tr>
        </tbody>
      </table>

      

    </div>
  </template>
  
  <script>
import axios from 'axios';
import adminnav from '../components/adminnav.vue'
  
export default {
    name: "adminsearch",
    components : {
        adminnav

    },

    data() {
      return {
        search_word: null, 
        results: [], 
        token: null,
        active_prof:[],
        active_prof_id : null,
        blocked_user: []
      };
    },

    created() {
        this.token = localStorage.getItem('authtoken');
        if (!this.token) { 
          this.$router.push('/login');
        } else{
            console.log(this.token);
            this.fetchblockedUsers()
            this.fetchActiveProfessional()
        }
    },

    methods: {
        search(){
          if (!this.search_word) {
          alert("Please enter a search term.");
          }

            axios
          .get(`http://localhost:5002/api/adminsearch/${this.search_word}`, {
          },{
            headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.results = response.data.result;
              console.log('result:', this.results);

            if(this.results.length===0){
              alert("No User found!")
              location.reload()
            }
            }
          })
          .catch((error) => {
            console.log(error);
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

      fetchblockedUsers(){
        axios
        .get('http://localhost:5002/api/getblockedusers',{
          headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.blocked_user = response.data.data;
            }
          })
          .catch((error) => {
            console.log(error);
          });

      },

      unblock(id){
        axios
        .put(`http://localhost:5002/api/unblock/${id}`,{
              active : 1
        }, { 
              headers: { Authorization: `${this.token}` }
            })
            .then((response) => {
              if (response.status === 200) {
                alert("User Unblocked!")
                location.reload()
            }
                
            })
            .catch((error) => {
              console.log('Error approving professional:', error);
            });
      },

      block(id){
        axios
        .put(`http://localhost:5002/api/flaguser/${id}`,{
              active : 0
        }, { 
              headers: { Authorization: `${this.token}` }
            })
            .then((response) => {
              if (response.status === 200) {
                console.log('Professional approved:', response);}
                alert("User Blocked!")
                location.reload()
            })
            .catch((error) => {
              console.log('Error approving professional:', error);
            });
      },
      
    }
  }
    
  
  </script>
  
  <style scoped>
#dashboard {
  position: relative;
  padding: 20px;
  min-height: 100vh;
  background-image: url('@/assets/admin.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#dashboard::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to bottom right, rgba(255,255,255,0.85), rgba(240,248,255,0.85));
  backdrop-filter: blur(4px);
  z-index: 0;
}

#dashboard > * {
  position: relative;
  z-index: 1;
}


  
  h1 {
    font-size: 2.5rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Refined Table Styling */
.service-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Table Head */
.service-table th {
  background: linear-gradient(to right, #3a7bd5, #00d2ff);
  color: white;
  text-align: left;
  padding: 12px;
  font-weight: bold;
  font-family: Georgia, "Times New Roman", Times, serif;
  border-bottom: 2px solid #ddd;
}

/* Table Body Rows */
.service-table td {
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

/* Zebra striping for better readability */
.service-table tbody tr:nth-child(even) {
  background-color: #f8fafd;
}

.service-table tbody tr:hover {
  background-color: #f1faff;
  transition: background-color 0.2s ease-in-out;
}

.service-table button {
  font-size: 13px;
  padding: 6px 12px;
  transition: all 0.2s ease-in-out;
}


.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin: 20px auto 40px;
}

.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  width: 280px;
}

.search-button {
  background-color: #fcae27;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px 20px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #a48d26;
}

h2, h3 {
  margin: 30px 0 15px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #333;
}

/* Table Styling */
.service-table {
  width: 95%;
  max-width: 1200px;
  margin: 0 auto 40px auto;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-table th,
.service-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.service-table th {
  background-color: #3479ab;
  color: white;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1rem;
}

.service-table tr:nth-child(even) {
  background-color: #f6fcfd;
}

.service-table tr:hover {
  background-color: #eef8ff;
}

#flag, #unblock {
  padding: 6px 14px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#flag {
  background-color: #dc3545;
  color: white;
}

#flag:hover {
  background-color: #b02a37;
}

#unblock {
  background-color: #1bab24;
  color: white;
}

#unblock:hover {
  background-color: #0d7b14;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .input {
    width: 180px;
  }

  .search-button {
    padding: 10px 15px;
    font-size: 0.9rem;
  }

  .service-table {
    font-size: 0.9rem;
    width: 100%;
  }
}



  </style>
 