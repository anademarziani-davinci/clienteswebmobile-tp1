/*
Acá va a definir nuestro router.
Para lograrlo, necesitamos cumplir los siguientes pasos:

1. Importar las funciones "createRouter" y "createWebHistory" de
    "vue-router".
2. Definir la lista de rutas.
3. Crear el router.
4. Exportarlo para poder usarlo en [main.js].
*/
import { createRouter, createWebHistory } from "vue-router";
import { subscribeToUserStateChanges } from "../services/auth";
import Home from "../pages/Home.vue";
import PublicChat from "../pages/PublicChat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import ProfileEdit from "../pages/ProfileEdit.vue";

// Las rutas se definen como un array de objetos.
// Cada objeto representa una ruta.
// Debe tener, al menos, 2 propiedades:
//  1. path. String. La ruta a partir de la raíz del sitio.
//  2. component. Object. El componente que queremos renderizar 
//      para esa ruta.
// Entre las propiedades de la ruta, tenemos "meta".
// Esta es una propiedad que es un objeto donde podemos guardar
// data arbitraria que queremos dejar asociada a la ruta.
const routes = [
    { path: '/',                component: Home,        meta: { requiresAuth: true , label: 'Inicio' }, },
    { path: '/chat',            component: PublicChat,  meta: { requiresAuth: true , label: 'Chat Público' }, },
    { path: '/perfil',          component: MyProfile,   meta: { requiresAuth: true }, },
    { path: '/ingresar',        component: Login, },
    { path: '/crear-cuenta',    component: Register, },
    { path: '/perfil/editar',   component: ProfileEdit  },
];

// Creamos el router.
// createRouter recibe un objeto con 2 propiedades:
//  1. routes. El array de rutas.
//  2. history. El modo de manejo del historial de la app para
//      el browser. Debe crearse con createWebHistory() o
//      createWebHashHistory().
const router = createRouter({
    routes,
    history: createWebHistory(),
});

/*
    # Protección de acceso a rutas con Vue Router
    Un requerimiento común es tener rutas que para ser accedidas deba cumplirse con alguna condición.
    Por ejemplo, estar autenticado.
    En Vue Router, esto se resuelve con la ayuda de los "guards" (guardias o protecciones).
    Un "guard" es un callback que se ejecuta antes de que ocurra una navegación. Desde este guard,
    nosotros podemos cancelar la navegación, o redirigir a otra ruta.
    Hay varias formas de agregar guards.
    La primera, que es la que vamos a usar, es registrar en el router un guard global que se aplique
    a todas las rutas del sistema usando la función router.beforeEach().
    Este método recibe un callback, que a su vez va a recibir 2 parámetros:
    - to. Object. Los datos de la ruta a la que se está navegando (destino).
    - from. Object. Los datos de la ruta de la cual estamos saliendo (origen).

    Para poder detectar si una ruta requiere que el usuario esté autenticado para poder ingresar,
    vamos a apoyarnos en la propiedad "meta" de la ruta.
*/
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