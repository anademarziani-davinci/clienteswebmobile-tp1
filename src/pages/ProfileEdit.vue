<script>
import BaseTitle from '../components/ui/BaseTitle.vue';
import FormInput from '../components/ui/FormInput.vue';
import FormTextarea from '../components/ui/FormTextarea.vue';
import AppButton from '../components/ui/AppButton.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { subscribeToUserStateChanges } from '../services/auth';
import { User, Phone, MapPin, GraduationCap, MessageCircle } from 'lucide-vue-next';

export default {
    name: 'ProfileEdit',
    components: { BaseTitle, FormInput, FormTextarea, AppButton, AppLayout },
    data() {
        return {
            // Iconos de Lucile
            userIcon: User,
            phoneIcon: Phone,
            addressIcon: MapPin,
            careerIcon: GraduationCap,
            bioIcon: MessageCircle,
            // Datos del usuario autenticado (para mostrar email)
            user: {
                id: null,
                email: null,
            },
            // Datos editables del formulario, precargados con valores de ejemplo.
            form: {
                name: 'Juan',
                last_name: 'Pérez',
                phone: '+54 11 5555-1234',
                address: 'Calle Falsa 123, CABA',
                career: 'Tecnicatura en Diseño y Desarrollo Web',
                bio: 'Soy estudiante de desarrollo web apasionado por crear experiencias digitales.\nMe interesa especialmente el frontend con Vue.js y el diseño de interfaces accesibles.\n\nEn mi tiempo libre disfruto de la fotografía y los videojuegos retro.',
            },
            errorMsg: '',
        };
    },
    methods: {
        handleSubmit() {
            this.errorMsg = '';

            // Validacion: nombre y apellido son obligatorios
            if (!this.form.name.trim() || !this.form.last_name.trim()) {
                this.errorMsg = 'El nombre y el apellido son obligatorios.';
                return;
            }

            // Acá deberia ir la logica para guardar el perfil. Queda pendiente
            // console.log('[ProfileEdit] Datos a guardar:', { ...this.form });
            this.$router.push('/perfil');
        },
        onCancel() {
            this.$router.push('/perfil');
        },
    },
    mounted() {
        // Nos suscribimos a los cambios del usuario autenticado para mostrar el email
        subscribeToUserStateChanges(userData => this.user = userData);
    },
};
</script>

<template>
    <AppLayout>
        <BaseTitle
            title="Modificar Información"
            subtitle="Actualizá tus datos personales"
        />

        <div class="flex justify-center">
            <div class="w-full">
                <div class="bg-white p-5 sm:p-6 md:p-8 shadow-sm rounded-lg">
                    <form @submit.prevent="handleSubmit" novalidate>
                        <!-- Correo electrónico (lectura) -->
                        <div class="bg-gray-100 rounded-md p-4 mb-4 sm:mb-5">
                            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                                Correo electrónico
                            </h3>
                            <p class="m-0 text-gray-700">{{ user.email }}</p>
                        </div>

                        <!-- Nombre + Apellido -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 sm:mb-5">
                            <FormInput
                                id="nombreUsuario"
                                v-model="form.name"
                                label="Nombre"
                                placeholder="Tu nombre"
                                :icon="userIcon"
                                required
                                autocomplete="given-name"
                                wrapper-class=""
                            />
                            <FormInput
                                id="apellidoUsuario"
                                v-model="form.last_name"
                                label="Apellido"
                                placeholder="Tu apellido"
                                :icon="userIcon"
                                required
                                autocomplete="family-name"
                                wrapper-class=""
                            />
                        </div>

                        <FormInput
                            id="telefonoUsuario"
                            v-model="form.phone"
                            label="Teléfono"
                            type="tel"
                            :icon="phoneIcon"
                            autocomplete="tel"
                            wrapper-class="mb-4 sm:mb-5"
                        />

                        <FormInput
                            id="direccionUsuario"
                            v-model="form.address"
                            label="Dirección"
                            :icon="addressIcon"
                            autocomplete="street-address"
                            wrapper-class="mb-4 sm:mb-5"
                        />

                        <FormInput
                            id="carreraUsuario"
                            v-model="form.career"
                            label="Carrera"
                            :icon="careerIcon"
                            wrapper-class="mb-4 sm:mb-5"
                        />

                        <FormTextarea
                            id="bioUsuario"
                            v-model="form.bio"
                            label="Biografía"
                            :icon="bioIcon"
                            placeholder="Contanos un poco sobre vos..."
                            :rows="6"
                            :maxlength="500"
                            show-counter
                            wrapper-class="mb-6 sm:mb-8"
                        />

                        <p
                            v-if="errorMsg"
                            class="text-sm text-red-600 mb-3 text-center"
                            role="alert"
                        >
                            {{ errorMsg }}
                        </p>

                        <!-- Botones -->
                        <div class="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                            <AppButton
                                type="button"
                                variant="outline"
                                class="sm:w-auto sm:px-6"
                                @click="onCancel"
                            >
                                Cancelar
                            </AppButton>
                            <AppButton
                                type="submit"
                                variant="dark"
                                class="sm:w-auto sm:px-6"
                            >
                                Guardar cambios
                            </AppButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>