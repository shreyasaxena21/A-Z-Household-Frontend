<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h3>👨‍🔧 Professional Dashboard</h3>
    </div>
    <div class="navbar-links">
      <router-link to="/professionaldashboard" class="nav-link" active-class="active">Home</router-link>
      <router-link to="/editprofessionalprofile" class="nav-link" active-class="active">Edit Profile</router-link>
      <button class="nav-link logout" @click="logout">Logout</button>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'pronav',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #7f00ff, #e100ff);
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-family: 'Georgia', 'Times New Roman', serif;
  color: white;
  flex-wrap: wrap;
}

.navbar-brand h3 {
  margin: 0;
  font-weight: bold;
  font-size: 1.4rem;
}

.navbar-links {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-link {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #ffffff;
  color: #7f00ff;
}

.nav-link.active {
  background-color: #f39c12;
  color: white;
}

.logout {
  background-color: #e74c3c;
}

.logout:hover {
  background-color: #c0392b;
  color: white;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .navbar-links {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }

  .nav-link {
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>
