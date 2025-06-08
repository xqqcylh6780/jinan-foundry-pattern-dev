<script setup lang="ts">
import { ref, computed } from 'vue'

interface Equipment {
  id: number
  name: string
  image: string
  category: string
  categoryId: number
  description: string
}

const categories = [
  { id: 1, name: '五轴加工设备' },
  { id: 2, name: '高速加工设备' },
  { id: 3, name: '检测设备' },
  { id: 4, name: '装配区域' },
  { id: 5, name: '大型龙门加工中心' }
]

const activeCategory = ref(categories[0].id)
const loadedImages = ref<Set<number>>(new Set())

const equipments: Equipment[] = [
{
    id: 1,
    name: '日本牧野（MAKINO）五轴加工中心',
    image: '/src/assets/equipments/5axis/日本牧野（MAKINO）五轴加工中心.jpg',
    category: '五轴加工设备',
    categoryId: 1,
    description: '高性能五轴立式加工中心，采用双摆台结构，主轴最高转速40,000RPM，定位精度±2μm，配备SGI.4几何智能控制系统，专为复杂曲面、高精度模具加工设计'
  },
  {
    id: 2,
    name: '大型龙门加工中心生产车间',
    image: '/src/assets/equipments/gantry/workshop.jpg',
    category: '大型龙门加工中心',
    categoryId: 5,
    description: '现代化大型龙门加工中心生产车间，配备先进的加工设备和完善的生产流水线，具备高精度、高效率的大型零部件加工能力'
  },
  {
    id: 3,
    name: 'Leader高精度三坐标测量机',
    image: '/src/assets/equipments/detection/coordinate-measuring-machine.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '具备卓越精度和稳定性的高端三坐标测量设备，可满足精密零部件测量、高精度曲面扫描及计量仲裁需求，配备先进的测量软件和探头系统，是高精度测量的典范'
  },
  {
    id: 4,
    name: '现代化装配车间',
    image: '/src/assets/equipments/assembly/modern-workshop.jpg',
    category: '装配区域',
    categoryId: 4,
    description: '配备红色桥式起重机的现代化装配车间，拥有宽敞的作业空间和完善的起重设备，可满足大型模具和设备的装配需求，确保装配作业的高效性和安全性'
  },
  {
    id: 5,
    name: 'F8高速加工中心',
    image: '/src/assets/equipments/high-speed/F8.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: 'F8系列高速立式加工中心，具备高速主轴和快速进给系统，适用于精密模具和复杂零件的高效加工'
  },
  {
    id: 6,
    name: 'E1高速精密加工设备',
    image: '/src/assets/equipments/high-speed/e1.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: 'E1系列高速精密加工设备，配备先进的控制系统和高精度主轴，专为高速切削和精密加工设计'
  },
  {
    id: 7,
    name: 'E2高速数控加工中心',
    image: '/src/assets/equipments/high-speed/e2.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: 'E2高速数控加工中心，具备优异的动态性能和加工精度，适用于航空航天和汽车零部件的高速加工'
  },
  {
    id: 8,
    name: 'E3高效能加工设备',
    image: '/src/assets/equipments/high-speed/e3.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: 'E3高效能加工设备，采用高刚性机床结构和智能化控制系统，实现高速高精度加工'
  },
  {
    id: 9,
    name: 'YJ系列高速加工中心',
    image: '/src/assets/equipments/high-speed/yj.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: 'YJ系列高速加工中心，集成先进的高速切削技术和智能监控系统，提供卓越的加工效率和表面质量'
  }
]

const filteredEquipments = computed(() => {
  return equipments.filter(e => e.categoryId === activeCategory.value)
})

// 动态导入图片
const getImageUrl = (path: string) => {
  if (!path) {
    console.error('图片路径为空')
    return ''
  }

  try {
    // 移除路径中的 /src/assets/equipments/ 前缀
    const normalizedPath = path.replace('/src/assets/equipments/', '')
    
    // 使用 Vite 的动态导入语法
    const imageModules = import.meta.glob('../assets/equipments/**/*', { eager: true })
    const imagePath = `../assets/equipments/${normalizedPath}`
    
    // 检查图片是否存在
    if (imagePath in imageModules) {
      const imageUrl = (imageModules[imagePath] as { default: string }).default
      // 移除可能存在的重复基础路径
      const cleanUrl = imageUrl.replace('/jinan-foundry-pattern-dev/', '/')
      // 在生产环境中添加基础路径
      return import.meta.env.PROD 
        ? `/jinan-foundry-pattern-dev${cleanUrl}`
        : imageUrl
    } else {
      console.error('找不到图片:', imagePath)
      return ''
    }
  } catch (error) {
    console.error('加载图片失败:', error)
    return ''
  }
}

const handleImageLoad = (id: number) => {
  loadedImages.value.add(id)
}
</script>

<template>
  <!-- 分类导航 -->
  <div class="max-w-7xl mx-auto py-8">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 px-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="[
          'py-2.5 rounded-lg text-center text-base font-medium transition-all duration-300',
          activeCategory === category.id
            ? 'bg-[#1d46a8] text-white shadow-lg ring-2 ring-[#1d46a8] ring-offset-2'
            : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow'
        ]"
      >
        {{ category.name }}
      </button>
    </div>
  </div>

  <!-- 设备列表 -->
  <div class="max-w-7xl mx-auto py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="equipment in filteredEquipments"
        :key="equipment.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div class="relative aspect-[16/9] overflow-hidden bg-gray-100 group">
          <img
            :src="getImageUrl(equipment.image)"
            :alt="equipment.name"
            class="w-full h-full object-cover"
            loading="lazy"
            @load="handleImageLoad(equipment.id)"
            :class="{ 'opacity-0': !loadedImages.has(equipment.id), 'opacity-100': loadedImages.has(equipment.id) }"
          />
          <!-- 扫光效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
          <!-- 加载占位 -->
          <div 
            class="absolute inset-0 flex items-center justify-center bg-gray-100"
            :class="{ 'hidden': loadedImages.has(equipment.id) }"
          >
            <div class="w-8 h-8 border-4 border-[#1d46a8] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ equipment.name }}</h3>
          <p class="text-gray-600">{{ equipment.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 更新加载动画边框颜色 */
.animate-spin {
  border-color: #1d46a8;
  border-top-color: transparent;
}
</style>