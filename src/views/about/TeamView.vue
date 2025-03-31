<script setup lang="ts">
import { ref } from 'vue'

const engineers = [
  { name: '赵生彦', position: '总裁兼总经理', title: '高级工程师', education: '山东大学（铸造本科）' },
  { name: '薛祥军', position: '副总经理（技术）', title: '工程师', education: '山东机专（铸造专科）' },
  { name: '赵书豪', position: '副总经理（海外业务）', title: '助理工程师', education: '加拿大麦吉尔大学（国际管理工业工程本科）' },
  { name: '班茂伟', position: '铸造工程师', title: '高级工程师', education: '山东大学（铸造本科）' },
  { name: '郭文海', position: '铸造工程师', title: '高级工程师', education: '山东大学（铸造本科）' },
  { name: '刘伟', position: '铸造工程师', title: '助理工程师', education: '山东科技大学（铸造专科）' },
  { name: '王金萌', position: '铸造工程师', title: '助理工程师', education: '山东建筑大学（铸造本科）' },
  { name: '王崇祯', position: '三维设计工程师', title: '高级工程师', education: '重庆大学（机械工程本科）' },
  { name: '张家辉', position: '三维设计工程师', title: '助理工程师', education: '山东高级技工学校（数控专科）' },
  { name: '朱梅堂', position: '三维设计工程师', title: '助理工程师', education: '山东劳动职业学院（数控技术专科）' },
  { name: '多宏涛', position: '三维设计工程师', title: '工程师', education: '山东交通大学（机械制造及自动化）' },
  { name: '张磊', position: '三维设计工程师', title: '助理工程师', education: '山东大学（模具设计专科）' },
  { name: '于世鑫', position: '三维设计工程师', title: '助理工程师', education: '山东高级技工学校（模具设计专科）' },
  { name: '张娜', position: '编程主管', title: '工程师', education: '青岛大学（模具设计专科）' },
  { name: '谭宪凯', position: '编程工程师', title: '助理工程师', education: '聊城大学（机械制造专科）' },
  { name: '郝习庆', position: '编程工程师', title: '助理工程师', education: '江南大学（机械制造专科）' },
  { name: '张鹏飞', position: '编程工程师', title: '助理工程师', education: '烟台职业学院（数控专科）' },
  { name: '隗剑', position: '编程工程师', title: '助理工程师', education: '中华女子学院山东分院（数控专科）' },
  { name: '王春兵', position: '车间主任', title: '助理工程师', education: '山东技师学院（数控专科）' },
  { name: '袁合青', position: '数控组长', title: '助理工程师', education: '济南工程职业学院（数控专科）' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="mt-12 mb-16">
      <div class="bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div class="w-1 h-6 bg-red-600 mr-3"></div>
          工程师团队
        </h2>

        <!-- 团队简介 -->
        <div class="mb-8 space-y-4">
          <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <p class="text-blue-900">我公司共有60名员工，其中20人拥有工程师职称。</p>
          </div>
          <div class="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
            <p class="text-gray-700">自2010年以来，公司通过实现更高程度的自动化和使用更先进的设备实现了减少近一半员工的同时收入增加两倍。</p>
          </div>
        </div>

        <!-- 工程师表格 -->
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="table-header">
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider first-th table-cell-border">姓名</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider table-cell-border">职位</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider table-cell-border">职称</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider last-th">毕业院校及学历</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(engineer, index) in engineers" 
                :key="index" 
                :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 table-cell-border">{{ engineer.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 table-cell-border">{{ engineer.position }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 table-cell-border">{{ engineer.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ engineer.education }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 表头渐变背景 */
.table-header {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  position: relative;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
}

/* 第一个表头单元格圆角 */
.first-th {
  border-top-left-radius: 8px;
}

/* 最后一个表头单元格圆角 */
.last-th {
  border-top-right-radius: 8px;
}

/* 表头文字阴影 */
.table-header th {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.05em;
}

/* 表格单元格竖直分割线 */
.table-cell-border {
  border-right: 1px solid rgba(255, 255, 255, 0.2); /* 表头分割线 */
}

/* 表格内容单元格竖直分割线 */
tbody .table-cell-border {
  border-right: 1px solid #e5e7eb; /* 内容分割线 */
}
</style>