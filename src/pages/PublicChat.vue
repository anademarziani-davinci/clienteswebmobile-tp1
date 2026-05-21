<script>
import BaseTitle from '../components/ui/BaseTitle.vue';
import ChatMessageForm from '../components/chat/ChatMessageForm.vue';
import ChatMessageList from '../components/chat/ChatMessageList.vue';
import AppLoading from '../components/ui/AppLoading.vue';
import ChatMessageEmpty from '../components/chat/ChatMessageEmpty.vue';
import Alert from '../components/ui/Alert.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { subscribeToUserStateChanges } from '../services/auth';
import { 
    fetchLastPublicChatMessages, 
    sendNewPublicChatMessage, 
    subscribeToNewPublicChatMessages,
} from '../services/public-chat';

// Variable donde guardamos la función que cancela la suscripción al chat,
// para poder llamarla al desmontar el componente.
let unsubscribeFromChat = () => {};

export default {
    name: 'PublicChat',
    components: { BaseTitle, ChatMessageForm, ChatMessageList, AppLoading, ChatMessageEmpty, AppLayout, Alert },
    data() {
        return {
            messages: [],
            // Para la carga inicial
            loadingMessages: true,    
            // Para cuando se envia un mensaje
            sending: false,          
            // Datos del usuario autenticado
            user: {
                id: null,
                email: null,
            },
            // Mensaje de error a mostrar al usuario.
            errorMsg: '',
        };
    },
    methods: {
        async handleSendMessage(messageData) {
            this.errorMsg = '';
            this.sending = true;
            try {
                await sendNewPublicChatMessage({
                    user_id: this.user.id,
                    email: this.user.email,
                    body: messageData.body,
                });
                this.$refs.messageForm.clearBody();
            } catch (error) {
                this.errorMsg = 'No pudimos enviar tu mensaje. Probá nuevamente en unos segundos.';
            } finally {
                this.sending = false;
            }
        },
        async loadMessages() {
            this.errorMsg = '';
            this.loadingMessages = true;
            try {
                this.messages = await fetchLastPublicChatMessages();
            } catch (error) {
                this.errorMsg = 'No pudimos cargar los mensajes. Recargá la página o intentá más tarde.';
            } finally {
                this.loadingMessages = false;
            }
        },
        dismissError() {
            this.errorMsg = '';
        },
    },
    async mounted() {
        // Nos suscribimos a los cambios del usuario autenticado
        subscribeToUserStateChanges(userData => this.user = userData);

        // Nos suscribimos a los nuevos mensajes del chat
        unsubscribeFromChat = subscribeToNewPublicChatMessages(
            newMessage => this.messages.push(newMessage)
        );

        await this.loadMessages();
    },
    unmounted() {
        unsubscribeFromChat();
    },
};
</script>

<template>
    <AppLayout>
        <BaseTitle
            title="Chat Público"
            subtitle="Publicá tus comentarios en el portal"
        />

        <!-- Alert de error -->
        <Alert
            v-if="errorMsg"
            variant="error"
            title="Ocurrió un error"
            :message="errorMsg"
            dismissible
            :auto-dismiss="5000"
            @update:model-value="dismissError"
        />

        <!-- Formulario siempre visible arriba -->
        <ChatMessageForm
            ref="messageForm"
            :loading="sending"
            @submit="handleSendMessage"
        />

        <!-- Loading inicial de mensajes -->
        <AppLoading 
            v-if="loadingMessages"
            message="Cargando mensajes..."
            size="lg"
        />
        <ChatMessageEmpty 
            v-else-if="messages.length === 0"
        />

        <ChatMessageList 
            v-else
            :messages="messages" 
        />
    </AppLayout>
</template>