<template>
  <div
    class="
      min-h-screen min-h-dvh
      w-full
      flex items-center justify-center
      px-4 py-6 sm:px-6 sm:py-8
      bg-brand-gradient
    "
    style="
      padding-top: max(1.5rem, env(safe-area-inset-top));
      padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
      padding-left: max(1rem, env(safe-area-inset-left));
      padding-right: max(1rem, env(safe-area-inset-right));
    "
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
// Layout para vistas de autenticación (login, registro, recuperar contraseña).
// - min-h-dvh: altura dinámica del viewport (corrige bug de la barra de URL en iOS)
// - safe-area-inset: respeta el notch en iPhones modernos
// - padding adaptativo según breakpoint
</script>
