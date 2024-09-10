// Utility function to convert an array of objects to CSV
function convertToCSV(data) {
    const headers = ['Image', 'Destination', 'Name', 'Description', 'Price', 'Slots', 'Date'];
    
    const rows = data.map(tour => [
      tour.image,
      tour.destination.name,
      tour.name,
      tour.description,
      tour.price,
      tour.slots,
      tour.date
    ]);
    
    // Convert headers and rows to CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    return csvContent;
  }
  
  // Utility function to download a CSV file
  function downloadCSV(content, filename = 'tours.csv') {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Function to generate and download the CSV file
  export function generateCSV(tours) {
    const csvContent = convertToCSV(tours);
    downloadCSV(csvContent);
  }
  