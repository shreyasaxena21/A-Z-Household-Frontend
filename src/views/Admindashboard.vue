<template>
    <adminnav></adminnav> 
    <div id="dashboard">
      
      <button type="button" id="export" style="font-family: Georgia, 'Times New Roman', Times, serif;" @click="triggercsv()">Export CSV</button>

        

      <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;">Customers</h3>
      <table class="service-table">
        <thead>
          <tr>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Id</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Name</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Email</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">City</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Mobile Number</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u1 in user" :key="u1.id">
            <td>{{ u1.id }}</td>
            <td>{{ u1.name }}</td>
            <td>{{ u1.email }}</td>
            <td>{{ u1.city }}</td>
            <td>{{ u1.mobno }}</td>

            <td><button type="button" id="flag" @click="block(u1.id)">Block</button></td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;">Service Professionals</h3>
      <table class="service-table">
        <thead>
          <tr>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Id</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Name</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Email</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Service Type</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Experience</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Location</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="active in active_prof" :key="active.id">
            <td>{{ active.id }}</td>
            <td>{{ active.name }}</td>
            <td>{{ active.email }}</td>
            <td>{{ active.service_type }}</td>
            <td>{{ active.experience }}</td>
            <td>{{ active.location }}</td>

            <td><button type="button" id="flag" @click="block(active.id)">Block</button></td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;">Professional Requests</h3>
      <table class="service-table">
        <thead>
          <tr>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Id</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Name</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Email</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Service</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Location</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Description</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Experience</th>
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prof in professional" :key="prof.id">
            <td>{{ prof.id }}</td>
            <td>{{ prof.name }}</td>
            <td>{{ prof.email }}</td>
            <td>{{ prof.service_type }}</td>
            <td>{{ prof.location }}</td>
            <td>{{ prof.description }}</td>
            <td>{{ prof.experience }} Years</td>
            
            <td><button type="button" id="approve" @click="approve(prof.id)">Approve</button></td>
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
            <th style="font-family: Georgia, 'Times New Roman', Times, serif;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u1 in blocked_user" :key="u1.id">
            <td>{{ u1.id }}</td>
            <td>{{ u1.name }}</td>
            <td>{{ u1.email }}</td>

            <td><button type="button" id="unblock" @click="unblock(u1.id)">Unblock</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import adminnav from '../components/adminnav.vue';
  
  export default {
    name: 'admindashboard',
    components: {
      adminnav,
    },
    data() {
      return {
        name: null,
        desc: null,
        price: null,
        time_required: null,
        token: null,
        message: null,
        service: [],
        service_id: null,
        user : [],
        user_id : null,
        professional : [],
        pro_id : null,
        active_prof : [],
        active_prof_id : null,
        active : null,
        is_approved : null,
        blocked_user: []

      };
    },
    created() {
      this.token = localStorage.getItem('authtoken');
      if (!this.token) {
        this.$router.push('/login');
      } else {
        this.fetchService();
        this.fetchUser();
        this.fetchProfessional();
        this.fetchActiveProfessional();
        this.fetchblockedUsers();
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
            if (response.status === 201) {
              console.log(response);
              this.fetchService();
              alert("Service deleted successfuly!")
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      fetchUser(){
        axios
          .get('http://localhost:5002/api/getusers', {
            headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.user = response.data.data;
              console.log('user:', this.user);
            }
          })
          .catch((error) => {
            console.log(error);
          });

      },

      fetchProfessional(){
        axios
        .get('http://localhost:5002/api/getprofessional',{
          headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.professional = response.data.data;
              console.log('professional:', this.professional);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      approve(id) {
          axios
            .put(`http://localhost:5002/api/approveprofessional/${id}`,{
                is_approved : 1,
                active : 1
            }, { 
              headers: { Authorization: `${this.token}` }
            })
            .then((response) => {
              if (response.status === 200) {
                console.log('Professional approved:', response);}
                alert("Professional Approved successfully!")
                location.reload();
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
      triggercsv(){
        axios
        .get('http://localhost:5002/triggerexport',{
          headers: { Authorization: `${this.token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              alert('You will get the mail soon!')
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
    }
  };
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


#approve{
  background-color: #1bab24;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

#approve:hover{
  background-color: #0d7b14;
}

#addservice{
  color: whitesmoke;
  background-color:#3c79b9;
  border-radius: 5px;
}

#flag {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

#flag:hover {
  background-color: #b02a37;
}

#unblock {
  background-color: #1bab24;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

#unblock:hover {
  background-color: #0d7b14;
}

  /* Responsive table */
  @media (max-width: 768px) {
    .service-table {
      font-size: 14px;
    }
  
    .service-table th,
    .service-table td {
      padding: 10px;
    }
  
    .dashboard-container {
      padding: 10px;
    }
  
    h1 {
      font-size: 2rem;
    }

  }

  #export {
  background-color: #ad535c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
}

#export:hover {
  background-color: #b02a37;
}

</style>
  