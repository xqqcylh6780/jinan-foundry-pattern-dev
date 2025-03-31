<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'

interface Product {
  id: number
  name: string
  image: string
  category: string
  categoryId: number
  description: string
}

const categories = [
  { id: 1, name: '砂型铸造' },
  { id: 2, name: '金属型模铸造' },
  { id: 3, name: '冷热芯盒' },
  { id: 4, name: '手工芯盒' }
]

const activeCategory = ref(categories[0].id)

// 添加图片加载状态管理
const loadedImages = ref<Set<number>>(new Set())

function handleImageLoad(productId: number) {
  loadedImages.value.add(productId)
}

// 动态导入图片
const getImageUrl = (path: string) => {
  if (!path) {
    console.error('图片路径为空')
    return ''
  }

  try {
    // 使用 Vite 的动态导入语法
    const imageModules = import.meta.glob('../assets/products/**/*', { eager: true })
    const imagePath = `../assets/products/${path}`
    
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

const products: Product[] = [
  {
    id: 1,
    name: '水泵壳体模具',
    image: 'p1.jpg',
    category: '泵、阀类模具',
    categoryId: 1,
    description: '高精度水泵壳体铸造模具，适用于各类水泵生产'
  },
  {
    id: 2,
    name: '阀门壳体模具',
    image: 'p2.jpg',
    category: '泵、阀类模具',
    categoryId: 1,
    description: '精密阀门壳体模具，满足各种阀门制造需求'
  },
  {
    id: 3,
    name: '液压泵体模具',
    image: 'p3.jpg',
    category: '泵、阀类模具',
    categoryId: 1,
    description: '专业液压泵体模具制造，确保产品精度'
  },
  {
    id: 4,
    name: '金属型模铸造模具-1',
    image: 'metal/1.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '高精度金属型模铸造模具，确保产品质量'
  },
  {
    id: 5,
    name: '金属型模铸造模具-2',
    image: 'metal/2.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '专业金属型模铸造模具制造'
  },
  {
    id: 6,
    name: '金属型模铸造模具-3',
    image: 'metal/3.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '精密金属型模铸造模具'
  },
  {
    id: 7,
    name: '金属型模铸造模具-4',
    image: 'metal/4.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '高品质金属型模铸造模具'
  },
  {
    id: 8,
    name: '金属型模铸造模具-5',
    image: 'metal/5.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '定制金属型模铸造模具'
  },
  {
    id: 9,
    name: '金属型模铸造模具-6',
    image: 'metal/6.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '专业金属型模铸造解决方案'
  },
  {
    id: 10,
    name: '金属型模铸造模具-7',
    image: 'metal/7.png',
    category: '金属型模铸造',
    categoryId: 2,
    description: '高效金属型模铸造模具'
  },
  {
    id: 11,
    name: '铝合金压铸模具',
    image: 'p10.jpg',
    category: '有色铸造模具',
    categoryId: 4,
    description: '专业铝合金压铸模具设计与制造'
  },
  {
    id: 12,
    name: '铜合金铸造模具',
    image: 'p11.jpg',
    category: '有色铸造模具',
    categoryId: 4,
    description: '高精度铜合金铸造模具生产'
  },
  {
    id: 13,
    name: '镁合金模具',
    image: 'p12.jpg',
    category: '有色铸造模具',
    categoryId: 4,
    description: '轻量化镁合金压铸模具制造'
  },
  {
    id: 14,
    name: '机床铸件模具',
    image: 'p13.jpg',
    category: '其他类模具',
    categoryId: 5,
    description: '各类机床铸件模具的设计与制造'
  },
  {
    id: 15,
    name: '工程机械模具',
    image: 'p14.jpg',
    category: '其他类模具',
    categoryId: 5,
    description: '工程机械零部件模具专业定制'
  },
  {
    id: 16,
    name: '农机设备模具',
    image: 'p15.jpg',
    category: '其他类模具',
    categoryId: 5,
    description: '农业机械设备模具开发制造'
  }
]

const filteredProducts = computed(() => {
  return products.filter(p => p.categoryId === activeCategory.value)
})

// 添加标题和副标题的可见性状态
const isTitleVisible = ref(false)
const isSubtitleVisible = ref(false)
const isSubtitle2Visible = ref(false)

onMounted(() => {
  // 延迟显示标题和副标题
  setTimeout(() => {
    isTitleVisible.value = true
    setTimeout(() => {
      isSubtitleVisible.value = true
      setTimeout(() => {
        isSubtitle2Visible.value = true
      }, 300)
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
        src="@/assets/products/banner.jpg" 
        alt="产品展示" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <div class="text-center space-y-8">
          <h1 
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-wider transform transition-all duration-1000"
            :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
          >
            <span class="inline-block">专业</span>
            <span class="inline-block text-red-500">铸造模具</span>
            <span class="inline-block">制造商</span>
          </h1>
          <div class="w-32 h-1.5 bg-red-500 mx-auto"></div>
          <p 
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-widest font-medium max-w-4xl mx-auto px-4 transform transition-all duration-1000 delay-300"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
            专注铸造模具30年，打造全方位铸造解决方案
          </p>
          <p 
            class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl mx-auto px-4 transform transition-all duration-1000 delay-600"
            :class="{ 'translate-y-0 opacity-100': isSubtitle2Visible, 'translate-y-8 opacity-0': !isSubtitle2Visible }"
          >
            涵盖泵阀、发动机、汽车机械、有色金属等多个领域，以精湛工艺服务全球客户
          </p>
        </div>
      </div>
    </div>

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

    <!-- 产品列表 -->
    <div class="max-w-7xl mx-auto py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
        >
          <div class="relative aspect-[4/3] overflow-hidden bg-white group border-b border-gray-100">
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="w-full h-full object-contain"
              loading="lazy"
              width="1920"
              height="1080"
              @load="handleImageLoad(product.id)"
              :class="{ 'opacity-0': !loadedImages.has(product.id), 'opacity-100': loadedImages.has(product.id) }"
            />
            <!-- 扫光效果 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
            <!-- 加载占位 -->
            <div 
              class="absolute inset-0 flex items-center justify-center bg-white"
              :class="{ 'hidden': loadedImages.has(product.id) }"
            >
              <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <div class="p-6 bg-gray-50">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600">{{ product.description }}</p>
            <button class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}

@media (max-width: 640px) {
  button {
    @apply text-sm py-2;
  }
}

/* 优化图片过渡效果 */
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
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;            /* Chrome, Safari and Opera */
}
</style> 