<script setup lang="ts">
interface Equipment {
  brand: string
  model: string
  type: string
  origin: string
  speed: number
  size: string
  precision: string
  axis: number
  system: string
  quantity: number
  usage: string
}

const equipmentList: Equipment[] = [
  {
    brand: '牧野',
    model: 'V90S',
    type: '五轴立加',
    origin: '日本',
    speed: 20000,
    size: '2000*1300*800',
    precision: '0.002',
    axis: 5,
    system: 'Professional 6',
    quantity: 2,
    usage: '60%'
  },
  {
    brand: '牧野',
    model: 'F8',
    type: '立加',
    origin: '日本',
    speed: 15000,
    size: '1300*800*650',
    precision: '0.003',
    axis: 3,
    system: 'Professional 5',
    quantity: 1,
    usage: '90%'
  },
  {
    brand: '牧野',
    model: 'PS105',
    type: '立加',
    origin: '日本',
    speed: 14000,
    size: '1050*510*460',
    precision: '0.0025',
    axis: 3,
    system: 'Professional P',
    quantity: 2,
    usage: '60%'
  },
  {
    brand: '匠泽',
    model: 'H16M',
    type: '龙门式立加',
    origin: '中国台湾',
    speed: 24000,
    size: '1700*1300*700',
    precision: '0.003',
    axis: 3,
    system: 'Heidenhain/Mitsubishi M70/M80',
    quantity: 7,
    usage: '80%'
  },
  {
    brand: '大君宏',
    model: 'B17',
    type: '立加',
    origin: '中国台湾',
    speed: 24000,
    size: '1700*1300*700',
    precision: '0.003',
    axis: 3,
    system: 'Heidenhain',
    quantity: 1,
    usage: '90%'
  },
  {
    brand: '永基',
    model: 'YJMH-4032',
    type: '龙门式立加',
    origin: '中国',
    speed: 12000,
    size: '4000*3200*1000',
    precision: '0.005',
    axis: 3,
    system: 'Mitsubishi M70/M80',
    quantity: 2,
    usage: '60%'
  },
  {
    brand: '台正',
    model: 'SP3204B',
    type: '龙门式立加',
    origin: '中国',
    speed: 8000,
    size: '3000*2500*1000',
    precision: '0.01',
    axis: 3,
    system: 'Mitsubishi M70',
    quantity: 2,
    usage: '90%'
  },
  {
    brand: '台正',
    model: '1690',
    type: '立加',
    origin: '中国',
    speed: 8000,
    size: '1600*900*800',
    precision: '0.01',
    axis: 3,
    system: 'Mitsubishi M70',
    quantity: 2,
    usage: '50%'
  },
  {
    brand: '丽驰',
    model: '850',
    type: '立加',
    origin: '中国台湾',
    speed: 10000,
    size: '800*500*540',
    precision: '0.005',
    axis: 3,
    system: 'Mitsubishi M70',
    quantity: 4,
    usage: '70%'
  },
  {
    brand: '台宇',
    model: 'VMC2015',
    type: '卧加',
    origin: '中国',
    speed: 10000,
    size: '2000*1500*1000',
    precision: '0.005',
    axis: 3,
    system: 'Mitsubishi M70',
    quantity: 1,
    usage: '80%'
  },
  {
    brand: '台宇',
    model: 'VMC1290',
    type: '卧加',
    origin: '中国',
    speed: 10000,
    size: '1200*900*700',
    precision: '0.005',
    axis: 3,
    system: 'Mitsubishi M70',
    quantity: 1,
    usage: '80%'
  },
  {
    brand: '台立',
    model: 'TL-1600',
    type: '深孔钻',
    origin: '中国',
    speed: 7000,
    size: '1800*1100深1600',
    precision: '0.01',
    axis: 3,
    system: '新代',
    quantity: 1,
    usage: '20%'
  },
  {
    brand: '其余数控',
    model: '',
    type: '',
    origin: '',
    speed: 0,
    size: '',
    precision: '',
    axis: 0,
    system: '',
    quantity: 10,
    usage: '30%'
  },
  {
    brand: '电火花',
    model: '',
    type: '',
    origin: '',
    speed: 0,
    size: '',
    precision: '',
    axis: 0,
    system: '',
    quantity: 2,
    usage: '50%'
  }
]

// 根据使用率返回不同的颜色
function getUsageColor(usage: string): string {
  const value = parseInt(usage)
  if (value >= 90) return '#ef4444' // 红色
  if (value >= 70) return '#f97316' // 橙色
  if (value >= 50) return '#eab308' // 黄色
  return '#22c55e' // 绿色
}
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">设备清单</h2>
    
    <div class="bg-white rounded-lg shadow-xl">
      <div class="xl:overflow-visible overflow-x-auto">
        <div class="min-w-[1280px]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr class="divide-x divide-gray-200">
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">品牌</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">型号</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">类型</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">产地</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">转速</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">行程</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">精度</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">轴数</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">系统</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">数量</th>
                <th class="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase">产能</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="(item, index) in equipmentList" 
                :key="index"
                class="hover:bg-gray-50 transition-colors duration-200 divide-x divide-gray-200"
              >
                <td class="px-3 py-3 text-base text-gray-900 font-medium">{{ item.brand }}</td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.model }}</td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.type }}</td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.origin }}</td>
                <td class="px-3 py-3 text-base text-gray-900">
                  {{ item.speed ? item.speed.toLocaleString() : '-' }}
                </td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.size || '-' }}</td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.precision || '-' }}</td>
                <td class="px-3 py-3 text-base text-gray-900">
                  {{ item.axis ? item.axis : '-' }}
                </td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.system || '-' }}</td>
                <td class="px-3 py-3 text-base text-gray-900">{{ item.quantity }}</td>
                <td class="px-3 py-3 text-base">
                  <div class="flex items-center">
                    <div class="w-12 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        class="h-1.5 rounded-full" 
                        :style="{ width: item.usage, backgroundColor: getUsageColor(item.usage) }"
                      ></div>
                    </div>
                    <span :style="{ color: getUsageColor(item.usage) }">{{ item.usage }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}

/* 添加表格行交替背景色 */
tbody tr:nth-child(even) {
  @apply bg-gray-50;
}

/* 美化滚动条 */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}
</style>