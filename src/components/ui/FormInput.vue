<script>
  import FormFieldWrapper from './FormFieldWrapper.vue';

  export default {
    name: 'FormInput',
    components: { FormFieldWrapper },
    props: {
      id: { type: String, required: true },
      name: { type: String, default: '' },
      label: { type: String, required: true },
      type: { type: String, default: 'text' },
      modelValue: { type: String, default: '' },
      placeholder: { type: String, default: '' },
      icon: { type: [String, Object, Function], default: null },
      showIcon: { type: Boolean, default: true },
      required: { type: Boolean, default: false },
      autocomplete: { type: String, default: 'off' },
      wrapperClass: { type: String, default: 'mb-3 sm:mb-4' },
    },
    emits: ['update:modelValue'],
    computed: {
      // Las clases del input cambian si tiene icono al lado:
      // - Con icono: rounded solo a la derecha, sin borde izquierdo
      // - Sin icono: rounded completo, borde completo
      inputClasses() {
        const base = `
          flex-1 min-w-0
          px-3 py-2.5 sm:py-3
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
    },
  };
</script>
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
      <input
        :id="id"
        :name="name || id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="onInput"
      />
    </template>
  </FormFieldWrapper>
</template>