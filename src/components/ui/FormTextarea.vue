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
      <textarea
        :id="id"
        ref="textarea"
        :name="name || id"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        :maxlength="maxlength || null"
        :class="textareaClasses"
        @input="onInput"
      />
    </template>
  </FormFieldWrapper>

  <!-- Contador de caracteres opcional -->
  <p
    v-if="maxlength && showCounter"
    class="-mt-2 sm:-mt-3 mb-3 text-xs text-gray-500 text-right"
  >
    {{ modelValue.length }} / {{ maxlength }}
  </p>
</template>

<script>
import FormFieldWrapper from './FormFieldWrapper.vue';

export default {
  name: 'FormTextarea',
  components: { FormFieldWrapper },
  props: {
    id: { type: String, required: true },
    name: { type: String, default: '' },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    icon: { type: [String, Object, Function], default: null },
    showIcon: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    wrapperClass: { type: String, default: 'mb-3 sm:mb-4' },
    rows: { type: [Number, String], default: 4 },
    maxlength: { type: [Number, String], default: null },
    showCounter: { type: Boolean, default: false },
    resize: {
      type: String,
      default: 'vertical',
      validator: (v) => ['none', 'vertical', 'horizontal', 'both'].includes(v),
    },
    autoResize: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    resizeClass() {
      return {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      }[this.resize];
    },
    textareaClasses() {
      const base = `
        flex-1 min-w-0
        px-3 py-2.5 sm:py-3
        text-base
        border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-azul-500 focus:border-transparent
        placeholder:text-gray-400
        leading-relaxed
        ${this.autoResize ? 'resize-none overflow-hidden' : this.resizeClass}
      `;
      return this.showIcon
        ? `${base} border-l-0 rounded-r-md`
        : `${base} block w-full rounded-md`;
    },
  },
  watch: {
    modelValue() {
      if (this.autoResize) this.$nextTick(this.adjustHeight);
    },
  },
  mounted() {
    if (this.autoResize) this.adjustHeight();
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    adjustHeight() {
      const el = this.$refs.textarea;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    },
  },
};
</script>
