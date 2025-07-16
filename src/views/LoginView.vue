<template>
  <homenav></homenav>
  <div class="panel">
    <!-- Image section -->
    <div class="image-container">
      <img src="@/assets/login.png" alt="Login Illustration" />
    </div>

    <!-- Login form section -->
    <div class="container">
      <h1>User Login</h1>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            name="email"
            v-model="this.email"
            placeholder="Enter email"
          /><br />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            v-model="this.password"
            placeholder="Password"
          />
        </div>
        <br />
        <button type="button" @click="login_fn" class="btn btn-success">
          Login
        </button>
      </form>
      <br />
      <div v-if="errorMessage" id="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import homenav from '../components/homenav.vue';

export default {
  name: "login",
  components: {
    homenav
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      role: null
    };
  },
  methods: {
    login_fn() {
      axios
        .post("http://localhost:5002/api/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.status == 200) {
            localStorage.setItem('authtoken', response.data.token)
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('name', response.data.name)

            this.role = response.data.role;
          }
        })
        .catch(error => {
          this.errorMessage = error.response?.data?.message;
        })
        .finally(() => {
          switch (this.role) {
            case 'admin':
              this.$router.push('/admindashboard');
              break;
            case 'service_professional':
              this.$router.push('/professionaldashboard');
              break;
            case 'customer':
              this.$router.push('/customerdashboard');
              break;
            default:
              this.$router.push('/login');
          }
        });
    }
  }
};
</script>

<style scoped>

.panel {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  padding: 40px;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  width: 600px;
  height: 700px;
  max-width: 100%;
}


.container {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px 30px; /* more internal padding */
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  backdrop-filter: blur(6px);
  border: 2px solid #e1e1e1;
  animation: fadeInRight 0.6s ease-in-out;
  margin-top: 0; /* no vertical centering */
}

h1 {
  font-size: 2rem;
  margin-bottom: 25px;
  color: #1b0534;
  font-weight: 600;
}

/* Form Elements */
.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px 2px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  margin-bottom: 18px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #198754;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #145c3c;
}

#error-message {
  color: red;
  margin-top: 10px;
  font-weight: 500;
}

/* Animation */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .panel {
    justify-content: center;
    padding: 40px 20px 0 20px;
    align-items: flex-start;
  }

  .container {
    width: 90%;
    margin-top: 0;
  }
}

</style>