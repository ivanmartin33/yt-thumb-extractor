<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import {SunIcon, MoonIcon} from "lucide-vue-next"

const storage = useStorage('darkMode', '');

onMounted(() => {
  // Check if the user has a dark mode preference
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const html = document.querySelector('html')
  
  if (!html) return;

  if(!storage.value)
    storage.value = darkModeMediaQuery.matches ? 'light' : 'dark';

  if(storage.value === 'dark') {
    html.setAttribute('data-theme', 'dark');
    html.classList.add('dark');
    html.classList.remove('light');
  } else if(storage.value && storage.value === 'light') {
    html.setAttribute('data-theme', 'light');
    html.classList.remove('dark');
    html.classList.add('light');
  
  }
})

const toggleDarkMode = () => {
  const html = document.querySelector('html')
  if (!html) return;
  
  if (html.getAttribute('data-theme') === 'dark') {
    storage.value = 'light';
  } else {
    storage.value = 'dark';
  }
}

watchEffect(() => {
  const html = document.querySelector('html')
  if (!html) return;

  if (storage.value === 'dark') {
    html.setAttribute('data-theme', 'dark');
    html.classList.add('dark');
    html.classList.remove('light');
  } else if(storage.value === 'light') {
    html.setAttribute('data-theme', 'light');
    html.classList.remove('dark');
    html.classList.add('light');
  }
})

</script>

<template>
  <div>
    <ShButton v-bind="$attrs" @click="toggleDarkMode" class="cursor-pointer">
      <slot>
        <span class="flex gap-2 items-center font-600 text-xs">
          <SunIcon v-if="storage === 'dark'" class="w-4 md:w-5 h-full aspect-square" />
          <MoonIcon v-else class="w-4 md:w-5 h-full aspect-square" />
          <span class="hidden md:block">
            {{storage === 'light' ? 'Dark Mode' : 'Light Mode'}}
          </span>
        </span>
      </slot>
    </ShButton>
    
  </div>
</template>