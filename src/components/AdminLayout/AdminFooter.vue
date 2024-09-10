<template>
    <footer id="footer" class="footer">
      
    </footer><!-- End Footer -->
  
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  </template>
  
  <script>
export default {
  name: 'AdminFooter',
  mounted() {
    this.loadScript(`${process.env.BASE_URL}assets/vendor/apexcharts/apexcharts.min.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/bootstrap/js/bootstrap.bundle.min.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/chart.js/chart.umd.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/echarts/echarts.min.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/quill/quill.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/simple-datatables/simple-datatables.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/tinymce/tinymce.min.js`);
    this.loadScript(`${process.env.BASE_URL}assets/vendor/php-email-form/validate.js`);
    this.loadScript(`${process.env.BASE_URL}assets/js/main.js`);
  },
  methods: {
    loadScript(src) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  }
};
</script>

  
  <style scoped>

  </style>
  