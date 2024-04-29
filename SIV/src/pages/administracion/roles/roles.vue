<template>
    <div class="card">
        <div class="greetings card-body">
            <h3>
                Roles
            </h3>
    
            <DataTable
                :columns="columns"
                :data = "data"
                class="table table-hover"            
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import 'datatables.net-responsive';
 
DataTable.use(Select);

export default {
    name: "roles-listing",
    components: {
        DataTable
    },
    setup(){
        const data = ref([]);
        const columns = [
            
            {
                title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Rol</span>",
                data: "rol",
                className: "text-center"
            },
            {
                title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Estado</span>",
                data: "state",
                className: "text-center",
                render: function(data) {
                    let mensaje = (data == 1) ? `<div class="alert alert-success" role="alert">Activo</div>` : `<div class="alert alert-danger" role="alert">Inactivo</div>`;

                    return mensaje;
                }
            }
        ];

        onMounted(async() => {
            try {
                let response = await axios.get('http://localhost:8080/roles/todos');
                data.value = response.data; 
            } catch (error) {
                console.error("Error al obtener los roles: ", error);
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