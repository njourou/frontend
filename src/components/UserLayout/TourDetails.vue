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

        
            <li><router-link to="/admin/login" class="btn-login">Login</router-link></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>

    <!-- Tour Details Section -->
    <main class="main">
      <section id="tour-details" class="section">
        <div class="container" v-if="tour">
          <!-- Breadcrumbs -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item">Tickets</li>
              <li class="breadcrumb-item active" aria-current="page">{{ tour.name }}</li>
            </ol>
          </nav>

          <div class="row">
            <!-- Image Section -->
            <div class="col-md-6">
              <img :src="getImageUrl(tour.image)" class="img-fluid tour-image" alt="Tour Image">
            </div>

            <!-- Details Section -->
            <div class="col-md-6">
              <h2 class="tour-name">{{ tour.name }}</h2>
              <p><i class="bi bi-geo-alt"></i> <strong>Destination:</strong> {{ tour.destination.name }}</p>
              <p><i class="bi bi-calendar"></i> <strong>Date:</strong> {{ tour.date }}</p>
              <form @submit.prevent="submitBooking" class="booking-form">
                <div class="form-group">
                  <label for="tickets">Number of Tickets</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-ticket-alt icon-red"></i>
                      </span>
                    </div>
                    <input v-model="numberOfTickets" type="number" class="form-control" id="tickets"
                      placeholder="Enter number of tickets" min="1" required>
                  </div>
                </div>
                <div class="form-group">
                  <label for="fullName">Full Name</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-user icon-red"></i>
                      </span>
                    </div>
                    <input v-model="fullName" type="text" class="form-control" id="fullName"
                      placeholder="Enter your full name" required>
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-envelope icon-red"></i>
                      </span>
                    </div>
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email"
                      required>
                  </div>
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="bi bi-telephone icon-red"></i>
                      </span>
                    </div>
                    <input v-model="phone" type="tel" class="form-control" id="phone"
                      placeholder="Enter your phone number" required>
                  </div>
                </div>
                <div class="form-check">
                  <input v-model="termsAccepted" class="form-check-input" type="checkbox" id="terms" required>
                  <label class="form-check-label" for="terms">
                    I accept the <a href="#">terms and conditions</a>
                  </label>
                </div>
                <button type="submit" class="btn btn-danger w-100" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!loading">Book Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import apiClient from '@/utils/apiClient'; // Import apiClient from the correct path
import Swal from 'sweetalert2';

export default {
  name: 'TourDetails',
  data() {
    return {
      tour: null,
      numberOfTickets: 1,
      fullName: '',
      email: '',
      phone: '',
      termsAccepted: false,
      loading: false,
    };
  },
  methods: {
    // Fetch tour details based on the ID
    fetchTourDetails(id) {
      apiClient
        .get(`/tours/${id}`)
        .then((response) => {
          this.tour = response.data;
        })
        .catch((error) => {
          console.error('Error fetching tour details:', error);
        });
    },
    // Get the full URL for the image
    getImageUrl(imagePath) {
      return `https://api.electriclink.co.ke/public/storage/${imagePath}`;
    },
    // Handle form submission
    submitBooking() {
      if (!this.termsAccepted) {
        Swal.fire({
          icon: 'warning',
          title: 'Terms Not Accepted',
          text: 'You must accept the terms and conditions.',
        });
        return;
      }

      // Prepare the booking data
      const bookingData = {
        tour_id: this.tour.id, // Ensure you have the tour ID
        number_of_tickets: this.numberOfTickets,
        full_name: this.fullName,
        email: this.email,
        phone: this.phone,
        terms_accepted: this.termsAccepted,
      };

      this.loading = true; // Show the spinner

      // Send the booking data to the backend
      apiClient
        .post('/bookings', bookingData)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Booking Confirmed',
            text: response.data.message || 'Your booking has been confirmed!',
          });
          // Optionally clear the form or redirect the user
          this.numberOfTickets = 1;
          this.fullName = '';
          this.email = '';
          this.phone = '';
          this.termsAccepted = false;
        })
        .catch((error) => {
          console.error('Error creating booking:', error);

          // Display a detailed error message to the user
          Swal.fire({
            icon: 'error',
            title: 'Booking Notification',
            text: error.response?.data?.message || 'There was an error creating your booking. Please try again.',
          });
        })
        .finally(() => {
          this.loading = false; // Hide the spinner
        });
    },
  },
  mounted() {
    // Fetch tour details when the component is mounted
    const tourId = this.$route.params.id;
    this.fetchTourDetails(tourId);
  },
}
</script>


<style scoped>
.tour-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tour-name {
  text-align: center;
  font-weight: bold;
}

.breadcrumb {
  margin-bottom: 20px;
}

.booking-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.input-group {
  position: relative;
}

.input-group-prepend {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.input-group-text {
  border-radius: 0;
  background-color: #f8f9fa;
}

.btn-primary {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(to right, #feb47b, #ff7e5f);
}

.form-check {
  margin-bottom: 15px;
}

.spinner-border {
  margin-right: 5px;
}

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
  padding-top: 100px;
  /* Adjust based on header height */
}

/* Set text color to black */
.custom-header .logo h1,
.custom-header .navmenu ul li a {
  color: #000000;
  /* Black text color */
}
.tour-image {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Horizontal offset, vertical offset, blur radius, and color */
}

</style>
