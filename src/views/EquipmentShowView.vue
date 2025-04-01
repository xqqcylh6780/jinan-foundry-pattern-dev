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
    name: '日本牧野（Makino）V90S五轴加工中心',
    image: '/src/assets/equipments/5axis/e1.jpg',
    category: '五轴加工设备',
    categoryId: 1,
    description: '高性能五轴立式加工中心，采用双摆台结构，主轴最高转速40,000RPM，定位精度±2μm，配备SGI.4几何智能控制系统，专为复杂曲面、高精度模具加工设计'
  },
  {
    id: 2,
    name: '日本牧野（Makino）V90S五轴加工中心',
    image: '/src/assets/equipments/5axis/e2.jpg',
    category: '五轴加工设备',
    categoryId: 1,
    description: '高刚性床身结构，配备3D激光校准系统，HSK刀柄，可实现一次装夹多面加工，确保高速切削时的稳定性和加工精度'
  },
  {
    id: 3,
    name: '牧野（Makino）PS105新一代立式加工中心',
    image: '/src/assets/equipments/high-speed/e1.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '新一代PS系列立式加工中心，集功率、精度、速度和可靠性于一体，重新定义了航空航天、医疗、汽车等行业的加工标准，全面提升车间生产力水平'
  },
  {
    id: 4,
    name: '匠泽（Takumi）H16M五轴联动加工中心',
    image: '/src/assets/equipments/high-speed/e2.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '日本精密制造技术，专为精密模具、航空航天零部件设计，结合高性能和性价比优势，适用于复杂曲面和难切削材料的高精度加工'
  },
  {
    id: 5,
    name: '大君宏（Hartford）B17高速龙门加工中心',
    image: '/src/assets/equipments/high-speed/e3.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '新一代模具制造专用龙门加工中心，高刚性机台结构设计，配备高速直结式主轴，提升重切削能力，显著缩短模具加工周期'
  },
  {
    id: 16,
    name: 'F8大型立式加工中心',
    image: '/src/assets/equipments/high-speed/F8.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '集功率、速度、精度和稳定性于一体的大型立式加工中心，具备优异的热稳定性，可实现长时间连续高速、小公差加工，适用于传统模具和医疗产品的复杂三维曲面加工'
  },
  {
    id: 7,
    name: 'HandySCAN 3D|BLACK 高精度三维扫描仪',
    image: '/src/assets/equipments/detection/e2.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '高端便携式三维测量设备，具备高精度、高速测量和高分辨率特性，可在各种环境下采集高质量测量数据，是质量保证和产品开发的理想工具'
  },
  {
    id: 9,
    name: '永基大型龙门加工中心',
    image: '/src/assets/equipments/gantry/g1.jpg',
    category: '龙门加工中心',
    categoryId: 5,
    description: '采用方箱式加强筋底座设计，立柱结合处双倍加强筋密度，配备高密度垂直加强筋，显著提升机床刚性和抗扭曲能力'
  },
  {
    id: 10,
    name: '永基精密龙门加工中心',
    image: '/src/assets/equipments/gantry/g2.jpg',
    category: '龙门加工中心',
    categoryId: 5,
    description: '创新支撑垫铁设计，直接承接工件重量，避免机床悬空状态，大幅提升承载能力和抗变形性能'
  },
  {
    id: 11,
    name: '精密硬度检测仪',
    image: '/src/assets/equipments/detection/e4.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '专业模具硬度检测设备，通过精确测试提升模具质量和制造水平，有效延长模具使用寿命，是模具制造质量控制的关键设备'
  },
  {
    id: 13,
    name: 'Leader高精度三坐标测量机',
    image: '/src/assets/equipments/detection/e6.jpg',
    category: '检测设备',
    categoryId: 3,
    description: '具备卓越精度和稳定性的高端测量设备，可满足精密零部件测量、高精度曲面扫描及计量仲裁需求，是高精度测量机的典范'
  },
  {
    id: 14,
    name: '模具装配区',
    image: '/src/assets/equipments/assembly/a1.jpg',
    category: '装配区域',
    categoryId: 4,
    description: '专业模具装配工作区，配备完善的装配工具和设备'
  },
  {
    id: 15,
    name: '精密装配区',
    image: '/src/assets/equipments/assembly/a2.jpg',
    category: '装配区域',
    categoryId: 4,
    description: '高标准精密装配区域，确保模具装配精度和质量'
  },
  {
    id: 17,
    name: '永基龙门加工中心',
    image: '/src/assets/equipments/high-speed/yj.jpg',
    category: '高速加工设备',
    categoryId: 2,
    description: '配备全数字驱动系统和高性能伺服电机，具备存储型螺距误差补偿和间隙补偿功能，采用高分辨率位置检测器和高速微处理器，实现高速高精度加工'
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