<template>
  <nav class="navbar">
    <div class="navbar-links">
      <h4 class="site-title">A-Z Household Services</h4>
      <div class="links">
        <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        <router-link to="/Register" class="nav-link" active-class="active">Register</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'homenav',
};
</script>

<style scoped>
/* Font setup */
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

/* Navbar container */
.navbar {
  background: linear-gradient(135deg, #00bcd4, #3f51b5);
  padding: 8px 20px; /* reduced padding */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-height: 20px; /* optional: control minimum height */
}

.site-title {
  font-size: 1.3rem; /* slightly smaller title */
  font-weight: bold;
  letter-spacing: 0.5px;
  margin-right: 30px;
}

/* Nav links container */
.navbar-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.links {
  display: flex;
  gap: 15px;
}

/* Nav link styles */
.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.15);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-link:hover {
  background-color: #ffc107;
  color: #1a237e;
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: #ff9800;
  font-weight: bold;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-title {
    margin-bottom: 5px;
  }

  .links {
    flex-direction: column;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: left;
    padding: 12px;
    border-radius: 10px;
  }
}
</style>
