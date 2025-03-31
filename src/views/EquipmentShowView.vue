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
  { id: 5, name: '装配区域' }
]

const activeCategory = ref(categories[0].id)
const loadedImages = ref<Set<number>>(new Set())

const equipments: Equipment[] = [
  {
    id: 1,
    name: '大型智能去应力设备',
    image: '/src/assets/equipments/e1.jpg',
    category: '去应力设备',
    categoryId: 1,
    description: '采用智能控制系统，可精确控制去应力过程'
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
    
    // console.log('尝试加载图片:', imagePath) // 调试日志
    
    // 检查图片是否存在
    if (imagePath in imageModules) {
      const imageUrl = (imageModules[imagePath] as { default: string }).default
      // 在生产环境中添加基础路径
      return import.meta.env.PROD 
        ? `/jinan-foundry-pattern-dev${imageUrl}`
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
        <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 group">
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