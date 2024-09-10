<template>
  <div>
    <AdminHeader />
    <AdminSidebar />

    <main id="main" class="main">
      <div class="pagetitle">
        <h1>Manage Bookings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Manage Bookings</li>
          </ol>
        </nav>
      </div>

      <section class="section dashboard">
        <div class="row">
          <!-- Booking Count Tile -->
          <div class="col-12 col-md-4 mb-4">
            <div class="tile tile-bookings" style="width: 250px; background-color: #fff; color: #000; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
              <h3>Total Bookings</h3>
              <p>{{ bookingsCount }}</p>
            </div>
          </div>

          <!-- Bookings Table -->
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tour</th>
                      <th>Number of Tickets</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(booking, index) in bookings" :key="index + 1">
                      <td>{{ index + 1 }}</td>
                      <td>{{ booking.tour.name }}</td>
                      <td>{{ booking.number_of_tickets }}</td>
                      <td>{{ booking.full_name }}</td>
                      <td>{{ booking.email }}</td>
                      <td>{{ booking.phone }}</td>
                      <td style="color: green;">Booked</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminLayout/AdminHeader.vue';
import AdminSidebar from '@/components/AdminLayout/AdminSidebar.vue';
import apiClient from '@/utils/apiClient'; // Updated import path

export default {
  components: {
    AdminHeader,
    AdminSidebar,
  },
  data() {
    return {
      bookings: [], // Array to hold bookings
      bookingsCount: 0, // To hold the total number of bookings
    };
  },
  async created() {
    try {
      // Fetch all bookings
      const response = await apiClient.get('/bookings');
      this.bookings = response.data;
      this.bookingsCount = this.bookings.length; // Set the count of bookings
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}

.table th, .table td {
  text-align: left;
  padding: 12px;
}

.table thead {
  background-color: #f8f9fa;
}

.card-title {
  margin-bottom: 20px;
}

.tile {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  color: #fff;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tile h3 {
  margin: 0;
  font-size: 1.5rem;
}

.tile p {
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
}

.tile-bookings {
  background-color: #007bff; /* Blue background */
}
</style>
