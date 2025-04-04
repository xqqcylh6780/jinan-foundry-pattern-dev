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
  { id: 1, name: '铸铁造型线模具' },
  { id: 2, name: '铸铝低压、重力、倾转永久模' },
  { id: 3, name: '冷热芯盒' },
  { id: 4, name: '各类型工装夹具' }
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
    image: 'sand-casting/p1.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '高精度水泵壳体铸造模具，适用于各类水泵生产'
  },
  {
    id: 2,
    name: '阀门壳体模具',
    image: 'sand-casting/p2.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '精密阀门壳体模具，满足各种阀门制造需求'
  },
  {
    id: 3,
    name: '液压泵体模具',
    image: 'sand-casting/p3.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '专业液压泵体模具制造，确保产品精度'
  },
  {
    id: 4,
    name: '减速器壳体低压模具',
    image: 'metal/1.png',
    category: '铸铝低压、重力、倾转永久模',
    categoryId: 2,
    description: '产品尺寸697*640*540、侧模四开低压模具、3个覆膜砂热芯组合下芯'
  },
  {
    id: 5,
    name: '变速箱壳体低压模具',
    image: 'metal/2.png',
    category: '铸铝低压、重力、倾转永久模',
    categoryId: 2,
    description: '产品外型635*609*466、侧模四开低压模具、1个覆膜砂热芯'
  },
  {
    id: 6,
    name: '变速箱壳体低压模具',
    image: 'metal/3.png',
    category: '铸铝低压、重力、倾转永久模',
    categoryId: 2,
    description: '产品外型593*391*476、侧模四开低压模具'
  },
  {
    id: 7,
    name: '变速箱壳体低压模具',
    image: 'metal/4.png',
    category: '铸铝低压、重力、倾转永久模',
    categoryId: 2,
    description: '产品外型564*436*179侧模四开低压模具'
  },
  {
    id: 8,
    name: '双电机壳体低压模具',
    image: 'metal/5.png',
    category: '铸铝低压、重力、倾转永久模',
    categoryId: 2,
    description: '产品外型646*578*387、侧模四开低压模具'
  },
  {
    id: 9,
    name: '缸体低压模具',
    image: 'metal/6.png',
    category: '铸铝低压、重力、倾转永久模',
    categoryId: 2,
    description: '产品外型300*227*293、侧模四开低压模具'
  },
  {
    id: 11,
    name: '冷热芯盒模具',
    image: 'hc-boxes/h1.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '高精度冷热芯盒模具，用于生产高质量铸造砂芯'
  },
  {
    id: 12,
    name: '冷热芯盒工装',
    image: 'hc-boxes/h2.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '高效冷热芯盒工装设备'
  },
  {
    id: 13,
    name: '冷热芯盒模具',
    image: 'hc-boxes/h3.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '专业冷热芯盒模具设计与制造'
  },
  {
    id: 25,
    name: '大型芯盒模具',
    image: 'hc-boxes/h4.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '适用于大型铸件的芯盒模具，精度高'
  },
  {
    id: 26,
    name: '复杂芯盒模具',
    image: 'hc-boxes/h5.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '用于制作复杂形状砂芯的专业模具'
  },
  {
    id: 27,
    name: '组合式芯盒',
    image: 'hc-boxes/h6.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '灵活组合的芯盒系统，提高生产效率'
  },
  {
    id: 28,
    name: '精密芯盒模具',
    image: 'hc-boxes/h7.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '高精度要求的芯盒模具，表面光洁度好'
  },
  {
    id: 29,
    name: '自动化芯盒',
    image: 'hc-boxes/h8.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '配备自动化功能的现代化芯盒设备'
  },
  {
    id: 30,
    name: '多腔芯盒模具',
    image: 'hc-boxes/h9.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '多腔设计的高效芯盒模具，批量生产'
  },
  {
    id: 31,
    name: '专用芯盒设备',
    image: 'hc-boxes/h10.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '特殊用途的专业芯盒设备，定制化设计'
  },
  {
    id: 32,
    name: '高性能芯盒',
    image: 'hc-boxes/h11.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '高性能芯盒模具，耐用性强'
  },
  {
    id: 33,
    name: '智能芯盒系统',
    image: 'hc-boxes/h12.jpg',
    category: '冷热芯盒',
    categoryId: 3,
    description: '智能控制的现代化芯盒系统，操作便捷'
  },
  {
    id: 15,
    name: '精密定位夹具',
    image: 'fk/k1.jpg',
    category: '工装夹具',
    categoryId: 4,
    description: '高精度定位夹具，确保加工过程中的稳定性和精确性'
  },
  {
    id: 16,
    name: '多功能工装夹具',
    image: 'fk/k2.jpg',
    category: '工装夹具',
    categoryId: 4,
    description: '适用于各类复杂工件的加工固定，提高生产效率'
  },
  {
    id: 34,
    name: '专用加工夹具',
    image: 'fk/k3.jpg',
    category: '工装夹具',
    categoryId: 4,
    description: '专门设计的加工夹具，满足特殊工件需求'
  },
  {
    id: 35,
    name: '组合式工装夹具',
    image: 'fk/k4.jpg',
    category: '工装夹具',
    categoryId: 4,
    description: '模块化设计的组合夹具，灵活适应不同工件'
  },
  {
    id: 17,
    name: '发动机缸体模具',
    image: 'sand-casting/p4.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '大型发动机缸体铸造模具，高精度设计'
  },
  {
    id: 18,
    name: '变速箱壳体模具',
    image: 'sand-casting/p5.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '重型变速箱壳体模具，结构复杂，精度高'
  },
  {
    id: 19,
    name: '齿轮箱模具',
    image: 'sand-casting/p6.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '工业齿轮箱铸造模具，耐用性强'
  },
  {
    id: 20,
    name: '机床底座模具',
    image: 'sand-casting/p7.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '大型机床底座模具，稳定性好'
  },
  {
    id: 21,
    name: '泵体模具组件',
    image: 'sand-casting/p8.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '复杂泵体模具组件，多腔设计'
  },
  {
    id: 22,
    name: '阀门系列模具',
    image: 'sand-casting/p9.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '系列阀门模具，规格齐全'
  },
  {
    id: 23,
    name: '工程机械模具',
    image: 'sand-casting/p10.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '工程机械零部件模具，承重能力强'
  },
  {
    id: 24,
    name: '重型设备模具',
    image: 'sand-casting/p11.jpg',
    category: '铸铁造型线模具',
    categoryId: 1,
    description: '重型设备铸件模具，尺寸精准'
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
            <span class="inline-block text-[#1d46a8]">铸造模具</span>
            <span class="inline-block">制造商</span>
          </h1>
          <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto"></div>
          <p 
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-widest font-medium max-w-4xl mx-auto px-4 transform transition-all duration-1000 delay-300"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
            复杂及各种尺寸的铸铁造型线模具、冷热芯盒，铸铝低压、重力、倾转永久模，及各类型辅助工装夹具
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
              ? 'bg-[#1d46a8] text-white shadow-lg ring-2 ring-[#1d46a8] ring-offset-2'
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
          <div class="relative aspect-[4/3] bg-gray-100 group">
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="w-full h-full object-cover"
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
              class="absolute inset-0 flex items-center justify-center bg-gray-100"
              :class="{ 'hidden': loadedImages.has(product.id) }"
            >
              <div class="w-8 h-8 border-4 border-[#1d46a8] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600">{{ product.description }}</p>
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
  border-color: #1d46a8;
  border-top-color: transparent;
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;            /* Chrome, Safari and Opera */
}
</style> 