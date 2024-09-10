<template>
  <main>
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo.png" alt="">
                  <span class="d-none d-lg-block">TIKITI ZOTE</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Register Your Account</h5>
                    <p class="text-center small">Enter your details to register</p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate @submit.prevent="registerAdmin">
                    <div class="col-12">
                      <label for="name" class="form-label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        v-model="name"
                        class="form-control"
                        :disabled="loading"
                        required
                        placeholder=""
                      />
                      <div class="invalid-feedback">Please enter your full name.</div>
                    </div>

                    <div class="col-12">
                      <label for="email" class="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="form-control"
                        :disabled="loading"
                        required
                        placeholder=""
                      />
                      <div class="invalid-feedback">Please enter a valid email address.</div>
                    </div>

                    <div class="col-12">
                      <label for="password" class="form-label">Password</label>
                      <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="form-control"
                        :disabled="loading"
                        required
                        placeholder=""
                      />
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span v-if="!loading">Register</span>
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Already have an account? <router-link to="/admin/login">Login Here</router-link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import apiClient from '@/utils/apiClient';
import Swal from 'sweetalert2';

export default {
  name: 'AdminRegistrationForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false, // Add loading state
    };
  },
  methods: {
    async registerAdmin() {
      this.loading = true; // Start loading

      try {
        // Make the API call for admin registration
        await apiClient.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Show success message using SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Registration successful! Redirecting to login...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Redirect to admin login
          this.$router.push('/admin/login');
        });
      } catch (error) {
        // Show error message using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Registration failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error(error);
      } finally {
        this.loading = false; // Stop loading
      }
    },
  },
};
</script>

<style scoped>
/* Spinner styling */
.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

/* Other form and layout styles */
.admin-registration-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
