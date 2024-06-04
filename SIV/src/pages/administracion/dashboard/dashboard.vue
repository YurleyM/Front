<template>
  <div class="container">
    <div class="chart-container">
      <canvas ref="productosChart" class="chart"></canvas>
    </div>
    <div class="chart-container">
      <canvas ref="movimientosPorProductoChart" class="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  setup() {
    const productosChart = ref(null);
    const movimientosPorProductoChart = ref(null);

    onMounted(async () => {
      try {
        // Obtener datos de productos
        const productosResponse = await axios.get('http://localhost:8080/productos/todos');
        const productos = productosResponse.data;

        // Obtener datos de movimientos por producto
        const movimientosResponse = await axios.get('http://localhost:8080/movimientos/todos');
        const movimientos = movimientosResponse.data;

        if (!productosChart.value || !movimientosPorProductoChart.value) {
          console.error("No se encontraron los elementos de las gráficas");
          return;
        }

        // Generar colores aleatorios para los productos
        const coloresProductos = generarColoresAleatorios(productos.length);

        // Procesar los datos de productos para la primera gráfica
        const nombresProductos = productos.map(producto => producto.name);
        const cantidadesProductos = productos.map(producto => producto.amount);

        // Crear la primera gráfica de cantidad por producto
        new Chart(productosChart.value, {
          type: 'line',
          data: {
            labels: nombresProductos,
            datasets: [{
              label: 'Cantidad por producto',
              data: cantidadesProductos,
              backgroundColor: coloresProductos,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Filtrar productos con movimientos
        const productosConMovimientos = productos.filter(producto => {
          return movimientos.some(movimiento => movimiento.product_id === producto.id);
        });

        // Generar colores aleatorios para los productos
        const coloresMovimientos = generarColoresAleatorios(productosConMovimientos.length);

        // Procesar los datos de movimientos por producto para la segunda gráfica
        const movimientosDataEntrada = [];
        const movimientosDataSalida = [];
        const movimientosLabels = [];

        productosConMovimientos.forEach(producto => {
          movimientosLabels.push(producto.name);

          const movimientosEntrada = movimientos.filter(movimiento => {
            return movimiento.product_id === producto.id && movimiento.input !== null;
          }).reduce((total, movimiento) => total + movimiento.input, 0);

          const movimientosSalida = movimientos.filter(movimiento => {
            return movimiento.product_id === producto.id && movimiento.output !== null;
          }).reduce((total, movimiento) => total + movimiento.output, 0);

          movimientosDataEntrada.push(movimientosEntrada);
          movimientosDataSalida.push(movimientosSalida);
        });

        // Crear la segunda gráfica de movimientos por producto
        new Chart(movimientosPorProductoChart.value, {
          type: 'bar',
          data: {
            labels: movimientosLabels,
            datasets: [
              {
                label: 'Entradas',
                data: movimientosDataEntrada,
                backgroundColor: coloresMovimientos,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label: 'Salidas',
                data: movimientosDataSalida,
                backgroundColor: coloresMovimientos,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    });

    const generarColoresAleatorios = (cantidad) => {
      const colores = [];
      for (let i = 0; i < cantidad; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
        colores.push(color);
      }
      return colores;
    };

    return {
      productosChart,
      movimientosPorProductoChart
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: auto;
}

.chart-container {
  margin-bottom: 10%;
}

.chart {
  height: 400px;
  width: 0%;
}
</style>