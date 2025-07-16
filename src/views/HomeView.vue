<template>
  <div class="dashboard">
    <homenav />

    <div class="home-content">
      <h1 class="main-title">Explore Our Services</h1>

      <!-- Card Row -->
      <div class="card-container">
        <div
          class="service-card fade-in"
          v-for="(service, index) in services"
          :key="service.name"
          :style="{ animationDelay: `${index * 0.3}s` }"
        >
          <img
            :src="require(`@/assets/${service.image}`)"
            :alt="service.name"
            class="card-img"
          />
          <div class="card-content">
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- Section after cards -->
      <div class="after-section">
        <h2>Why Choose A-Z Household Services?</h2>
        <p>
          Our platform connects you with certified, skilled, and verified service
          providers near you — making home maintenance easier than ever.
        </p>
        <ul>
          <li>✔ Trusted Professionals with Verified Backgrounds</li>
          <li>✔ Transparent Pricing & Instant Bookings</li>
          <li>✔ 24/7 Customer Support</li>
          <li>✔ Satisfaction Guaranteed</li>
        </ul>
        <button class="cta-btn" @click="$router.push('/register')">
          Get Started Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import homenav from '../components/homenav.vue';

export default {
  name: 'HomeView',
  components: {
    homenav
  },
  data() {
    return {
      services: [
        {
          name: 'Plumbing',
          image: 'plumbing.png',
          description:
            'Leak repairs, pipe installations, drain unclogging, and more.'
        },
        {
          name: 'Electrical',
          image: 'electrical.png',
          description:
            'Wiring, lighting installation, and electrical maintenance.'
        },
        {
          name: 'Cleaning',
          image: 'cleaning.png',
          description:
            'Deep cleaning, carpet care, and regular housekeeping.'
        },
        {
          name: 'AC Repairing',
          image: 'acrepairing.png',
          description:
            'Installation, maintenance, and repair of air conditioning systems.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #f5faff;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-image: url('@/assets/home.png');
  background-size: cover;
  /* background-position: center; */
}

.home-content {
  padding: 40px 20px;
  max-width: 1300px;
  margin: auto;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
  font-weight: bold;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.service-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 280px;
  transition: all 0.3s ease;
  overflow: hidden;
  opacity: 0; /* Start hidden for animation */
  animation: fadeInUp 0.8s ease forwards;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.card-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  font-size: 1.4rem;
  color: #0077b6;
  margin-bottom: 10px;
}

.card-content p {
  font-size: 0.95rem;
  color: #555;
}

/* Additional Section */
.after-section {
  margin-top: 60px;
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.after-section h2 {
  font-size: 2rem;
  color: #1b4965;
  margin-bottom: 20px;
}

.after-section p {
  font-size: 1rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto 20px;
}

.after-section ul {
  list-style: none;
  padding: 0;
  margin: 0 auto 30px;
  max-width: 600px;
}

.after-section ul li {
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
  text-align: left;
}

.cta-btn {
  background-color: #0077b6;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-btn:hover {
  background-color: #023e8a;
}

/* Animation Keyframes */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .service-card {
    width: 90%;
  }

  .after-section h2 {
    font-size: 1.6rem;
  }
}
</style>
