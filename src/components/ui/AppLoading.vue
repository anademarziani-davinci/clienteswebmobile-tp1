<script>
export default {
    name: 'AppLoading',
    props: {
        message: { 
            type: String, 
            default: 'Cargando...',
        },
        size: { 
            type: String, 
            default: 'md',
            validator: (value) => ['sm', 'md', 'lg'].includes(value),
        },
        variant: {
            type: String,
            default: 'default',
            validator: (value) => ['default', 'inline', 'overlay'].includes(value),
        },
        icon: {
            type: String,
            default: 'fa-solid fa-spinner',
        },
    },
    computed: {
        iconSizeClass() {
            const sizes = {
                sm: 'text-lg',
                md: 'text-2xl',
                lg: 'text-4xl',
            };
            return sizes[this.size];
        },
        textSizeClass() {
            const sizes = {
                sm: 'text-xs',
                md: 'text-sm',
                lg: 'text-base',
            };
            return sizes[this.size];
        },
        containerClasses() {
            const variants = {
                default: 'text-center py-12 text-gray-500',
                inline: 'inline-flex items-center gap-2 text-gray-500',
            };
            return variants[this.variant];
        },
    },
};
</script>

<template>
    <div :class="containerClasses" role="status" aria-live="polite">
        <i
            :class="[icon, 'fa-spin', iconSizeClass, variant !== 'inline' ? 'mb-2' : '']"
            aria-hidden="true"
        ></i>
        <p :class="[textSizeClass, variant === 'inline' ? 'm-0' : '']">
            {{ message }}
        </p>
        <span class="sr-only">{{ message }}</span>
    </div>
</template>