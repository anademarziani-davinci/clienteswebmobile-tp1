<script>
import UserAvatar from '../ui/UserAvatar.vue';

export default {
    name: 'ChatMessageItem',
    components: { UserAvatar },
    props: {
        email: { type: String, required: true },
        body: { type: String, required: true },
        createdAt: { type: String, required: true },
    },
    computed: {
        formattedDate() {
            const date = new Date(this.createdAt);
            return date.toLocaleString('es-AR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        },
    },
};
</script>

<template>
    <article class="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start gap-3">
            <UserAvatar :email="email" size="md" />

            <div class="flex-1 min-w-0">
                <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <p class="font-semibold text-gray-900 truncate">{{ email }}</p>
                    <p class="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                        <i class="fa-regular fa-clock" aria-hidden="true"></i>
                        <time :datetime="createdAt">{{ formattedDate }}</time>
                    </p>
                </header>
                <p class="text-gray-700 break-words leading-relaxed">{{ body }}</p>
            </div>
        </div>
    </article>
</template>