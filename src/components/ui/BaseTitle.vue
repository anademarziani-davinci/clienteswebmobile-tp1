<script>
  export default {
    name: 'BaseTitle',
    props: {
      title: { type: String, required: true },
      subtitle: { type: String, default: '' },
      align: {
        type: String,
        default: 'left',
        validator: (v) => ['left', 'center', 'right'].includes(v),
      },
    },
    computed: {
      alignClass() {
        return {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right',
        }[this.align];
      },
    },
  };
</script>
<template>
  <div :class="['mb-4', alignClass]">
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-gray-500 text-sm sm:text-base">
      {{ subtitle }}
    </p>
  </div>
</template>

