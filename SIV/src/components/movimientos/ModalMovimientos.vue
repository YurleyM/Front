<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalMovimientos" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Movimiento</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formCrear" @submit.prevent="guardar()">
                        <div class="mb-3">
                            <label for="selectPrueba" class="form-label">Producto</label>
                            <select v-model="movimientos.product_id" id="selectPrueba">
                                <option disabled value="">Seleccione un Producto</option>
                                <option v-for="movimiento in products" :value="movimiento.id" :key="movimiento.id">
                                    {{ movimiento.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="input" class="form-label">Entrada</label>
                            <input type="text" class="form-control" id="input" v-model="movimientos.input" required minlength="1" pattern="[0-9]+" title="Ingrese solo números (sin letras)">
                        </div>
                        <div class="mb-3">
                            <label for="output" class="form-label">Salida</label>
                            <input type="text" class="form-control" id="output" v-model="movimientos.output" required minlength="1" pattern="[0-9]+" title="Ingrese solo números (sin letras)">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" form="formCrear" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default defineComponent({
    name: 'modal-movements',
    setup(props, { emit }) {
        const movimientos = ref({ product_id: '', input: '', output: '' });
        const modalMovimientos = ref(null);
        const products = ref([]);

        const guardar = async () => {
            try {
                const response = await axios.post('http://localhost:8080/movimientos/crear', movimientos.value);
                Swal.fire({
                    title: response.data.message.title,
                    text: response.data.message.description,
                    icon: "success"
                }).then(() => {
                    hideModal(modalMovimientos.value);
                    emit('saved');
                    movimientos.value = { product_id: '', input: '', output: '' }; 
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: "error"
                });
            }
        }

        const hideModal = (modalEl) => {
            if (!modalEl) {
                return;
            }

            const myModal = Modal.getInstance(modalEl);
            myModal?.hide();
        };

        const getproducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/productos/todos');
                products.value = response.data;
            } catch (error) {
                console.error("Error al obtener los productos: ", error);
            }
        }

        onMounted(async () => {
            getproducts();
        });

        return {
            guardar,
            movimientos,
            modalMovimientos,
            products
        }
    }
})
</script>