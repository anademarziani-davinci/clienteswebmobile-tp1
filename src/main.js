/*
# Creamos la aplicación de Vue
Para lograrlo necesitamos primero importar dos cosas:
1. La función createApp de "vue".
2. Importar el componente App que va a servir como raíz.

# Nota importante sobre las rutas en proyectos que usan npm
Si nuestro proyecto trabaja con módulos de npm (como Vite) hay
que tener cuidado con cómo ponemos las rutas en los "import"s.

Por defecto, las rutas que ponemos npm va a querer suponer que
hacen referencia a paquetes de npm.

Por ejemplo, si hacemos un:
  import ... from 'vue';

Se entiende que "vue" es un paquete instalado con npm que existe
en la carpeta [node_modules].
Si queremos, en cambio, importar de un archivo local del proyecto
o de una fuente externa a npm, entonces necesitamos que la ruta
sea:

- Absoluta.
- Que empiece con un "/", "./" o "../".
*/
import { createApp } from "vue";
import App from "./App.vue";
// import "./bootstrap.min.css";
import "./style.css";
import router from "./router/router";

// Creamos la aplicación.
const app = createApp(App);

// Registramos el router.
app.use(router);

// Montamos la aplicación en el div#app del HTML.
app.mount('#app');