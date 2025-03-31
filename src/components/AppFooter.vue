<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// 监听路由变化
router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 使用平滑滚动
  })
})
</script>

<template>
  <footer class="bg-gray-900 text-gray-400">
    <!-- 主要内容区 -->
    <div class="max-w-[1280px] mx-auto py-12 px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-b border-gray-800 pb-12 mb-8">
        <!-- 公司简介 -->
        <div class="space-y-4">
          <h4 class="text-white text-lg font-medium">{{ t('footer.about.title') }}</h4>
          <p class="text-sm leading-relaxed">
            {{ t('footer.about.desc') }}
          </p>
        </div>

        <!-- 网站导航 -->
        <div class="space-y-4">
          <h4 class="text-white text-lg font-medium">{{ t('footer.navigation.title') }}</h4>
          <nav class="grid grid-cols-2 gap-2">
            <router-link to="/" class="text-sm text-gray-400 hover:text-white transition-colors">{{ t('footer.navigation.links.home') }}</router-link>
            <router-link to="/about" class="text-sm text-gray-400 hover:text-white transition-colors">{{ t('footer.navigation.links.about') }}</router-link>
            <router-link to="/design" class="text-sm text-gray-400 hover:text-white transition-colors">{{ t('footer.navigation.links.design') }}</router-link>
            <router-link to="/product" class="text-sm text-gray-400 hover:text-white transition-colors">{{ t('footer.navigation.links.product') }}</router-link>
            <router-link to="/equipment" class="text-sm text-gray-400 hover:text-white transition-colors">{{ t('footer.navigation.links.equipment') }}</router-link>
            <router-link to="/contact" class="text-sm text-gray-400 hover:text-white transition-colors">{{ t('footer.navigation.links.contact') }}</router-link>
          </nav>
        </div>

        <!-- 联系方式 -->
        <div class="space-y-4">
          <h4 class="text-white text-lg font-medium">{{ t('footer.contact.title') }}</h4>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 flex-shrink-0">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">{{ t('footer.contact.address') }}</span>
            </div>
            <div class="flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 flex-shrink-0">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">{{ t('footer.contact.phone') }}</span>
            </div>
            <div class="flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 flex-shrink-0">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span class="text-sm">
                <a 
                  href="mailto:engineering@foundrypattern.com.cn" 
                  class="hover:text-red-500 transition-colors duration-200"
                >
                  engineering@foundrypattern.com.cn
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="text-center space-y-4 text-sm">
        <p>{{ t('footer.copyright.text') }}</p>
        <div class="flex items-center justify-center space-x-4">
          <a href="http://beian.miit.gov.cn" target="_blank" class="hover:text-white transition-colors">{{ t('footer.copyright.icp') }}</a>
          <span>|</span>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37010102000682" target="_blank" class="hover:text-white transition-colors flex items-center">
            <img src="@/assets/beian.png" alt="备案图标" class="h-4 mr-1" />
            {{ t('footer.copyright.police') }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template> 