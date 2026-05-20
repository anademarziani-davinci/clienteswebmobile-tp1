<script>
    import AppButton from '../ui/AppButton.vue';
    import FormTextarea from '../ui/FormTextarea.vue';
    import { MessageSquareMore, Send } from 'lucide-vue-next';

    export default {
        name: 'ChatMessageForm',
        components: { AppButton, FormTextarea, MessageSquareMore, Send },
        props: {
            loading: { type: Boolean, default: false },
        },
        emits: ['submit'],
        data() {
            return {
                newMessage: {
                    body: '',
                },
            };
        },
        methods: {
            handleSubmit() {
                this.$emit('submit', { ...this.newMessage });
            },
            clearBody() {
                this.newMessage.body = '';
            },
        },
    };
</script>

<template>
    <section class="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 mb-6 shadow-sm">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <MessageSquareMore :size="20" class="text-azul-600" aria-hidden="true" />
            Enviar un mensaje
        </h2>

        <form 
            action="#"
            @submit.prevent="handleSubmit"
            class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-4 md:items-start"
        >
            <div>
                <FormTextarea
                    id="body"
                    v-model="newMessage.body"
                    label="Mensaje"
                    placeholder="Dejanos tus mensajes"
                    required
                />
            </div>
            <div class="md:pt-7">
                <AppButton type="submit" variant="primary" :disabled="loading" class="w-full md:w-auto">
                    <Send :size="16" class="mr-1 inline-block" aria-hidden="true" />
                    {{ loading ? 'Enviando...' : 'Enviar' }}
                </AppButton>
            </div>
        </form>
    </section>
</template>