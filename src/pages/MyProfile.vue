<script>
import BaseTitle from '../components/ui/BaseTitle.vue';
import ProfileCard from '../components/profile/ProfileCard.vue';
import AppLayout from '../layouts/AppLayout.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import AppButton from '../components/ui/AppButton.vue';
import Alert from '../components/ui/Alert.vue';
import { subscribeToUserStateChanges, logout } from '../services/auth';

export default {
    name: 'Profile',
    components: { BaseTitle, ProfileCard, AppLayout, ProfileInfo, AppButton, Alert },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            // Estado local del alert. Se inicializa segun el query param y se puede cerrar
            showPasswordUpdatedAlert: false,
            profile: {
                name: 'Juan',
                last_name: 'Pérez',
                username: 'juanperez',
                email: '',
                phone: '+54 11 5555-1234',
                address: 'Calle Falsa 123, CABA',
                career: 'Tecnicatura en Diseño y Desarrollo Web',
                bio: 'Soy estudiante de desarrollo web apasionado por crear experiencias digitales.\nMe interesa especialmente el frontend con Vue.js y el diseño de interfaces accesibles.\n\nEn mi tiempo libre disfruto de la fotografía y los videojuegos retro.',
                created_at: '2024-03-15T10:30:00Z',
            },
        };
    },
    computed: {
        fullName() {
            const full = `${this.profile.name || ''} ${this.profile.last_name || ''}`.trim();
            return full || this.profile.username || 'Usuario';
        },
        memberSince() {
            if (!this.profile.created_at) return '';
            const date = new Date(this.profile.created_at);
            return date.toLocaleDateString('es-AR', {
                month: 'long',
                year: 'numeric',
            });
        },
    },
    mounted() {
        subscribeToUserStateChanges(userData => this.user = userData);

        // Si venimos del cambio de contraseña, mostramos el alert
        if (this.$route.query['password-updated'] === 'true') {
            this.showPasswordUpdatedAlert = true;
            // Se limpia el query param de la URL para que al refrescar no vuelva a aparecer
            this.$router.replace({ path: '/perfil', query: {} });
        }
    },
    methods: {
        goToEdit() {
            this.$router.push('/perfil/editar');
        },
        goToChangePassword() {
            this.$router.push('/perfil/cambiar-contrasena');
        },
        async goToLogin() {
            // Cerramos sesion y mandamos al login para que entre con la nueva contraseña
            await logout();
            this.$router.push('/ingresar');
        },
        dismissAlert(value) {
            this.showPasswordUpdatedAlert = value;
        },
    },
};
</script>
<template>
    <AppLayout>
        <BaseTitle
            title="Mi Perfil"
            subtitle="Gestioná tu información personal y preferencias."
        />

        <!-- Alert de exito tras cambio de contraseña -->
        <Alert
            v-if="showPasswordUpdatedAlert"
            variant="success"
            title="¡Contraseña actualizada!"
            message="Tu contraseña fue cambiada correctamente. Si querés, podés cerrar sesión y volver a entrar usando tu nueva contraseña."
            action-label="Volver a iniciar sesión"
            dismissible
            :auto-dismiss="6000"
            @action="goToLogin"
            @update:model-value="dismissAlert"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- Sidebar: avatar y boton de cambiar contraseña -->
            <aside class="lg:col-span-1">
                <ProfileCard
                    :name="fullName"
                    :member-since="memberSince"
                    button-label="Cambiar contraseña"
                    @action="goToChangePassword"
                />
            </aside>

            <!-- Informacion personal -->
            <section class="lg:col-span-2">
                <div class="bg-white p-6 sm:p-8 shadow-sm rounded-lg h-full">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-3 mb-4 sm:mb-5">
                        <h3 class="text-lg sm:text-xl font-semibold text-violet-900">
                            Información Personal
                        </h3>
                        <AppButton variant="dark" size="sm" @click="goToEdit">
                            Modificar datos
                        </AppButton>
                    </div>

                    <dl>
                        <ProfileInfo label="Nombre completo" :value="fullName" />
                        <ProfileInfo label="Correo electrónico" :value="user?.email || '—'" />
                        <ProfileInfo label="Teléfono" :value="profile.phone || '—'" />
                        <ProfileInfo label="Dirección" :value="profile.address || '—'" />
                        <ProfileInfo label="Carrera" :value="profile.career || '—'" />
                    </dl>
                </div>
            </section>

            <!-- Biografia -->
            <section class="lg:col-span-3">
                <div class="bg-white p-6 sm:p-8 shadow-sm rounded-lg">
                    <h3 class="text-lg sm:text-xl font-semibold text-violet-900 border-b border-gray-200 pb-3 mb-4 sm:mb-5">
                        Biografía
                    </h3>
                    <dl>
                        <p class="whitespace-pre-line leading-relaxed">
                            {{ profile.bio || '—' }}
                        </p>
                    </dl>
                </div>
            </section>
        </div>
    </AppLayout>
</template>
