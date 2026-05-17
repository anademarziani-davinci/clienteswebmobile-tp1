<template>
  <FormFieldWrapper
    :for-id="id"
    :label="label"
    :icon="icon"
    :show-icon="showIcon"
    :required="required"
    :wrapper-class="wrapperClass"
  >
    <template #control>
      <div class="relative flex-1 min-w-0 flex">
        <input
          :id="id"
          :name="name || id"
          :type="showPassword ? 'text' : 'password'"
          :value="modelValue"
          :placeholder="placeholder"
          :required="required"
          :autocomplete="autocomplete"
          :class="inputClasses"
          @input="onInput"
        />
        <button
          type="button"
          class="
            absolute right-0 top-0 h-full
            px-3
            flex items-center justify-center
            text-gray-500 hover:text-gray-700
            focus:outline-none focus:ring-2 focus:ring-azul-500 rounded-r-md
            transition-colors
          "
          :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
          :aria-pressed="showPassword"
          tabindex="-1"
          @click="toggleVisibility"
        >
          <component :is="showPassword ? EyeOff : Eye" :size="18" />
        </button>
      </div>
    </template>
  </FormFieldWrapper>
</template>

<script>
import FormFieldWrapper from './FormFieldWrapper.vue';
import { Eye, EyeOff } from 'lucide-vue-next';

export default {
  name: 'FormPasswordInput',
  components: { FormFieldWrapper },
  props: {
    id: { type: String, required: true },
    name: { type: String, default: '' },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    icon: { type: [String, Object, Function], default: null },
    showIcon: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    autocomplete: { type: String, default: 'current-password' },
    wrapperClass: { type: String, default: 'mb-3 sm:mb-4' },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showPassword: false,
      // Exponemos los íconos para el template.
      Eye,
      EyeOff,
    };
  },
  computed: {
    // Las clases del input cambian si tiene ícono al lado.
    // Además, agregamos pr-10 para dejar espacio al botón del ojito a la derecha.
    inputClasses() {
      const base = `
        flex-1 min-w-0
        pl-3 pr-10 py-2.5 sm:py-3
        text-base
        border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-azul-500 focus:border-transparent
        placeholder:text-gray-400
      `;
      return this.showIcon
        ? `${base} border-l-0 rounded-r-md`
        : `${base} block w-full rounded-md`;
    },
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    toggleVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>