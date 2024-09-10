<template>
  <div>
    <!-- Header -->
    <header id="header" class="header custom-header d-flex align-items-center fixed-top">
      <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <div class="logo d-flex align-items-center">
          <h1 class="sitename"><strong>TIKITI ZOTE</strong></h1>
        </div>

        <nav id="navmenu" class="navmenu">
          <ul>
            <li><router-link to="/" class="active">Home</router-link></li>
            <li><a href="">Tickets</a></li>

            <li><router-link to="/admin/login" class="btn-login">Login</router-link></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>

    <main class="main mt-5">
     
      <!-- Tickets Section -->
      <section id="tickets" class="tickets section">
        <div class="container section-title" data-aos="fade-up">
          <h2>Available Tickets</h2>
          <p>Check out amazing destinations!</p>
        </div>

        <div class="container">
          <div class="row">
            <!-- Loop through the tours and display them dynamically -->
            <div v-for="tour in tours" :key="tour.id" class="col-lg-4 col-md-6 ticket-item">
              <div class="ticket-content">
                <img :src="getImageUrl(tour.image)" class="img-fluid" alt="Tour Image">
                <div class="ticket-info">
                  <h4 class="ticket-name">
                    <i class="fas fa-tag"></i> {{ tour.name }}
                  </h4>
                  <p class="destination">
                    <i class="fas fa-map-marker-alt"></i> Destination: {{ tour.destination.name }}
                  </p>
                  <p class="price">
                    <i class="fas fa-money-bill-wave"></i> Price: Ksh {{ tour.price }}
                  </p>
                  <p class="date">
                    <i class="fas fa-calendar-day"></i> Date: {{ tour.date }}
                  </p>
                  <p>
                    <i class="fas fa-ticket-alt"></i> <strong>Remaining slots:</strong> {{ tour.available_slots }}
                  </p>


                  <router-link :to="{ name: 'TourDetails', params: { id: tour.id } }" class="btn-book-now">Book
                    Now</router-link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Scroll Top Button -->
    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center">
      <i class="bi bi-arrow-up-short"></i>
    </a>
  </div>
</template>
<script>
import apiClient from '@/utils/apiClient'; // Import apiClient from the correct path

export default {
  name: 'LandingPage',
  data() {
    return {
      tours: [], // Store tours data here
      sliders: [], // Store slider data here
      newTour: {
        destination_id: '',
        name: '',
        description: '',
        price: '',
        slots: '',
        date: '',
        image: null,
      },
    };
  },
  methods: {
    // Fetch tours from the API
    fetchTours() {
      apiClient
        .get('/tours')
        .then((response) => {
          this.tours = response.data;
        })
        .catch((error) => {
          console.error('Error fetching tours:', error);
        });
    },
    // Fetch slider images from the API
    fetchSliders() {
      apiClient
        .get('/slider')
        .then((response) => {
          this.sliders = response.data;
        })
        .catch((error) => {
          console.error('Error fetching sliders:', error);
        });
    },
    // Get the full URL for the image
    getImageUrl(imagePath) {
      // Assuming the URL is already included in apiClient configuration
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    resetNewTour() {
      this.newTour = {
        destination_id: '',
        name: '',
        description: '',
        price: '',
        slots: '',
        date: '',
        image: null,
      };
    },
  },
  mounted() {
    // Fetch tours when the component is mounted
    this.fetchTours();
    // Fetch slider images when the component is mounted
    this.fetchSliders();
  },
};
</script>


<style scoped>
body {
  background-color: #f5f5f5;
  /* Faint grey background */
}

.ticket-item {
  margin-bottom: 30px;
}

.ticket-content {
  background-color: #f9f9f9;
  /* Light background for contrast */
  border-radius: 8px;
  /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Subtle shadow */
  transition: transform 0.3s ease;
  /* Smooth transition for hover effect */
  display: flex;
  flex-direction: column;
  /* Stack image and text vertically */
}

.ticket-content:hover {
  transform: scale(1.05);
  /* Slightly scale up on hover */
}

.ticket-content img {
  width: 100%;
  height: 200px;
  /* Fixed height for consistency */
  object-fit: cover;
  /* Cover the entire area while preserving aspect ratio */
  border-bottom: 2px solid #ddd;
  /* Light border below the image */
}

.ticket-info {
  padding: 15px;
  text-align: left;
  /* Align text to the left */
}

.ticket-name {
  text-align: center;
  /* Center-align the name */
  font-weight: bold;
  /* Bold the name */
  margin: 15px 0;
  /* Margin above and below the name */
}

.ticket-info p {
  margin: 5px 0;
}

.btn-book-now {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  text-align: center;
  background: linear-gradient(45deg, #ff6f61, #de8f24);
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}

.btn-book-now:hover {
  background: linear-gradient(45deg, #e55d40, #d07519);
}

/* Specific styles for the header section */
.custom-header {
  background-color: #dddddd;
  /* White background */
  z-index: 1000;
  /* Ensure header is above other content */
}

/* Ensure the header stays at the top */
.custom-header.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

/* Add padding to the top of the main content */
body {
  padding-top: 70px;
  /* Adjust based on header height */
}

/* Set text color to black */
.custom-header .logo h1,
.custom-header .navmenu ul li a {
  color: #000000;
  /* Black text color */
}

/* Scroll Down Indicator Style */
.scroll-indicator {
  position: absolute;
  bottom: 20px;
  /* Adjust based on your layout */
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-indicator i {
  font-size: 24px;
  /* Adjust size if needed */
  color: #ffffff;
  /* Adjust color if needed */
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}
</style>

