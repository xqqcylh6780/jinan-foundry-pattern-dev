<script setup lang="ts">
import { ref, onMounted } from 'vue'

const section1Ref = ref(null)
const section2Ref = ref(null)
const section3Ref = ref(null)

const highlights = [
  'ISO9001:2015质量管理体系认证',
  'ISO14001:2005环境管理体系认证',
  'ISO45001职业健康体系认证',
  'GB/T 29490:2013知识产权管理体系认证',
  '2022年自行研发的BOSS系统通过AA两化融合管理体系认证',
  '符合IATF16949:2016的申请标准，但因尚未有客户对此有所要求，未申请此体系认证'
]

onMounted(() => {
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

  return () => observer.disconnect()
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div ref="section1Ref" class="mt-12 mb-16 opacity-0 transform translate-y-10 transition-all duration-1000">
      <div class="bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div class="w-1 h-6 bg-red-600 mr-3"></div>
          公司简介
        </h2>
        <div class="space-y-6 text-gray-600">
          <p class="text-base leading-relaxed">
            济南方德利模具有限公司由赵生彦铸造工程师于1992年成立，并始终致力于为国内外铸造行业提供最专业的模具设计与制造服务。
          </p>
          <p class="text-base leading-relaxed">
            公司位于济南市高新区，紧邻京沪高速，占地20000平方米，建筑面积12000平方米。
          </p>
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

    <!-- 技术优势 -->
    <section class="relative bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-12 flex items-center">
          <div class="w-1 h-6 bg-red-600 mr-3"></div>
          技术优势
        </h2>
        <div class="grid md:grid-cols-2 gap-12 items-stretch">
          <div class="bg-white p-8 rounded-xl shadow-sm h-[450px] flex items-center">
            <ul class="space-y-4 w-full">
              <li v-for="(highlight, index) in highlights" :key="index" 
                  class="flex items-center group hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
                <span class="flex-shrink-0 h-6 w-6 text-red-600 group-hover:scale-110 transition-transform duration-300">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div class="ml-4 flex-1">
                  <p class="text-base leading-relaxed text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {{ highlight }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="h-[450px]">
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
    <section class="relative bg-gray-50 py-16 mt-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-12 flex items-center">
          <div class="w-1 h-6 bg-red-600 mr-3"></div>
          产品与服务
        </h2>
        <div class="grid md:grid-cols-2 gap-12 items-stretch">
          <div class="group overflow-hidden rounded-xl shadow-lg h-[450px]">
            <img 
              src="@/assets/about/about3.jpg" 
              alt="方德利产品展示" 
              class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            >
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm h-[450px] flex flex-col justify-center">
            <div class="space-y-10">
              <p class="text-lg leading-loose text-gray-700 hover:text-gray-900 transition-colors duration-300">
                我们致力于满足客户铸造生产的全过程的需求，设计阶段为客户提供凝固模拟，试制阶段我们的工程师和技师到现场配合。我们擅长生产树脂自硬砂生产线和各种湿型砂生产线用的模具；各种制芯机所需的热芯盒、冷芯盒，有色金属铸造用的砂铸、低压、重力铸造模具等。
              </p>
              <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <p class="text-lg leading-loose text-gray-700 hover:text-gray-900 transition-colors duration-300">
                已有的客户主要集中在新能源汽车、发动机、汽车、摩托车、拖拉机、阀门、液压件、水泵、风机、机床、农机、电机、压缩机、轮船、矿山和工程机械、高铁、电力、环保、军工等行业。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.slide-in-view {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>