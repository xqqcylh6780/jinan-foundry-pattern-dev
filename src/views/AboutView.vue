<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import at1 from '@/assets/about/authen/at1.png'
import at2 from '@/assets/about/authen/at2.png'
import at3 from '@/assets/about/authen/at3.png'
import { ElDialog } from 'element-plus'
import { useThrottleFn } from '@vueuse/core'
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const highlights = [
  '通过ISO9001质量体系认证',
  '采用PDM数据管理平台进行设计',
  '使用SView看图软件实现无纸化生产',
  '实现客户、合同、生产的数字化管理',
  '配备3000mm×2000mm×1500mm龙门三坐标测量机',
  '配备大型智能去应力机',
  '配备日本牧野10000转、台湾24000转高速加工中心'
]

const section1Ref = ref(null)
const section2Ref = ref(null)
const section3Ref = ref(null)
const timelineRef = ref(null)
const certificatesRef = ref(null)


// 预览相关的状态
const showPreview = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const imageScale = ref(1)
const imagePosition = ref({ x: 0, y: 0 }) // 添加位置状态
const isDragging = ref(false) // 添加拖动状态
const startPosition = ref({ x: 0, y: 0 }) // 添加开始位置

// 添加标题和副标题的可见性状态
const isTitleVisible = ref(false)
const isSubtitleVisible = ref(false)

// 处理滚轮缩放
const handleWheel = (e: WheelEvent) => {
  if (!showPreview.value) return
  e.preventDefault()
  
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  const newScale = imageScale.value + delta
  
  if (newScale >= 0.5 && newScale <= 3) {
    imageScale.value = newScale
  }
}

// 开始拖动
const startDrag = (e: MouseEvent) => {
  if (imageScale.value <= 1) return // 只有放大时才能拖动
  isDragging.value = true
  startPosition.value = {
    x: e.clientX - imagePosition.value.x * imageScale.value,
    y: e.clientY - imagePosition.value.y * imageScale.value
  }
}

// 使用节流包装拖动函数
const doDrag = useThrottleFn((e: MouseEvent) => {
  if (!isDragging.value) return
  
  // 计算新位置
  const newX = (e.clientX - startPosition.value.x) / imageScale.value
  const newY = (e.clientY - startPosition.value.y) / imageScale.value
  
  // 计算图片实际尺寸
  const imgWidth = (e.target as HTMLImageElement).naturalWidth * imageScale.value
  const imgHeight = (e.target as HTMLImageElement).naturalHeight * imageScale.value
  
  // 计算可移动的最大范围
  const maxX = (imgWidth - window.innerWidth) / (2 * imageScale.value)
  const maxY = (imgHeight - window.innerHeight) / (2 * imageScale.value)
  
  // 限制移动范围
  imagePosition.value = {
    x: Math.max(Math.min(newX, maxX), -maxX),
    y: Math.max(Math.min(newY, maxY), -maxY)
  }
}, 8)

// 结束拖动
const stopDrag = () => {
  isDragging.value = false
}

// 监听对话框关闭事件
const handleDialogClose = () => {
  imageScale.value = 1
  imagePosition.value = { x: 0, y: 0 } // 重置位置
}

onMounted(() => {
  // 延迟显示标题和副标题
  setTimeout(() => {
    isTitleVisible.value = true
    setTimeout(() => {
      isSubtitleVisible.value = true
    }, 300)
  }, 100)
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-view')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  if (section1Ref.value) observer.observe(section1Ref.value)
  if (section2Ref.value) observer.observe(section2Ref.value)
  if (section3Ref.value) observer.observe(section3Ref.value)
  if (timelineRef.value) observer.observe(timelineRef.value)
  if (certificatesRef.value) observer.observe(certificatesRef.value)

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    
    <!-- Banner -->
    <div class="relative h-[750px] w-full overflow-hidden">
      <img 
        src="@/assets/about/banner.jpg" 
        alt="关于我们 Banner" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <div class="text-center space-y-8">
          <h1 
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-wider transform transition-all duration-1000"
            :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
          >
            <span class="inline-block">打造</span>
            <span class="inline-block text-[#1d46a8]">最具核心</span>
            <span class="inline-block">竞争力的企业团队</span>
          </h1>
          <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto"></div>
          <p 
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-widest font-medium transform transition-all duration-1000 delay-300"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
            <span class="text-[#1d46a8]">建立</span>
            <span>全球最佳铸模研发制造基地</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 子菜单导航 -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto">
        <div class="flex space-x-8">
          <RouterLink 
            to="/about/company"
            class="px-6 py-4 text-lg font-medium transition-colors duration-200"
            :class="$route.path === '/about/company' ? 'text-[#1d46a8] border-b-2 border-[#1d46a8]' : 'text-gray-600 hover:text-[#1d46a8]'"
          >
            {{ t('nav.about_company') }}
          </RouterLink>
          <RouterLink 
            to="/about/certificates"
            class="px-6 py-4 text-lg font-medium transition-colors duration-200"
            :class="$route.path === '/about/certificates' ? 'text-[#1d46a8] border-b-2 border-[#1d46a8]' : 'text-gray-600 hover:text-[#1d46a8]'"
          >
            {{ t('nav.about_certificates') }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 子路由出口 -->
    <RouterView />

    <!-- 图片预览模态框 -->
    <el-dialog
      v-model="showPreview"
      :title="previewTitle"
      width="80%"
      :close-on-click-modal="true"
      :show-close="true"
      center
      @close="handleDialogClose"
    >
      <div 
        class="flex justify-center items-center overflow-hidden relative"
        @wheel.prevent="handleWheel"
        @mousedown="startDrag"
        @mousemove="doDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >
        <img 
          :src="previewImage" 
          :alt="previewTitle"
          class="max-w-full max-h-[80vh] object-contain transition-all duration-75 ease-out"
          :style="{
            transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
            cursor: isDragging ? 'grabbing' : (imageScale > 1 ? 'grab' : 'default')
          }"
          @dragstart.prevent
        />
      </div>
    </el-dialog>

    <AppFooter />
  </div>
</template>

<style scoped>
.slide-in-view {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 自定义模态框样式 */
:deep(.el-dialog) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.el-dialog__body) {
  padding: 24px;
  overflow: hidden; /* 防止图片缩放时出现滚动条 */
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
}

/* 添加缩放提示 */
:deep(.el-dialog__header)::after {
  content: '使用鼠标滚轮可缩放图片，放大后可拖动查看';
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

/* 防止拖动时选中文本 */
.el-dialog {
  user-select: none;
}

/* 更新任何使用 red 的样式 */
:deep(.el-button--primary) {
  --el-button-bg-color: #1d46a8;
  --el-button-border-color: #1d46a8;
}

:deep(.el-button--primary:hover) {
  --el-button-hover-bg-color: #153576;
  --el-button-hover-border-color: #153576;
}
</style>