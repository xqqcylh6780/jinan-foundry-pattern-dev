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
  { id: 4, name: '普通加工设备' },
  { id: 5, name: '装配区域' },
  { id: 6, name: '龙门加工中心' }
]

const activeCategory = ref(categories[0].id)
const loadedImages = ref<Set<number>>(new Set())

const equipments: Equipment[] = [
  {
    id: 1,
    name: '日本牧野五轴加工中心',
    image: '/src/assets/equipments/5axis/e1.jpg',
    category: '五轴加工设备',
    categoryId: 1,
    description: '日本牧野五轴联动加工中心，行程2000*1300*800mm，可实现大型复杂模具的高精度加工'
  },
  {
    id: 2,
    name: '日本牧野五轴加工中心',
    image: '/src/assets/equipments/5axis/e2.jpg',
    category: '五轴加工设备',
    categoryId: 1,
    description: '日本牧野五轴联动加工中心，行程2000*1300*800mm，专注于高精度模具制造'
  },
  {
    id: 3,
    name: '三轴高速加工中心',
    image: '/src/assets/equipments/high-speed/e1.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '三轴高速加工中心，配备进口主轴，实现高效率、高精度的模具加工'
  },
  {
    id: 4,
    name: '高速铣削加工中心',
    image: '/src/assets/equipments/high-speed/e2.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '高速铣削加工中心，实现复杂曲面精密加工'
  },
  {
    id: 5,
    name: '高速数控铣床',
    image: '/src/assets/equipments/high-speed/e3.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '高精度高速数控铣床，适用于各类模具加工'
  },
  {
    id: 6,
    name: '三维扫描仪',
    image: '/src/assets/equipments/detection/e1.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '高精度三维扫描仪，用于模具产品的尺寸检测和逆向工程'
  },
  {
    id: 7,
    name: '光学投影仪',
    image: '/src/assets/equipments/detection/e2.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '精密光学投影仪，用于轮廓尺寸检测'
  },
  {
    id: 8,
    name: '数显高度仪',
    image: '/src/assets/equipments/detection/e3.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '高精度数显高度仪，用于垂直尺寸测量'
  },
  {
    id: 9,
    name: '大型龙门加工中心',
    image: '/src/assets/equipments/gantry/g1.jpg',
    category: '龙门加工中心',
    categoryId: 6,
    description: '大型龙门式加工中心，适用于大型模具的高精度加工'
  },
  {
    id: 10,
    name: '精密龙门加工中心',
    image: '/src/assets/equipments/gantry/g2.jpg',
    category: '龙门加工中心',
    categoryId: 6,
    description: '高精度龙门加工中心，确保大型工件的加工精度'
  },
  {
    id: 11,
    name: '三次元测量仪',
    image: '/src/assets/equipments/detection/e4.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '高精度三次元测量仪，用于复杂形状的尺寸检测'
  },
  {
    id: 12,
    name: '影像测量仪',
    image: '/src/assets/equipments/detection/e5.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '精密影像测量仪，适用于精密零件的尺寸检测'
  },
  {
    id: 13,
    name: '三坐标测量机',
    image: '/src/assets/equipments/detection/e6.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '高精度三坐标测量机，可进行复杂工件的全尺寸精密测量'
  },
  {
    id: 14,
    name: '模具装配区',
    image: '/src/assets/equipments/assembly/a1.jpg',
    category: '装配区域',
    categoryId: 5,
    description: '专业模具装配工作区，配备完善的装配工具和设备'
  },
  {
    id: 15,
    name: '精密装配区',
    image: '/src/assets/equipments/assembly/a2.jpg',
    category: '装配区域',
    categoryId: 5,
    description: '高标准精密装配区域，确保模具装配精度和质量'
  },
  // ... 其他设备数据
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
            ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-600 ring-offset-2'
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
            <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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