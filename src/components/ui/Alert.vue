<script>
    import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next';
    import AppButton from './AppButton.vue';

    export default {
    name: 'Alert',
    components: { X, AppButton },
    props: {
        variant: {
        type: String,
        default: 'info',
        validator: (v) => ['success', 'error', 'warning', 'info'].includes(v),
        },
        title: { type: String, default: '' },
        message: { type: String, default: '' },
        actionLabel: { type: String, default: '' },
        dismissible: { type: Boolean, default: false },
        modelValue: { type: Boolean, default: true },
        autoDismiss: { type: Number, default: 0 },
    },
    emits: ['action', 'update:modelValue'],
    data() {
        return {
        internalVisible: true,
        autoDismissTimer: null,
        };
    },
    computed: {
        visible() {
        return this.modelValue && this.internalVisible;
        },
        iconComponent() {
        const icons = {
            success: CheckCircle2,
            error: XCircle,
            warning: AlertTriangle,
            info: Info,
        };
        return icons[this.variant];
        },
        variantClasses() {
        const variants = {
            success: 'bg-emerald-50 border-emerald-200',
            error: 'bg-red-50 border-red-200',
            warning: 'bg-amber-50 border-amber-200',
            info: 'bg-azul-50 border-azul-200',
        };
        return variants[this.variant];
        },
        iconClass() {
        const colors = {
            success: 'text-emerald-600',
            error: 'text-red-600',
            warning: 'text-amber-600',
            info: 'text-azul-600',
        };
        return colors[this.variant];
        },
        titleClass() {
        const colors = {
            success: 'text-emerald-900',
            error: 'text-red-900',
            warning: 'text-amber-900',
            info: 'text-azul-900',
        };
        return colors[this.variant];
        },
        closeClass() {
        const colors = {
            success: 'text-emerald-600',
            error: 'text-red-600',
            warning: 'text-amber-600',
            info: 'text-azul-600',
        };
        return colors[this.variant];
        },
    },
    mounted() {
        this.startAutoDismiss();
    },
    beforeUnmount() {
        this.clearAutoDismiss();
    },
    methods: {
        onDismiss() {
        this.clearAutoDismiss();
        this.internalVisible = false;
        this.$emit('update:modelValue', false);
        },
        startAutoDismiss() {
        if (this.autoDismiss > 0) {
            this.autoDismissTimer = setTimeout(() => {
            this.onDismiss();
            }, this.autoDismiss);
        }
        },
        clearAutoDismiss() {
        if (this.autoDismissTimer) {
            clearTimeout(this.autoDismissTimer);
            this.autoDismissTimer = null;
        }
        },
    },
    };
</script>
<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="visible"
      :class="['rounded-lg border p-4 sm:p-5 mb-6', variantClasses]"
      role="alert"
    >
      <!-- Fila superior: icono + titulo/mensaje + X -->
      <div class="flex items-start gap-3">
        <component
          :is="iconComponent"
          :size="22"
          :class="iconClass"
          class="flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />

        <div class="flex-1 min-w-0">
          <h4 v-if="title" :class="['font-semibold text-base sm:text-lg mb-1', titleClass]">
            {{ title }}
          </h4>
          <p v-if="message" class="text-sm leading-relaxed text-gray-800">
            {{ message }}
          </p>
          <slot />
        </div>

        <button
          v-if="dismissible"
          type="button"
          :class="['flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors', closeClass]"
          aria-label="Cerrar"
          @click="onDismiss"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Fila inferior: boton de accion alineado a la derecha -->
      <div v-if="actionLabel" class="flex justify-end mt-4">
        <AppButton
          variant="text"
          size="sm"
          @click="$emit('action')"
        >
          {{ actionLabel }}
        </AppButton>
      </div>
    </div>
  </transition>
</template>

