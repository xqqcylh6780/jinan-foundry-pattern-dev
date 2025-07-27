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

const description = '二十余名工程师，深耕铸造现场数十年，让每一套模具从源头开始就更精准'

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
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider transform transition-all duration-1000"
              :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
            >
              设计能力
            </h1>
            <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto"></div>
            <p 
              class="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl mx-auto tracking-widest font-medium transform transition-all duration-1000 delay-300"
              :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
            >
              {{ description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="max-w-7xl mx-auto py-16 px-4">
        <!-- 设计理念 -->
        <div class="mb-20 relative">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">设计理念</h2>
            <p class="text-xl text-gray-500 font-light">Design Philosophy</p>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-4 rounded-full"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div class="relative">
              <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 rounded-full"></div>
              <p class="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg font-light">
                方德利模具始终坚持<span class="font-semibold text-blue-700">"设计即品质"</span>的理念。我们认为，模具设计不仅仅是机械图纸的绘制，而是通过工程分析、结构优化、仿真验证等手段，在设计阶段预防问题、降低成本、提升精度与生产效率的系统工程。通过精细化设计，我们帮助客户显著减少试模次数与修改风险，加快产品投产节奏。
              </p>
            </div>
          </div>
        </div>

        <!-- 工程团队 -->
        <div class="mb-20 relative">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-800 rounded-full mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">工程团队</h2>
            <p class="text-xl text-gray-500 font-light">Engineering Team</p>
            <div class="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 mx-auto mt-4 rounded-full"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
              <div class="text-center">
                <div class="text-4xl font-bold text-green-600 mb-2">20+</div>
                <div class="text-gray-600">专业工程师</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-green-600 mb-2">90%</div>
                <div class="text-gray-600">一线工作经验</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-green-600 mb-2">100%</div>
                <div class="text-gray-600">国际项目经验</div>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-600 to-green-800 rounded-full"></div>
              <p class="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg font-light">
                公司现有工程师20余人，其中90%以上具有铸造企业一线工作经验。我们的设计团队熟练掌握<span class="font-semibold text-green-700">UG、ZW3D、Sinovation、Fusion 360</span>等主流设计软件，能够独立完成复杂模具结构设计、装配方案、技术文档及精度控制图纸。所有工程师都曾参与国际项目，为欧美客户提供过专业设计与本地化工程支持。
              </p>
            </div>
          </div>
        </div>

        <!-- 结构设计能力 -->
        <div class="mb-20 relative">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">结构设计能力</h2>
            <p class="text-xl text-gray-500 font-light">Pattern Structure Design</p>
            <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto mt-4 rounded-full"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div class="relative mb-8">
              <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-purple-800 rounded-full"></div>
              <p class="text-gray-700 leading-relaxed text-lg font-light mb-8">
                我们具备丰富的复杂模具结构设计能力，能够针对客户需求进行<span class="font-semibold text-purple-700">高度定制化开发</span>，包括：
              </p>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-purple-50">
                <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-3"></div>
                <span class="text-gray-700 font-medium">多型芯模具组合与快速装配结构</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-purple-50">
                <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-3"></div>
                <span class="text-gray-700 font-medium">抽芯滑块、油缸驱动机构、斜顶与自动锁紧结构</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-purple-50">
                <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-3"></div>
                <span class="text-gray-700 font-medium">快速换模系统与抽芯导向精度结构</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-purple-50">
                <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-3"></div>
                <span class="text-gray-700 font-medium">温控系统（水路、电加热）集成设计</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-purple-50 md:col-span-2">
                <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-3"></div>
                <span class="text-gray-700 font-medium">高强度定位系统与模板加固结构</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 模流分析与验证 -->
        <div class="mb-20 relative">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-800 rounded-full mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">模流分析与验证</h2>
            <p class="text-xl text-gray-500 font-light">Moldflow Simulation</p>
            <div class="w-24 h-1 bg-gradient-to-r from-orange-600 to-orange-800 mx-auto mt-4 rounded-full"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div class="flex items-center justify-center mb-8">
              <div class="bg-orange-100 rounded-lg p-4 mr-6">
                <div class="text-2xl font-bold text-orange-600">AnyCasting</div>
                <div class="text-sm text-gray-600">专业软件</div>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
              <div class="bg-orange-100 rounded-lg p-4 ml-6">
                <div class="text-2xl font-bold text-orange-600">一次成功</div>
                <div class="text-sm text-gray-600">试模目标</div>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-600 to-orange-800 rounded-full"></div>
              <p class="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg font-light">
                在模具设计早期，我们会结合客户产品结构进行<span class="font-semibold text-orange-700">全流程模流分析</span>，评估铸造过程中的充型路径、气体积聚、缩松位置与冷隔风险。常用软件为<span class="font-semibold text-orange-700">AnyCasting</span>。通过数据反馈优化浇注系统与排气结构，显著提高模具一次试模成功率，减少反复修改与工期浪费。
              </p>
            </div>
          </div>
        </div>

        <!-- 模具标准化设计 -->
        <div class="mb-20 relative">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">模具标准化设计</h2>
            <p class="text-xl text-gray-500 font-light">Standardized Tooling Design</p>
            <div class="w-24 h-1 bg-gradient-to-r from-indigo-600 to-indigo-800 mx-auto mt-4 rounded-full"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <div class="text-center p-6 bg-indigo-50 rounded-xl">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-indigo-700 mb-2">模块化</h3>
                <p class="text-sm text-gray-600">标准件数据库</p>
              </div>
              <div class="text-center p-6 bg-indigo-50 rounded-xl">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-indigo-700 mb-2">高效率</h3>
                <p class="text-sm text-gray-600">缩短交付周期</p>
              </div>
              <div class="text-center p-6 bg-indigo-50 rounded-xl">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-indigo-700 mb-2">全球化</h3>
                <p class="text-sm text-gray-600">兼容性一致性</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-full"></div>
              <p class="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg font-light">
                我们致力于实现模具结构的<span class="font-semibold text-indigo-700">模块化与标准化</span>，提升设计复用率与制造效率。通过建立内部标准件数据库与装配规范，我们在模具设计中广泛采用统一的导柱、抽芯机构、水路接头等结构标准，缩短交付周期、降低维护成本，并确保全球不同生产基地间的兼容性和一致性。
              </p>
            </div>
          </div>
        </div>

        <!-- 客户协同 -->
        <div class="mb-20 relative">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-full mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">客户协同</h2>
            <p class="text-xl text-gray-500 font-light">Design Collaboration</p>
            <div class="w-24 h-1 bg-gradient-to-r from-teal-600 to-teal-800 mx-auto mt-4 rounded-full"></div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div class="text-center mb-8">
              <div class="inline-flex items-center bg-teal-100 rounded-full px-6 py-3">
                <svg class="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-teal-700 font-semibold">24小时快速响应</span>
              </div>
            </div>
            <div class="relative mb-8">
              <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-teal-600 to-teal-800 rounded-full"></div>
              <p class="text-gray-700 leading-relaxed text-lg font-light mb-8">
                我们支持全球客户的<span class="font-semibold text-teal-700">远程设计协同与快速响应机制</span>：
              </p>
            </div>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                <div class="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">接收并转制客户的3D模型（STEP, IGES, Parasolid等格式）</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                <div class="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">提供符合国际标准的2D工程图与3D结构模型</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                <div class="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">支持Zoom/Teams等远程会议评审，24小时内响应结构修改建议</span>
              </div>
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                <div class="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">中文、英文、西班牙语及法语的工程对接能力</span>
              </div>
            </div>
            <div class="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600">
              <p class="text-gray-700 leading-relaxed text-lg font-light">
                凭借系统的设计能力与快速响应机制，方德利模具为客户提供<span class="font-semibold text-teal-700">高可靠、高效率、高匹配度</span>的模具设计服务。
              </p>
            </div>
          </div>
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