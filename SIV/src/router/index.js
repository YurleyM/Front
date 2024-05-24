import { createRouter, createWebHistory } from 'vue-router';
import productos from '@/pages/administracion/productos/productos.vue';
import usuarios from '@/pages/administracion/usuarios/usuarios.vue';
import roles from '@/pages/administracion/roles/roles.vue';
import movimientos from '@/pages/administracion/movimientos/movimientos.vue';
import App from '@/App.vue';
import { useAuthStore } from "@/stores/auth";
import DefaultLayout from '@/components/layouts/defaultLayout.vue';
import AuthLayout from '@/components/layouts/authLayout.vue';
import SignIn from '@/pages/authentication/SignIn.vue';

const routes = [
    {
        path: '/' ,
        redirect: '/inicio',
        component: DefaultLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            { path: '/inicio', component: App },
            { path: '/productos', component: productos },
            { path: '/usuarios', component: usuarios },
            { path: '/roles', component: roles },
            { path: '/movimientos', component: movimientos },
        ]
    } ,
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: "/inicio-sesion",
                component: SignIn,
                name: "sign-in",
                meta: {
                    pageTitle: "Iniciar Sesion",
                },
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
  
    document.title = `SIV`;
    
    // authStore.verifyAuth();
    console.log(to.meta.middleware )
    if (!to.meta.middleware == "auth") {
      if (authStore.isAuthenticated) {
        next();
      } else {
        next({ name: "sign-in" });
      }
    } else {
      next();
    }
  
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

export default router;