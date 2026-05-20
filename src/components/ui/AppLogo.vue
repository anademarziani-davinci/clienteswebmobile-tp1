<script>
  export default {
    name: 'AppLogo',
    props: {
      variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'white'].includes(value),
      },
      logoSrc: { 
        type: String, 
        default: '',
      },
      alt: { type: String, default: 'Logo airax' },
      title: { type: String, default: 'airax' },
      logoClass: {
        type: String,
        default: 'w-auto',
      },
    },
    computed: {
      // Si pasa un logoSrc manual, se utiliza
      // Sino, devolvemos el logo correspondiente segun la variante
      resolvedLogoSrc() {
        if (this.logoSrc) return this.logoSrc;

        const logos = {
          primary: '/img/logo-airax.svg',
          white: '/img/logo-airax-white.svg',
        };
        return logos[this.variant];
      },
    },
  };
</script>
<template>
    <picture class="flex justify-center">
      <img :src="resolvedLogoSrc" :alt="alt" :class="logoClass" />
    </picture>
</template>

