// app.js - الملف الرئيسي لربط المكونات

/* ==========================================
   0. IMPORTS (جميع الاستيرادات في الأعلى)
   ========================================== */
import * as L from 'leaflet';
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
import { getBoundsFromFeatures, filterGeoJsonLayer } from './dist/utils/spatial-helpers.js';
import { SearchResultSummary } from './dist/components/SearchResultSummary.js';
import { MainShell } from './dist/app/features/shell/main-shell.js';



/* ==========================================
   1. GLOBAL DATA & CONFIGURATIONS
   ========================================== */

const layerService = new LayerService();
const spatialSearchService = new SpatialSearchService();
const summaryComponent = new SearchResultSummary();

console.log("Formatted Riyadh Coordinates (WKT & Array):", formatCoordinates(24.7136, 46.6753));

const appConfig = {
    containerId: 'map',
    defaultCenter: [24.7136, 46.6753]
};

const map = initMap(appConfig.containerId, appConfig.defaultCenter);
let propertiesLayer = null;

const RIYADH_DISTRICTS = ['Al-Malqa', 'Al-Yasmin', 'Al-Narjis', 'Al-Qairawan'];
console.log('Target Districts Loaded Successfully:', RIYADH_DISTRICTS);


/* ==========================================
   2. COMPUTATIONAL & ASYNC LOGIC
   ========================================== */

const loadAndDisplayProperties = async () => {
    const data = await fetchRiyadhProperties('./data/riyadh-properties.geojson');
    if (data) {
        // تعبئة قاعدة بيانات محرك البحث بالبيانات المحملة
        spatialSearchService.setDataset(data.features || []);

        propertiesLayer = L.geoJSON(data, {
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

loadAndDisplayProperties();

const calculateLandArea = (length, width) => length * width;


/* ==========================================
   3. DOM INTERACTION & EVENTS
   ========================================== */

const propertiesCheckbox = document.getElementById('chk-properties');

if (propertiesCheckbox) {
  propertiesCheckbox.addEventListener('change', (e) => {
    const target = e.target;
    layerService.toggleLayerVisibility('chk-properties');
    const layerConfig = layerService.getLayer('chk-properties');

    if (layerConfig && layerConfig.leafletLayer) {
      toggleMapLayer(layerConfig.leafletLayer, map, target.checked);
    }
  });
}

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
   4. SURVEY STATIONS MODULE
   ========================================== */

const surveyContainer = document.getElementById('survey-station-container');

if (surveyContainer) {
  surveyContainer.innerHTML = '';
  
  mockSurveyStations.forEach(stationData => {
    const stationCard = new SurveyStationCard(stationData);
    surveyContainer.insertAdjacentHTML('beforeend', stationCard.render());
  });
}

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

layerService.addLayer({ 
  id: 'survey-stations', 
  name: 'محطات المسح الجغرافي', 
  category: LayerCategory.PARCELS, 
  visible: false,
  leafletLayer: surveyLayersGroup
});

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
   5. SPATIAL SEARCH ENGINE MODULE
   ========================================== */

const searchInput = document.getElementById('txt-search-query');
const categorySelect = document.getElementById('sel-property-type');
const summaryContainer = document.getElementById('search-summary-container');
const noResultsMsg = document.getElementById('no-results-msg'); // 🟢 إضافة مرجع الرسالة

const executeSearch = () => {
  const queryValue = searchInput ? searchInput.value.trim() : '';
  const categoryValue = categorySelect ? categorySelect.value : '';

  const searchCriteria = {
    query: queryValue,
    category: categoryValue !== 'ALL' && categoryValue !== '' ? categoryValue : undefined
  };

  console.log('🔍 Executing Spatial Search with criteria:', searchCriteria);

  // 1. إجراء الفلترة من خلال الكائن المنشأة
  const searchResult = spatialSearchService.filter(searchCriteria);
  const matchedResults = searchResult.results;

  console.log(`Found ${matchedResults.length} matching properties:`, matchedResults);

  // 🟢 2. التحكم في إظهار/إخفاء واجهة انعدام النتائج (Empty State)
  if (noResultsMsg) {
    noResultsMsg.style.display = matchedResults.length === 0 ? 'block' : 'none';
  }

  // 3. تحديث بطاقة الملخص الإحصائي
  if (summaryContainer) {
    const totalArea = summaryComponent.calculateTotalArea(matchedResults);
    summaryContainer.innerHTML = summaryComponent.render(
      searchResult.totalMatches,
      totalArea,
      searchResult.executionTimeMs
    );
  }

  // 4. تحديث الخريطة
  if (propertiesLayer && matchedResults) {
    const matchedIds = new Set(matchedResults.map(r => r.properties.id));
    filterGeoJsonLayer(propertiesLayer, matchedIds);

    if (matchedResults.length > 1) {
      const bounds = getBoundsFromFeatures(matchedResults);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    } else if (matchedResults.length === 1) {
      const coords = matchedResults[0].geometry.coordinates;
      map.flyTo([coords[1], coords[0]], 16, { duration: 1.2 });
    }
  }
};

const debouncedSearch = debounce(executeSearch, 300);

if (searchInput) {
  searchInput.addEventListener('input', debouncedSearch);
}

if (categorySelect) {
  categorySelect.addEventListener('change', debouncedSearch);
}

// 🟢 دالة إعادة ضبط رؤية الخريطة والطبقات وإعادة إظهار العقارات بالكامل
const resetMapView = () => {
  if (propertiesLayer) {
    // إعادة إظهار كل العناصر في layer الفلترة
    const allIds = new Set(spatialSearchService['dataset'].map(item => item.properties.id));
    filterGeoJsonLayer(propertiesLayer, allIds);
  }
  
  // إرجاع الإحداثيات والزوم الافتراضي للمدينة
  map.setView(appConfig.defaultCenter, 11); 
  
  // تفريغ الملخص وإخفاء رسالة لا توجد نتائج
  if (summaryContainer) summaryContainer.innerHTML = '';
  if (noResultsMsg) noResultsMsg.style.display = 'none';
};

// ربط الحدث زر إعادة الضبط
document.getElementById('btn-reset-search')?.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  if (categorySelect) categorySelect.value = 'ALL';
  resetMapView();
});






document.addEventListener('DOMContentLoaded', () => {
  // تهيئة الهيكل العام للشاشة
  new MainShell();
});
