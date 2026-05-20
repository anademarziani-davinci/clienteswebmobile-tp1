<script>
  import { User } from 'lucide-vue-next';

  export default {
    name: 'FormFieldWrapper',
    props: {
      forId: { type: String, required: true },
      label: { type: String, required: true },
      icon: { type: [Object, Function], default: () => User },
      showIcon: { type: Boolean, default: true },
      required: { type: Boolean, default: false },
      wrapperClass: { type: String, default: 'mb-3 sm:mb-4' },
    },
  };
</script>
<template>
  <div :class="wrapperClass" class="min-w-0">
    <label
      :for="forId"
      class="block text-sm font-medium text-azul-900 mb-1.5 sm:mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
    </label>

    <!-- Con icono: estructura horizontal (cuadrito gris a la izquierda) -->
    <div v-if="showIcon" class="flex w-full min-w-0 items-stretch">
      <span
        class="
          inline-flex items-center justify-center
          flex-shrink-0
          w-11 sm:w-12
          bg-gray-100
          border border-r-0 border-gray-300
          rounded-l-md
        "
        aria-hidden="true"
      >
        <component :is="icon" :size="18" class="text-gray-500" />
      </span>
      <slot name="control" />
    </div>

    <!-- Sin icono: el control ocupa todo el ancho -->
    <slot v-else name="control" />
  </div>
</template>

