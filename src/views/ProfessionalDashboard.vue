<template>
  <pronav></pronav>
  <div class="dashboard">
    <h2>Welcome, {{ name }}</h2>

    <h3 class="section-title">Customer Requests</h3>
    <table class="service-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Customer Name</th>
          <th>Location</th>
          <th>Pincode</th>
          <th>Message</th>
          <th>Date of Completion</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in customer_request" :key="request.id">
          <td>{{ request.id }}</td>
          <td>{{ request.cust_name }}</td>
          <td>{{ request.cust_city }}</td>
          <td>{{ request.pincode }}</td>
          <td>{{ request.message }}</td>
          <td>{{ request.date_of_completion }}</td>
          <td>
            <button class="btn accept" @click="accept(request.id)">Accept</button>
            <button class="btn reject" @click="reject(request.id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="section-title">Accepted/Completed Requests</h3>
    <table class="service-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Customer Name</th>
          <th>Location</th>
          <th>Pincode</th>
          <th>Message</th>
          <th>Date of Completion</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in accepted_request" :key="request.id">
          <td>{{ request.id }}</td>
          <td>{{ request.cust_name }}</td>
          <td>{{ request.cust_city }}</td>
          <td>{{ request.pincode }}</td>
          <td>{{ request.message }}</td>
          <td>{{ request.date_of_completion }}</td>
          <td>{{ request.service_status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import pronav from '../components/pronav.vue';
export default {
  name: "professionaldashboard",
  components: { pronav },
  data() {
    return {
      id: localStorage.getItem('id'),
      token: null,
      customer_request: [],
      accepted_request: [],
      name: localStorage.getItem('name')
    };
  },
  created() {
    this.token = localStorage.getItem('authtoken');
    if (!this.token) {
      this.$router.push('/login');
    } else {
      this.fetchCustomerRequests();
      this.fetchAcceptedRequests();
    }
  },
  methods: {
    fetchCustomerRequests() {
      axios
        .get(`http://localhost:5002/api/customerrequest/${this.id}`, {
          headers: { Authorization: `${this.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            this.customer_request = response.data.data;
          }
        })
        .catch(console.log);
    },
    accept(id) {
      axios
        .put(`http://localhost:5002/api/acceptrequest/${id}`, {
          service_status: "Assigned"
        }, {
          headers: { Authorization: `${this.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Request Accepted!");
            location.reload();
          }
        })
        .catch(console.log);
    },
    reject(id) {
      axios
        .put(`http://localhost:5002/api/rejectrequest/${id}`, {
          service_status: "Rejected"
        }, {
          headers: { Authorization: `${this.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Request Rejected!");
            location.reload();
          }
        })
        .catch(console.log);
    },
    fetchAcceptedRequests() {
      axios
        .get(`http://localhost:5002/api/acceptedrequests/${this.id}`, {
          headers: { Authorization: `${this.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            this.accepted_request = res.data.data;
          }
        })
        .catch(console.log);
    }
  }
};
</script>

<style scoped>

.dashboard {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f9;
  padding: 40px;
  min-height: 100vh;
}

h2 {
  color: #4a148c;
  margin-bottom: 20px;
}

.section-title {
  color: #861996;
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin-top: 40px;
  margin-bottom: 15px;
}

/* Table Styling */
.service-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.service-table th,
.service-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.service-table th {
  background-color: #861996;
  color: white;
}

.service-table tr:hover td {
  background-color: #f0f0f0;
}

/* Buttons */
.btn {
  padding: 6px 14px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: white;
}

.btn.accept {
  background-color: #2ecc71;
}

.btn.accept:hover {
  background-color: #27ae60;
}

.btn.reject {
  background-color: #e74c3c;
}

.btn.reject:hover {
  background-color: #c0392b;
}

</style>