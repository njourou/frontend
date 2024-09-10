import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import AdminLoginForm from '../components/AdminLoginForm.vue';
import AdminRegistrationForm from '../components/AdminRegistrationForm.vue';
import CreateTours from '../modules/tours/CreateTours.vue';
import ManageUsers from '../modules/users/ManageUsers.vue';
import ManageBookings from '../modules/bookings/ManageBookings.vue';
import ManageTickets from '../modules/tickets/ManageTickets.vue';
import ManageDestinations from '../modules/destination/ManageDestinations.vue';
import TourDetails from '@/components/UserLayout/TourDetails.vue';
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginForm,
  },
  {
    path: '/admin/register',
    name: 'AdminRegister',
    component: AdminRegistrationForm,
  },
  {
    path: '/admin/tours',
    name: 'CreateTours',
    component: CreateTours,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/tour/:id',
    name: 'TourDetails',
    component: TourDetails,
    props: true,
  },
  {
    path: '/admin/users',
    name: 'ManageUsers',
    component: ManageUsers,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/destinations',
    name: 'ManageDestinations',
    component: ManageDestinations,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/bookings',
    name: 'ManageBookings',
    component: ManageBookings,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/tickets',
    name: 'ManageTickets',
    component: ManageTickets,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard to Protect Admin Routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('authToken');

  if (requiresAuth && !isAuthenticated) {
    next('/admin/login');
  } else {
    next();
  }
});

export default router;
