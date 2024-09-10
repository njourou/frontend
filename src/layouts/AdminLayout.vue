<template>
    <div>
      <AdminHeader />
      <div class="admin-layout">
        <AdminSidebar />
        <main class="main-content">
          <router-view />
        </main>
      </div>
      <AdminFooter />
    </div>
  </template>
  
  <script>
  import AdminHeader from '../components/AdminHeader.vue';
  import AdminSidebar from '../components/AdminSidebar.vue';
  import AdminFooter from '../components/AdminFooter.vue';
  
  export default {
    name: 'AdminLayout',
    components: {
      AdminHeader,
      AdminSidebar,
      AdminFooter,
    },
  };
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
   
  }
  
  </style>
  