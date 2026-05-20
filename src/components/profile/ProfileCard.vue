<script>
  import AppButton from '../ui/AppButton.vue';
  import { User } from 'lucide-vue-next';

  export default {
      name: 'ProfileCard',
      components: { AppButton, User },
      props: {
          name: { type: String, required: true },
          memberSince: { type: String, default: '' },
          buttonLabel: { type: String, default: 'Modificar datos' },
      },
      emits: ['action'],
  };
</script>
<template>
  <div
    class="
      bg-gradient-primary p-6 sm:p-8
      shadow-sm rounded-lg
      text-center
      h-full
      flex flex-col
    "
  >
    <div
      class="
        w-24 h-24 sm:w-28 sm:h-28
        mx-auto mb-4
        rounded-full
        bg-violet-100
        flex items-center justify-center
        flex-shrink-0
      "
    >
      <User :size="56" class="text-violet-600" :stroke-width="1.5" />
    </div>
    <h3 class="text-lg sm:text-xl font-bold text-white mb-1">
      {{ name }}
    </h3>
    <p class="text-sm text-gray-100 mb-5">Miembro desde {{ memberSince }}</p>
    <div class="mt-auto">
      <AppButton variant="glass" @click="$emit('action')">
        {{ buttonLabel }}
      </AppButton>
    </div>
  </div>
</template>

