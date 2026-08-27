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

/* ==========================================
   1. GLOBAL INITIALIZATION & SHELL BUILD
   ========================================== */
const mainShell = new MainShell();

// تهيئة الخريطة الأساسية
const mapComponent = new MapComponent('main-map');
const map = mapComponent.getMapInstance();

const converterUI = new ConverterUIComponent();
window.layerManager = new LayerManager(map);

// نقل الـ Widgets للـ Sidebar بعد إنشاء الـ DOM
mainShell.mountExistingWidgets();

// 🟢 إعلان المتغيرات العامة في البداية لتجنب أخطاء النطاق (Scope Issues)
let propertiesLayer = null;
const layerService = new LayerService();
const spatialSearchService = new SpatialSearchService();
const summaryComponent = new SearchResultSummary();

const RIYADH_DISTRICTS = ['Al-Malqa', 'Al-Yasmin', 'Al-Narjis', 'Al-Qairawan'];
console.log('Target Districts Loaded Successfully:', RIYADH_DISTRICTS);

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
   2. COMPUTATIONAL & ASYNC LOGIC
   ========================================== */
const loadAndDisplayProperties = async () => {
    mapComponent.setLoadingState(true);

    const data = await fetchRiyadhProperties('./data/riyadh-properties.geojson');
    
    if (data) {
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