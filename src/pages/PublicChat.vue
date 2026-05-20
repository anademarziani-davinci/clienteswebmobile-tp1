<script>
import BaseTitle from '../components/ui/BaseTitle.vue';
import ChatMessageForm from '../components/chat/ChatMessageForm.vue';
import ChatMessageList from '../components/chat/ChatMessageList.vue';
import AppLoading from '../components/ui/AppLoading.vue';
import ChatMessageEmpty from '../components/chat/ChatMessageEmpty.vue';
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
    components: { BaseTitle, ChatMessageForm, ChatMessageList, AppLoading, ChatMessageEmpty, AppLayout },
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
        };
    },
    methods: {
        async handleSendMessage(messageData) {
            this.sending = true;
            try {
                await sendNewPublicChatMessage({
                    user_id: this.user.id,
                    email: this.user.email,
                    body: messageData.body,
                });
                this.$refs.messageForm.clearBody();
            } catch (error) {
                console.error('[PublicChat handleSendMessage] Error al enviar mensaje:', error);
            } finally {
                this.sending = false;
            }
        },
        async loadMessages() {
            this.loadingMessages = true;
            try {
                this.messages = await fetchLastPublicChatMessages();
            } catch (error) {
                console.error('[PublicChat loadMessages] Error al cargar mensajes:', error);
            } finally {
                this.loadingMessages = false;
            }
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