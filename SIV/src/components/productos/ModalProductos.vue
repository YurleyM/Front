
<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalProductos" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formCrear" @submit.prevent="guardar()">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="productos.name" required minlength="4" pattern="[A-Za-z\s]+" title="Ingrese solo letras (sin números)">
                    </div>
                    <div class="mb-3">
                        <label for="amount" class="form-label">Stock</label>
                        <input type="text" class="form-control" id="amount" v-model="productos.amount" required minlength="1" pattern="[0-9]+" title="Ingrese solo números (sin letras)">
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
import { defineComponent, ref } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default defineComponent({
    name: 'modal-products',
    setup(props, { emit }) {
        const productos = {};
        const modalProductos = ref(null)

        const guardar = async() => {
            console.log(productos, productos.value)
            try {
                let response = await axios.post('http://localhost:8080/productos/crear', productos);
                console.log(response);
                Swal.fire({
                    title: response.data.message.title,
                    text: response.data.message.description,
                    icon: "success"
                }).then(() => {
                    hideModal(modalProductos.value);
                    emit('saved');
                    productos.value = {};
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

        return {
            guardar,
            productos,
            modalProductos
        }
    }
})
</script>
