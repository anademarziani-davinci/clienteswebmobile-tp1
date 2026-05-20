<script>
import AuthLayout from '../components/auth/AuthLayout.vue';
import AuthCard from '../components/auth/AuthCard.vue';
import FormInput from '../components/ui/FormInput.vue';
import FormPasswordInput from '../components/ui/FormPasswordInput.vue';
import AppButton from '../components/ui/AppButton.vue';
import FormCheckbox from '../components/ui/FormCheckbox.vue';
import { register } from '../services/auth';
import { User, AtSign, Mail, Lock } from 'lucide-vue-next';

export default {
    name: 'Register',
    components: { AuthLayout, AuthCard, FormInput, FormPasswordInput, AppButton, FormCheckbox },
    data() {
        return {
            // Iconos de Lucide
            userIcon: User,
            atIcon: AtSign,
            mailIcon: Mail,
            lockIcon: Lock,
            user: {
                name: '',
                last_name: '',
                user: '',
                email: '',
                password: '',
                confirm_password: '',
                terminos: false,
            },
            errorMsg: '',
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.errorMsg = '';

             // Validacion: la contraseña debe tener al menos 6 caracteres.
            if (this.user.password.length < 6) {
                this.errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
                return;
            }

            // Validacion: las contraseñas tienen que coincidir
            if (this.user.password !== this.user.confirm_password) {
                this.errorMsg = 'Las contraseñas no coinciden.';
                return;
            }

            // Validación: aceptar terminos.
            // if (!this.user.terminos) {
            //     this.errorMsg = 'Debés aceptar los términos y condiciones.';
            //     return;
            // }

            this.loading = true;
            try {
                await register({
                    email: this.user.email,
                    password: this.user.password,
                });
                this.$router.push('/');
            } catch (error) {
                this.errorMsg = error.message || 'No se pudo crear la cuenta.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<template>
    <AuthLayout>
        <div class="w-full max-w-2xl">
            <AuthCard title="Registrate y comenzá a organizar tu viaje">
                <form @submit.prevent="handleSubmit" novalidate>
                    <!-- Nombre + Apellido -->
                    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 sm:mb-4">
                        <FormInput
                            id="nombre"
                            v-model="user.name"
                            label="Nombre"
                            placeholder="Tu nombre"
                            :icon="userIcon"
                            required
                            autocomplete="given-name"
                            wrapper-class=""
                        />
                        <FormInput
                            id="apellido"
                            v-model="user.last_name"
                            label="Apellido"
                            placeholder="Tu apellido"
                            :icon="userIcon"
                            required
                            autocomplete="family-name"
                            wrapper-class=""
                        />
                    </div>
                    <FormInput
                        id="usuario"
                        v-model="user.user"
                        label="Nombre de Usuario"
                        placeholder="Elegí un nombre de usuario"
                        :icon="atIcon"
                        required
                        autocomplete="username"
                    /> -->

                    <FormInput
                        id="correo"
                        v-model="user.email"
                        label="Correo electrónico"
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        :icon="mailIcon"
                        required
                        autocomplete="email"
                    />

                    <!-- Contraseñas -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 sm:mb-5">
                        <FormPasswordInput
                            id="contrasena"
                            v-model="user.password"
                            label="Contraseña"
                            placeholder="Mínimo 6 caracteres"
                            :icon="lockIcon"
                            required
                            autocomplete="new-password"
                            wrapper-class=""
                        />
                        <FormPasswordInput
                            id="confirmar_contrasena"
                            v-model="user.confirm_password"
                            label="Confirmar Contraseña"
                            placeholder="Repetí tu contraseña"
                            :icon="lockIcon"
                            required
                            autocomplete="new-password"
                            wrapper-class=""
                        />
                    </div>

                    <!-- <FormCheckbox
                        id="terminos"
                        v-model="user.terminos"
                        required
                        class="mb-5 sm:mb-6"
                    >
                        Acepto los
                        <router-link
                            to="/"
                            class="text-azul-600 font-medium hover:text-azul-900"
                        >
                            Términos y Condiciones
                        </router-link>
                        y la Política de Privacidad.
                    </FormCheckbox> -->

                    <p
                        v-if="errorMsg"
                        class="text-sm text-red-600 mb-3 text-center"
                        role="alert"
                    >
                        {{ errorMsg }}
                    </p>

                    <AppButton type="submit" variant="dark" :disabled="loading" class="mt-3">
                        {{ loading ? 'Registrando...' : 'Registrarme' }}
                    </AppButton>
                </form>

                <template #footer>
                    <p class="text-sm text-gray-500 flex flex-wrap items-center justify-center gap-x-1">
                        <span>¿Ya tenés una cuenta?</span>
                        <router-link
                            to="/ingresar"
                            class="text-violeta-600 hover:text-violeta-700 font-medium whitespace-nowrap"
                        >
                            Iniciá sesión acá
                        </router-link>
                    </p>
                </template>
            </AuthCard>
        </div>
    </AuthLayout>
</template>