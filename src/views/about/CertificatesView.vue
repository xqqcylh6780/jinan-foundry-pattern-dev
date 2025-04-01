<script setup lang="ts">
import at1 from '@/assets/about/authen/at1.png'
import at2 from '@/assets/about/authen/at2.png'
import at3 from '@/assets/about/authen/at3.png'

// 证书数据
const certificates = [
  {
    name: '环境管理体系认证',
    image: at1,
    description: '环境管理体系认证证书'
  },
  {
    name: '质量管理体系认证',
    image: at2,
    description: '质量管理体系认证证书'
  },
  {
    name: '职业健康安全管理体系认证',
    image: at3,
    description: '职业健康安全管理体系认证证书'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="mt-12 mb-16">
      <div class="bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div class="w-1 h-6 bg-red-600 mr-3"></div>
          资质认证
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(cert, index) in certificates" 
            :key="index"
            class="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div class="mb-4">
              <img 
                :src="cert.image" 
                :alt="cert.name"
                class="w-full h-[519px] object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ cert.name }}</h3>
            <p class="text-gray-600">{{ cert.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义模态框样式 */
:deep(.el-dialog) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.el-dialog__body) {
  padding: 24px;
  overflow: hidden;
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
}

/* 添加缩放提示 */
:deep(.el-dialog__header)::after {
  content: '使用鼠标滚轮可缩放图片，放大后可拖动查看';
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

/* 防止拖动时选中文本 */
.el-dialog {
  user-select: none;
}
</style>