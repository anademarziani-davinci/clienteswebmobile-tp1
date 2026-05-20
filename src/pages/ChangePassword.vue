<script>
    import BaseTitle from '../components/ui/BaseTitle.vue';
    import FormPasswordInput from '../components/ui/FormPasswordInput.vue';
    import AppButton from '../components/ui/AppButton.vue';
    import AppLayout from '../layouts/AppLayout.vue';
    import { updatePassword } from '../services/auth';
    import { Lock } from 'lucide-vue-next';

    export default {
        name: 'ChangePassword',
        components: { BaseTitle, FormPasswordInput, AppButton, AppLayout },
        data() {
            return {
                lockIcon: Lock,
                form: {
                    newPassword: '',
                    confirmPassword: '',
                },
                loading: false,
                errorMsg: '',
                successMsg: '',
            };
        },
        methods: {
            async handleSubmit() {
                this.errorMsg = '';
                this.successMsg = '';

                // Validacion: ambas contraseñas tienen que coincidir
                if (this.form.newPassword !== this.form.confirmPassword) {
                    this.errorMsg = 'Las contraseñas no coinciden.';
                    return;
                }

                // Validacion: longitud mínima al menos 6 caracteres
                if (this.form.newPassword.length < 6) {
                    this.errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
                    return;
                }

                this.loading = true;
                try {
                    await updatePassword(this.form.newPassword);
                    // Redirigimos al perfil con un flag para mostrar el alert de exito
                    this.$router.push({
                        path: '/perfil',
                        query: { 'password-updated': 'true' },
                    });
                } catch (error) {
                    this.errorMsg = error.message || 'No se pudo actualizar la contraseña.';
                } finally {
                    this.loading = false;
                }
            },
            onCancel() {
                this.$router.push('/perfil');
            },
        },
    };
</script>
<template>
    <AppLayout>
        <BaseTitle
            title="Cambiar contraseña"
            subtitle="Actualizá tu contraseña de acceso al portal"
        />

        <div class="flex justify-center">
            <div class="w-full max-w-xl">
                <div class="bg-white p-5 sm:p-6 md:p-8 shadow-sm rounded-lg">
                    <form @submit.prevent="handleSubmit" novalidate>
                        <FormPasswordInput
                            id="nuevaContrasena"
                            v-model="form.newPassword"
                            label="Nueva contraseña"
                            placeholder="Mínimo 6 caracteres"
                            :icon="lockIcon"
                            required
                            autocomplete="new-password"
                            wrapper-class="mb-4 sm:mb-5"
                        />

                        <FormPasswordInput
                            id="confirmarContrasena"
                            v-model="form.confirmPassword"
                            label="Confirmar nueva contraseña"
                            placeholder="Repetí la contraseña"
                            :icon="lockIcon"
                            required
                            autocomplete="new-password"
                            wrapper-class="mb-6 sm:mb-8"
                        />

                        <p
                            v-if="errorMsg"
                            class="text-sm text-red-600 mb-3 text-center"
                            role="alert"
                        >
                            {{ errorMsg }}
                        </p>
                        <p
                            v-if="successMsg"
                            class="text-sm text-emerald-600 mb-3 text-center"
                            role="status"
                        >
                            {{ successMsg }}
                        </p>
                        <div class="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                            <AppButton
                                type="button"
                                variant="outline"
                                class="sm:w-auto sm:px-6"
                                :disabled="loading"
                                @click="onCancel"
                            >
                                Cancelar
                            </AppButton>
                            <AppButton
                                type="submit"
                                variant="dark"
                                class="sm:w-auto sm:px-6"
                                :disabled="loading"
                            >
                                {{ loading ? 'Guardando...' : 'Guardar cambios' }}
                            </AppButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>