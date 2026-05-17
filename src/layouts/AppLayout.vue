<template>
  <div class="flex flex-col min-h-screen min-h-dvh">
    <AppHeader
      :user-name="displayName"
      :user-email="user.email"
      @logout="handleLogout"
    />
    <main
      class="flex-grow container mx-auto px-4 py-6 sm:py-8 lg:py-10 w-full"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { logout, subscribeToUserStateChanges } from '../services/auth.js';
import AppHeader from '../components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';

export default {
    name: 'AppLayout',
    components: { AppHeader, AppFooter },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
        };
    },
    computed: {
        // Nombre a mostrar en el header.
        // Como Supabase Auth solo guarda email, usamos la parte antes del @.
        displayName() {
            if (!this.user.email) return 'Usuario';
            return this.user.email.split('@')[0];
        },
    },
    methods: {
        async handleLogout() {
            logout();
            this.$router.push('/ingresar');
        },
    },
    mounted() {
        subscribeToUserStateChanges(userData => this.user = userData);
    },
};
</script>