// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import the store
import './assets/css/style.css';
import './assets/css/main.css';  

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

createApp(App)
  .use(router)
  .use(store) // Use the store
  .mount('#app');
