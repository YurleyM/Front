import { createRouter, createWebHistory } from 'vue-router';
import productos from '@/pages/administracion/productos/productos.vue';
import roles from '@/pages/administracion/roles/roles.vue';
import usuarios from '@/pages/administracion/usuarios/usuarios.vue';
import movimientos from '@/pages/administracion/movimientos/movimientos.vue';

const routes = [
    { path: '/productos', component: productos },
    { path: '/usuarios', component: usuarios },
    { path: '/roles', component: roles },
    { path: '/movimientos', component: movimientos },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;