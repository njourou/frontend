<template>
  <div>
    <AdminHeader />
    <AdminSidebar />

    <main id="main" class="main">
      <div class="pagetitle">
        <h1>Manage Tours</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Manage Tours</li>
          </ol>
        </nav>
      </div>

      <section class="section dashboard">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center mb-3">
            <h2>Tour List</h2>
            <div>
              <button class="btn btn-dark w-100px me-2" @click="showModal('add')"><i class="bi bi-plus-circle me-2"></i>Add Tour</button>
              <button type="button" class="btn btn-outline-dark w-100px shadow-sm" @click="downloadCSV"><i class="bi bi-download me-2"></i>Download CSV</button>
            </div>
          </div>

          <!-- Destination Totals Chart -->
          <div class="col-md-4 mb-3">
            <div style="width: 250px; height: 200px;">
              <canvas id="destination-totals-chart"></canvas>
            </div>
          </div>

          <!-- Tour Table -->
          <div class="col-12">
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
                    <img :src="getImageUrl(tour.image)" alt="Tour Image" />
                  </td>
                  <td style="white-space: nowrap">{{ tour.destination.name }}</td>
                  <td style="white-space: nowrap">{{ tour.name }}</td>
                  <td style="white-space: nowrap; max-width: 150px; overflow: hidden; text-overflow: ellipsis;">{{ tour.description }}</td>
                  <td style="white-space: nowrap">{{ tour.price }}</td>
                  <td style="white-space: nowrap">{{ tour.slots }}</td>
           
                  <td style="white-space: nowrap">{{ tour.date }}</td>
         
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Add/Edit Tour Modal -->
      <div v-if="showModalFlag" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ modalTitle }}</h2>
          <form @submit.prevent="submitTour">
            <div class="form-group">
              <label for="destination">Destination</label>
              <select v-model="currentTour.destination_id" class="form-control" id="destination" required>
                <option value="" disabled>Select Destination</option>
                <option v-for="dest in destinations" :key="dest.id" :value="dest.id">{{ dest.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="currentTour.name" type="text" class="form-control" id="name" placeholder="Tour Name"
                required />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="currentTour.description" class="form-control" id="description"
                placeholder="Tour Description" required></textarea>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input v-model="currentTour.price" type="number" class="form-control" id="price" placeholder="Tour Price"
                required />
            </div>
            <div class="form-group">
              <label for="slots">Slots</label>
              <input v-model="currentTour.slots" type="number" class="form-control" id="slots"
                placeholder="Available Slots" required />
            </div>
            <div class="form-group">
              <label for="date">Date</label>
              <input v-model="currentTour.date" type="date" class="form-control" id="date" required />
            </div>
            <div class="form-group">
              <label for="image">Image</label>
              <input @change="handleImageUpload" type="file" class="form-control" id="image" accept="image/*" />
            </div>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ submitButtonText }}
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import TourMixin from '@/mixin/TourMixin.js';
import AdminHeader from '@/components/AdminLayout/AdminHeader.vue';
import AdminSidebar from '@/components/AdminLayout/AdminSidebar.vue';
import { generateCSV } from './index'; // Adjust the path as needed

export default {
  components: {
    AdminHeader,
    AdminSidebar,
  },
  mixins: [TourMixin],
  methods: {
    ...TourMixin.methods,
    async downloadCSV() {
      try {
        // Fetch tours data before generating CSV
        await this.fetchTours();
        generateCSV(this.tours);
      } catch (error) {
        console.error('Error generating CSV:', error);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.table img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  /* Ensure it is on top */
}

/* Spinner */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #007bff;
  /* Change color if needed */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Existing Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.table img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.table-image {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Horizontal offset, vertical offset, blur radius, and color */
}
td img {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.tour-image {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Initial shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
}

.tour-image:hover {
  transform: scale(1.05); /* Slightly increase size */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Increase shadow on hover */
}

</style>
