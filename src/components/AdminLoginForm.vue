<template>
  <main>
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-4 d-flex flex-column align-items-center justify-content-center">
              
              <!-- Logo -->
              <div class="d-flex justify-content-center py-4">
                <a href="/" class="logo d-flex align-items-center w-auto">
                  <span class="d-none d-lg-block">TIKITI ZOTE</span>
                </a>
              </div><!-- End Logo -->

              <!-- Login Card -->
              <div class="card mb-3" style="min-height: 30vh;">
                <div class="card-body">

                  <!-- Card Title and Description -->
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your username & password to login</p>
                  </div>

                  <!-- Login Form -->
                  <form @submit.prevent="loginAdmin" class="row g-3 needs-validation" novalidate>
                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <input
                          type="text"
                          id="yourUsername"
                          v-model="email"
                          class="form-control"
                          :disabled="loading"
                          required
                        />
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input
                        type="password"
                        id="yourPassword"
                        v-model="password"
                        class="form-control"
                        :disabled="loading"
                        required
                      />
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          v-model="rememberMe"
                          :disabled="loading"
                        />
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                      </div>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span v-if="!loading">Login</span>
                      </button>
                    </div>

                    <div class="col-12">
                      <p class="small mb-0">
                        Don't have an account? <router-link to="/admin/register">Create an account</router-link>
                      </p>
                    </div>
                  </form>

                  <!-- Social Login -->
                  <div class="social-login mt-4">
                    <button @click="loginWithGoogle" class="btn btn-outline-danger w-100 mb-2 d-flex align-items-center">
                      <i class="fab fa-google me-2" style="flex: none;"></i>
                      <span class="flex-grow-1">Login with Google</span>
                    </button>
                    <button @click="loginWithFacebook" class="btn btn-outline-primary w-100 d-flex align-items-center">
                      <i class="fab fa-facebook-f me-2" style="flex: none;"></i>
                      <span class="flex-grow-1">Login with Facebook</span>
                    </button>
                  </div><!-- End Social Login -->

                </div>
              </div><!-- End Login Card -->

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
  name: 'AdminLoginForm',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false, // Track loading state
    };
  },
  methods: {
    async loginAdmin() {
      this.loading = true; // Start loading

      try {
        const response = await apiClient.post('/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Store token and show success message
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userEmail', this.email);

        Swal.fire({
          title: 'Success!',
          text: 'Login successful! Welcome Back ;)',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.$router.push('/admin'); 
        });
      } catch (error) {
        // Show error message
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Login failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        this.loading = false; // Stop loading
      }
    },

    loginWithGoogle() {
      // Implement Google login logic
      window.location.href = 'https://your-google-auth-url';
    },

    loginWithFacebook() {
      // Implement Facebook login logic
      window.location.href = 'https://your-facebook-auth-url';
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
.admin-login-form {
  max-width: 400px;
  margin: 0 auto;
}

.social-login button {
  border-radius: 0.25rem;
}
</style>
