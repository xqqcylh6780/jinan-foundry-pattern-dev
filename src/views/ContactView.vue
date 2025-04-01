<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { Location, Phone, Message, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

const formRef = ref<FormInstance>()
const form = ref<ContactForm>({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入您的邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入您的联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate((valid) => {
    if (valid) {
      try {
        // 构建邮件内容，主题使用发送人姓名
        const mailtoSubject = encodeURIComponent(`${form.value.name} - 在线留言`)
        const mailtoBody = encodeURIComponent(
          `姓名：${form.value.name}\n` +
          `电话：${form.value.phone}\n` +
          `邮箱：${form.value.email}\n` +
          `留言内容：\n${form.value.message}`
        )
        
        // 构建mailto链接
        const mailtoLink = `mailto:engineering@foundrypattern.com.cn?subject=${mailtoSubject}&body=${mailtoBody}`
        
        // 打开默认邮件客户端
        window.location.href = mailtoLink
        
        // 显示成功消息
        ElMessage.success('表单已提交，正在打开邮件客户端')
        
        // 重置表单
        formEl.resetFields()
      } catch (error) {
        ElMessage.error('发送失败，请稍后重试或直接联系我们')
        console.error('发送失败:', error)
      }
    }
  })
}

const contactInfo = [
  {
    icon: Location,
    title: '公司地址',
    content: '山东省济南市方德利模具有限公司'
  },
  {
    icon: Phone,
    title: '联系电话',
    content: '0531-88955340'
  },
  {
    icon: Message,
    title: '电子邮箱',
    content: 'engineering@foundrypattern.com.cn'
  }
]

// 添加标题和副标题的可见性状态
const isTitleVisible = ref(false)
const isSubtitleVisible = ref(false)

onMounted(() => {
  // 延迟显示标题和副标题
  setTimeout(() => {
    isTitleVisible.value = true
    setTimeout(() => {
      isSubtitleVisible.value = true
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
        src="@/assets/contact/banner.jpg" 
        alt="联系我们" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <div class="text-center space-y-8">
          <h1 
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-wider transform transition-all duration-1000"
            :class="{ 'translate-y-0 opacity-100': isTitleVisible, 'translate-y-8 opacity-0': !isTitleVisible }"
          >
            联系我们
          </h1>
          <div class="w-32 h-1.5 bg-[#1d46a8] mx-auto"></div>
          <p 
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-widest font-medium max-w-4xl mx-auto px-4 transform transition-all duration-1000 delay-300"
            :class="{ 'translate-y-0 opacity-100': isSubtitleVisible, 'translate-y-8 opacity-0': !isSubtitleVisible }"
          >
            期待与您的沟通，为您提供专业的模具解决方案
          </p>
        </div>
      </div>
    </div>

    <!-- 联系信息 -->
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="item in contactInfo"
          :key="item.title"
          class="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:-translate-y-1 h-full"
        >
          <el-icon class="text-3xl sm:text-4xl text-[#1d46a8] mb-4">
            <component :is="item.icon" />
          </el-icon>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">{{ item.title }}</h3>
          <p class="text-sm sm:text-base text-gray-600">{{ item.content }}</p>
        </div>
      </div>
    </div>

    <!-- 联系表单区域 -->
    <div class="max-w-7xl mx-auto pb-16">
      <!-- 联系表单 -->
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-[1280px] mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">在线留言</h2>
        <p class="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          请填写此表格以索取报价，为了尽可能准确地回复您，请尽可能详细。我们将在接下来的几个工作日内回复您并提供报价。当然，我们会对您的所有信息完全保密。
        </p>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="max-w-2xl mx-auto space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <el-form-item label="姓名" prop="name" required>
              <el-input v-model="form.name" placeholder="请输入您的姓名" size="large" />
            </el-form-item>
            <el-form-item label="电子邮件" prop="email" required>
              <el-input v-model="form.email" placeholder="请输入您的邮箱地址" size="large" />
            </el-form-item>
          </div>
          
          <el-form-item label="电话" prop="phone" required>
            <el-input v-model="form.phone" placeholder="请输入您的联系电话" size="large" />
          </el-form-item>

          <el-form-item label="留言" prop="message">
            <el-input
              v-model="form.message"
              type="textarea"
              :rows="4"
              placeholder="请输入您的留言内容，我们会尽快回复您"
              size="large"
            />
          </el-form-item>

          <el-form-item class="flex justify-center">
            <el-button
              type="primary"
              class="w-[200px]"
              size="large"
              @click="submitForm(formRef)"
            >
              提交留言
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.el-input {
  @apply w-full;
}

:deep(.el-form-item__label) {
  @apply text-gray-700 font-medium;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__wrapper) {
  @apply shadow-sm border border-gray-300 hover:border-gray-400 transition-colors duration-300;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

:deep(.el-button--primary) {
  --el-button-bg-color: #1d46a8;
  --el-button-border-color: #1d46a8;
}

:deep(.el-button--primary:hover) {
  --el-button-hover-bg-color: #153576;
  --el-button-hover-border-color: #153576;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .space-x-6 {
    @apply space-x-2;
  }

  button {
    @apply px-3 py-2 text-sm;
  }
}
</style> 