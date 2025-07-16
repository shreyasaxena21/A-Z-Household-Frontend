<template>
  <nav class="fancy-navbar">
    <div class="navbar-brand">
      <h1>Customer Dashboard</h1>
    </div>
    <div class="navbar-links">
      <router-link to="/customerdashboard" class="nav-link" active-class="active">🏠 Home</router-link>
      <router-link to="/customersearch" class="nav-link" active-class="active">🔍 Search</router-link>
      <router-link to="/editcustomerprofile" class="nav-link" active-class="active">👤 Edit Profile</router-link>
      <a @click="logout" class="nav-link logout">🚪 Logout</a>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'custnav',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');

.fancy-navbar {
  font-family: 'Rubik', sans-serif;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 20px 40px;
  margin: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  transition: background 0.6s ease-in-out;
}

.fancy-navbar:hover {
  background-image: linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%);
}

.navbar-brand h1 {
  color: white;
  font-size: 1.8rem;
  letter-spacing: 1px;
  margin: 0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.navbar-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  font-size: 1rem;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  color: #222;
}

.nav-link.active {
  background: #ffd166;
  color: #222;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(255, 209, 102, 0.4);
}

.nav-link.logout:hover {
  background: #ff6b6b;
  color: white;
}

/* Responsive layout */
@media (max-width: 768px) {
  .fancy-navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }

  .nav-link {
    width: 100%;
    text-align: left;
  }
}
</style>
