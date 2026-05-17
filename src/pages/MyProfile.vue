<template>
    <AppLayout>
        <BaseTitle
            title="Mi Perfil"
            subtitle="Gestioná tu información personal y preferencias."
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- Sidebar: avatar y botón de editar -->
            <aside class="lg:col-span-1">
                <ProfileCard
                    :name="fullName"
                    :member-since="memberSince"
                    @edit="goToEdit"
                />
            </aside>

            <!-- Información personal -->
            <section class="lg:col-span-2">
                <div class="bg-white p-6 sm:p-8 shadow-sm rounded-lg h-full">
                    <h3 class="text-lg sm:text-xl font-semibold text-violet-900 border-b border-gray-200 pb-3 mb-4 sm:mb-5">
                        Información Personal
                    </h3>
                    <dl>
                        <ProfileInfo label="Nombre completo" :value="fullName" />
                        <ProfileInfo label="Correo electrónico" :value="user?.email || '—'" />
                        <ProfileInfo label="Teléfono" :value="profile.phone || '—'" />
                        <ProfileInfo label="Dirección" :value="profile.address || '—'" />
                        <ProfileInfo label="Carrera" :value="profile.career || '—'" />
                    </dl>
                </div>
            </section>

            <!-- Biografía: ocupa el ancho completo debajo de las dos columnas -->
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

<script>
import BaseTitle from '../components/ui/BaseTitle.vue';
import ProfileCard from '../components/profile/ProfileCard.vue';
import AppLayout from '../layouts/AppLayout.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { subscribeToUserStateChanges } from '../services/auth';

export default {
    name: 'Profile',
    components: { BaseTitle, ProfileCard, AppLayout, ProfileInfo },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            // Datos dummy de ejemplo. Reemplazar luego por fetch real al backend.
            profile: {
                name: 'Juan',
                last_name: 'Pérez',
                username: 'juanperez',
                phone: '+54 11 5555-1234',
                address: 'Calle Falsa 123, Buenos Aires, AR',
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
    },
    methods: {
        goToEdit() {
            this.$router.push('/perfil/editar');
        },
    },
};
</script>