<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalUsuarios" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formCrear" @submit.prevent="guardar()">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="nombre" v-model="usuario.name" required minlength="4" pattern="[A-Za-z\s]+" title="Ingrese solo letras (sin números)">
                        </div>
                        <div class="mb-3">
                            <label for="user" class="form-label">Usuario</label>
                            <input type="text" class="form-control" id="user" v-model="usuario.user" required minlength="1" pattern="[A-Za-z\s]+" title="Ingrese solo letras (sin números)">
                        </div>
                        <div class="mb-3">
                            <label for="rol_id" class="form-label">Rol</label>
                            <input type="text" class="form-control" id="rol_id" v-model="usuario.rol_id" required minlength="1" pattern="[0-9]+" title="Ingrese solo números (sin letras)">
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
import { defineComponent, ref } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default defineComponent({
    name: 'modal-users',
    setup(props, { emit }) {
        const usuario = ref({ name: '', user: ''});
        const modalUsuarios = ref(null);

        const guardar = async() => {
            try {
                let response = await axios.post('http://localhost:8080/usuarios/crear', usuario.value);
                console.log(response);
                Swal.fire({
                    title: response.data.message.title,
                    text: response.data.message.description,
                    icon: "success"
                }).then(() => {
                    hideModal(modalUsuarios.value);
                    emit('saved');
                    // Limpiar campos del formulario
                    usuario.value = { name: '', user: '',};
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: "error"
                });
            }
        };

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
            modalUsuarios
        };
    }
});
</script>