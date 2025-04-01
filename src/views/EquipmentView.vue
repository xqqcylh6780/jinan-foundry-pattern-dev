<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'

const isTitleVisible = ref(false)
const isSubtitleVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isTitleVisible.value = true
    setTimeout(() => {
      isSubtitleVisible.value = true
    }, 300)
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />

    <!-- Banner -->
    <div class="relative h-[750px] w-full overflow-hidden">
      <img 
        src="@/assets/equipments/banner.jpg" 
        alt="设备展示" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <div class="text-center space-y-8">
          <h1 
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-wider transform transition-all duration-1000"
            :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
          >
            先进制造设备
          </h1>
          <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto"></div>
          <p 
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-widest font-medium max-w-4xl mx-auto px-4 transform transition-all duration-1000 delay-300"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
          世界一流的加工设备，专业的设备团队，为您提供高品质的产品与服务，联系我们讨论您的铸造模具需求
          </p>
        </div>
      </div>
    </div>

    <!-- 子路由内容 -->
    <router-view></router-view>

    <AppFooter />
  </div>
</template>

<style scoped>
/* 图片过渡效果 */
img {
  transition: opacity 0.3s ease-in-out;
  will-change: opacity;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

/* 加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
  border-color: #1d46a8;
  border-top-color: transparent;
}

/* 移动端适配 */
@media (max-width: 640px) {
  button {
    @apply text-sm py-2;
  }
}
</style> 