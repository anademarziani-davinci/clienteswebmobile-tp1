/*
Como sucede con todos los archivos [.config.js] tenemos que
exportar como default un objeto de configuración.

Para agregar el plugin de Vue, necesitamos importarlo y agregarlo
al array de plugins.
*/
import vue from '@vitejs/plugin-vue';
import tailwind from '@tailwindcss/vite';

export default {
    plugins: [vue(), tailwind()],
}