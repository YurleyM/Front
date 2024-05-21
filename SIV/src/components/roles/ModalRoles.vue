<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalRoles" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Crear rol</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formCrear" @submit.prevent="guardar()">
                        <div class="mb-3">
                            <label for="rol" class="form-label">Rol</label>
                            <input type="text" class="form-control" id="rol" v-model="rol.rol" required minlength="4" pattern="[A-Za-z\s]+" title="Ingrese solo letras (sin números)">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default defineComponent({
    name: 'modal-rols',
    props:{
        rols: {}
    },
    setup(props, { emit }) {
        const rol = ref({});
        const modalRoles = ref(null);
        const action = ref('');

        watchEffect(() => {
            rol.value = { ...props.rols }; 
            rol.value.edit = (props.rols.action == 'editar'); 
        });
                
        const guardar = async() => {
            let ruta = (props.rols.action == 'editar') ? `editar/${props.rols.id}` : 'crear';
            let peticion = (props.rols.action == 'editar') ? axios.put : axios.post;
            try {
                let response = await peticion(`http://localhost:8080/roles/${ruta}`, rol.value);

                Swal.fire({
                    title: response.data.message.title,
                    text: response.data.message.description,
                    icon: "success"
                }).then(() => {
                    hideModal(modalRoles.value);
                    emit('saved');
                    rol.value = {};
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message.description,
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
            rol,
            modalRoles
        }
    }
})
</script>