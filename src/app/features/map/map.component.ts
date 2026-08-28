import * as L from 'leaflet';

export class MapComponent {
  private map!: L.Map;
  private baseLayers: { [key: string]: L.TileLayer } = {};
  private overlayLayers: { [key: string]: L.LayerGroup } = {};

  // 🟢 الخطوة 6: تعريف حدود مدينة الرياض الجغرافية
  public readonly RIYADH_BOUNDS = L.latLngBounds(
    [24.4000, 46.4000], // الحدود الجنوبية الغربية (South, West)
    [25.0000, 47.0000]  // الحدود الشمالية الشرقية (North, East)
  );

  constructor(containerId: string) {
    this.initMap(containerId);
    this.setupBaseLayers();
  }

  // 🟢 الخطوة 1 و 2: Initialize Leaflet & Map View
  private initMap(containerId: string): void {
    this.map = L.map(containerId, {
      zoomControl: true, // 🟢 الخطوة 5: الاستفادة من عناصر Zoom الأصلية لـ Leaflet
      attributionControl: true
    });

    // ضبط العرض المبدئي بناءً على حدود الرياض
    this.map.fitBounds(this.RIYADH_BOUNDS);
  }

  // 🟢 الخطوة 3 و 4: Base Layers (OSM & Satellite)
  private setupBaseLayers(): void {
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
  public addOverlayLayer(name: string, layer: L.LayerGroup | L.GeoJSON): void {
    this.overlayLayers[name] = layer;
    layer.addTo(this.map);
  }

  // 🟢 الخطوة 3 و 4: التبديل بين الخرائط الأساسية
  public setBasemap(type: 'osm' | 'satellite'): void {
    Object.values(this.baseLayers).forEach(layer => this.map.removeLayer(layer));
    if (this.baseLayers[type]) {
      this.baseLayers[type].addTo(this.map);
    }
  }

  // 🟢 الخطوة 5: Zoom Controls
  public zoomIn(): void {
    this.map.zoomIn();
  }

  public zoomOut(): void {
    this.map.zoomOut();
  }

  // 🟢 الخطوة 6: Reset Map Extent باستخدام fitBounds
  public resetExtent(): void {
    this.map.fitBounds(this.RIYADH_BOUNDS, { animate: true, padding: [20, 20] });
  }

  // 🟢 Getter للحصول على instance الخريطة
  public getMapInstance(): L.Map {
    return this.map;
  }

  public invalidateSize(): void {
    this.map.invalidateSize();
  }

  // 🟢 إضافة دالة إدارة حالة التحميل
  public setLoadingState(isLoading: boolean): void {
    const mapElement = document.getElementById('main-map');
    if (!mapElement) return;

    if (isLoading) {
      mapElement.classList.add('loading');
    } else {
      mapElement.classList.remove('loading');
    }
  }
}