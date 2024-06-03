<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalusuarios" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formCrear" @submit.prevent="guardar()">
                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="name" v-model="usuario.name" required minlength="4" pattern="[A-Za-z\s]+" title="Ingrese solo letras (sin números)">
                        </div>
                        <div class="mb-3">
                            <label for="user" class="form-label">Usuario</label>
                            <input type="text" class="form-control" id="user" v-model="usuario.user" required minlength="1" pattern="[A-Za-z\s]+" title="Ingrese solo letras (sin números)">
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
    name: 'modal-users',
    props:{
        users: {}
    },
    setup(props, { emit }) {
        const usuario = ref({});
        const modalusuarios = ref(null);
        const action = ref('');

        watchEffect(() => {
            usuario.value = { ...props.users };
            usuario.value.edit = (props.users.action == 'editar');
        });
        
        const guardar = async() => {
            let ruta = (props.users.action == 'editar') ? `editar/${props.users.id}` : 'crear';
            let peticion = (props.users.action == 'editar') ? axios.put : axios.post;
            try {
                let response = await peticion(`http://localhost:8080/usuarios/${ruta}`, usuario.value);

                Swal.fire({
                    title: response.data.message.title,
                    text: response.data.message.description,
                    icon: "success"
                }).then(() => {
                    hideModal(modalusuarios.value);
                    emit('saved');
                    usuario.value = {};
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
            usuario,
            modalusuarios
        }
    }
})
</script>