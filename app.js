import { initMap } from 'mapUtils.js';



/* ==========================================
   1. GLOBAL DATA & CONFIGURATIONS (البيانات الثابتة)
   ========================================== */

// مصفوفة الأحياء المستهدفة للتطوير العقاري في الرياض
const RIYADH_DISTRICTS = ['Al-Malqa', 'Al-Yasmin', 'Al-Narjis', 'Al-Qairawan'];

// مصفوفة كروت العقارات التجريبية (Simulated GeoJSON Properties)
const propertiesRegistry = [
    { id: 1, district: 'Al-Malqa', area: 450, pricePerMeter: 6000 },
    { id: 2, district: 'Al-Yasmin', area: 500, pricePerMeter: 5500 },
    { id: 3, district: 'Al-Narjis', area: 450, pricePerMeter: 5000 },
    { id: 4, district: 'Al-Qairawan', area: 500, pricePerMeter: 4500 }
];

console.log('Target Districts Loaded Successfully:', RIYADH_DISTRICTS);

// إعدادات الخريطة المضافة حديثاً لمدينة الرياض
const appConfig = {
    containerId: 'map',
    defaultCenter: [24.7136, 46.6753]
};

/* ==========================================
   2. COMPUTATIONAL LOGIC (المنطق البرمجي الحسابي)
   ========================================== */

/**
 * دالة حساب السعر الإجمالي للعقار في الرياض
 * @param {Object} property - كائن يمثل بيانات العقار
 * @returns {number} السعر الإجمالي
 */
const calculateTotalPrice = (property) => property.area * property.pricePerMeter;

/**
 * دالة حساب مساحة قطعة الأرض بالأمتار المربعة
 * @param {number} length - الطول
 * @param {number} width - العرض
 * @returns {number} المساحة الإجمالية
 */
const calculateLandArea = (length, width) => length * width;


/* ==========================================
   3. DOM INTERACTION & EVENTS (تفاعلات الواجهة والأحداث)
   ========================================== */

// أ. التفاعل والتبديل النشط لكروت الميزات الجانبية
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const activeCard = document.querySelector('.feature-card.active');
        if (activeCard && activeCard !== card) {
            activeCard.classList.remove('active');
        }
        card.classList.add('active');
    });
});

// ب. برمجة حاسبة مساحات الأراضي العقارية
const lengthInput = document.getElementById('land-length');
const widthInput = document.getElementById('land-width');
const calculateBtn = document.getElementById('btn-calculate');
const resultDisplay = document.getElementById('calculation-result');

// التحقق الوقائي من وجود عناصر الحاسبة بالكامل قبل تفعيل المنصت
if (calculateBtn && lengthInput && widthInput && resultDisplay) {
    calculateBtn.addEventListener('click', () => {
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);

        // التحقق من القيم المدخلة وصحتها الرياضية
        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
            resultDisplay.textContent = "الرجاء إدخال قيم صحيحة أكبر من الصفر!";
            resultDisplay.style.color = "#d32f2f"; // لون أحمر متناسق مع التصميم
        } else {
            const totalArea = calculateLandArea(length, width);
            resultDisplay.textContent = `المساحة الإجمالية: ${totalArea.toLocaleString()} م²`;
            resultDisplay.style.color = "#00796b"; // لون تيل غامق
        }
    });
}

// محاكاة لملف GeoJSON يمثل موقع عقاري حقيقي في شمال الرياض
const mockRiyadhGeoJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { id: 101, name: "Riyadh Tower Asset", price: "4,500,000 SAR" },
            geometry: { type: "Point", coordinates: [46.6744, 24.7136] } // إحداثيات الرياض
        }
    ]
};

console.log("GeoJSON Engine Baseline Ready:", mockRiyadhGeoJSON);

const map = initMap(appConfig.containerId, appConfig.defaultCenter);
