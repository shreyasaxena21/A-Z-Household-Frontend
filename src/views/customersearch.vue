<template>
  <custnav></custnav>
  <div class="dashboard">
    <div class="search-container">
      <form @submit.prevent="search">
        <input type="text" v-model="search_by_loc" class="input" placeholder="Search by location" />
        <input type="text" v-model="search_by_service_type" class="input" placeholder="Search by service type" />
        <button class="search-button" type="submit">Search</button>
      </form>
    </div>

    <h2 v-if="search_word">Search Results for "{{ search_word }}"</h2>

    <table v-if="results && results.length" class="service-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Professional Name</th>
          <th>Email</th>
          <th>Location</th>
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

    <h3>All Active Service Professionals</h3>
    <table class="service-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Service Type</th>
          <th>Experience</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="active in active_prof" :key="active.id">
          <td>{{ active.id }}</td>
          <td>{{ active.name }}</td>
          <td>{{ active.email }}</td>
          <td>{{ active.location }}</td>
          <td>{{ active.service_type }}</td>
          <td>{{ active.experience }} Years</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import custnav from '../components/custnav.vue';

export default {
  name: "customersearch",
  components: {
    custnav
  },
  data() {
    return {
      search_by_loc: null,
      search_by_service_type: null,
      results: [],
      token: null,
      active_prof: [],
      search_word: null
    };
  },
  created() {
    this.token = localStorage.getItem('authtoken');
    if (!this.token) {
      this.$router.push('/login');
    } else {
      this.fetchActiveProfessional();
    }
  },
  methods: {
    search() {
      if (!this.search_by_loc && !this.search_by_service_type) {
        alert("Please enter a location or service type to search.");
        return;
      }

      this.search_word = this.search_by_loc || this.search_by_service_type;

      let query = this.search_by_loc || this.search_by_service_type;

      this.fetchSearchResults(query);
    },

    fetchSearchResults(query) {
      axios
        .get(`http://localhost:5002/api/custsearch/${query}`, {
          headers: { Authorization: `${this.token}` }
        })
        .then((response) => {
          if (response.status === 200) {
            this.results = response.data.result;
            if (this.results.length === 0) {
              alert("No User found!");
              location.reload();
            }
          }
        })
        .catch((error) => {
          console.log("Error fetching search results:", error);
        });
    },

    fetchActiveProfessional() {
      axios
        .get('http://localhost:5002/api/getactiveprof', {
          headers: { Authorization: `${this.token}` }
        })
        .then((response) => {
          if (response.status === 200) {
            this.active_prof = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #eaf8fb;
}

.search-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 250px;
  font-size: 1em;
}

.search-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.service-table {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-table th,
.service-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.service-table th {
  background-color: #17a2b8;
  color: white;
  font-weight: bold;
}

.service-table tr:nth-child(even) td {
  background-color: #f8f9fa;
}

.service-table tr:hover td {
  background-color: #e2f1f8;
}

h2,
h3 {
  font-family: 'Georgia', 'Times New Roman', serif;
  margin-top: 30px;
  color: #333;
}
</style>
