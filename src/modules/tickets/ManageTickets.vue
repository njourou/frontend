<template>
    <div>
      <AdminHeader />
      <AdminSidebar />
  
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Manage Tickets</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item active">Manage Tickets</li>
            </ol>
          </nav>
        </div>
  
        <section class="section dashboard">
          <div class="row">
            <div class="col-12 d-flex justify-content-between align-items-center mb-3">
              <h2>Ticket Overview</h2>
            </div>
  
            <!-- Ticket Tiles -->
            <div class="col-12">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <div class="tile tile-issued">
                    <h3>Tickets Issued</h3>
                    <p>{{ issuedCount }}</p>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="tile tile-paid">
                    <h3>Paid Tickets</h3>
                    <p>{{ paidCount }}</p>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="tile tile-unpaid">
                    <h3>Unpaid Tickets</h3>
                    <p>{{ unpaidCount }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Tickets Table -->
            <div class="col-12">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Ticket Number</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ticket in tickets" :key="ticket.id">
                    <td>{{ ticket.number }}</td>
                    <td>{{ ticket.bookingId }}</td>
                    <td>{{ ticket.ticketNumber }}</td>
                    <td>{{ ticket.status }}</td>
                    <td>{{ ticket.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  <script>
  import AdminHeader from '@/components/AdminLayout/AdminHeader.vue';
  import AdminSidebar from '@/components/AdminLayout/AdminSidebar.vue';
  import apiClient from '@/utils/apiClient'; 
  
  export default {
    components: {
      AdminHeader,
      AdminSidebar,
    },
    data() {
      return {
        issuedCount: 0,
        paidCount: 0,
        unpaidCount: 0,
        tickets: [],
      };
    },
    async created() {
      try {
        // Fetch ticket status data using the configured axios instance
        const response = await apiClient.get('/tickets/status');
        const { issued, paid, unpaid, ticketList } = response.data;
  
        this.issuedCount = issued;
        this.paidCount = paid;
        this.unpaidCount = unpaid;
        this.tickets = ticketList;
      } catch (error) {
        console.error('Error fetching ticket status:', error);
      }
    },
  };
  </script>
  
  
  <style scoped>
  .tile {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
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
  
  .tile-issued {
    background-color: #4CAF50;
  }
  
  .tile-paid {
    background-color: #007bff;
  }
  
  .tile-unpaid {
    background-color: #DC3545;
  }
  
  .table {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    color: #fff;
  }
  
  thead th {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
  }
  
  .table-hover tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  </style>
  