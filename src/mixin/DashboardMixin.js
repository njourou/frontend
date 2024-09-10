import apiClient from '@/utils/apiClient'; // Updated import path

export default {
  data() {
    return {
      totalBookings: 0,
      totalDestinations: 0,
      totalTours: 0,  // Added to store total tours
    };
  },
  methods: {
    async fetchTotalBookings() {
      try {
        const response = await apiClient.get('/bookings/total');
        this.totalBookings = response.data.totalBookings;
      } catch (error) {
        console.error('Error fetching total bookings:', error);
      }
    },
    async fetchTotalDestinations() {
      try {
        const response = await apiClient.get('/destinations/total');
        this.totalDestinations = response.data.totalDestinations;
      } catch (error) {
        console.error('Error fetching total destinations:', error);
      }
    },
    async fetchTotalTours() {
      try {
        const response = await apiClient.get('/tours/total');
        this.totalTours = response.data.totalTours;
      } catch (error) {
        console.error('Error fetching total tours:', error);
      }
    },
  },
  mounted() {
    this.fetchTotalBookings();
    this.fetchTotalDestinations();
    this.fetchTotalTours();  // Fetch total tours
  },
};
