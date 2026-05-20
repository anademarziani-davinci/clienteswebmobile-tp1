<script>
    export default {
        name: 'ChatMessageEmpty',
        props: {
            message: { 
                type: String, 
                default: 'No hay mensajes todavía. ¡Sé el primero en comentar!',
            },
            icon: {
                type: String,
                default: 'fa-regular fa-comment-dots',
            },
        },
    };
</script>

<template>
    <div class="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
        <i :class="icon" class="text-4xl mb-2 text-gray-400" aria-hidden="true"></i>
        <p class="text-sm">{{ message }}</p>
    </div>
</template>