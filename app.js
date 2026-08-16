// app.js - الملف الرئيسي لربط المكونات

/* ==========================================
   0. IMPORTS (جميع الاستيرادات في الأعلى)
   ========================================== */
import { initMap } from './mapUtils.js';
import { fetchRiyadhProperties } from './dataService.js';
import { formatCoordinates } from './geoHelpers.js';
import { ConverterUIComponent } from './dist/components/converter.component.js';
import { LayerService } from './dist/services/layerService.js';
import { LayerCategory } from './dist/types/layer.js';
import { toggleMapLayer } from './dist/utils/leaflet-helper.js';
import { SurveyStationCard } from './dist/components/SurveyStationCard.js';
import { mockSurveyStations } from './dist/data/surveyStationsData.js';
import { SpatialSearchService } from './dist/services/SpatialSearchService.js';
import { debounce } from './dist/utils/debounce.js';

/* ==========================================
   1. GLOBAL DATA & CONFIGURATIONS
   ========================================== */

// أ. إنشاء الـ Service ورصد الإحداثيات
const layerService = new LayerService();
console.log("Formatted Riyadh Coordinates (WKT & Array):", formatCoordinates(24.7136, 46.6753));

// ب. إعدادات الخريطة لمدينة الرياض
const appConfig = {
    containerId: 'map',
    defaultCenter: [24.7136, 46.6753]
};

// ج. إنشاء الخريطة أولاً لتكون جاهزة لاستقبال الاستماعات والطبقات
const map = initMap(appConfig.containerId, appConfig.defaultCenter);

// د. بيانات تجريبية للأحياء
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
        const propertiesLayer = L.geoJSON(data, {
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

        // تسجيل الطبقة داخل LayerService بعد تحميل البيانات بنجاح
        if (typeof layerService !== 'undefined' && LayerCategory) {
            layerService.addLayer({
                id: 'chk-properties',
                name: 'عقارات الرياض',
                category: LayerCategory.PARCELS,
                visible: true,
                leafletLayer: propertiesLayer
            });
        }
    }
};

// تشغيل الدالة الآن بعد إنشاء الخريطة
loadAndDisplayProperties();

const calculateLandArea = (length, width) => length * width;


/* ==========================================
   3. DOM INTERACTION & EVENTS
   ========================================== */

// أ. الاستماع لـ Checkbox عقارات الرياض
const propertiesCheckbox = document.getElementById('chk-properties');

if (propertiesCheckbox) {
  propertiesCheckbox.addEventListener('change', (e) => {
    const target = e.target;

    // 1. التبديل البرمجي لحالة الطبقة في الـ Service
    layerService.toggleLayerVisibility('chk-properties');

    // 2. الحصول على كائن طبقة Leaflet الفعلي
    const layerConfig = layerService.getLayer('chk-properties');

    // 3. تطبيق التغيير الحي على الخريطة
    if (layerConfig && layerConfig.leafletLayer) {
      toggleMapLayer(layerConfig.leafletLayer, map, target.checked);
    }
  });
}

// ب. التفاعل والتبديل النشط لكروت الميزات الجانبية
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

// ج. حاسبة مساحات الأراضي
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

document.addEventListener('DOMContentLoaded', () => {
    new ConverterUIComponent();
});

/* ==========================================
   SURVEY STATIONS MODULE
   ========================================== */

// 1. توليد كروت المحطات الـ 35 في القائمة الجانبية
const surveyContainer = document.getElementById('survey-station-container');

if (surveyContainer) {
  surveyContainer.innerHTML = '';
  
  mockSurveyStations.forEach(stationData => {
    const stationCard = new SurveyStationCard(stationData);
    surveyContainer.insertAdjacentHTML('beforeend', stationCard.render());
  });
}

// 2. إنشاء نقاط الخريطة (Markers Layer Group)
const surveyLayersGroup = L.layerGroup();

mockSurveyStations.forEach(station => {
  const marker = L.marker(station.coordinates).bindPopup(`
    <div style="direction: rtl; text-align: right;">
      <b>رمز المحطة:</b> ${station.code}<br>
      <b>الارتفاع:</b> ${station.elevation}m
    </div>
  `);
  surveyLayersGroup.addLayer(marker);
});

// 3. تسجيل الطبقة في LayerService
layerService.addLayer({ 
  id: 'survey-stations', 
  name: 'محطات المسح الجغرافي', 
  category: LayerCategory.PARCELS, 
  visible: false,
  leafletLayer: surveyLayersGroup
});

// 4. ربط الـ Checkbox بالتفاعل الحي على الخريطة
const surveyCheckbox = document.getElementById('chk-survey-stations');

if (surveyCheckbox) {
  surveyCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    
    layerService.toggleLayerVisibility('survey-stations');

    if (map) {
      if (isChecked) {
        surveyLayersGroup.addTo(map);
      } else {
        map.removeLayer(surveyLayersGroup);
      }
    }
  });
}



/* ==========================================
   5. SPATIAL SEARCH ENGINE MODULE (اليوم الرابع)
   ========================================== */

// أ. جلب عناصر التحكم من الواجهة
const searchInput = document.getElementById('txt-search-query');
const categorySelect = document.getElementById('sel-property-type');

/**
 * دالة تجميع المعايير واستدعاء محرك البحث (Multi-Criteria Execution)
 */
const executeSearch = () => {
  const queryValue = searchInput ? searchInput.value.trim() : '';
  const categoryValue = categorySelect ? categorySelect.value : '';

  // تجميع كائن المعايير الموحد
  const searchCriteria = {
    query: queryValue,
    category: categoryValue !== 'ALL' && categoryValue !== '' ? categoryValue : undefined
  };

  console.log('🔍 Executing Spatial Search with criteria:', searchCriteria);

  // استدعاء محرك البحث
  const results = SpatialSearchService.search(searchCriteria);
  console.log(`Found ${results.length} matching properties:`, results);

  // (جاهز للربط مع الخريطة وعرض النتائج في الأيام التالية)
};

// ب. تطبيق تأخير الـ Debounce على دالة البحث لتخفيف الضغط على المتصفح (300ms)
const debouncedSearch = debounce(executeSearch, 300);

// ج. ربط الأحدث بالحقول

// 1. حقل النص: استخدام حدث 'input' بدلاً من 'keyup' لاقتناص النص فور الكتابة أو اللصق
if (searchInput) {
  searchInput.addEventListener('input', debouncedSearch);
}

// 2. القائمة المنسدلة: استخدام حدث 'change'
if (categorySelect) {
  categorySelect.addEventListener('change', debouncedSearch);
}



function applyMapSearchFilter(searchResults) {
  const ids = new Set(searchResults.map(r => r.properties.id));
  highlightMatchedFeatures(activeGeoJsonLayer, ids);
}

if (matchedResults.length > 1) {
  const bounds = getBoundsFromFeatures(matchedResults);
  map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
}