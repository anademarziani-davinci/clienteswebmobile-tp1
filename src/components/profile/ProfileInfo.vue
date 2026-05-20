<script>
  export default {
    name: 'ProfileInfo',
    props: {
      label: { type: String, required: true },
      value: { type: [String, Number], default: '' },
    },
  };
</script>

<template>
  <div
    class="
      grid grid-cols-1 sm:grid-cols-3
      gap-1 sm:gap-3
      mb-3 sm:mb-4
    "
  >
    <div class="text-gray-500 font-medium text-sm sm:text-base">{{ label }}</div>
    <div class="sm:col-span-2 text-gray-900 m-0">
      <!-- Permite slot custom para contenido enriquecido (links, etc.) -->
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

