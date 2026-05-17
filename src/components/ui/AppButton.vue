<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'w-full',
      'min-h-[44px]',
      'px-4 py-2.5 sm:py-3',
      'text-base font-semibold',
      'rounded-xl',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'cursor-pointer',
      variantClasses,
      disabled && 'opacity-60 cursor-not-allowed',
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: { type: String, default: 'button' },
    variant: {
      type: String,
      default: 'dark',
      validator: (v) => ['dark', 'primary', 'outline', 'white'].includes(v),
    },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  computed: {
    variantClasses() {
      const variants = {
        dark: 'bg-azul-700 text-white hover:bg-azul-900 focus:ring-azul-900',
        white: 'bg-white text-dark hover:bg-gray-100 focus:ring-gray-500',
        primary:
          'bg-violeta-600 text-white hover:bg-violeta-700 focus:ring-violeta-500',
        outline:
          'bg-transparent text-gray-900 border border-azul-900 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-900',
      };
      return variants[this.variant] || variants.dark;
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>