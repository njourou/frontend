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
            <div class="col-12 d-flex justify-content-between align-items-center mb-3">
              <h2>Manage Users</h2>
              <button class="btn btn-primary" @click="addUser">Add User</button>
            </div>
  
            <!-- User Table -->
            <div class="col-12">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.date }}</td>
                    <td>
                      <button class="btn btn-warning btn-sm" @click="editUser(user.id)">Edit</button>
                      <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
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
  import axios from 'axios';
  
  export default {
    components: {
      AdminHeader,
      AdminSidebar,
    },
    data() {
      return {
        users: [],
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/users');
          this.users = response.data.users;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async addUser() {
        const { value: formValues } = await Swal.fire({
          title: 'Add New User',
          html: `
            <input id="swal-input1" class="swal2-input" placeholder="Name">
            <input id="swal-input2" class="swal2-input" placeholder="Email">
            <input id="swal-input3" class="swal2-input" placeholder="Role">
          `,
          focusConfirm: false,
          preConfirm: () => {
            const name = document.getElementById('swal-input1').value;
            const email = document.getElementById('swal-input2').value;
            const role = document.getElementById('swal-input3').value;
  
            if (!name || !email || !role) {
              Swal.showValidationMessage('Please fill in all fields');
              return false;
            }
            return { name, email, role };
          },
          confirmButtonText: 'Add User',
        });
  
        if (formValues) {
          try {
            await axios.post('http://127.0.0.1:8000/api/users', formValues);
            this.fetchUsers(); // Refresh the user list
            Swal.fire('Success!', 'User added successfully.', 'success');
          } catch (error) {
            console.error('Error adding user:', error);
            Swal.fire('Error!', 'Failed to add user.', 'error');
          }
        }
      },
      async editUser(userId) {
        // Handle edit user logic (e.g., open modal with user data)
        console.log(`Edit user with ID ${userId}`);
      },
      async deleteUser(userId) {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });
  
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
            this.users = this.users.filter(user => user.id !== userId);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', 'Failed to delete user.', 'error');
          }
        }
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
  