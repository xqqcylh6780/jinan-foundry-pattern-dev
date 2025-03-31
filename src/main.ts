import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ElementPlus)

app.mount('#app')
