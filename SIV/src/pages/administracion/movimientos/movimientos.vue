<template>
    <div class="d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <h2>
            Movimiento
        </h2>
        <button class="btn btn-primary">Crear Movimiento</button>
    </div>

    <DataTable
        :columns="columns"
        :data = "data"
        class="table table-hover w-50"            
    />
    <ModalMovimientosVue @saved="reloadDatatable"></ModalMovimientosVue>
</template>

<script>
import axios from 'axios';
import ModalMovimientosVue from '../../../components/movimientos/ModalMovimientos.vue'
import { onMounted, ref } from 'vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import 'datatables.net-responsive';

DataTable.use(Select);

export default {
name: "movimientos-listing",
components: {
    DataTable,
    ModalMovimientosVue
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
        {
            title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Acciones</span>",
            data: "input",
            className: "text-center",
            render: function(data) {
                let activar = `<div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-primary">Left</button>
                                <button type="button" class="btn btn-primary">Middle</button>
                                </div>`;

                return activar;
            }
        },
    ];

    const reloadDataTable = async () => {
        
        await dataTable();
    };

    const dataTable = async () => {
        try {
            let response = await axios.get('http://localhost:8080/movimientos/todos');
            data.value = response.data; 
        } catch (error) {
            console.error("Error Al Obtener los Movimientos: ", error);
        }
    }

    onMounted(async() => {
        dataTable();
    });

    return {
        data,
        columns,
        reloadDataTable
    }
}
}
</script>

<style>
@import 'datatables.net-dt';
</style>