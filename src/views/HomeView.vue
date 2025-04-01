<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useRouter } from "vue-router";
import bannerVideo from "@/assets/Web banner Final.mp4";
import { useI18n } from 'vue-i18n'
import jj1 from "@/assets/jj1.jpg";
import jj2 from "@/assets/jj2.jpg";
import jj3 from "@/assets/jj3.jpg";
import jj4 from "@/assets/jj4.jpg";

const { t } = useI18n()

const introImageRef = ref(null);
const introContentRef = ref(null);
const introTitleRef = ref(null);

const isFirstLoad = ref(true);
const isVisible = ref(false)

// 公司数据
const companyStats = [
  { label: "成立年份", value: 1992 },
  { label: "占地面积", value: 20000 },
  { label: "厂房面积", value: 12000 },
  { label: "数控机床", value: 40 },
  { label: "工程师", value: 28 },
  { label: "员工总数", value: 70 },
];

const currentNumbers = ref(companyStats.map(() => 0));
const statsRef = ref(null);

const service1Ref = ref(null);
const service2Ref = ref(null);
const service3Ref = ref(null);

const router = useRouter();

const designRef = ref<HTMLElement | null>(null)
const productRef = ref<HTMLElement | null>(null)
const capabilityRef = ref<HTMLElement | null>(null)

const isDesignVisible = ref(false)
const isProductVisible = ref(false)
const isCapabilityVisible = ref(false)

const titleRef = ref(null)
const subtitleRef = ref(null)
const isTitleVisible = ref(false)
const isSubtitleVisible = ref(false)

// 添加背景图片数组
const backgroundImages = ref([jj1, jj2, jj3, jj4]);

// 添加响应式图片位置计算函数
function getImagePosition(index: number): string {
  // 获取当前视窗宽度
  const width = window.innerWidth
  
  if (width <= 768) {
    // 小屏幕下的位置计算
    return `${(index * 50) + 3}%` // 两列布局
  } else if (width <= 1024) {
    // 中等屏幕下的位置计算
    return `${(index * 33) + 4}%` // 三列布局
  } else {
    // 大屏幕保持原有布局
    return `${(index * 25) + 6}%` // 四列布局
  }
}

// 添加窗口大小变化监听
window.addEventListener('resize', () => {
  // 强制重新渲染以更新图片位置
  backgroundImages.value = [...backgroundImages.value]
})

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    backgroundImages.value = [...backgroundImages.value]
  })
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          // 图片和内容的滑入动画
          if ((entry.target as HTMLElement) === introImageRef.value) {
            (entry.target as HTMLElement).classList.add("slide-in-left");
          } else if ((entry.target as HTMLElement) === introContentRef.value) {
            (entry.target as HTMLElement).classList.add("slide-in-right");
          } else if (entry.target === statsRef.value) {
            // 数字动画
            companyStats.forEach((stat, index) => {
              const startValue = 0;
              const endValue = stat.value;
              const duration = 2000;
              const startTime = Date.now();

              const updateNumber = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                currentNumbers.value[index] = Math.floor(
                  startValue + (endValue - startValue) * progress
                );

                if (progress < 1) {
                  requestAnimationFrame(updateNumber);
                }
              };

              requestAnimationFrame(updateNumber);
            });
          }

          // 特色服务的动画
          if ((entry.target as HTMLElement) === service1Ref.value) {
            (entry.target as HTMLElement).classList.add("slide-in-up");
            (entry.target as HTMLElement).style.transitionDelay = "0ms";
          } else if ((entry.target as HTMLElement) === service2Ref.value) {
            (entry.target as HTMLElement).classList.add("slide-in-up");
            (entry.target as HTMLElement).style.transitionDelay = "200ms";
          } else if ((entry.target as HTMLElement) === service3Ref.value) {
            (entry.target as HTMLElement).classList.add("slide-in-up");
            (entry.target as HTMLElement).style.transitionDelay = "400ms";
          }

          entry.target.classList.add('slide-in-view')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  if (introImageRef.value) observer.observe(introImageRef.value);
  if (introContentRef.value) observer.observe(introContentRef.value);
  if (statsRef.value) observer.observe(statsRef.value);

  // 观察特色服务项
  if (service1Ref.value) observer.observe(service1Ref.value);
  if (service2Ref.value) observer.observe(service2Ref.value);
  if (service3Ref.value) observer.observe(service3Ref.value);

  // 组件卸载时清理
  onUnmounted(() => {
    observer.disconnect();
  });

  setTimeout(() => {
    isFirstLoad.value = false;
  }, 100);

  const observer2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === designRef.value) {
            isDesignVisible.value = true
          } else if (entry.target === productRef.value) {
            isProductVisible.value = true
          } else if (entry.target === capabilityRef.value) {
            isCapabilityVisible.value = true
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

  if (designRef.value) observer2.observe(designRef.value)
  if (productRef.value) observer2.observe(productRef.value)
  if (capabilityRef.value) observer2.observe(capabilityRef.value)

  // 由于 banner 在页面顶部，可以直接触发动画
  setTimeout(() => {
    isTitleVisible.value = true
    setTimeout(() => {
      isSubtitleVisible.value = true
    }, 300)
  }, 100)
});

