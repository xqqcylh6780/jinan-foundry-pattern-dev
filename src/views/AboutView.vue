<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import at1 from '@/assets/about/authen/at1.png'
import at2 from '@/assets/about/authen/at2.png'
import at3 from '@/assets/about/authen/at3.png'
import { ElDialog } from 'element-plus'
import { useThrottleFn } from '@vueuse/core'

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

// 证书数据
const certificates = [
  {
    name: 'ISO9001认证',
    image: at1,
    description: '质量管理体系认证证书'
  },
  {
    name: '高新技术企业',
    image: at2,
    description: '国家高新技术企业认定证书'
  },
  {
    name: '安全生产标准化',
    image: at3,
    description: '安全生产标准化三级企业证书'
  }
]

// 添加活动标签状态
const activeTab = ref('about')

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

// 图片预览函数
const handlePreview = (image: string, title: string) => {
  previewImage.value = image
  previewTitle.value = title
  showPreview.value = true
  imageScale.value = 1
  imagePosition.value = { x: 0, y: 0 } // 重置位置
}

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
            <span class="inline-block text-red-500">最具核心</span>
            <span class="inline-block">竞争力的企业团队</span>
          </h1>
          <div class="w-32 h-1.5 bg-red-500 mx-auto"></div>
          <p 
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-widest font-medium transform transition-all duration-1000 delay-300"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
            <span class="text-red-500">建立</span>
            <span>全球最佳铸模研发制造基地</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 子菜单导航 -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto">
        <div class="flex space-x-8">
          <button 
            class="px-6 py-4 text-lg font-medium transition-colors duration-200"
            :class="activeTab === 'about' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'"
            @click="activeTab = 'about'"
          >
            关于我们
          </button>
          <button 
            class="px-6 py-4 text-lg font-medium transition-colors duration-200"
            :class="activeTab === 'certificates' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'"
            @click="activeTab = 'certificates'"
          >
            资质认证
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- 关于我们内容 -->
      <div v-show="activeTab === 'about'">
        <div ref="section1Ref" class="mt-12 mb-16 opacity-0 transform translate-y-10 transition-all duration-1000">
          <div class="bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div class="w-1 h-6 bg-red-600 mr-3"></div>
              公司简介
            </h2>
            <!-- 公司简介内容 -->
            <div class="space-y-6 text-gray-600">
              <p class="text-base leading-relaxed">
                济南方德利模具有限公司由赵生彦铸造工程师于1992年成立，并始终致力于为国内外铸造行业提供最专业的模具设计与制造服务。
              </p>
              <p class="text-base leading-relaxed">
                公司位于济南市高新区，紧邻京沪高速，占地20000平方米，建筑面积12000平方米。
              </p>
              <!-- 添加地址图片 -->
              <div class="mt-8">
                <img 
                  src="@/assets/address.jpg" 
                  alt="公司地址" 
                  class="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 技术优势 -->
      <section v-if="activeTab === 'about'" class="relative bg-white py-16">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 flex items-center">
            <div class="w-1 h-6 bg-red-600 mr-3"></div>
            技术优势
          </h2>
          <div class="grid md:grid-cols-2 gap-12 items-stretch">
            <div class="bg-gray-50 p-8 rounded-xl shadow-sm h-full">
              <ul class="space-y-6">
                <li class="flex items-start group hover:bg-gray-50/70 p-4 rounded-lg transition-all duration-300">
                  <span class="flex-shrink-0 h-7 w-7 text-red-600 group-hover:scale-110 transition-transform duration-300 mt-1">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span class="ml-4 text-base md:text-lg leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-300">济南方德利模具有限公司为山东省高新技术企业。</span>
                </li>
                <li class="flex items-start group hover:bg-gray-50/70 p-4 rounded-lg transition-all duration-300">
                  <span class="flex-shrink-0 h-7 w-7 text-red-600 group-hover:scale-110 transition-transform duration-300 mt-1">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span class="ml-4 text-base md:text-lg leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-300">公司现有ISO9001:2015质量管理体系认证，ISO14001:2005环境管理体系认证，ISO45001职业健康体系认证及GB/T 29490:2013知识产权管理体系认证。</span>
                </li>
                <li class="flex items-start group hover:bg-gray-50/70 p-4 rounded-lg transition-all duration-300">
                  <span class="flex-shrink-0 h-7 w-7 text-red-600 group-hover:scale-110 transition-transform duration-300 mt-1">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span class="ml-4 text-base md:text-lg leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-300">公司于2022年使用自行研发的BOSS系统通过了AA两化融合管理体系认证。</span>
                </li>
                <li class="flex items-start group hover:bg-gray-50/70 p-4 rounded-lg transition-all duration-300">
                  <span class="flex-shrink-0 h-7 w-7 text-red-600 group-hover:scale-110 transition-transform duration-300 mt-1">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span class="ml-4 text-base md:text-lg leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-300">我们符合IATF16949:2016的申请标准，但因尚未有客户对此有所要求，我公司未申请此体系认证。</span>
                </li>
              </ul>
            </div>
            <div class="h-full">
              <img 
                src="@/assets/about/about2.jpg" 
                alt="方德利生产设备" 
                class="rounded-xl shadow-lg w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
              >
            </div>
          </div>
        </div>
      </section>

      <!-- 产品与服务 -->
      <section v-if="activeTab === 'about'" class="relative bg-gray-50 py-16 mt-16">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 flex items-center">
            <div class="w-1 h-6 bg-red-600 mr-3"></div>
            产品与服务
          </h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="@/assets/about/about3.jpg" 
                alt="方德利产品展示" 
                class="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              >
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm space-y-6">
              <p class="text-lg leading-relaxed text-gray-700 hover:text-gray-900 transition-colors duration-300">
                我们致力于满足客户铸造生产的全过程的需求，设计阶段为客户提供凝固模拟，试制阶段我们的工程师和技师到现场配合。我们擅长生产树脂自硬砂生产线和各种湿型砂生产线用的模具；各种制芯机所需的热芯盒、冷芯盒，有色金属铸造用的砂铸、低压、重力铸造模具等。
              </p>
              <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <p class="text-lg leading-relaxed text-gray-700 hover:text-gray-900 transition-colors duration-300">
                已有的客户主要集中在新能源汽车、发动机、汽车、摩托车、拖拉机、阀门、液压件、水泵、风机、机床、农机、电机、压缩机、轮船、矿山和工程机械、高铁、电力、环保、军工等行业。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 发展历程 -->
      <section v-if="activeTab === 'about'" class="relative bg-white py-16">
        <h2 class="text-3xl md:text-2xl sm:text-xl font-bold text-gray-900 mb-12 sm:mb-8 text-center">
          <span class="inline-block border-b-4 border-blue-600 pb-2">发展历程</span>
        </h2>

        <!-- 时间线容器 -->
        <div class="relative max-w-5xl mx-auto">
          <!-- 中间线 -->
          <div class="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></div>

          <!-- 时间线内容 -->
          <div class="space-y-24 lg:space-y-16 md:space-y-12">
            <!-- 1992年 - 左侧 -->
            <div class="relative flex items-center justify-center lg:justify-between group">
              <div class="w-[80%] px-0 lg:w-[45%] lg:pr-8">
                <div class="bg-white p-6 sm:p-4 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl md:text-2xl sm:text-xl font-bold text-blue-600">1992</span>
                    <div class="h-0.5 flex-grow bg-blue-100"></div>
                  </div>
                  <h3 class="text-xl md:text-lg sm:text-base font-bold text-gray-900 mb-2">创立之初</h3>
                  <p class="text-gray-600 md:text-sm">公司成立，开始专注于铸造模具的设计与制造，为未来的发展奠定基础。</p>
                </div>
              </div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div class="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 group-hover:ring-8 transition-all duration-300"></div>
              </div>
              <div class="hidden lg:block lg:w-[45%]"></div>
            </div>

            <!-- 2000年 - 右侧 -->
            <div class="relative flex items-center justify-center lg:justify-between group">
              <div class="hidden lg:block lg:w-[45%]"></div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div class="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 group-hover:ring-8 transition-all duration-300"></div>
              </div>
              <div class="w-[80%] px-0 lg:w-[45%] lg:pl-8">
                <div class="bg-white p-6 sm:p-4 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl font-bold text-blue-600">2000</span>
                    <div class="h-0.5 flex-grow bg-blue-100"></div>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">技术升级</h3>
                  <p class="text-gray-600">引进先进数控设备，实现生产工艺升级，大幅提升生产效率和产品质量。</p>
                </div>
              </div>
            </div>

            <!-- 2010年 - 左侧 -->
            <div class="relative flex items-center justify-center lg:justify-between group">
              <div class="w-[80%] px-0 lg:w-[45%] lg:pr-8">
                <div class="bg-white p-6 sm:p-4 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl font-bold text-blue-600">2010</span>
                    <div class="h-0.5 flex-grow bg-blue-100"></div>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">质量认证</h3>
                  <p class="text-gray-600">通过ISO9001质量体系认证，建立完善的质量管理体系，确保产品品质。</p>
                </div>
              </div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div class="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 group-hover:ring-8 transition-all duration-300"></div>
              </div>
              <div class="hidden lg:block lg:w-[45%]"></div>
            </div>

            <!-- 2015年 - 右侧 -->
            <div class="relative flex items-center justify-center lg:justify-between group">
              <div class="hidden lg:block lg:w-[45%]"></div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div class="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 group-hover:ring-8 transition-all duration-300"></div>
              </div>
              <div class="w-[80%] px-0 lg:w-[45%] lg:pl-8">
                <div class="bg-white p-6 sm:p-4 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl font-bold text-blue-600">2015</span>
                    <div class="h-0.5 flex-grow bg-blue-100"></div>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">技术认可</h3>
                  <p class="text-gray-600">获得高新技术企业认定，研发能力获得认可，成为行业领先企业。</p>
                </div>
              </div>
            </div>

            <!-- 2020年 - 左侧 -->
            <div class="relative flex items-center justify-center lg:justify-between group">
              <div class="w-[80%] px-0 lg:w-[45%] lg:pr-8">
                <div class="bg-white p-6 sm:p-4 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl font-bold text-blue-600">2020</span>
                    <div class="h-0.5 flex-grow bg-blue-100"></div>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">数字转型</h3>
                  <p class="text-gray-600">实现数字化转型，引入PDM系统和智能制造设备，提升管理效率。</p>
                </div>
              </div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div class="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 group-hover:ring-8 transition-all duration-300"></div>
              </div>
              <div class="hidden lg:block lg:w-[45%]"></div>
            </div>

            <!-- 2023年 - 右侧 -->
            <div class="relative flex items-center justify-center lg:justify-between group">
              <div class="hidden lg:block lg:w-[45%]"></div>
              <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div class="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 group-hover:ring-8 transition-all duration-300"></div>
              </div>
              <div class="w-[80%] px-0 lg:w-[45%] lg:pl-8">
                <div class="bg-white p-6 sm:p-4 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl font-bold text-blue-600">2023</span>
                    <div class="h-0.5 flex-grow bg-blue-100"></div>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">基地建成</h3>
                  <p class="text-gray-600">建成现代化铸造模具研发制造基地，开启新的发展篇章。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 资质认证内容 -->
      <div v-show="activeTab === 'certificates'" class="mt-12 mb-16">
        <div class="bg-white p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div class="w-1 h-6 bg-red-600 mr-3"></div>
            资质认证
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="(cert, index) in certificates" 
              :key="index"
              class="bg-gray-50 p-6"
            >
              <div class="mb-4">
                <img 
                  :src="cert.image" 
                  :alt="cert.name"
                  class="w-[376px] h-[519px] object-contain"
                />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ cert.name }}</h3>
              <p class="text-gray-600">{{ cert.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
</style>