<!-- src/components/DonutChart.vue -->
<template>
    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  
  export default {
    name: 'DonutChart',
    components: {
      Doughnut,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    computed: {
      chartData() {
        return {
          labels: this.data.labels,
          datasets: [
            {
              label: 'Overview',
              backgroundColor: ['#f3a683', '#f8c291', '#80ed99'],
              data: this.data.values,
            },
          ],
        };
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 300px;
    width: 100%;
  }
  </style>
  