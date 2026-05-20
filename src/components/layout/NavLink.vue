<template>
  <router-link
    :to="to"
    class="
      block lg:inline-block
      px-3 py-2
      text-white font-medium
      hover:text-violeta-100
      transition-colors duration-100
      no-underline
    "
    :class="{ 'text-violeta-200': isActive }"
  >
    <slot>{{ label }}</slot>
  </router-link>
</template>

<script>
  export default {
    name: 'NavLink',
    props: {
      to: { type: String, required: true },
      label: { type: String, default: '' },
    },
    computed: {
      isActive() {
        return this.$route.path === this.to
      },
    },
  }
</script>
