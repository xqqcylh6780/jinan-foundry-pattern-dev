<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'

// 导航菜单配置
const navItems = [
  { name: 'nav.home', path: '/' },
  { 
    name: 'nav.about', 
    path: '/about',
    children: [
      { name: 'nav.about_company', path: '/about/company' },
      { name: 'nav.about_certificates', path: '/about/certificates' }
    ]
  },
  { name: 'nav.design', path: '/design' },
  { name: 'nav.product', path: '/product' },
  { 
    name: 'nav.equipment', 
    path: '/equipment',
    children: [
      { name: 'nav.equipment_show', path: '/equipment/show' },
      { name: 'nav.equipment_list', path: '/equipment/list' }
    ]
  },
  { name: 'nav.contact', path: '/contact' }
]

// 移动端菜单状态
const isMobileMenuOpen = ref(false)
const menuContainerRef = ref<HTMLElement | null>(null)

// 语言切换
const { t, locale } = useI18n()
const currentLang = computed(() => locale.value === 'zh' ? '中文' : 'English')
const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}

const currentLocale = ref(locale.value)

function toggleLocale(value: string) {
  locale.value = value
  currentLocale.value = value
}

// 点击外部关闭菜单
onClickOutside(menuContainerRef, (event) => {
  const menuButton = document.querySelector('.mobile-menu-button')
  const mobileMenu = document.querySelector('.mobile-menu')
  // 检查点击事件是否来自菜单按钮或移动端菜单
  if ((!menuButton || !menuButton.contains(event.target as Node)) && 
      (!mobileMenu || !mobileMenu.contains(event.target as Node))) {
    isMobileMenuOpen.value = false
  }
})

// 添加控制子菜单展开状态的变量
const expandedMenus = ref<Set<string>>(new Set())

// 切换子菜单展开状态
function toggleSubmenu(event: Event, name: string) {
  // 阻止事件冒泡和默认行为
  event.preventDefault()
  event.stopPropagation()
  
  if (expandedMenus.value.has(name)) {
    expandedMenus.value.delete(name)
  } else {
    expandedMenus.value.add(name)
  }
}

// 优化屏幕宽度计算逻辑
const screenWidth = ref(window.innerWidth)
const logoWidth = 462 // Logo 最大宽度
const menuButtonWidth = 64 // 汉堡菜单按钮宽度
const langButtonWidth = 120 // 语言切换按钮宽度
const navItemPadding = 40 // 导航项的左右内边距总和
const minNavItemWidth = 80 // 导航项的最小宽度（不包括内边距）

// 计算当前可显示的导航项数量
const visibleItemsCount = computed(() => {
  const padding = 32 // 页面左右内边距
  const availableWidth = screenWidth.value - logoWidth - menuButtonWidth - padding * 2
  
  // 计算每个导航项实际需要的宽度（包括内边距）
  const itemWidths = navItems.map(item => {
    // 根据文本长度计算所需宽度（假设每个字符约 12px）
    const textWidth = t(item.name).length * 12
    return Math.max(textWidth + navItemPadding, minNavItemWidth + navItemPadding)
  })
  
  // 从左到右累加宽度，直到超出可用空间
  let totalWidth = 0
  let count = 0
  
  for (const width of itemWidths) {
    if (totalWidth + width > availableWidth) break
    totalWidth += width
    count++
  }
  
  return count
})

// 判断是否应该隐藏导航项
function shouldHideNavItem(index: number): boolean {
  return index >= visibleItemsCount.value
}

// 计算是否有隐藏的导航项
const hasHiddenItems = computed(() => {
  return visibleItemsCount.value < navItems.length
})

