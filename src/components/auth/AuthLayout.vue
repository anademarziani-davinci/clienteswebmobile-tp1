<script>
  export default {
    name: 'AuthLayout',
  }
  // Layout para vistas de autenticacion (login, registro, recuperar contraseña que me queda pendiente).
</script>
<template>
  <div
    class="
      min-h-screen min-h-dvh
      w-full
      flex items-center justify-center
      px-4 py-6 sm:px-6 sm:py-8
      bg-brand-gradient
    "
  >
    <slot />
  </div>
</template>


