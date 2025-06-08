<script setup lang="ts">
// 导入中文证书图片
import cert1 from '@/assets/about/authen/cert1.jpg'
import cert2 from '@/assets/about/authen/cert2.jpg'
import cert3 from '@/assets/about/authen/cert3.jpg'
import cert4 from '@/assets/about/authen/cert4.jpg'
import cert5 from '@/assets/about/authen/cert5.jpg'
import cert6 from '@/assets/about/authen/cert6.jpg'
import cert7 from '@/assets/about/authen/cert7.jpg'
import cert8 from '@/assets/about/authen/cert8.jpg'

// 导入外国证书图片
import e1 from '@/assets/about/authen/e1.png'
import e2 from '@/assets/about/authen/e2.png'
import e3 from '@/assets/about/authen/e3.png'
import e4 from '@/assets/about/authen/e4.png'

// 中文证书数据
const chineseCertificates = [
  {
    name: '环境管理体系认证证书（中文版）',
    image: cert1,
    description: 'GB/T 24001-2016/ISO 14001:2015 环境管理体系认证'
  },
  {
    name: '环境管理体系认证证书',
    image: cert2,
    description: '环境管理体系认证证书'
  },
  {
    name: '知识产权管理体系认证证书',
    image: cert3,
    description: 'GB/T 29490-2013 知识产权管理体系认证'
  },
  {
    name: '职业健康安全管理体系认证证书',
    image: cert4,
    description: 'GB/T 45001-2020/ISO 45001:2018 职业健康安全管理体系认证'
  },
  {
    name: '质量管理体系认证证书',
    image: cert5,
    description: 'GB/T 19001-2016/ISO 9001:2015 质量管理体系认证'
  },
  {
    name: '企业资质认证证书',
    image: cert6,
    description: '企业资质认证相关证书'
  },
  {
    name: '行业认证证书',
    image: cert7,
    description: '行业相关认证证书'
  },
  {
    name: '高新技术企业证书',
    image: cert8,
    description: '高新技术企业认定证书 - 证书编号：GR201937002692'
  }
]

// 外国证书数据
const foreignCertificates = [
  {
    name: '国际认证证书 1',
    image: e1,
    description: '国际标准认证证书'
  },
  {
    name: '国际认证证书 2',
    image: e2,
    description: '国际标准认证证书'
  },
  {
    name: '国际认证证书 3',
    image: e3,
    description: '国际标准认证证书'
  },
  {
    name: '国际认证证书 4',
    image: e4,
    description: '国际标准认证证书'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="mt-12 mb-16">
      <div class="bg-white p-8 shadow-sm">
        <!-- <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div class="w-1 h-6 bg-red-600 mr-3"></div>
          资质认证
        </h2>
         -->
        <!-- 中文证书部分 -->
        <div class="mb-12">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div class="w-1 h-5 bg-blue-600 mr-3"></div>
            国内认证证书
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="(cert, index) in chineseCertificates" 
              :key="'chinese-' + index"
              class="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div class="mb-4">
                <img 
                  :src="cert.image" 
                  :alt="cert.name"
                  class="w-full h-[350px] object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 class="text-lg font-bold text-gray-900 mb-2">{{ cert.name }}</h4>
              <p class="text-gray-600 text-sm">{{ cert.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- 外国证书部分 -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div class="w-1 h-5 bg-green-600 mr-3"></div>
            国际认证证书
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="(cert, index) in foreignCertificates" 
              :key="'foreign-' + index"
              class="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div class="mb-4">
                <img 
                  :src="cert.image" 
                  :alt="cert.name"
                  class="w-full h-[350px] object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 class="text-lg font-bold text-gray-900 mb-2">{{ cert.name }}</h4>
              <p class="text-gray-600 text-sm">{{ cert.description }}</p>
            </div>
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