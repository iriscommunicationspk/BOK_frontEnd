<script setup lang="ts">
const props = defineProps(['label', 'type', 'placeholder', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

// Method to handle input change and emit the value
const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<template>
  <div class="mb-4">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ props.label }}</label>
    <div class="relative">
      <input
        :type="props.type"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="handleInput"
        class="w-full rounded-lg border border-[#465985] bg-transparent py-4 pl-6 pr-10 outline-none focus:border-[#f29f67] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      />
      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
