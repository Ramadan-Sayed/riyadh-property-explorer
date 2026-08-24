import * as L from 'leaflet';
export class MapComponent {
    containerId;
    center;
    zoom;
    map;
    state = {
        isLayerLoading: false,
        activeBasemap: 'osm'
    };
    // أضف هذه الدالة داخل كلاس MapComponent
    invalidateSize() {
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }
    }
    osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    });
    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri'
    });
    constructor(containerId, center, zoom = 11) {
        this.containerId = containerId;
        this.center = center;
        this.zoom = zoom;
        this.initMap();
    }
    initMap() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Map container #${this.containerId} not found.`);
            return;
        }
        this.map = L.map(this.containerId, {
            center: this.center,
            zoom: this.zoom,
            zoomControl: false // إلغاء التحكم الافتراضي لإضافة أزرارنا الخاصة
        });
        this.osmLayer.addTo(this.map);
    }
    getMapInstance() {
        return this.map;
    }
    setBasemap(type) {
        if (this.state.activeBasemap === type)
            return;
        this.setLoadingState(true);
        if (type === 'satellite') {
            this.map.removeLayer(this.osmLayer);
            this.satelliteLayer.addTo(this.map);
        }
        else {
            this.map.removeLayer(this.satelliteLayer);
            this.osmLayer.addTo(this.map);
        }
        this.state.activeBasemap = type;
        // محاكاة انتهاء تحميل الـ Tiles
        setTimeout(() => this.setLoadingState(false), 400);
    }
    resetExtent() {
        this.map.flyTo(this.center, this.zoom, { duration: 1.2 });
    }
    zoomIn() {
        this.map.zoomIn();
    }
    zoomOut() {
        this.map.zoomOut();
    }
    setLoadingState(loading) {
        this.state.isLayerLoading = loading;
        const loaderEl = document.getElementById('map-loader');
        if (loaderEl) {
            loaderEl.style.display = loading ? 'flex' : 'none';
        }
    }
    getState() {
        return { ...this.state };
    }
}
//# sourceMappingURL=map.component.js.map