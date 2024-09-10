import apiClient from '@/utils/apiClient';  // Adjust the path as needed
import Chart from 'chart.js/auto';  // Import Chart.js

export default {
  data() {
    return {
      tours: [],
      destinations: [],
      bookings: [],  // Add this for booking data
      showModalFlag: false,
      currentTour: {
        destination_id: '',
        name: '',
        description: '',
        price: '',
        slots: '',
        date: '',
        image: null,
      },
      isEditing: false,
      tourIdToEdit: null,
      chartData: { labels: [], datasets: [{ label: 'Tours by Destination', data: [], backgroundColor: [] }] },
    };
  },
  computed: {
    modalTitle() {
      return this.isEditing ? 'Edit Tour' : 'Add New Tour';
    },
    submitButtonText() {
      return this.isEditing ? 'Update Tour' : 'Add Tour';
    }
  },
  async mounted() {
    await this.fetchTours();
    await this.fetchDestinations();
    await this.fetchBookings();  // Fetch bookings data
    this.prepareChartData();  // Prepare chart data
    this.$nextTick(() => {
      this.renderChart();  // Render the chart after DOM is updated
    });
  },
  methods: {
    async fetchTours() {
      try {
        const response = await apiClient.get('/tours');
        this.tours = response.data;
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    },
    async fetchDestinations() {
      try {
        const response = await apiClient.get('/destinations');
        this.destinations = response.data;
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    },
    async fetchBookings() {
      try {
        const response = await apiClient.get('/bookings');
        this.bookings = response.data;
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    prepareChartData() {
      const destinationCounts = this.bookings.reduce((acc, booking) => {
        const destinationName = this.destinations.find(d => d.id === booking.tour.destination_id)?.name || 'Unknown';
        if (acc[destinationName]) {
          acc[destinationName]++;
        } else {
          acc[destinationName] = 1;
        }
        return acc;
      }, {});

      this.chartData.labels = Object.keys(destinationCounts);
      this.chartData.datasets[0].data = Object.values(destinationCounts);
      this.chartData.datasets[0].backgroundColor = this.chartData.labels.map(() => 
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
      );
    },
    renderChart() {
      const ctx = document.getElementById('destination-totals-chart')?.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: this.chartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y;
                    }
                    return label;
                  }
                }
              }
            }
          }
        });
      } else {
        console.error('Chart element not found');
      }
    },
    showModal(mode, tourId = null) {
      this.showModalFlag = true;
      this.isEditing = mode === 'edit';
      this.tourIdToEdit = tourId;

      if (this.isEditing) {
        this.currentTour = this.tours.find(t => t.id === tourId) || this.resetTour();
      } else {
        this.resetTour();
      }
    },
    closeModal() {
      this.showModalFlag = false;
    },
    handleImageUpload(event) {
      this.currentTour.image = event.target.files[0];
    },
    async submitTour() {
      const formData = new FormData();
      Object.keys(this.currentTour).forEach(key => {
        formData.append(key, this.currentTour[key]);
      });

      try {
        if (this.isEditing) {
          await apiClient.put(`/tours/${this.tourIdToEdit}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          await apiClient.post('/tours', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
        this.closeModal();
        await this.fetchTours();
        await this.fetchBookings(); // Refresh bookings data
        this.prepareChartData();  // Refresh chart data
        this.$nextTick(() => {
          this.renderChart();  // Render the updated chart
        });
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    },
    resetTour() {
      return {
        destination_id: '',
        name: '',
        description: '',
        price: '',
        slots: '',
        date: '',
        image: null,
      };
    },
    async deleteTour(tourId) {
      try {
        await apiClient.delete(`/tours/${tourId}`);
        await this.fetchTours();
        await this.fetchBookings(); // Refresh bookings data
        this.prepareChartData();  // Refresh chart data
        this.$nextTick(() => {
          this.renderChart();  // Render the updated chart
        });
      } catch (error) {
        console.error('Error deleting tour:', error.response ? error.response.data : error.message);
      }
    },
    getImageUrl(imagePath) {
      const url = imagePath ? `https://wisebuy.co.ke/laravel/public/storage/${imagePath}` : '';
      return url;
    }
  },
};
