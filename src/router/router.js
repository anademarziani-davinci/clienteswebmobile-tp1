import { createRouter, createWebHistory } from "vue-router";
import { subscribeToUserStateChanges } from "../services/auth";
import Home from "../pages/Home.vue";
import PublicChat from "../pages/PublicChat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import ProfileEdit from "../pages/ProfileEdit.vue";
import ChangePassword from "../pages/ChangePassword.vue";

const routes = [
    { path: '/',                            component: Home,            meta: { requiresAuth: true , label: 'Inicio' }, },
    { path: '/chat',                        component: PublicChat,      meta: { requiresAuth: true , label: 'Chat Público' }, },
    { path: '/perfil',                      component: MyProfile,       meta: { requiresAuth: true }, },
    { path: '/perfil/cambiar-contrasena',   component: ChangePassword,  meta: { requiresAuth: true }, },
    { path: '/ingresar',                    component: Login, },
    { path: '/crear-cuenta',                component: Register, },
    { path: '/perfil/editar',               component: ProfileEdit,     meta: { requiresAuth: true },  },
];
// Se agrega el label para hacer un filter y despues mostrarlo en la navegacion o el AppHeader

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user = {
    id: null,
    email: null,
}
subscribeToUserStateChanges(userData => user = userData);

router.beforeEach((to, from) => {
    // console.log("Ruta destino: ", to);
    if(to.meta.requiresAuth && user.id === null) {
        // Redireccionamos al login.
        // Si retornamos un string o un objeto, podemos redireccionar a la ruta que tenga esas
        // características.
        return '/ingresar';
    }
});

export default router;