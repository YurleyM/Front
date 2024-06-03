<template>
    <div>
      <h1>Dashboard</h1>
      <div class="graph-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
              label: 'Sample Data',
              data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
      }
    }
  }
  </script>
  
  <style>
  .graph-container {
    width: 600px;
    height: 400px;
    margin-top: 20px;
  }
  </style>