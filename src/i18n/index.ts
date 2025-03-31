import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh', // 设置默认语言
  fallbackLocale: 'zh', // 设置回退语言
  messages: {
    zh,
    en
  }
}) 