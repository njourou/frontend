<template>
  <div>
    <AdminHeader />
    <AdminSidebar />

    <main id="main" class="main">
      <div class="pagetitle">
        <h1>Manage Destinations</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Manage Destinations</li>
          </ol>
        </nav>
      </div>

      <section class="section dashboard">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center mb-3">
            <h2>Destinations</h2>
            <div>
              <button class="btn btn-primary me-2" style="background-color: black; color: white"
                @click="addDestination"><i class="fas fa-plus-circle me-2"></i>Add Destination</button>
              <button type="button" class="btn btn-outline-dark" @click="downloadCSV"><i
                  class="bi bi-download me-2"></i>Download CSV</button>
            </div>
          </div>

          <!-- Destinations Table -->
          <div class="col-12">
            <table class="table table-striped table-hover">
              <thead style="background-color: black;">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Google map</th>
                  <th scope="col">Description</th>
                  <th scope="col">Expiring on</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="destination in destinations" :key="destination.id">
                  <td>{{ destination.name }}</td>
                  <td>
                    <a :href="'/destinations/' + destination.slug" target="_blank">{{ destination.slug }}</a>
                  </td>

                  <td>{{ destination.description }}</td>
                  <td>{{ formatDate(destination.date) }}</td>
                  <td>
                    <button class="btn btn-sm" style="background-color: transparent; color: black;"
                      @click="editDestination(destination)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm" style="background-color: transparent; color: black;"
                      @click="deleteDestination(destination.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
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
import Swal from 'sweetalert2';
import apiClient from '@/utils/apiClient'; 

export default {
  components: {
    AdminHeader,
    AdminSidebar,
  },
  data() {
    return {
      destinations: [],
    };
  },
  created() {
    this.fetchDestinations();
  },
  methods: {
    async fetchDestinations() {
      try {
        const response = await apiClient.get('/destinations');
        this.destinations = response.data;
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    },
    async addDestination() {
      const { value: formValues } = await Swal.fire({
        title: 'Add New Destination',
        html: `
          <div style="display: flex; flex-direction: column; align-items: stretch;">
            <input id="swal-input1" class="swal2-input" placeholder="Name" style="flex: 1;">
            <input id="swal-input2" class="swal2-input" placeholder="Google map" style="flex: 1;">
            <textarea id="swal-input3" class="swal2-textarea" placeholder="Description" style="flex: 1;"></textarea>
            <input id="swal-input4" class="swal2-input" type="date" placeholder="Date" style="flex: 1;">
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById('swal-input1').value;
          const slug = document.getElementById('swal-input2').value;
          const description = document.getElementById('swal-input3').value;
          const date = document.getElementById('swal-input4').value;

          if (!name || !slug || !description || !date) {
            Swal.showValidationMessage('Please fill in all fields');
            return false;
          }

          return { name, slug, description, date };
        },
        confirmButtonText: 'Add Destination',
      });

      if (formValues) {
        try {
          await apiClient.post('/destinations', formValues);
          this.fetchDestinations();
          Swal.fire('Success!', 'Destination added successfully.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to add destination.', 'error');
        }
      }
    },
    async editDestination(destination) {
      const { value: formValues } = await Swal.fire({
        title: 'Edit Destination',
        html: `
          <input id="swal-input1" class="swal2-input" value="${destination.name}" placeholder="Name" style="width: 100%">
          <input id="swal-input2" class="swal2-input" value="${destination.slug}" placeholder="Slug" style="width: 100%">
          <textarea id="swal-input3" class="swal2-textarea" placeholder="Description" style="width: 100%; height: 120px">${destination.description}</textarea>
          <input id="swal-input4" class="swal2-input" type="date" value="${destination.date}" placeholder="Date" style="width: 100%">
        `,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById('swal-input1').value;
          const slug = document.getElementById('swal-input2').value;
          const description = document.getElementById('swal-input3').value;
          const date = document.getElementById('swal-input4').value;

          if (!name || !slug || !description || !date) {
            Swal.showValidationMessage('Please fill in all fields');
            return false;
          }

          return { name, slug, description, date };
        },
        confirmButtonText: 'Save Changes',
      });

      if (formValues) {
        try {
          await apiClient.put(`/destinations/${destination.id}`, formValues);
          this.fetchDestinations();
          Swal.fire('Success!', 'Destination updated successfully.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to update destination.', 'error');
        }
      }
    },
    async deleteDestination(destinationId) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to recover this destination!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/destinations/${destinationId}`);
          this.fetchDestinations();
          Swal.fire('Deleted!', 'Destination has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete destination.', 'error');
        }
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>


<style scoped>
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

.btn-primary {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.btn-warning {
  background-color: #FFC107;
  border-color: #FFC107;
  color: #000;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #e0a800;
}

.btn-danger {
  background-color: #DC3545;
  border-color: #DC3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
