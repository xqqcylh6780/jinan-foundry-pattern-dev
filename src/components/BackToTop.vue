<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const showButton = ref(false)

// 监听滚动位置，决定是否显示按钮
function checkScroll() {
  showButton.value = y.value > 300
}

// 返回顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 监听滚动事件
onMounted(() => {
  checkScroll()
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-4 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-4 opacity-0"
  >
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed right-6 bottom-6 z-50 flex items-center justify-center w-12 h-12 bg-gray-700/50 hover:bg-gray-700/70 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      aria-label="返回顶部"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </Transition>
</template> 