<template>
   <adminnav></adminnav>
  <div class="dashboard">
   
    <div class="graphs-container">
      <h2 class="graphs-heading">Statistics</h2>

      <div class="graphs-row">
        <div v-if="pieChartImage" class="graph-card">
          <img :src="pieChartImage" alt="Services Pie Chart" class="graph-image" />
        </div>
        <div v-if="histogramImage" class="graph-card">
          <img :src="histogramImage" alt="Service Request Bar Graph" class="graph-image" />
        </div>
      </div>

      <div class="graphs-row">
        <div v-if="barGraphImage" class="graph-card">
          <img :src="barGraphImage" alt="Users Bar Graph" class="graph-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import adminnav from "../components/adminnav.vue";

export default {
  name: "adminstats",
  components: {
    adminnav,
  },
  data() {
    return {
      token: null,
      pieChartImage: "",
      histogramImage: "",
      barGraphImage: "",
    };
  },

  created() {
    this.token = localStorage.getItem("authtoken");
    if (!this.token) {
      this.$router.push("/login");
    } else {
      this.fetchStatistics();
    }
  },

  methods: {
    fetchStatistics() {
      axios
        .get("http://localhost:5002/api/showstats", {
          headers: { Authorization: `${this.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            this.pieChartImage = `data:image/png;base64,${response.data.pie_chart}`;
            this.histogramImage = `data:image/png;base64,${response.data.histogram}`;
            this.barGraphImage = `data:image/png;base64,${response.data.bar_graph}`;
          }
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        });
    },
  },
};
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  padding: 30px 20px;
  background-color: rgb(166, 239, 247);
  background-image: url('@/assets/admin.jpg');
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  overflow-x: hidden;
}

.graphs-container {
  margin-top: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.graphs-heading {
  font-size: 32px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: #2c3e50;
  margin-bottom: 40px;
  text-align: center;
  text-shadow: 1px 1px 2px #ccc;
}

.graphs-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}

.graph-card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  max-width: 45%;
  min-width: 300px;
  flex: 1 1 45%;
}

.graph-image {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.graph-image:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .graph-card {
    max-width: 90%;
    flex: 1 1 90%;
  }

  .graphs-heading {
    font-size: 24px;
  }
}
</style>
