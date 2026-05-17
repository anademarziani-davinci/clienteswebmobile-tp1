<script>
import AuthCard from '../components/auth/AuthCard.vue';
import AuthLayout from '../components/auth/AuthLayout.vue';
import FormInput from '../components/ui/FormInput.vue';
import FormPasswordInput from '../components/ui/FormPasswordInput.vue';
import AppButton from '../components/ui/AppButton.vue';
import { login } from '../services/auth';
import { Mail, Lock } from 'lucide-vue-next';

export default {
    name: 'Login',
    components: { AuthLayout, AuthCard, FormInput, FormPasswordInput, AppButton },
    data() {
        return {
            mailIcon: Mail,
            lockIcon: Lock,
            user: {
                email: '',
                password: '',
            },
            errorMsg: '',
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.errorMsg = '';
            this.loading = true;
            try {
                await login({
                    email: this.user.email,
                    password: this.user.password,
                });
                this.$router.push('/');
            } catch (error) {
                this.errorMsg = error.message || 'No se pudo iniciar sesión.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<template>
    <AuthLayout>
        <AuthCard title="Ingrese su correo y contraseña">
            <form action="#" @submit.prevent="handleSubmit">
                <FormInput
                    id="email"
                    v-model="user.email"
                    label="Correo electrónico"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    :icon="mailIcon"
                    required
                    autocomplete="email"
                />

                <FormPasswordInput
                    id="contrasena"
                    v-model="user.password"
                    label="Contraseña"
                    placeholder="********"
                    :icon="lockIcon"
                    required
                    autocomplete="current-password"
                    wrapper-class="mb-4 sm:mb-5"
                />

                <p
                    v-if="errorMsg"
                    class="text-sm text-red-600 mb-3 text-center"
                    role="alert"
                >
                    {{ errorMsg }}
                </p>

                <AppButton type="submit" variant="dark" :disabled="loading">
                    {{ loading ? 'Ingresando...' : 'Ingresar' }}
                </AppButton>
            </form>

            <template #footer>
                <p class="text-sm text-gray-500 flex flex-wrap items-center justify-center gap-x-1">
                    <span>¿No tenés una cuenta?</span>
                    <router-link
                        to="/crear-cuenta"
                        class="text-violeta-600 hover:text-violeta-700 font-medium whitespace-nowrap"
                    >
                        Registrate acá
                    </router-link>
                </p>
            </template>
        </AuthCard>
    </AuthLayout>
</template>