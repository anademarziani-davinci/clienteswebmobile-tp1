<script>
import ChatMessageItem from './ChatMessageItem.vue';
import ChatMessageEmpty from './ChatMessageEmpty.vue';

export default {
    name: 'ChatMessageList',
    components: { ChatMessageItem, ChatMessageEmpty },
    props: {
        messages: { type: Array, required: true },
    },
    computed: {
        // Ordenamos del más reciente al más antiguo sin mutar el array original.
        sortedMessages() {
            return [...this.messages].sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
        },
        countLabel() {
            const count = this.sortedMessages.length;
            return count === 1 ? '1 mensaje' : `${count} mensajes`;
        },
    },
};
</script>

<template>
    <section>
        <header class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Mensajes recientes</h2>
            <span class="text-sm text-gray-500">{{ countLabel }}</span>
        </header>

        <ChatMessageEmpty v-if="sortedMessages.length === 0" />

        <ol v-else class="flex flex-col gap-3">
            <li 
                v-for="message in sortedMessages"
                :key="message.id"
            >
                <ChatMessageItem
                    :email="message.email"
                    :body="message.body"
                    :created-at="message.created_at"
                />
            </li>
        </ol>
    </section>
</template>