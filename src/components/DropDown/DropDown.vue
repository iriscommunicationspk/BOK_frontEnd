<template>
  <div class="relative">
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selected || 'Choose an option' }}
      <span class="arrow" :class="{ open: isOpen }">&#9662;</span>
    </button>
    <transition name="fade">
      <ul v-if="isOpen" class="dropdown-menu">
        <li v-for="option in options" :key="option" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  options: string[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selected = ref(props.modelValue)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string) {
  selected.value = option
  emit('update:modelValue', option)
  setTimeout(() => {
    isOpen.value = false
  }, 150) // Delay to prevent immediate reopening
}

// Watch for changes in the modelValue prop
watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal
  }
)

// Handle click outside to close the dropdown
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-button {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #455984;
  color: #fff;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  margin-top: 5px;
  text-wrap: none;
}

.dropdown-button:hover {
  border-color: #007bff;
}

.arrow {
  margin-left: 10px;
  transition: transform 0.3s ease-in-out;
}

.arrow.open {
  transform: rotate(-180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 90;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  list-style: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
}

.dropdown-menu li {
  padding: 5px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.dropdown-menu li:hover {
  background-color: #455984;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
