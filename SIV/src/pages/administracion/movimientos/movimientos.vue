<template>

    <h2>
        Movimientos
    </h2>

    <DataTable
        :columns="columns"
        :data = "data"
        class="table table-hover w-50"            
    />
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import 'datatables.net-responsive';

DataTable.use(Select);

export default {
name: "movimientos-listing",
components: {
    DataTable
},
setup(){
    const data = ref([]);
    const columns = [
        {
            title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Producto</span>",
            data: "product_id",
            className: "text-center"
        },
        {
            title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Entrada</span>",
            data: "input",
            className: "text-center"
        },
        {
            title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Salida</span>",
            data: "output",
            className: "text-center"
        },
    ];

    onMounted(async() => {
        try {
            let response = await axios.get('http://localhost:8080/movimientos/todos');
            data.value = response.data; 
        } catch (error) {
            console.error("Error Al Obtener los Movimientos: ", error);
        }
    });

    return {
        data,
        columns
    }
}
}
</script>

<style>
@import 'datatables.net-dt';
</style>