<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/AppFooter.vue'
import { ref, onMounted } from 'vue'

const designCapabilities = [
  {
    title: '工艺分析',
    description: '采用先进的三维建模软件，为客户提供精确的模具设计方案，确保产品的精度和质量。',
    image: 'modeling.jpg'
  },
  {
    title: '模具设计',
    description: '专业的工艺团队进行充分的可行性分析，优化生产工艺流程，提高生产效率。',
    image: 'analysis.jpg'
  },
  {
    title: '加工编程',
    description: '根据客户需求，设计各类精密模具，包括压铸模具、注塑模具等。',
    image: 'mold.jpg'
  },
  {
    title: '技术创新',
    description: '持续创新设计理念和工艺技术，为客户提供最优质的解决方案。',
    image: 'innovation.jpg'
  }
]

const isTitleVisible = ref(true)

const isSubtitleVisible = ref(true)

const description = '二十余名工程师，数十年的铸造厂工作及服务经验，保证了我们可以高效且准确地将您的产品转化为高品质的模具'

const teamTitleRef = ref(null)
const isTeamTitleVisible = ref(false)
const isTeamDescVisible = ref(false)

// 动态导入图片
const getImageUrl = (name: string) => {
  try {
    // 使用动态导入确保图片正确打包
    return new URL(`../assets/design/${name}`, import.meta.url).href
  } catch (error) {
    console.error('图片加载失败:', error)
    return '' // 返回空字符串或默认图片路径
  }
}

onMounted(() => {
  // 先设置为 false，然后延迟显示
  isTitleVisible.value = false
  isSubtitleVisible.value = false
  
  setTimeout(() => {
    isTitleVisible.value = true
    setTimeout(() => {
      isSubtitleVisible.value = true
    }, 300)
  }, 100)

  // 使用 Intersection Observer 监听元素是否进入视口
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === teamTitleRef.value) {
            isTeamTitleVisible.value = true
            // 标题动画完成后显示描述
            setTimeout(() => {
              isTeamDescVisible.value = true
            }, 800)
          }
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '50px'
    }
  )

  if (teamTitleRef.value) {
    observer.observe(teamTitleRef.value)
  }

  // 清理函数
  return () => {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 导航栏 -->
    <NavBar />

    <!-- 主要内容区域 -->
    <main class="flex-grow">
      <!-- 页面标题区域 -->
      <div class="relative h-[750px] overflow-hidden">
        <img 
          src="@/assets/design/banner.jpg" 
          alt="设计能力" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div class="text-center text-white px-4 sm:px-6 md:px-8 space-y-8">
            <h1 
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider transform transition-all duration-1000"
              :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
            >
              设计能力
            </h1>
            <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto"></div>
            <p 
              class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white max-w-4xl mx-auto tracking-widest font-medium transform transition-all duration-1000 delay-300"
              :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
            >
              {{ description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="max-w-7xl mx-auto py-16 px-4">
        <!-- 简介部分 -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-6">
            专业的设计团队
          </h2>
          <p class="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            方德利拥有经验丰富的设计团队，配备先进的设计软件和设备，为客户提供从概念设计到生产的全方位解决方案。我们始终致力于为客户创造最大价值，确保每个项目都能达到最高标准。
          </p>
        </div>

        <!-- 能力展示网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="item in designCapabilities" 
            :key="item.title"
            class="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div class="aspect-w-16 aspect-h-9 mb-6">
              <img 
                :src="getImageUrl(item.image)"
                :alt="item.title"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 class="text-xl font-bold mb-4">{{ item.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <!-- 软件支持 -->
        <div class="mt-20">
          <h2 class="text-3xl font-bold text-center mb-12">软件支持</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4">
            <div class="flex flex-col items-center">
              <img src="@/assets/software/siemens-nx.png" alt="SIEMENS NX" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/fusion360.png" alt="Fusion 360" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/sview.png" alt="Sview" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/haochen.png" alt="浩臣CAD" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/hypermill.png" alt="Hypermill" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/worknc.png" alt="WorkNC" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/vx.png" alt="VX Element" class="h-12 object-contain" />
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/software/sinovation.png" alt="VX Element" class="h-12 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <FooterBar />
  </div>
</template>

<style scoped>
.scale-x-0 {
  transform: scaleX(0);
}
.scale-x-100 {
  transform: scaleX(1);
}

:deep(.el-button--primary) {
  --el-button-bg-color: #1d46a8;
  --el-button-border-color: #1d46a8;
}

:deep(.el-button--primary:hover) {
  --el-button-hover-bg-color: #153576;
  --el-button-hover-border-color: #153576;
}
</style> 