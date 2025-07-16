<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h4 class="dashboard-title">Admin Dashboard</h4>
    </div>
    <div class="navbar-links">
      <router-link to="/admindashboard" class="nav-link" active-class="active">Home</router-link>
      <router-link to="/service" class="nav-link" active-class="active">Service</router-link>
      <router-link to="/adminsearch" class="nav-link" active-class="active">Search</router-link>
      <router-link to="/showadminsstats" class="nav-link" active-class="active">Summary</router-link>
      <a @click="logout" class="nav-link logout">Logout</a>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'adminnav',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  background: rgba(45, 52, 54, 0.8);
  backdrop-filter: blur(12px);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  height: 60px;
  border-radius: 0 0 12px 12px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.dashboard-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fdfdfd;
  letter-spacing: 0.5px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-link:hover {
  background-color: #f1c40f;
  color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-link.active {
  background-color: #e67e22;
  color: #ffffff;
  font-weight: 600;
}

.nav-link.logout {
  background-color: rgba(231, 76, 60, 0.85);
}

.nav-link.logout:hover {
  background-color: #c0392b;
  color: white;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 15px;
  }

  .navbar-links {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
  }

  .nav-link {
    width: 100%;
    text-align: left;
  }
}
</style>
