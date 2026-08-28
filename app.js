// app.js - الملف الرئيسي لربط المكونات

/* ==========================================
   0. IMPORTS
   ========================================== */
import * as L from 'leaflet';
import { fetchRiyadhProperties } from './dataService.js';

import { ConverterUIComponent } from './dist/components/converter.component.js';
import { LayerService } from './dist/app/core/services/layer.service.js';
import { LayerCategory } from './dist/types/layer.js';

import { SurveyStationCard } from './dist/components/SurveyStationCard.js';
import { mockSurveyStations } from './dist/data/surveyStationsData.js';
import { SpatialSearchService } from './dist/app/core/services/spatial-search.service.js';
import { debounce } from './dist/utils/debounce.js';
import { getBoundsFromFeatures, filterGeoJsonLayer } from './dist/utils/spatial-helpers.js';
import { SearchResultSummary } from './dist/components/SearchResultSummary.js';
import { MainShell } from './dist/app/features/shell/main-shell.js';
import { MapComponent } from './dist/app/features/map/map.component.js';
import { LayerManager } from './dist/app/features/map/layer-manager.js';
import { UiStateComponent } from './dist/app/components/ui-state.component.js';

/* ==========================================
   1. GLOBAL INITIALIZATION & SHELL BUILD
   ========================================== */
const mainShell = new MainShell();

// تهيئة الخريطة الأساسية
const mapComponent = new MapComponent('main-map');
const map = mapComponent.getMapInstance();

const converterUI = new ConverterUIComponent();

// 1. حقن محول الإحداثيات في الـ DOM أولاً
const converterContainer = document.getElementById('converter-widget');
if (converterContainer && typeof converterUI.render === 'function') {
  converterContainer.innerHTML = converterUI.render();
}

window.layerManager = new LayerManager(map);

// 🟢 إعلان المتغيرات العامة
let propertiesLayer = null;
const layerService = new LayerService();
const spatialSearchService = new SpatialSearchService();
const summaryComponent = new SearchResultSummary();

let stateOverlay = document.getElementById('map-state-overlay');
if (!stateOverlay) {
  stateOverlay = document.createElement('div');
  stateOverlay.id = 'map-state-overlay';
  document.querySelector('.map-viewport')?.appendChild(stateOverlay);
}

const mapStateUI = new UiStateComponent('map-state-overlay');
/* ==========================================
   1.5. MAP CONTROLS EVENT LISTENERS (الخطوة 5 و 6)
   ========================================== */
document.getElementById('btn-zoom-in')?.addEventListener('click', () => mapComponent.zoomIn());
document.getElementById('btn-zoom-out')?.addEventListener('click', () => mapComponent.zoomOut());

document.getElementById('btn-reset-extent')?.addEventListener('click', () => {
  mapComponent.resetExtent(); // تنفيذ fitBounds(RIYADH_BOUNDS)
});

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
   2. COMPUTATIONAL & ASYNC LOGIC WITH UX STATES
   ========================================== */
const loadAndDisplayProperties = async () => {
    // 🟢 1. حالة التحميل Loading State
    mapStateUI.render('loading', { message: 'جاري تحميل عقارات الرياض...' });

    try {
        const data = await fetchRiyadhProperties('./data/riyadh-properties.geojson');
        
        // 🟢 2. حالة البيانات الفارغة Empty Data State
        if (!data || !data.features || data.features.length === 0) {
            mapStateUI.render('empty', { message: 'ملف البيانات فارغ ولا يحتوي على عقارات.' });
            return;
        }

        spatialSearchService.setDataset(data.features);

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

        // 🟢 3. نجاح التحميل Success State
        mapStateUI.render('success');

        // 🟢 تحديث أبعاد الخريطة لضمان ظهور بلاطات الخريطة بشكل صحيح
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

    } catch (error) {
        console.error('Error loading GeoJSON:', error);
        
        // 🟢 4. حالة الخطأ مع زر إعادة المحاولة Error State with Retry
        mapStateUI.render('error', {
            message: 'تعذر الاتصال بخادم البيانات الجغرافية.',
            onRetry: () => {
                loadAndDisplayProperties();
            }
        });
    }
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

// 🟢 نقل وحقن الـ Widgets في الـ Sidebar الآن بعد كتمال بنائها في الـ DOM
mainShell.mountExistingWidgets();

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
   5. SPATIAL SEARCH ENGINE & MAP STATES (الخطوة 7)
   ========================================== */
const searchInput = document.getElementById('txt-search-query');
const categorySelect = document.getElementById('sel-property-type');
const summaryContainer = document.getElementById('search-summary-container');
const noResultsMsg = document.getElementById('no-results-msg');

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

    // 🟢 الخطوة 7: Map State - Filtered or Selected
    if (matchedResults.length > 1) {
      // 1. حالة الفلترة لعدة نتائج (Fit to filtered bounds)
      const bounds = getBoundsFromFeatures(matchedResults);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    } else if (matchedResults.length === 1) {
      // 2. حالة اختيار عقار واحد (Zoom to selected property)
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
  
  // 🟢 الخطوة 7: Map State - Reset (العودة لـ Riyadh Bounds)
  mapComponent.resetExtent();
  
  handleEmptyState(-1);

  if (summaryContainer) summaryContainer.innerHTML = '';
  if (noResultsMsg) noResultsMsg.style.display = 'none';
};

document.getElementById('btn-reset-search')?.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  if (categorySelect) categorySelect.value = 'ALL';
  resetMapView();
});