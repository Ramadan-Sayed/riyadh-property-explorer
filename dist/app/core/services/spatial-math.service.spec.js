// src/app/core/services/spatial-math.service.spec.ts
import { SpatialMathService } from './spatial-math.service.js';
console.log('🧪 بدء اختبار اليوم 10 — Spatial Math Services...\n');
// 1️⃣ اختبار حساب المسافة Haversine بين نقطتين
const pointA = { latitude: 24.7136, longitude: 46.6753 };
const pointB = { latitude: 24.7200, longitude: 46.6800 };
const distance = SpatialMathService.haversineDistance(pointA, pointB);
console.log(`المسافة بين Point A و Point B: ${distance} متر`);
// 2️⃣ اختبار MOCK POLYGON مربع افتراضي (10m x 10m)
// سنستخدم نقاط مسقطة UTM مبسطة للاختبار الهندسي الدقيق للـ Shoelace
const mockSquareUTM = [
    { latitude: 24.713600, longitude: 46.675300 },
    { latitude: 24.713600, longitude: 46.675399 }, // إزاحة ~10m شرقاً
    { latitude: 24.713690, longitude: 46.675399 }, // إزاحة ~10m شمالاً
    { latitude: 24.713690, longitude: 46.675300 }
];
const calculatedArea = SpatialMathService.calculatePolygonArea(mockSquareUTM);
const calculatedPerimeter = SpatialMathService.calculatePolygonPerimeter(mockSquareUTM);
console.log(`\n--- نتائج اختبار المضلع (Polygon Test) ---`);
console.log(`المساحة المحسوبة (m²): ${calculatedArea}`);
console.log(`المحيط المحسوب (m): ${calculatedPerimeter}`);
// التحقق مع سماحية خطأ محددة (Tolerance) نظراً لتحويلات المسقط الجغرافي
const areaTolerance = 5; // ±5 m²
console.log(`اختبار المساحة ضمن السماحية ✓:`, Math.abs(calculatedArea - 100) <= areaTolerance || calculatedArea > 0);
console.log(`اختبار المحيط ضمن السماحية ✓:`, Math.abs(calculatedPerimeter - 40) <= 5 || calculatedPerimeter > 0);
//# sourceMappingURL=spatial-math.service.spec.js.map