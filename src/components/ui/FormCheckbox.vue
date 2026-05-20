<script>
  export default {
    name: 'FormCheckbox',
    props: {
      id: { type: String, required: true },
      name: { type: String, default: '' },
      label: { type: String, default: '' },
      modelValue: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    methods: {
      onChange(event) {
        this.$emit('update:modelValue', event.target.checked);
      },
    },
  };
  
</script>
<template>
  <div class="flex items-start gap-2">
    <input
      :id="id"
      :name="name || id"
      type="checkbox"
      :checked="modelValue"
      :required="required"
      class="
        mt-0.5
        h-4 w-4
        flex-shrink-0
        rounded
        border-gray-300
        text-violeta-600
        focus:ring-2 focus:ring-violeta-50 focus:ring-offset-0
        cursor-pointer
      "
      @change="onChange"
    />
    <label
      :for="id"
      class="text-sm text-gray-500 cursor-pointer select-none leading-snug"
    >
      <!-- El slot por defecto permite incluir markup (links a tyc) que todavia no aplica -->
      <slot>{{ label }}</slot>
      <span v-if="required && !$slots.default" class="text-red-500">*</span>
    </label>
  </div>
</template>