// 监听窗口大小变化
onMounted(() => {
  let resizeTimeout: number | null = null
  
  const handleResize = () => {
    // 使用 requestAnimationFrame 优化性能
    if (resizeTimeout) {
      window.cancelAnimationFrame(resizeTimeout)
    }
    
    resizeTimeout = window.requestAnimationFrame(() => {
      screenWidth.value = window.innerWidth
    })
  }
  
  window.addEventListener('resize', handleResize)
  handleResize() // 初始化时执行一次
  
  onUnmounted(() => {
    if (resizeTimeout) {
      window.cancelAnimationFrame(resizeTimeout)
    }
    window.removeEventListener('resize', handleResize)
  })
})

// 移动端菜单中显示所有被隐藏的导航项
const mobileMenuItems = computed(() => {
  return navItems.filter((_, index) => shouldHideNavItem(index))
})
</script>

<template>
  <header class="w-full bg-white shadow-sm">
    <!-- 响应式导航栏 -->
    <div class="max-w-[1440px] mx-auto px-4" ref="menuContainerRef">
      <div class="flex items-center justify-between">
        <nav class="relative flex-1">
          <div class="flex items-center justify-between h-[90px]">
            <!-- 左侧 Logo -->
            <div class="flex-shrink-1">
              <router-link to="/">
                <img 
                  src="@/assets/logo.png" 
                  alt="方德利 Logo" 
                  class="h-[40px] sm:h-[52px] md:h-[62px] w-auto max-w-[240px] sm:max-w-[350px] md:max-w-[462px]" 
                >
              </router-link>
            </div>

            <!-- 桌面端导航菜单 -->
            <div class="hidden md:flex md:items-center">
              <div 
                v-for="(item, index) in navItems" 
                :key="item.name" 
                class="relative group transition-all duration-300"
                :class="{
                  'opacity-0 w-0 overflow-hidden': shouldHideNavItem(index),
                  'opacity-100': !shouldHideNavItem(index)
                }"
              >
                <RouterLink
                  :to="item.path"
                  class="nav-link text-gray-700 px-5 py-2 text-[15px] uppercase font-medium tracking-wider whitespace-nowrap"
                  active-class="nav-active"
                >
                  {{ t(item.name) }}
                </RouterLink>
                
                <!-- 添加子菜单 -->
                <div 
                  v-if="item.children" 
                  class="absolute left-0 mt-1 w-[160px] hidden group-hover:block z-50"
                >
                  <div class="absolute h-2 -top-2 left-0 right-0 bg-transparent"></div>
                  <div class="bg-white shadow-lg">
                    <RouterLink
                      v-for="child in item.children"
                      :key="child.name"
                      :to="child.path"
                      class="block px-6 py-3 text-base text-gray-700 hover:bg-gray-800 hover:text-white border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                    >
                      {{ t(child.name) }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- 移动端菜单按钮 -->
            <div 
              class="block ml-2"
              :class="{
                'md:hidden': !hasHiddenItems,
                'block': hasHiddenItems
              }"
            >
              <button
                class="mobile-menu-button inline-flex flex-col justify-center items-center w-16 h-16 relative rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                @click="isMobileMenuOpen = !isMobileMenuOpen"
                aria-expanded="false"
              >
                <span class="sr-only">打开主菜单</span>
                <span 
                  class="w-8 h-[3px] bg-gray-700 rounded-full shadow-sm transition-all duration-300 ease-out absolute"
                  :class="isMobileMenuOpen ? 'rotate-45 translate-y-0 bg-[#1d46a8]' : '-translate-y-3'"
                ></span>
                <span 
                  class="w-8 h-[3px] bg-gray-700 rounded-full shadow-sm transition-all duration-300 ease-out absolute"
                  :class="isMobileMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'"
                ></span>
                <span 
                  class="w-8 h-[3px] bg-gray-700 rounded-full shadow-sm transition-all duration-300 ease-out absolute"
                  :class="isMobileMenuOpen ? '-rotate-45 translate-y-0 bg-[#1d46a8]' : 'translate-y-3'"
                ></span>
              </button>
            </div>
          </div>
        </nav>

        <!-- 语言切换按钮 - 桌面端 -->
        <div 
          class="hidden items-center h-[90px] ml-6"
          :class="{
            'xl:flex': !shouldHideNavItem(navItems.length - 1)
          }"
        >
          <button
            @click="toggleLang"
            class="group flex items-center space-x-2 px-4 py-2 text-[15px] text-gray-500 border border-gray-200 rounded-full hover:border-[#1d46a8] hover:text-[#1d46a8] hover:shadow-sm transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span class="font-medium">{{ currentLang }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <div
      v-show="isMobileMenuOpen"
      class="mobile-menu xl:hidden fixed top-[90px] left-0 right-0 bg-white shadow-xl z-50"
    >
      <div class="py-3">
        <template v-for="item in mobileMenuItems" :key="item.name">
          <div class="relative">
            <div 
              class="flex items-center justify-between px-6 py-4 text-[15px] font-medium text-gray-700 hover:text-[#1d46a8] hover:bg-gray-50/70 transition-all duration-200"
              :class="{ 'text-[#1d46a8] bg-gray-50': $route.path === item.path }"
            >
              <RouterLink
                :to="item.path"
                class="flex-1"
                @click="isMobileMenuOpen = false"
              >
                {{ t(item.name) }}
              </RouterLink>
              <!-- 修改下拉箭头按钮的点击事件 -->
              <button 
                v-if="item.children"
                type="button"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                @click="(e) => toggleSubmenu(e, item.name)"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 transform transition-transform duration-200"
                  :class="{ 'rotate-180': expandedMenus.has(item.name) }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <!-- 子菜单 -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[500px] opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-[500px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div 
                v-if="item.children && expandedMenus.has(item.name)"
                class="overflow-hidden bg-gray-50"
                @click.stop
              >
                <RouterLink
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.path"
                  class="block px-10 py-2 text-sm font-medium text-gray-600 hover:text-[#1d46a8] hover:bg-gray-100 transition-colors duration-200"
                  :class="{ 'text-[#1d46a8] bg-gray-100': $route.path === child.path }"
                  @click="isMobileMenuOpen = false"
                >
                  {{ t(child.name) }}
                </RouterLink>
              </div>
            </transition>
          </div>
        </template>

        <!-- 添加语言切换按钮到移动端菜单 -->
        <div 
          v-if="shouldHideNavItem(navItems.length - 1)"
          class="px-6 py-4 border-t border-gray-100"
        >
          <button
            @click="toggleLang"
            class="flex items-center space-x-2 text-[15px] text-gray-700 hover:text-[#1d46a8] transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span class="font-medium">{{ currentLang }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply relative inline-block transition-all duration-300;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-[24px] right-[24px] h-0.5 bg-[#1d46a8] transition-all duration-300 ease-in-out scale-x-0 origin-left;
}

.nav-link:hover::after,
.nav-active::after {
  @apply scale-x-100;
}

.nav-active {
  @apply text-gray-700;
}

/* 移除子菜单的激活样式 */
.router-link-active:not(.nav-link) {
  @apply bg-gray-100;
  @apply text-gray-900 !important;
}

/* 其他样式保持不变 */
.mobile-menu-button:hover span {
  @apply bg-gray-800;
}

.mobile-menu-button:hover span.rotate-45,
.mobile-menu-button:hover span.-rotate-45 {
  @apply bg-[#1d46a8];
}

.group:hover .absolute,
.absolute:hover {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.max-h-0 {
  max-height: 0;
}

.max-h-\[500px\] {
  max-height: 500px;
}

/* 添加移动端语言切换按钮样式 */
.mobile-menu .language-button {
  @apply w-full text-left;
}

/* 优化过渡效果 */
.group {
  @apply transition-all duration-300 ease-in-out;
}

.opacity-0 {
  @apply transform scale-95;
}

.opacity-100 {
  @apply transform scale-100;
}
</style> 