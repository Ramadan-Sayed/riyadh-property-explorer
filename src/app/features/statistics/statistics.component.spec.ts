// src/app/features/statistics/statistics.component.spec.ts
import { StatisticsComponent } from './statistics.component.js';

console.log('🧪 بدء اختبار اليوم 11 — Statistics Dashboard Services...\n');

// 1️⃣ إعداد بيانات وهمية لـ 5 عقارات للاختبار اليدوي
const mockProperties = [
  { properties: { price: 1000000, area: 500 } }, // سعر المتر = 2000
  { properties: { price: 2000000, area: 400 } }, // سعر المتر = 5000
  { properties: { price: 1500000, area: 300 } }, // سعر المتر = 5000
  { properties: { price: 500000,  area: 200 } }, // سعر المتر = 2500
  { properties: { price: 3000000, area: 600 } }  // سعر المتر = 5000
];

/*
 * 🧮 الحساب اليدوي المتوقع:
 * Total Count = 5
 * Average Price = (1M + 2M + 1.5M + 0.5M + 3M) / 5 = 8,000,000 / 5 = 1,600,000
 * Average Area  = (500 + 400 + 300 + 200 + 600) / 5 = 2,000 / 5 = 400
 * Average Price/m² = (2000 + 5000 + 5000 + 2500 + 5000) / 5 = 19,500 / 5 = 3,900
 */

const statsComp = new StatisticsComponent('test-container');
const result = statsComp.calculateStatistics(mockProperties);

console.log('📊 نتائج الإحصائيات المحسوبة:', result);
console.log('1. إجمالي العدد (5) ✓:', result.totalCount === 5);
console.log('2. متوسط السعر (1,600,000) ✓:', result.avgPrice === 1600000);
console.log('3. متوسط المساحة (400) ✓:', result.avgArea === 400);
console.log('4. متوسط سعر المتر (3,900) ✓:', result.avgPricePerSqm === 3900);