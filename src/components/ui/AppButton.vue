<script>
  export default {
    name: 'AppButton',
    props: {
      type: { type: String, default: 'button' },
      variant: {
        type: String,
        default: 'dark',
        validator: (v) => ['dark', 'primary', 'outline', 'white', 'glass', 'text'].includes(v),
      },
      size: {
        type: String,
        default: 'lg',
        validator: (v) => ['sm', 'md', 'lg'].includes(v),
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
          glass:
            'bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 focus:ring-white/50',
          // Variante "text": botón solo texto, sin fondo ni borde.
          // Util para acciones secundarias inline (links, etc).
          text:
            'bg-transparent text-azul-700 hover:text-azul-900 hover:bg-gray-100 focus:ring-azul-500',
        };
        return variants[this.variant] || variants.dark;
      },
      sizeClasses() {
        const sizes = {
          sm: 'w-auto px-4 py-1.5 text-sm',
          md: 'w-auto px-4 py-2 text-base',
          lg: 'w-full px-4 py-2.5 sm:py-3 text-base',
        };
        return sizes[this.size] || sizes.lg;
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'min-h-[44px]',
      'font-semibold',
      'rounded-xl',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'cursor-pointer',
      'inline-flex items-center justify-center gap-2',
      sizeClasses,
      variantClasses,
      disabled && 'opacity-60 cursor-not-allowed',
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

