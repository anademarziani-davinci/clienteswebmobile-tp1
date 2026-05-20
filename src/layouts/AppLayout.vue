
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
            // Como Supabase solo me guarda email, y se usa el split para solo mostrar la parte antes del @. Reemplazar cuando veamos perfil
            displayName() {
                if (!this.user?.email) return 'Invitado';
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
