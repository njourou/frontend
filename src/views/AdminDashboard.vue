<template>
  <div>
    <AdminHeader />
    <AdminSidebar />

    <main id="main" class="main">
      <div class="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>

      <section class="section dashboard">
        <div class="row">
          <!-- Total Bookings Card -->
          <div class="col-md-4 mb-3">
            <div class="card info-card glass-effect hover-shadow" style="border: 1px solid #ddd" :style="{ 'background-color': '#4e9bfc' }">
              <div class="card-body">
                <h5 class="card-title">BOOKINGS</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center" style="color: black">
                    <i class="fas fa-ticket-alt"></i>
                  </div>
                  <div class="ps-3">
                    <h6>{{ totalBookings }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Sales Card -->

          <!-- Total Tours Card -->
          <div class="col-md-4 mb-3">
            <div class="card info-card glass-effect hover-shadow" style="border: 1px solid #ddd" :style="{ 'background-color': '#ff6f61' }">
              <div class="card-body">
                <h5 class="card-title">TOURS</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center" style="color: black">
                    <i class="fas fa-map"></i>
                  </div>
                  <div class="ps-3">
                    <h6>{{ totalTours }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Total Tours Card -->

          <!-- Events Card -->
          <div class="col-md-4 mb-3">
            <div class="card info-card glass-effect hover-shadow" style="border: 1px solid #ddd" :style="{ 'background-color': '#f5a623' }">
              <div class="card-body">
                <h5 class="card-title">Events</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center" style="color: black">
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="ps-3">
                    <h6>{{ totalEvents }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Events Card -->
        </div>

        <!-- Donut Chart -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Overview</h5>
                <DonutChart :data="donutChartData" :colors="['#4e9bfc', '#ff6f61', '#f5a623']" />
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Tours Table -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">UPCOMING TOURS</h5>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Destination</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Slots</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tour in tours" :key="tour.id">
                      <td>
                        <img :src="getImageUrl(tour.image)" alt="Tour Image" width="100" height="100"/>
                      </td>
                      <td>{{ tour.destination.name }}</td>
                      <td>{{ tour.name }}</td>
                      <td>{{ tour.description }}</td>
                      <td>{{ tour.price }}</td>
                      <td>{{ tour.slots }}</td>
                      <td>{{ tour.date }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main><!-- End #main -->
  </div>
</template>
<script>
import AdminHeader from '@/components/AdminLayout/AdminHeader.vue';
import AdminSidebar from '@/components/AdminLayout/AdminSidebar.vue';
import TourMixin from '@/mixin/TourMixin.js'; 
import DashboardMixin from '@/mixin/DashboardMixin';
import DonutChart from '@/components/DonutChart.vue';

export default {
  components: {
    AdminHeader,
    AdminSidebar,
    DonutChart,
  },
  mixins: [TourMixin, DashboardMixin],
  data() {
    return {
      donutChartData: {
        labels: ['Bookings', 'Tours', 'Destinations'],
        values: [0, 0, 0], // Initial values for the donut chart
      },
    };
  },
  async mounted() {
    // Fetch totals first
    await this.fetchTotalBookings();
    await this.fetchTotalDestinations();
    await this.fetchTotalTours();  // Fetch total tours

    // Update donut chart data after fetching totals
    this.donutChartData.values = [this.totalBookings, this.totalTours, this.totalDestinations];

    // Fetch other data required for the dashboard
    await this.fetchTours();
    await this.fetchDestinations();
    await this.fetchBookings();

    // Prepare and render the bar chart for bookings by destination
    this.prepareChartData();
    this.$nextTick(() => {
      this.renderChart();  // Render the updated chart after the DOM is updated
    });
  },
  computed: {
    totalRevenue() {
      return this.$store.state.totalRevenue; 
    },
    totalEvents() {
      return 12; // Replace with the actual data source if needed
    },
  },
};
</script>


<style scoped>
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 12px solid rgba(255, 255, 255, 0.2);
}

.card-body {
  padding: 1.5rem;
}

.card-icon {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.info-card {
  border: none;
  color: #fff;
}

.col-md-4 {
  padding: 0 1rem;
}

.mb-3 {
  margin-bottom: 1.5rem;
}
</style>

