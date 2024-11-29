<template>
  <div class="relative" ref="dropdownRef">
    <!-- Add ref here -->
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selected || 'Choose an option' }}
      <span class="arrow" :class="{ open: isOpen }">&#9662;</span>
    </button>

    <transition name="fade">
      <div v-if="isOpen" class="dropdown-menu-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search ..."
          class="focus:border-none rounded-none search-input"
        />
        <ul class="dropdown-menu">
          <li v-for="option in filteredOptions" :key="option" @click="selectOption(option)">
            {{ option }}
          </li>
          <li v-if="filteredOptions.length === 0" class="no-results">No results found</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  options: string[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selected = ref(props.modelValue)
const dropdownRef = ref<HTMLElement | null>(null)
const searchQuery = ref('') // Holds the user's search query

// Function to toggle the dropdown visibility
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// Function to select an option
function selectOption(option: string) {
  selected.value = option
  emit('update:modelValue', option)
  setTimeout(() => {
    isOpen.value = false
    searchQuery.value = '' // Reset search when selecting
  }, 150)
}

// Computed property to filter the options based on the search query
const filteredOptions = computed(() => {
  return props.options.filter((option) =>
    option.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

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
  /* flex-wrap: wrap; */
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f29f67;
  color: #1e1e2c;
  cursor: pointer;
  width: 100%;
  /* width: 15rem; */
  text-align: left;
  font-size: 16.2px;
  font-weight: 600;
  transition: border-color 0.2s ease-in-out;
  margin-top: 5px;
}

.dropdown-menu-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 90;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  max-height: 250px;
  overflow-y: auto;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  font-size: 14px;
}

.dropdown-menu {
  padding: 0;
  margin: 0;
  list-style: none;
}

.dropdown-menu li {
  padding: 7px;
  cursor: pointer;
  font-weight: 700;
  transition: background-color 0.2s ease-in-out;
}

.dropdown-menu li:hover {
  background-color: #f29f67;
  color: #1e1e2c;
}

.no-results {
  padding: 10px;
  color: #888;
  text-align: center;
}

.arrow {
  margin-left: 10px;
  transition: transform 0.3s ease-in-out;
}

.arrow.open {
  transform: rotate(-180deg);
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
