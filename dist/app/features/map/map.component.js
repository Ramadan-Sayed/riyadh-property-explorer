import * as L from 'leaflet';
export class MapComponent {
    map;
    baseLayers = {};
    overlayLayers = {};
    // 🟢 الخطوة 6: تعريف حدود مدينة الرياض الجغرافية
    RIYADH_BOUNDS = L.latLngBounds([24.4000, 46.4000], // الحدود الجنوبية الغربية (South, West)
    [25.0000, 47.0000] // الحدود الشمالية الشرقية (North, East)
    );
    constructor(containerId) {
        this.initMap(containerId);
        this.setupBaseLayers();
    }
    // 🟢 الخطوة 1 و 2: Initialize Leaflet & Map View
    initMap(containerId) {
        this.map = L.map(containerId, {
            zoomControl: true, // 🟢 الخطوة 5: الاستفادة من عناصر Zoom الأصلية لـ Leaflet
            attributionControl: true
        });
        // ضبط العرض المبدئي بناءً على حدود الرياض
        this.map.fitBounds(this.RIYADH_BOUNDS);
    }
    // 🟢 الخطوة 3 و 4: Base Layers (OSM & Satellite)
    setupBaseLayers() {
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        });
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18,
            attribution: 'Tiles © Esri'
        });
        this.baseLayers = {
            'osm': osm,
            'satellite': satellite
        };
        // تعيين OpenStreetMap كخريطة افتراضية
        osm.addTo(this.map);
    }
    // 🟢 الخطوة 4: Overlay Layers Manager (Properties & Survey Stations)
    addOverlayLayer(name, layer) {
        this.overlayLayers[name] = layer;
        layer.addTo(this.map);
    }
    // 🟢 الخطوة 3 و 4: التبديل بين الخرائط الأساسية
    setBasemap(type) {
        Object.values(this.baseLayers).forEach(layer => this.map.removeLayer(layer));
        if (this.baseLayers[type]) {
            this.baseLayers[type].addTo(this.map);
        }
    }
    // 🟢 الخطوة 5: Zoom Controls
    zoomIn() {
        this.map.zoomIn();
    }
    zoomOut() {
        this.map.zoomOut();
    }
    // 🟢 الخطوة 6: Reset Map Extent باستخدام fitBounds
    resetExtent() {
        this.map.fitBounds(this.RIYADH_BOUNDS, { animate: true, padding: [20, 20] });
    }
    // 🟢 Getter للحصول على instance الخريطة
    getMapInstance() {
        return this.map;
    }
    invalidateSize() {
        this.map.invalidateSize();
    }
}
//# sourceMappingURL=map.component.js.map