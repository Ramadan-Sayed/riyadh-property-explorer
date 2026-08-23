import * as L from 'leaflet';

export interface MapState {
  isLayerLoading: boolean;
  activeBasemap: 'osm' | 'satellite';
}

export class MapComponent {
  private map!: L.Map;
  private state: MapState = {
    isLayerLoading: false,
    activeBasemap: 'osm'
  };

  private osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  });

  private satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
  });

  constructor(private containerId: string, private center: [number, number], private zoom: number = 11) {
    this.initMap();
  }

  private initMap(): void {
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

  public getMapInstance(): L.Map {
    return this.map;
  }

  public setBasemap(type: 'osm' | 'satellite'): void {
    if (this.state.activeBasemap === type) return;

    this.setLoadingState(true);

    if (type === 'satellite') {
      this.map.removeLayer(this.osmLayer);
      this.satelliteLayer.addTo(this.map);
    } else {
      this.map.removeLayer(this.satelliteLayer);
      this.osmLayer.addTo(this.map);
    }

    this.state.activeBasemap = type;
    
    // محاكاة انتهاء تحميل الـ Tiles
    setTimeout(() => this.setLoadingState(false), 400);
  }

  public resetExtent(): void {
    this.map.flyTo(this.center, this.zoom, { duration: 1.2 });
  }

  public zoomIn(): void {
    this.map.zoomIn();
  }

  public zoomOut(): void {
    this.map.zoomOut();
  }

  public setLoadingState(loading: boolean): void {
    this.state.isLayerLoading = loading;
    const loaderEl = document.getElementById('map-loader');
    if (loaderEl) {
      loaderEl.style.display = loading ? 'flex' : 'none';
    }
  }

  public getState(): MapState {
    return { ...this.state };
  }
}