// app.js - الملف الرئيسي لربط المكونات
import { initMap } from './mapUtils.js';
import { fetchRiyadhProperties } from './dataService.js';

/* ==========================================
   1. GLOBAL DATA & CONFIGURATIONS
   ========================================== */

// أ. إعدادات الخريطة لمدينة الرياض
const appConfig = {
    containerId: 'map',
    defaultCenter: [24.7136, 46.6753]
};

// ب. إنشاء الخريطة في البداية أولاً لتكون جاهزة لاستقبال الطبقات
const map = initMap(appConfig.containerId, appConfig.defaultCenter);

// ج. بيانات تجريبية للأحياء والعقارات
const RIYADH_DISTRICTS = ['Al-Malqa', 'Al-Yasmin', 'Al-Narjis', 'Al-Qairawan'];
console.log('Target Districts Loaded Successfully:', RIYADH_DISTRICTS);


/* ==========================================
   2. COMPUTATIONAL & ASYNC LOGIC
   ========================================== */

/**
 * دالة جلب وعرض العقارات الجغرافية على الخريطة
 */
const loadAndDisplayProperties = async () => {
    const data = await fetchRiyadhProperties('./data/riyadh-properties.geojson');
    if (data) {
        L.geoJSON(data, {
            onEachFeature: (feature, layer) => {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(`
                        <div style="direction: rtl; text-align: right;">
                            <h4 style="margin: 0 0 5px 0; color: #005f73;">${feature.properties.name}</h4>
                            <p style="margin: 0;"><b>السعر:</b> ${feature.properties.price}</p>
                            <p style="margin: 0;"><b>الحي:</b> ${feature.properties.district}</p>
                        </div>
                    `);
                }
            }
        }).addTo(map);
    }
};

// تشغيل الدالة الآن بعد أن أصبحت الخريطة (map) جاهزة وموجودة في الذاكرة
loadAndDisplayProperties();

const calculateLandArea = (length, width) => length * width;


/* ==========================================
   3. DOM INTERACTION & EVENTS
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

// ب. حاسبة مساحات الأراضي
const lengthInput = document.getElementById('land-length');
const widthInput = document.getElementById('land-width');
const calculateBtn = document.getElementById('btn-calculate');
const resultDisplay = document.getElementById('calculation-result');

if (calculateBtn && lengthInput && widthInput && resultDisplay) {
    calculateBtn.addEventListener('click', () => {
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);

        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
            resultDisplay.textContent = "الرجاء إدخال قيم صحيحة أكبر من الصفر!";
            resultDisplay.style.color = "#d32f2f";
        } else {
            const totalArea = calculateLandArea(length, width);
            resultDisplay.textContent = `المساحة الإجمالية: ${totalArea.toLocaleString()} م²`;
            resultDisplay.style.color = "#00796b";
        }
    });
}