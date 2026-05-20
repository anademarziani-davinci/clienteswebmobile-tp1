<script>
    export default {
        name: 'UserAvatar',
        props: {
            email: { type: String, default: '' },
            size: { 
                type: String, 
                default: 'md',
                validator: (value) => ['sm', 'md', 'lg'].includes(value),
            },
        },
        computed: {
            initials() {
                if (!this.email) return '?';
                return this.email.substring(0, 2).toUpperCase();
            },
            sizeClasses() {
                const sizes = {
                    sm: 'w-8 h-8 text-xs',
                    md: 'w-10 h-10 text-sm',
                    lg: 'w-12 h-12 text-base',
                };
                return sizes[this.size];
            },
        },
    };
</script>

<template>
    <div 
        class="flex-shrink-0 rounded-full bg-violeta-100 text-violeta-700 flex items-center justify-center font-semibold"
        :class="sizeClasses"
        :aria-label="email ? `Avatar de ${email}` : 'Avatar'"
    >
        {{ initials }}
    </div>
</template>