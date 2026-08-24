// app.js - الملف الرئيسي لربط المكونات

/* ==========================================
   0. IMPORTS (جميع الاستيرادات في الأعلى)
   ========================================== */
import * as L from 'leaflet';
import { fetchRiyadhProperties } from './dataService.js';
import { formatCoordinates } from './src/app/core/spatial/geo-helpers.js';
import { ConverterUIComponent } from './dist/components/converter.component.js';
import { LayerService } from './src/app/core/services/layer.service.js';
import { LayerCategory } from './dist/types/layer.js';
import { toggleMapLayer } from './dist/utils/leaflet-helper.js';
import { SurveyStationCard } from './dist/components/SurveyStationCard.js';
import { mockSurveyStations } from './dist/data/surveyStationsData.js';
import { SpatialSearchService } from './src/app/core/services/spatial-search.service.js';
import { debounce } from './dist/utils/debounce.js';
import { getBoundsFromFeatures, filterGeoJsonLayer } from './dist/utils/spatial-helpers.js';
import { SearchResultSummary } from './dist/components/SearchResultSummary.js';
import { MainShell } from './dist/app/features/shell/main-shell.js';
import { MapComponent } from './dist/app/features/map/map.component.js'; // 🆕 استيراد مكون الخريطة الجديد
import { LayerManager } from './src/app/features/map/layer-manager.js';



/* ==========================================
   1. GLOBAL INITIALIZATION & SHELL BUILD
   ========================================== */

// 🟢 أولاً: بناء هيكل الصفحة كاملاً لضمان توفر عناصر الـ DOM
const mainShell = new MainShell();

const appConfig = {
    containerId: 'main-map',
    defaultCenter: [24.7136, 46.6753]
};

// 🟢 ثانياً: تهيئة الخريطة بواسطة MapComponent والحصول على instance الخريطة
const mapComponent = new MapComponent(appConfig.containerId, appConfig.defaultCenter, 11);
const map = mapComponent.getMapInstance();
mapComponent.invalidateSize();

let propertiesLayer = null;

const layerService = new LayerService();
const spatialSearchService = new SpatialSearchService();
const summaryComponent = new SearchResultSummary();

console.log("Formatted Riyadh Coordinates (WKT & Array):", formatCoordinates(24.7136, 46.6753));

const RIYADH_DISTRICTS = ['Al-Malqa', 'Al-Yasmin', 'Al-Narjis', 'Al-Qairawan'];
console.log('Target Districts Loaded Successfully:', RIYADH_DISTRICTS);


/* ==========================================
   1.5. MAP CONTROLS EVENT LISTENERS (🆕 ربط أزرار التحكم بالخريطة)
   ========================================== */

document.getElementById('btn-zoom-in')?.addEventListener('click', () => mapComponent.zoomIn());
document.getElementById('btn-zoom-out')?.addEventListener('click', () => mapComponent.zoomOut());
document.getElementById('btn-reset-extent')?.addEventListener('click', () => mapComponent.resetExtent());

const btnOsm = document.getElementById('btn-basemap-osm');
const btnSat = document.getElementById('btn-basemap-sat');

btnOsm?.addEventListener('click', () => {
  mapComponent.setBasemap('osm');
  btnOsm.classList.add('active');
  btnSat?.classList.remove('active');
});

btnSat?.addEventListener('click', () => {
  mapComponent.setBasemap('satellite');
  btnSat.classList.add('active');
  btnOsm?.classList.remove('active');
});

/* ==========================================
   2. COMPUTATIONAL & ASYNC LOGIC
   ========================================== */

const layerManager = new LayerManager(map);

const loadAndDisplayProperties = async () => {
    // 🟢 1. إظهار مؤشر التحميل عبر MapComponent
    mapComponent.setLoadingState(true);

    // 🟢 2. جلب البيانات مرة واحدة فقط
    const data = await fetchRiyadhProperties('./data/riyadh-properties.geojson');
    
    if (data) {
        // تغذية محرك البحث مكانيًا
        spatialSearchService.setDataset(data.features || []);

        // رسم الطبقة على الخريطة
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

        // تسجيل الطبقة في LayerService
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

    // 🟢 3. إخفاء مؤشر التحميل
    mapComponent.setLoadingState(false);
};

loadAndDisplayProperties();

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
const noResultsMsg = document.getElementById('no-results-msg');

// 🟢 دالة إدارة كارت حالة العدم (Empty State Card)
const handleEmptyState = (resultsCount) => {
  const existingEmptyState = document.getElementById('empty-state-card');

  if (resultsCount === 0) {
    if (!existingEmptyState) {
      const emptyStateEl = document.createElement('div');
      emptyStateEl.id = 'empty-state-card';
      emptyStateEl.className = 'empty-state-card';
      emptyStateEl.innerHTML = `
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-text">
          <h4>لا توجد نتائج مطابقة</h4>
          <p>جرب البحث باسم حي آخر أو إعادة ضبط الفلاتر.</p>
        </div>
      `;
      document.querySelector('.map-viewport')?.appendChild(emptyStateEl);
    }
  } else {
    if (existingEmptyState) {
      existingEmptyState.remove();
    }
  }
};

const executeSearch = () => {
  const queryValue = searchInput ? searchInput.value.trim() : '';
  const categoryValue = categorySelect ? categorySelect.value : '';

  const searchCriteria = {
    query: queryValue,
    category: categoryValue !== 'ALL' && categoryValue !== '' ? categoryValue : undefined
  };

  console.log('🔍 Executing Spatial Search with criteria:', searchCriteria);

  const searchResult = spatialSearchService.filter(searchCriteria);
  const matchedResults = searchResult.results;

  console.log(`Found ${matchedResults.length} matching properties:`, matchedResults);

  // 👈 استدعاء إدارة Empty State هنا
  handleEmptyState(matchedResults.length);

  if (noResultsMsg) {
    noResultsMsg.style.display = matchedResults.length === 0 ? 'block' : 'none';
  }

  if (summaryContainer) {
    const totalArea = summaryComponent.calculateTotalArea(matchedResults);
    summaryContainer.innerHTML = summaryComponent.render(
      searchResult.totalMatches,
      totalArea,
      searchResult.executionTimeMs
    );
  }

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

const resetMapView = () => {
  if (propertiesLayer) {
    const allIds = new Set(spatialSearchService['dataset'].map(item => item.properties.id));
    filterGeoJsonLayer(propertiesLayer, allIds);
  }
  
  mapComponent.resetExtent(); // استخدام دالة إعادة التمركز المباشرة
  
  // 🟢 إزالة Empty State عند إعادة الضبط
  handleEmptyState(-1);

  if (summaryContainer) summaryContainer.innerHTML = '';
  if (noResultsMsg) noResultsMsg.style.display = 'none';
};

document.getElementById('btn-reset-search')?.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  if (categorySelect) categorySelect.value = 'ALL';
  resetMapView();
});