// app.js
import { CoordinateService } from './coordinate.service.js';

// 🟢 تشغيل اختبارات اليوم 9 في الكونسول
runCoordinateTests();

function runCoordinateTests() {
  console.log('🧪 بدء اختبار اليوم 9 — Coordinate Utilities...\n');

  // 1️⃣ اختبار Decimal -> DMS
  const decimalVal = 24.7136;
  const dmsResult = CoordinateService.decimalToDMS(decimalVal, true);
  console.log(`Decimal (${decimalVal}) -> DMS:`, dmsResult);

  // 2️⃣ اختبار DMS -> Decimal العكسي
  const convertedBack = CoordinateService.dmsToDecimal(dmsResult);
  console.log(`DMS -> Decimal العكسي:`, convertedBack);

  // 3️⃣ اختبار الحدود والتعامل مع الأخطاء - Validation
  console.log('\n--- اختبار حدود Latitude (-90 إلى 90) ---');
  console.log('90       ✓ :', CoordinateService.isValidLatitude(90) === true);
  console.log('-90      ✓ :', CoordinateService.isValidLatitude(-90) === true);
  console.log('90.0001  ✗ :', CoordinateService.isValidLatitude(90.0001) === false);
  console.log('-90.0001 ✗ :', CoordinateService.isValidLatitude(-90.0001) === false);

  // 4️⃣ اختبار معيار GeoJSON Order [lon, lat]
  const riyadhCoords = { latitude: 24.7136, longitude: 46.6753 };
  const geoJsonPos = CoordinateService.toGeoJSONPosition(riyadhCoords);
  console.log('\nGeoJSON Position [lon, lat]:', geoJsonPos);
}