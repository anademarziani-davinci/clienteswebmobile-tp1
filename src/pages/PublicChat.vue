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
            // Estado del alert: si tiene message, se muestra.
            alert: {
                variant: 'success',
                title: '',
                message: '',
            },
        };
    },
    methods: {
        async handleSendMessage(messageData) {
            this.clearAlert();
            this.sending = true;
            try {
                await sendNewPublicChatMessage({
                    user_id: this.user.id,
                    email: this.user.email,
                    body: messageData.body,
                });
                this.$refs.messageForm.clearBody();
                this.showAlert('success', '¡Mensaje enviado!', 'Tu comentario se publicó correctamente.');
            } catch (error) {
                this.showAlert('error', 'Ocurrió un error', 'No pudimos enviar tu mensaje. Probá nuevamente en unos segundos.');
            } finally {
                this.sending = false;
            }
        },
        async loadMessages() {
            this.loadingMessages = true;
            try {
                this.messages = await fetchLastPublicChatMessages();
            } catch (error) {
                this.showAlert('error', 'Ocurrió un error', 'No pudimos cargar los mensajes. Recargá la página o intentá más tarde.');
            } finally {
                this.loadingMessages = false;
            }
        },
        showAlert(variant, title, message) {
            this.alert = { variant, title, message };
        },
        clearAlert() {
            this.alert = { variant: 'success', title: '', message: '' };
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

        <Alert
            v-if="alert.message"
            :variant="alert.variant"
            :title="alert.title"
            :message="alert.message"
            dismissible
            :auto-dismiss="alert.variant === 'success' ? 3000 : 5000"
            @update:model-value="clearAlert"
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