const handleReadMore = () => {
  router.push("/about");
};
</script>

<style>
/* 确保根元素和body没有边距 */
:root, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

.slide-in-right {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.slide-in-view {
  opacity: 1 !important;
  transform: translateX(0) !important;
}
</style>

<template>
  <div class="min-h-screen bg-gray-100 w-full">
    <NavBar />

    <!-- 视频背景部分 -->
    <section class="banner-section w-full">
      <div class="banner-container h-[1080px] relative overflow-hidden w-full">
        <video
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="bannerVideo" type="video/mp4" />
        </video>

        <div class="absolute inset-0 bg-black bg-opacity-50"></div>

        <!-- 内容层 -->
        <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 sm:px-8 md:px-[120px]">
          <h2 
            ref="titleRef"
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 text-white transform transition-all duration-1000 max-w-5xl tracking-wide"
            :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
          >
            {{ t('home.hero.title.prefix') }}<!--
            --><span class="text-[#1d46a8]">{{ t('home.hero.title.highlight1') }}</span><!--
            -->{{ t('home.hero.title.middle') }}<!--
            --><span class="text-[#1d46a8]">{{ t('home.hero.title.highlight2') }}</span>
          </h2>
          <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto mb-8"></div>
          <p 
            ref="subtitleRef"
            class="text-lg sm:text-2xl md:text-3xl text-white transform transition-all duration-1000 delay-300 max-w-4xl leading-relaxed tracking-wide"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
            {{ t('home.hero.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 公司简介部分 -->
    <section class="min-h-[453px] overflow-hidden relative py-12 md:py-16 lg:py-0 lg:h-[453px] w-full">
      <!-- 修改遮罩为纯白色，并降低 z-index -->
      <div class="absolute inset-0 bg-white"></div>

      <!-- 图片背景区域 -->
      <div class="absolute inset-0 z-[1]">
        <div class="relative w-full h-full">
          <div 
            v-for="(image, index) in backgroundImages" 
            :key="index" 
            class="absolute overflow-hidden"
            :style="{
              left: `${getImagePosition(index)}`,
              top: index % 2 === 0 ? '0' : '20%'
            }"
          >
            <img 
              :src="image" 
              :alt="`公司图片 ${index + 1}`"
              class="hover:scale-110 transition-transform duration-300 w-full h-auto"
            >
          </div>
        </div>
      </div>

      <!-- 修改半透明白色遮罩的透明度 -->
      <div class="absolute inset-0 bg-white/80 z-[1]"></div>

      <!-- 内容区域 -->
      <div class="relative z-[2] h-full px-6 sm:px-8 md:px-[120px]">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-full lg:pt-32">
          <!-- 左侧标题 -->
          <div class="w-full lg:w-1/3">
            <div
              ref="introTitleRef"
              class="transform -translate-x-8 transition-all duration-1000"
              :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0': !isVisible }"
            >
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">{{ t('home.intro.title') }}</h2>
              <div class="w-20 h-1 bg-[#1d46a8] mt-4"></div>
              <p class="mt-4 lg:mt-6 text-sm lg:text-base text-gray-600 leading-relaxed">
                {{ t('home.intro.subtitle') }}
              </p>
            </div>
          </div>

          <!-- 右侧内容 -->
          <div class="w-full lg:w-2/3">
            <div
              ref="introContentRef"
              class="opacity-0 transform translate-x-8 transition-all duration-1000"
            >
              <div class="mb-6 lg:mb-8">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div class="w-1 h-6 bg-[#1d46a8] mr-3"></div>
                  {{ t('home.intro.sections.philosophy.title') }}
                </h3>
                <p class="text-sm lg:text-base leading-relaxed text-gray-600 pl-4 border-l-2 border-gray-100">
                  {{ t('home.intro.sections.philosophy.content') }}
                </p>
              </div>

              <div class="mb-6 lg:mb-8">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div class="w-1 h-6 bg-[#1d46a8] mr-3"></div>
                  {{ t('home.intro.sections.location.title') }}
                </h3>
                <p class="text-sm lg:text-base leading-relaxed text-gray-600 pl-4 border-l-2 border-gray-100">
                  {{ t('home.intro.sections.location.content') }}
                </p>
              </div>

              <!-- 阅读更多按钮 -->
              <div class="mt-4 lg:mt-6">
                <el-button
                  type="primary"
                  class="!bg-[#1d46a8] !border-[#1d46a8] !px-6 lg:!px-8 !h-10 lg:!h-12 text-sm lg:text-base font-medium hover:!bg-gray-800 hover:!border-transparent"
                  @click="handleReadMore"
                >
                  {{ t('home.intro.readMore') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 三大特色服务 -->
    <section class="bg-white w-full">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <!-- 设计能力 -->
        <div class="relative overflow-hidden">
          <div class="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <img
              src="@/assets/engineering.jpg"
              alt="设计能力"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/50"></div>
          </div>

          <div 
            ref="designRef"
            class="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 p-4 md:p-8 text-white transform transition-all duration-1000"
            :class="{ 'translate-y-8 opacity-0': !isDesignVisible, 'translate-y-0 opacity-100': isDesignVisible }"
          >
            <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-4 min-h-[2rem] md:min-h-[2.5rem]">{{ t('home.features.design.title') }}</h3>
            <div class="w-12 h-1 bg-[#1d46a8] mb-2 md:mb-4"></div>
            <p class="text-xs md:text-sm leading-relaxed mb-3 md:mb-4 min-h-[2.5rem] md:min-h-[3rem]">
              {{ t('home.features.design.desc') }}
            </p>
            <el-button
              type="primary"
              class="!bg-[#1d46a8] !border-[#1d46a8] !w-[120px] !h-10 hover:!bg-gray-800 hover:!border-transparent transition-all duration-300"
              @click="router.push('/design')"
            >
              {{ t('home.features.readMore') }}
            </el-button>
          </div>
        </div>

        <!-- 产品中心 -->
        <div class="relative overflow-hidden">
          <div class="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <img
              src="@/assets/products.jpg"
              alt="产品中心"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/50"></div>
          </div>

          <div 
            ref="productRef"
            class="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 p-4 md:p-8 text-white transform transition-all duration-1000"
            :class="{ 'translate-y-8 opacity-0': !isProductVisible, 'translate-y-0 opacity-100': isProductVisible }"
          >
            <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-4 min-h-[2rem] md:min-h-[2.5rem]">{{ t('home.features.products.title') }}</h3>
            <div class="w-12 h-1 bg-[#1d46a8] mb-2 md:mb-4"></div>
            <p class="text-xs md:text-sm leading-relaxed mb-3 md:mb-4 min-h-[2.5rem] md:min-h-[3rem]">
              {{ t('home.features.products.desc') }}
            </p>
            <el-button
              type="primary"
              class="!bg-[#1d46a8] !border-[#1d46a8] !w-[120px] !h-10 hover:!bg-gray-800 hover:!border-transparent transition-all duration-300"
              @click="router.push('/product')"
            >
              {{ t('home.features.readMore') }}
            </el-button>
          </div>
        </div>

        <!-- 能力展示 -->
        <div class="relative overflow-hidden">
          <div class="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <img
              src="@/assets/tools.jpg"
              alt="能力展示"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/50"></div>
          </div>

          <div 
            ref="capabilityRef"
            class="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 p-4 md:p-8 text-white transform transition-all duration-1000"
            :class="{ 'translate-y-8 opacity-0': !isCapabilityVisible, 'translate-y-0 opacity-100': isCapabilityVisible }"
          >
            <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-4 min-h-[2rem] md:min-h-[2.5rem]">{{ t('home.features.capability.title') }}</h3>
            <div class="w-12 h-1 bg-[#1d46a8] mb-2 md:mb-4"></div>
            <p class="text-xs md:text-sm leading-relaxed mb-3 md:mb-4 min-h-[2.5rem] md:min-h-[3rem]">
              {{ t('home.features.capability.desc') }}
            </p>
            <el-button
              type="primary"
              class="!bg-[#1d46a8] !border-[#1d46a8] !w-[120px] !h-10 hover:!bg-gray-800 hover:!border-transparent transition-all duration-300"
              @click="router.push('/equipment')"
            >
              {{ t('home.features.readMore') }}
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们区域 -->
    <div class="relative bg-[#1d46a8] py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <!-- 左侧文字 -->
        <div class="text-white text-center md:text-left mb-8 md:mb-0 md:w-1/2">
          <h2 class="text-2xl sm:text-3xl font-bold mb-4">{{ t('home.contact.title') }}</h2>
          <p class="text-lg sm:text-xl opacity-90">{{ t('home.contact.subtitle') }}</p>
        </div>
        
        <!-- 右侧按钮 -->
        <div class="md:w-auto">
          <router-link 
            to="/contact" 
            class="inline-block px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-[#1d46a8] transition-colors duration-300 rounded-lg"
          >
            {{ t('home.contact.button') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- 替换原有的 footer 为组件 -->
    <AppFooter />
  </div>
</template>
