<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackToTop from '@/components/BackToTop.vue'
</script>

<template>
  <RouterView />
  <BackToTop />
</template>

<style scoped>
.nav-link {
  @apply relative;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out;
}

.nav-link:hover::after,
.router-link-active::after {
  @apply w-full;
}

.router-link-active {
  @apply text-blue-600;
}
</style>