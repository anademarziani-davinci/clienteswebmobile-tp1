<script>
  import AppLogo from '../ui/AppLogo.vue';

    export default {
      name: 'AuthCard',
      components: { AppLogo },
      props: {
        title: { type: String, default: '' },
        showLogo: { type: Boolean, default: true },
        logoTo: { type: String, default: '/' },
      },
    }
</script>

<template>
   <!-- max-w-md + w-full: nunca se desborda en pantallas chicas -->
  <div
    class="
      bg-white shadow-xl
      p-5 sm:p-6 md:p-8 lg:p-10
      rounded-xl
      mx-auto
      min-w-card-min md:min-w-card-md lg:min-w-card-lg
    "
  >
    <div
      class="text-center mb-5 sm:mb-6"
    >
      <slot name="header">
        <AppLogo v-if="showLogo" :to="logoTo" />
        <h1 v-if="title" class="text-gray-600 text-xl font-medium mb-0">
          {{ title }}
        </h1>
      </slot>
    </div>

    <slot />

    <div v-if="$slots.footer" class="text-center mt-4 sm:mt-5">
      <slot name="footer" />
    </div>
  </div>
</template>

